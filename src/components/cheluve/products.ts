export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

import img01 from "@/assets/collections/01-sri-lakshmi-heritage-haram-set.jpg.asset.json";
import img02 from "@/assets/collections/02-emerald-kasu-heritage-necklace-set.jpg.asset.json";
import img03 from "@/assets/collections/03-ruby-royale-choker-set.jpg.asset.json";
import img04 from "@/assets/collections/04-pink-lotus-kasu-necklace-set.jpg.asset.json";
import img05 from "@/assets/collections/05-mayura-pearl-ear-cuff-earrings.jpg.asset.json";
import img06 from "@/assets/collections/06-peacock-pearl-heritage-ear-cuff-earrings.jpg.asset.json";
import img07 from "@/assets/collections/07-mahalakshmi-royal-bridal-haram-set.jpg.asset.json";
import img08 from "@/assets/collections/08-emerald-paisley-elegance-set.jpg.asset.json";
import img09 from "@/assets/collections/09-ruby-radiance-pendant-set.jpg.asset.json";
import img10 from "@/assets/collections/10-pearl-chandrika-pendant-set.jpg.asset.json";
import img11 from "@/assets/collections/11-ruby-blossom-pearl-pendant-set.jpg.asset.json";
import img12 from "@/assets/collections/12-navaratna-heritage-bangles.jpg.asset.json";
import img13 from "@/assets/collections/13-suvarna-classic-bangles.jpg.asset.json";
import img14 from "@/assets/collections/14-lakshmi-heritage-bangles.jpg.asset.json";
import img15 from "@/assets/collections/15-lakshmi-ratna-heritage-bangles.jpg.asset.json";
import img16 from "@/assets/collections/16-mayura-chandrika-jadabilla.jpg.asset.json";
import img17 from "@/assets/collections/17-mahalakshmi-lotus-temple-jadabilla.jpg.asset.json";
import img18 from "@/assets/collections/18-lakshmi-surya-temple-jadabilla.jpg.asset.json";
import img19 from "@/assets/collections/19-mahalakshmi-emerald-temple-necklace-set.jpg.asset.json";
import img20 from "@/assets/collections/20-mahalakshmi-pearl-temple-haram-set.jpg.asset.json";
import img21 from "@/assets/collections/21-navaratna-jhumka-earrings.jpg.asset.json";
import img22 from "@/assets/collections/22-mayura-navaratna-jhumka-earrings.jpg.asset.json";
import img23 from "@/assets/collections/23-royal-navaratna-chandbali-jhumkas.jpg.asset.json";
import img24 from "@/assets/collections/24-pushpa-pearl-jhumka-earrings.jpg.asset.json";
import img25 from "@/assets/collections/25-mayura-emerald-bridal-ear-chain.jpg.asset.json";
import img26 from "@/assets/collections/26-rajanigandha-long-jhumka-earrings.jpg.asset.json";
import img27 from "@/assets/collections/27-mayura-emerald-peacock-hair-pin.jpg.asset.json";
import img28 from "@/assets/collections/28-lakshmi-pushpa-pendant-set.jpg.asset.json";
import img29 from "@/assets/collections/29-maharani-temple-jadabilla.jpg.asset.json";

export const products: Product[] = [
  { id: "sri-lakshmi-heritage-haram-set", name: "Sri Lakshmi Heritage Haram Set", price: 700, image: img01.url },
  { id: "emerald-kasu-heritage-necklace-set", name: "Emerald Kasu Heritage Necklace Set", price: 800, image: img02.url },
  { id: "ruby-royale-choker-set", name: "Ruby Royale Choker Set", price: 500, image: img03.url },
  { id: "pink-lotus-kasu-necklace-set", name: "Pink Lotus Kasu Necklace Set", price: 500, image: img04.url },
  { id: "mayura-pearl-ear-cuff-earrings", name: "Mayura Pearl Ear Cuff Earrings", price: 650, image: img05.url },
  { id: "peacock-pearl-heritage-ear-cuff-earrings", name: "Peacock Pearl Heritage Ear Cuff Earrings", price: 500, image: img06.url },
  { id: "mahalakshmi-royal-bridal-haram-set", name: "Mahalakshmi Royal Bridal Haram Set", price: 1500, image: img07.url },
  { id: "emerald-paisley-elegance-set", name: "Emerald Paisley Elegance Set", price: 500, image: img08.url },
  { id: "ruby-radiance-pendant-set", name: "Ruby Radiance Pendant Set", price: 500, image: img09.url },
  { id: "pearl-chandrika-pendant-set", name: "Pearl Chandrika Pendant Set", price: 500, image: img10.url },
  { id: "ruby-blossom-pearl-pendant-set", name: "Ruby Blossom Pearl Pendant Set", price: 500, image: img11.url },
  { id: "navaratna-heritage-bangles", name: "Navaratna Heritage Bangles", price: 280, image: img12.url },
  { id: "suvarna-classic-bangles", name: "Suvarna Classic Bangles", price: 280, image: img13.url },
  { id: "lakshmi-heritage-bangles", name: "Lakshmi Heritage Bangles", price: 250, image: img14.url },
  { id: "lakshmi-ratna-heritage-bangles", name: "Lakshmi Ratna Heritage Bangles", price: 250, image: img15.url },
  { id: "mayura-chandrika-jadabilla", name: "Mayura Chandrika Jadabilla", price: 500, image: img16.url },
  { id: "mahalakshmi-lotus-temple-jadabilla", name: "Mahalakshmi Lotus Temple Jadabilla", price: 500, image: img17.url },
  { id: "lakshmi-surya-temple-jadabilla", name: "Lakshmi Surya Temple Jadabilla", price: 500, image: img18.url },
  { id: "mahalakshmi-emerald-temple-necklace-set", name: "Mahalakshmi Emerald Temple Necklace Set", price: 700, image: img19.url },
  { id: "mahalakshmi-pearl-temple-haram-set", name: "Mahalakshmi Pearl Temple Haram Set", price: 700, image: img20.url },
  { id: "navaratna-jhumka-earrings", name: "Navaratna Jhumka Earrings", price: 400, image: img21.url },
  { id: "mayura-navaratna-jhumka-earrings", name: "Mayura Navaratna Jhumka Earrings", price: 650, image: img22.url },
  { id: "royal-navaratna-chandbali-jhumkas", name: "Royal Navaratna Chandbali Jhumkas", price: 650, image: img23.url },
  { id: "pushpa-pearl-jhumka-earrings", name: "Pushpa Pearl Jhumka Earrings", price: 300, image: img24.url },
  { id: "mayura-emerald-bridal-ear-chain", name: "Mayura Emerald Bridal Ear Chain", price: 1500, image: img25.url },
  { id: "rajanigandha-long-jhumka-earrings", name: "Rajanigandha Long Jhumka Earrings", price: 700, image: img26.url },
  { id: "mayura-emerald-peacock-hair-pin", name: "Mayura Emerald Peacock Hair Pin", price: 250, image: img27.url },
  { id: "lakshmi-pushpa-pendant-set", name: "Lakshmi Pushpa Pendant Set", price: 500, image: img28.url },
  { id: "maharani-temple-jadabilla", name: "Maharani Temple Jadabilla", price: 1000, image: img29.url },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
