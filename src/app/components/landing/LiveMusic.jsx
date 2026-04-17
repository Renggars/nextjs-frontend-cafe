// components/landing/LiveMusic.jsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const LiveMusic = () => {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-2 lg:order-1"
          >
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E9C46A] mb-4 block">
              Every Evening at 17.00
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-950 leading-tight tracking-tight mb-6">
              Live Music <br />
              <span className="text-gray-500">Set Malam Ini</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-10">
              Nikmati malam yang menyenangkan bersama teman-teman dan keluarga
              dengan suasana kafe yang cozy sambil menikmati musik yang indah.
              Jangan lewatkan kesempatan untuk menikmati malam yang tak
              terlupakan bersama kami di Cafe House.
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Mulai", value: "17.00 WIB" },
                { label: "Setiap", value: "Hari Jumat–Minggu" },
                { label: "Dress Code", value: "Casual" },
                { label: "Reservasi", value: "+628 1234 5678" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white shadow-sm border border-gray-100 rounded-2xl p-4"
                >
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-gray-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative h-[350px] lg:h-[480px] rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="/images/liveMusic.jpg"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Live Music"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Live badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2 bg-[#E9C46A] text-white rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">
                Live
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveMusic;
