// app/components/menu/FloatingCart.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight } from "lucide-react";

const FloatingCart = ({ cartCount, subtotal, onOpenCart }) => {
  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-0 right-0 px-4 z-30 lg:hidden"
        >
          <div className="mx-auto max-w-md bg-white/90 backdrop-blur-xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-2xl flex items-center justify-between p-2 h-16">
            <div className="flex items-center gap-3 pl-2">
              <div className="relative">
                <div className="bg-[#E9C46A] text-gray-900 w-10 h-10 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
                <motion.span
                  key={cartCount}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold"
                >
                  {cartCount}
                </motion.span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Subtotal
                </span>
                <span className="text-lg font-extrabold text-gray-900">
                  Rp{subtotal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenCart}
              className="bg-black hover:bg-gray-800 text-white h-full px-6 rounded-xl flex items-center gap-2 active:scale-95 transition-all"
            >
              <span className="font-bold text-sm">Detail</span>
              <ChevronRight size={18} className="text-[#E9C46A]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCart;
