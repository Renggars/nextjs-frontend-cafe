// components/landing/OurValues.jsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const values = [
  { icon: "🌅", title: "Scenic View", desc: "Nikmati keindahan sunset yang memukau dari setiap sudut kafe kami." },
  { icon: "🍽️", title: "Authentic Food", desc: "Sajian autentik yang dibuat dengan bahan-bahan pilihan terbaik." },
  { icon: "☕", title: "Craft Drinks", desc: "Minuman spesial dengan resep racikan barista berpengalaman kami." },
];

const OurValues = () => {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative h-[420px] lg:h-[520px] rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="/images/view.jpg"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Beautiful view"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-4 bg-[#E9C46A] text-gray-900 rounded-3xl px-6 py-4 shadow-xl shadow-[#E9C46A]/30">
              <p className="text-xs font-bold uppercase tracking-widest mb-0.5">Since</p>
              <p className="text-2xl font-black leading-none">2018</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E9C46A] mb-4 block">
              Our Values
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-6">
              Beauty Place <br />
              <span className="text-gray-400">Good Food</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Pemandangan sunset dapat menjadi sangat indah dan memberikan
              pengalaman yang luar biasa, terutama jika Anda berada di tempat
              yang tepat dan makanan yang tepat.
            </p>

            {/* Values list */}
            <div className="flex flex-col gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E9C46A]/15 flex items-center justify-center text-xl shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;
