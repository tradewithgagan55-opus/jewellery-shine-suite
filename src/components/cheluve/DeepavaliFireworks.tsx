import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  duration: number;
  size: number;
  color: string;
};

type Rocket = {
  x: number;
  y: number;
  targetY: number;
  elapsed: number;
  duration: number;
  color: string;
  side: "left" | "right";
};

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

export function DeepavaliFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gold = getComputedStyle(document.documentElement).getPropertyValue("--gold").trim();
    const violet = getComputedStyle(document.documentElement).getPropertyValue("--royal").trim();
    const magenta = getComputedStyle(document.documentElement).getPropertyValue("--firework-magenta").trim();
    const colors = [gold, gold, gold, violet, magenta].filter(Boolean);
    const sparks: Spark[] = [];
    let rocket: Rocket | null = null;
    let width = 0;
    let height = 0;
    let nextLaunch = 0;
    let previousTime = 0;
    let frameId = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    resize();

    const burst = (activeRocket: Rocket) => {
      const maxSpeed = activeRocket.side === "left"
        ? Math.min(width * 0.047, height * 0.1)
        : Math.min(width * 0.024, height * 0.1);
      const count = Math.round(randomBetween(26, 37));

      for (let index = 0; index < count; index += 1) {
        const angle = (Math.PI * 2 * index) / count + randomBetween(-0.1, 0.1);
        const speed = maxSpeed * randomBetween(0.58, 1);
        sparks.push({
          x: activeRocket.x,
          y: activeRocket.targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: randomBetween(0.65, 1.05),
          duration: 1.05,
          size: randomBetween(0.8, 1.8),
          color: Math.random() < 0.82 ? activeRocket.color : colors[Math.floor(Math.random() * colors.length)] || gold,
        });
      }
    };

    const launch = (now: number) => {
      const side = Math.random() < 0.5 ? "left" : "right";
      const topSafeY = Math.max(90, height * 0.48);
      const bottomSafeY = height * 0.86;
      if (bottomSafeY - topSafeY < 8) return;

      rocket = {
        side,
        x: side === "left" ? randomBetween(width * 0.045, width * 0.085) : randomBetween(width * 0.969, width * 0.989),
        y: bottomSafeY,
        targetY: randomBetween(Math.max(topSafeY + 8, height * 0.61), Math.min(bottomSafeY - 8, height * 0.73)),
        elapsed: 0,
        duration: randomBetween(0.48, 0.68),
        color: gold || "#C8A46D",
      };
      nextLaunch = now + randomBetween(1100, 1900);
    };

    const animate = (now: number) => {
      frameId = window.requestAnimationFrame(animate);
      if (!width || !height) return;

      const delta = previousTime ? Math.min((now - previousTime) / 1000, 0.04) : 0;
      previousTime = now;
      context.clearRect(0, 0, width, height);

      // Fireworks are clipped to the outer margins, below the mobile header.
      // The central text and jewelry photograph remain a protected clear zone.
      const topSafeY = Math.max(90, height * 0.48);
      const bottomSafeY = height * 0.86;
      context.save();
      context.beginPath();
      context.rect(0, topSafeY, width * 0.125, Math.max(0, bottomSafeY - topSafeY));
      context.rect(width * 0.955, topSafeY, width * 0.045, Math.max(0, bottomSafeY - topSafeY));
      context.clip();
      context.globalCompositeOperation = "lighter";

      if (!rocket && now >= nextLaunch) launch(now);

      if (rocket) {
        rocket.elapsed += delta;
        const progress = Math.min(rocket.elapsed / rocket.duration, 1);
        rocket.y = height * 0.86 + (rocket.targetY - height * 0.86) * progress;

        const trailLength = Math.min(height * 0.09, rocket.y - topSafeY);
        const trail = context.createLinearGradient(rocket.x, rocket.y + trailLength, rocket.x, rocket.y);
        trail.addColorStop(0, "transparent");
        trail.addColorStop(1, rocket.color);
        context.strokeStyle = trail;
        context.lineWidth = 1.4;
        context.beginPath();
        context.moveTo(rocket.x, rocket.y + trailLength);
        context.lineTo(rocket.x, rocket.y);
        context.stroke();

        context.fillStyle = rocket.color;
        context.shadowColor = rocket.color;
        context.shadowBlur = 8;
        context.beginPath();
        context.arc(rocket.x, rocket.y, 1.8, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

        if (progress >= 1) {
          burst(rocket);
          rocket = null;
        }
      }

      for (let index = sparks.length - 1; index >= 0; index -= 1) {
        const spark = sparks[index];
        if (!spark) continue;
        spark.life -= delta;
        spark.x += spark.vx * delta;
        spark.y += spark.vy * delta;
        spark.vy += 42 * delta;
        if (spark.life <= 0) {
          sparks.splice(index, 1);
          continue;
        }

        context.globalAlpha = Math.max(0, spark.life / spark.duration);
        context.fillStyle = spark.color;
        context.shadowColor = spark.color;
        context.shadowBlur = 5;
        context.beginPath();
        context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      context.restore();
    };

    frameId = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 h-full w-full" />;
}