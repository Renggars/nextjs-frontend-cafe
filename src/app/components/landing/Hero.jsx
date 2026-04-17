// components/landing/Hero.jsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center relative flex items-center overflow-hidden"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-transparent" />

      {/* Subtle animated grain texture feel via pseudo gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative z-10 container mx-auto px-6 lg:px-20 xl:px-52">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#E9C46A] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              Cafe House
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-black text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6"
          >
            A Place Where <br />
            <span className="text-[#E9C46A]">Every Moment</span> <br />
            Feels Like Home
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/70 text-base md:text-lg font-medium mb-10 max-w-md leading-relaxed"
          >
            Authentic cuisine, warm ambiance, and unforgettable moments. all
            waiting for you at Cafe House.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/menu"
              className="group bg-[#E9C46A] hover:bg-[#dfb550] text-gray-900 font-bold px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-[#E9C46A]/30 flex items-center gap-2 text-sm tracking-wide"
            >
              Explore Menu
            </Link>
            <a
              href="#favorit"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95 text-sm tracking-wide"
            >
              Our Favourites
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-0.5 h-10 bg-gradient-to-b from-white/50 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
