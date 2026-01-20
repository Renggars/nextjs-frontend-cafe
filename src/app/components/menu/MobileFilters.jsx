"use client";

import { useState } from "react";

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

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-18 z-40 bg-white w-full max-w-full overflow-x-hidden">
      <div
        className="
          flex gap-3 px-4 py-3
          overflow-x-auto
          scrollbar-hide
          max-w-full
        "
      >
        {/* Tombol All Menu */}
        <button
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all
            ${
              active === ""
                ? "bg-gray-900 text-white shadow-md"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollToSection(cat.name)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium
              ${
                active === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
