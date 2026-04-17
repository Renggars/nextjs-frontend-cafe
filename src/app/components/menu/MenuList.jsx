// app/components/menu/MenuList.jsx
"use client";

import { motion } from "framer-motion";
import MenuItem from "./MenuItem";

export default function MenuList({ menuData = [], addToCart }) {
  return (
    <div className="space-y-10 pb-32">
      {menuData.map((category, catIndex) => (
        <motion.section
          key={category.id}
          id={category.name.toLowerCase().replace(/\s+/g, "-")}
          className="scroll-mt-32"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.08 }}
        >
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-5 px-1">
            <h2 className="font-black text-lg text-gray-900 capitalize tracking-tight whitespace-nowrap">
              {category.name}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent rounded-full" />
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest shrink-0">
              {category.menus?.length || 0} item
            </span>
          </div>

          {/* Menu Grid — 2 columns on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {category.menus && category.menus.length > 0 ? (
              category.menus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  data={menu}
                  addToCart={() => addToCart(menu)}
                />
              ))
            ) : (
              <p className="col-span-2 text-sm text-gray-400 px-1 italic py-4">
                Belum ada menu di kategori ini.
              </p>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
