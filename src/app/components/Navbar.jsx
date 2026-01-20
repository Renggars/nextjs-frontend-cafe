"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Varian animasi untuk menu mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-white/10">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2 z-60">
          <Image
            src="/logo.png"
            alt="Mbah buyut house"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <Link
            href="/"
            className="font-bold text-lg md:text-xl tracking-tighter"
          >
            MBAH BUYUT HOUSE
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 text-sm font-semibold uppercase tracking-widest">
            <Link className="hover:text-yellow-400 transition" href="/menu">
              Menu
            </Link>
            <Link className="hover:text-yellow-400 transition" href="/about">
              About
            </Link>
            <Link className="hover:text-yellow-400 transition" href="/contact">
              Contact
            </Link>
          </ul>
          <span className="h-4 w-px bg-white/30"></span>
          <span className="font-bold text-sm">RSVP +628 1234 5678</span>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-60 w-10 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer focus:outline-none"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white"
          ></motion.span>
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-white"
          ></motion.span>
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white"
          ></motion.span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-black z-55 flex flex-col items-center justify-center pt-20"
          >
            <ul className="flex flex-col gap-8 text-center">
              {["Menu", "About", "Contact"].map((item) => (
                <motion.li key={item} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-extrabold uppercase tracking-widest hover:text-yellow-400 transition"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-20 flex flex-col items-center gap-4">
              <span className="text-gray-500 text-xs tracking-[0.3em] uppercase">
                Reservation
              </span>
              <span className="text-xl font-bold">+628 1234 5678</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
