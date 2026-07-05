export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const img = (file: string) => `/images/collections/${file}`;

export const products: Product[] = [
  { id: "sri-lakshmi-heritage-haram-set", name: "Sri Lakshmi Heritage Haram Set", price: 700, image: img("01-sri-lakshmi-heritage-haram-set.jpg") },
  { id: "emerald-kasu-heritage-necklace-set", name: "Emerald Kasu Heritage Necklace Set", price: 800, image: img("02-emerald-kasu-heritage-necklace-set.jpg") },
  { id: "ruby-royale-choker-set", name: "Ruby Royale Choker Set", price: 500, image: img("03-ruby-royale-choker-set.jpg") },
  { id: "pink-lotus-kasu-necklace-set", name: "Pink Lotus Kasu Necklace Set", price: 500, image: img("04-pink-lotus-kasu-necklace-set.jpg") },
  { id: "mayura-pearl-ear-cuff-earrings", name: "Mayura Pearl Ear Cuff Earrings", price: 650, image: img("05-mayura-pearl-ear-cuff-earrings.jpg") },
  { id: "peacock-pearl-heritage-ear-cuff-earrings", name: "Peacock Pearl Heritage Ear Cuff Earrings", price: 500, image: img("06-peacock-pearl-heritage-ear-cuff-earrings.jpg") },
  { id: "mahalakshmi-royal-bridal-haram-set", name: "Mahalakshmi Royal Bridal Haram Set", price: 1500, image: img("07-mahalakshmi-royal-bridal-haram-set.jpg") },
  { id: "emerald-paisley-elegance-set", name: "Emerald Paisley Elegance Set", price: 500, image: img("08-emerald-paisley-elegance-set.jpg") },
  { id: "ruby-radiance-pendant-set", name: "Ruby Radiance Pendant Set", price: 500, image: img("09-ruby-radiance-pendant-set.jpg") },
  { id: "pearl-chandrika-pendant-set", name: "Pearl Chandrika Pendant Set", price: 500, image: img("10-pearl-chandrika-pendant-set.jpg") },
  { id: "ruby-blossom-pearl-pendant-set", name: "Ruby Blossom Pearl Pendant Set", price: 500, image: img("11-ruby-blossom-pearl-pendant-set.jpg") },
  { id: "navaratna-heritage-bangles", name: "Navaratna Heritage Bangles", price: 280, image: img("12-navaratna-heritage-bangles.jpg") },
  { id: "suvarna-classic-bangles", name: "Suvarna Classic Bangles", price: 280, image: img("13-suvarna-classic-bangles.jpg") },
  { id: "lakshmi-heritage-bangles", name: "Lakshmi Heritage Bangles", price: 250, image: img("14-lakshmi-heritage-bangles.jpg") },
  { id: "lakshmi-ratna-heritage-bangles", name: "Lakshmi Ratna Heritage Bangles", price: 250, image: img("15-lakshmi-ratna-heritage-bangles.jpg") },
  { id: "mayura-chandrika-jadabilla", name: "Mayura Chandrika Jadabilla", price: 500, image: img("16-mayura-chandrika-jadabilla.jpg") },
  { id: "mahalakshmi-lotus-temple-jadabilla", name: "Mahalakshmi Lotus Temple Jadabilla", price: 500, image: img("17-mahalakshmi-lotus-temple-jadabilla.jpg") },
  { id: "lakshmi-surya-temple-jadabilla", name: "Lakshmi Surya Temple Jadabilla", price: 500, image: img("18-lakshmi-surya-temple-jadabilla.jpg") },
  { id: "mahalakshmi-emerald-temple-necklace-set", name: "Mahalakshmi Emerald Temple Necklace Set", price: 700, image: img("19-mahalakshmi-emerald-temple-necklace-set.jpg") },
  { id: "mahalakshmi-pearl-temple-haram-set", name: "Mahalakshmi Pearl Temple Haram Set", price: 700, image: img("20-mahalakshmi-pearl-temple-haram-set.jpg") },
  { id: "navaratna-jhumka-earrings", name: "Navaratna Jhumka Earrings", price: 400, image: img("21-navaratna-jhumka-earrings.jpg") },
  { id: "mayura-navaratna-jhumka-earrings", name: "Mayura Navaratna Jhumka Earrings", price: 650, image: img("22-mayura-navaratna-jhumka-earrings.jpg") },
  { id: "royal-navaratna-chandbali-jhumkas", name: "Royal Navaratna Chandbali Jhumkas", price: 650, image: img("23-royal-navaratna-chandbali-jhumkas.jpg") },
  { id: "pushpa-pearl-jhumka-earrings", name: "Pushpa Pearl Jhumka Earrings", price: 300, image: img("24-pushpa-pearl-jhumka-earrings.jpg") },
  { id: "mayura-emerald-bridal-ear-chain", name: "Mayura Emerald Bridal Ear Chain", price: 1500, image: img("25-mayura-emerald-bridal-ear-chain.jpg") },
  { id: "rajanigandha-long-jhumka-earrings", name: "Rajanigandha Long Jhumka Earrings", price: 700, image: img("26-rajanigandha-long-jhumka-earrings.jpg") },
  { id: "mayura-emerald-peacock-hair-pin", name: "Mayura Emerald Peacock Hair Pin", price: 250, image: img("27-mayura-emerald-peacock-hair-pin.jpg") },
  { id: "lakshmi-pushpa-pendant-set", name: "Lakshmi Pushpa Pendant Set", price: 500, image: img("28-lakshmi-pushpa-pendant-set.jpg") },
  { id: "maharani-temple-jadabilla", name: "Maharani Temple Jadabilla", price: 1000, image: img("29-maharani-temple-jadabilla.jpg") },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
