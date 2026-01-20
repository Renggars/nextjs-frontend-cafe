// app/components/menu/MenuItem.jsx
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import useCartStore from "@/app/store/useCartStore";
const BASE_URL = "http://localhost:4001";

const MenuItem = ({ data }) => {
  const { addToCart } = useCartStore();
  if (!data) return null;

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:4001";

  const imageUrl =
    data.imageUrl && data.imageUrl.trim() !== ""
      ? `${baseUrl}${data.imageUrl}`
      : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex bg-white rounded-3xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 mb-4 items-center transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      {/* IMAGE */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        {imageUrl ? (
          <>
            <Image
              src={`${BASE_URL}${data.imageUrl}`}
              alt={data.name || "Menu item"}
              className="w-full h-full object-cover"
              width={100}
              height={100}
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <span className="text-[10px] font-bold uppercase">No</span>
            <span className="text-[10px] font-bold uppercase">Image</span>
          </div>
        )}
      </div>

      {/* Konten Kanan */}
      <div className="flex flex-col flex-1 ml-4 py-1">
        <div className="mb-2">
          <h3 className="font-extrabold text-gray-900 text-[17px] leading-snug tracking-tight group-hover:text-[#dfb550] transition-colors">
            {data.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[13px] font-black text-gray-900 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
              Rp{data.price.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => addToCart(data)}
            className="relative overflow-hidden px-5 py-2 bg-[#E9C46A] text-gray-900 font-black rounded-xl transition-all active:scale-90 hover:bg-[#dfb550] shadow-sm shadow-[#E9C46A]/20 flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
          >
            Add
            <span className="text-lg leading-none">+</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;
