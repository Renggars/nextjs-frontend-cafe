// app/menu/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Filters from "../components/menu/Filters";
import MenuList from "../components/menu/MenuList";
import CartMenu from "../components/menu/CartMenu";
import FloatingCart from "../components/menu/FloatingCart";
import MobileFilters from "../components/menu/MobileFilters";
import axiosInstance from "../utils/axios";
import useCartStore from "../store/useCartStore";

const MenuPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  const { cart, addToCart, totalPrice } = useCartStore();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const catRes = await axiosInstance.get("/category");

        if (catRes.data.status) {
          setCategories(catRes.data.data.categories);
        }
      } catch (error) {
        console.error(
          "Gagal mengambil data:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-6 mt-20 px-4 max-w-360 mx-auto items-start relative">
        <aside className="hidden lg:block sticky top-24 w-65 shrink-0 h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar">
          <Filters categories={categories} />
        </aside>

        <main className="flex-1 h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar relative">
          <div className="lg:hidden mb-4">
            <MobileFilters categories={categories} />
          </div>
          {/* Header Section */}
          <div className="mb-6 px-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Our Menu
            </h1>
            <p className="text-gray-500 font-medium">
              Authentic taste from Mbah Buyut House
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Skeleton loading sederhana */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-200 animate-pulse rounded-3xl"
                />
              ))}
            </div>
          ) : (
            <MenuList menuData={categories} addToCart={addToCart} />
          )}
        </main>

        {/* 3. SIDEBAR CART (Fixed/Sticky) */}
        <aside className="hidden lg:block sticky top-24 w-85 shrink-0 h-[calc(100vh-7rem)] flex-col">
          <div className="bg-white rounded-4xl shadow-sm  h-full flex flex-col overflow-hidden">
            <CartMenu />
          </div>
        </aside>
      </div>

      {/* MOBILE UI */}
      <FloatingCart
        cartCount={totalItems}
        subtotal={totalPrice}
        onOpenCart={() => setIsMobileCartOpen(true)}
      />

      {/* Bottom Sheet Mobile tetap sama */}
      <AnimatePresence>
        {isMobileCartOpen && (
          <div className="fixed inset-0 z-100 lg:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white rounded-t-[40px] h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="w-full pt-4 pb-2 flex justify-center cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-10">
                <div className="flex justify-between items-center mb-6 pt-2">
                  <h2 className="text-2xl font-black text-gray-900">
                    Review Order
                  </h2>
                  <button
                    onClick={() => setIsMobileCartOpen(false)}
                    className="bg-gray-100 p-2 rounded-full text-gray-400"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <CartMenu />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuPage;
