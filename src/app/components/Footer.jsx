// components/Footer.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const navLinks = [
    { label: "Menu", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const socials = [
    { icon: <FaInstagram size={18} />, href: "#", label: "Instagram" },
    { icon: <FaTiktok size={18} />, href: "#", label: "TikTok" },
    { icon: <FaWhatsapp size={18} />, href: "#", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-white text-gray-950 border-t border-gray-100">
      {/* Top CTA Banner */}
      <div className="border-b border-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#E9C46A] mb-2">
              Reservasi Tempat
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              Siap Untuk Menikmati Momen <br className="hidden md:block" />
              <span className="text-gray-600">Bersama Kami?</span>
            </h3>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-sm font-bold text-gray-600">
              +62822-5767-8788
            </span>
            <a
              href="tel:+6282257678788"
              className="bg-[#E9C46A] hover:bg-[#dfb550] text-gray-900 font-bold px-6 py-3 rounded-full text-sm transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-[#E9C46A]/20"
            >
              Make a Reservation
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logoGreen.png"
                alt="Cafe House"
                width={40}
                height={40}
                className="w-10 h-auto"
              />
              <span className="font-black text-sm tracking-[0.15em] uppercase">
                Cafe House
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Tempat makan dan nongkrong yang nyaman dengan view alam yang
              menakjubkan dan hidangan yang lezat di Mojokerto, Jawa Timur.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-gray-50 hover:bg-[#E9C46A] hover:text-gray-900 text-gray-600 flex items-center justify-center border border-gray-100 transition-all duration-200 active:scale-90"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation + Location */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-5">
              Navigasi
            </h4>
            <nav className="flex flex-col gap-3 mb-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-[#E9C46A] font-medium text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-3">
              Lokasi
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              RT.1/RW.4, Kalang, Kalen, <br />
              Kec. Dlanggu, Kabupaten Mojokerto, <br />
              Jawa Timur
            </p>
          </div>

          {/* Column 3: Hours */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 mb-5">
              Jam Buka
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { day: "Senin - Jumat", time: "10.00 - 23.00 WIB" },
                { day: "Sabtu - Minggu", time: "10.00 - 23.00 WIB" },
                { day: "Live Music", time: "Jum&apos;at - Minggu, 17.00 WIB" },
              ].map((item) => (
                <div
                  key={item.day}
                  className="flex justify-between items-start gap-4 border-b border-gray-50 pb-3"
                >
                  <span className="text-gray-600 text-sm">{item.day}</span>
                  <span className="text-gray-900 text-sm font-bold shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
            {/* Open indicator */}
            <div className="mt-5 inline-flex items-center gap-2 bg-green-500/5 border border-green-500/10 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-600 text-[10px] font-black uppercase tracking-wider">
                Sekarang Buka
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          <span>© 2025 Cafe House. All rights reserved.</span>
          <span>
            Dev by <span className="text-[#E9C46A]">Renggars</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
