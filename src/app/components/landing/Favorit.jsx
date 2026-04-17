// components/landing/Favorit.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const favorites = [
  { image: "/images/coffee.jpg", title: "Coffee Latte", tag: "Drinks" },
  { image: "/images/iceCokelat.jpg", title: "Ice Cokelat", tag: "Drinks" },
  { image: "/images/geprek.jpg", title: "Nasi Geprek", tag: "Food" },
  { image: "/images/mieGoreng.jpg", title: "Mie Goreng", tag: "Food" },
];

const Favorit = () => {
  return (
    <section className="bg-gray-50 py-20 lg:py-28 scroll-mt-16" id="favorit">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E9C46A] mb-3 block">
              Today&apos;s Pick
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Yang Paling Favorit <br />
              <span className="text-gray-400">di Cafe House</span>
            </h2>
          </div>
          <div className="shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-[#E9C46A] shadow-lg shadow-[#E9C46A]/30">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-wide leading-tight block">
                Best
              </span>
              <span className="text-[10px] font-black uppercase tracking-wide leading-tight block">
                Seller
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {favorites.map((fav, i) => (
            <motion.div
              key={fav.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-md mb-3">
                <Image
                  src={fav.image}
                  alt={fav.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Tag */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {fav.tag}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base tracking-tight">
                {fav.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-full transition-all active:scale-95 text-sm tracking-wide"
          >
            Lihat Semua Menu
            <span className="w-7 h-7 rounded-full bg-[#E9C46A] text-gray-900 flex items-center justify-center text-base group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Favorit;
