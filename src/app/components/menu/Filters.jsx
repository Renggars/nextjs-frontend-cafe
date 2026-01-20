// app/components/menu/Filters.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Coffee, IceCream, Utensils, Sandwich, Box } from "lucide-react";

const getIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("coffee") && !n.includes("non")) return <Coffee size={18} />;
  if (n.includes("drink") || n.includes("ice") || n.includes("non"))
    return <IceCream size={18} />;
  if (n.includes("snack") || n.includes("makanan ringan"))
    return <Sandwich size={18} />;
  if (n.includes("food") || n.includes("makan")) return <Utensils size={18} />;
  return <Box size={18} />; // Default icon
};

export default function Filters({ categories = [] }) {
  const [activeCategory, setActiveCategory] = useState("");

  const scrollToSection = (cat) => {
    setActiveCategory(cat);
    const id = cat.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-6">
      <div>
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
          Explore
        </h2>
        <h3 className="text-xl font-black text-gray-900">Categories</h3>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => {
            setActiveCategory("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
            activeCategory === ""
              ? "bg-gray-900 text-white shadow-lg"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <Box
            size={18}
            className={
              activeCategory === "" ? "text-[#E9C46A]" : "text-gray-400"
            }
          />
          <span className="text-sm font-bold">All Menu</span>
        </button>

        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;

          return (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.name)}
              className={`group relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                  : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div
                className={`transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? "text-[#E9C46A]" : "text-gray-400"
                }`}
              >
                {getIcon(cat.name)}
              </div>

              {/* Label */}
              <span
                className={`text-sm font-bold tracking-tight ${
                  isActive ? "text-white" : "text-gray-600"
                }`}
              >
                {cat.name}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute right-4 w-1.5 h-1.5 bg-[#E9C46A] rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
