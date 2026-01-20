"use client";

import MenuItem from "./MenuItem";

export default function MenuList({ menuData = [], addToCart }) {
  return (
    <div className="space-y-12 pb-20">
      {menuData.map((category) => (
        <section
          key={category.id}
          id={category.name.toLowerCase().replace(/\s+/g, "-")}
          className="scroll-mt-32"
        >
          {/* Judul Kategori (Contoh: Food, Drink) */}
          <div className="flex items-center gap-4 mb-6 px-2">
            <h2 className="font-black text-2xl text-gray-900 capitalize">
              {category.name}
            </h2>
            <div className="h-0.5 flex-1 bg-gray-100 rounded-full"></div>
          </div>

          {/* Grid Menu di dalam kategori tersebut */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.menus && category.menus.length > 0 ? (
              category.menus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  data={menu}
                  addToCart={() => addToCart(menu)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 px-2 italic">
                Belum ada menu di kategori ini.
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
