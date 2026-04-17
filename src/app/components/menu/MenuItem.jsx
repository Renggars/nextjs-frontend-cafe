// app/components/menu/MenuItem.jsx
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "@/app/store/useCartStore";

const BASE_URL = "http://localhost:4001";

const MenuItem = ({ data }) => {
  const { addToCart, cart } = useCartStore();
  const [justAdded, setJustAdded] = useState(false);

  if (!data) return null;

  const imageUrl =
    data.imageUrl && data.imageUrl.trim() !== ""
      ? `${BASE_URL}${data.imageUrl}`
      : null;

  const cartItem = cart.find((item) => item.id === data.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart(data);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100/80 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-36 w-full overflow-hidden bg-gray-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={data.name || "Menu item"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            priority
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <span className="text-3xl">🍽️</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quantity badge */}
        <AnimatePresence>
          {quantity > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-2.5 right-2.5 w-6 h-6 bg-gray-900 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-lg"
            >
              {quantity}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CONTENT */}
      <div className="p-3.5">
        <h3 className="font-bold text-gray-900 text-sm leading-snug tracking-tight mb-0.5 truncate">
          {data.name}
        </h3>
        <p className="text-[13px] font-black text-gray-700 mb-3">
          Rp{data.price.toLocaleString("id-ID")}
        </p>

        {/* ADD BUTTON */}
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          className={`relative w-full overflow-hidden py-2.5 rounded-2xl font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
            justAdded
              ? "bg-green-500 text-white"
              : "bg-[#E9C46A] text-gray-900 hover:bg-[#dfb550]"
          }`}
        >
          <AnimatePresence mode="wait">
            {justAdded ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1"
              >
                ✓ Ditambahkan
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1"
              >
                + Tambah
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MenuItem;
