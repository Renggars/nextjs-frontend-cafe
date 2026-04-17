// app/components/menu/MobileFilters.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MobileFilters({ categories = [] }) {
  const [active, setActive] = useState("");

  const scrollToSection = (catName) => {
    if (!catName || typeof catName !== "string") return;
    setActive(catName);
    const id = catName.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(id);
    if (element) {
      const offset = 130;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-white shadow-[0_2px_15px_rgba(0,0,0,0.05)] w-full">
      <div className="flex gap-2 px-3 py-3 overflow-x-auto scrollbar-hide">
        {/* All button */}
        <button
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`relative shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
            active === "" ? "border-gray-900" : "border-gray-200"
          }`}
        >
          {active === "" && (
            <motion.div
              layoutId="filter-pill"
              className="absolute inset-0 bg-gray-900 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 transition-colors ${
              active === "" ? "text-white" : "text-gray-500"
            }`}
          >
            Semua
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollToSection(cat.name)}
            className={`relative shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
              active === cat.name ? "border-gray-900" : "border-gray-200"
            }`}
          >
            {active === cat.name && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 bg-gray-900 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                active === cat.name
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
