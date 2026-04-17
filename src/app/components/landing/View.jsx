// components/landing/View.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HangoutView = () => {
  const images = [
    "/views/1.jpg",
    "/views/2.jpg",
    "/views/3.jpg",
    "/views/4.jpg",
  ];

  return (
    <section
      className="py-24 bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/views/cafe.jpg')" }}
    >
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-white mb-14"
        >
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E9C46A] mb-4 block">
            Our Atmosphere
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-5">
            Tempat Nongkrong Asik <br />
            <span className="text-gray-400">Bersama Orang Tersayang</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base leading-relaxed">
            Nikmati hidangan spesial kami bersama keluarga dan teman-teman. View
            yang menakjubkan akan membuat momen Anda semakin berkesan.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-12">
          {images.map((img, i) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2 h-64 md:h-auto" : "h-36"
              }`}
            >
              <Image
                src={img}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                alt={`Suasana kafe ${i + 1}`}
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href="/menu"
            className="group bg-[#E9C46A] hover:bg-[#dfb550] text-gray-900 font-bold px-8 py-4 rounded-full transition-all active:scale-95 shadow-lg shadow-[#E9C46A]/20 flex items-center gap-3 text-sm tracking-wide"
          >
            Pesan Sekarang
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HangoutView;
