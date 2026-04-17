// app/menu/checkout/page.jsx
"use client";

import React, { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/app/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ArrowLeft,
  User,
  CreditCard,
  Wallet,
  Store,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import axiosInstance from "@/app/utils/axios";
import useCartStore from "@/app/store/useCartStore";

const CheckoutPage = () => {
  const { cart, clearCart, totalPrice } = useCartStore();

  const searchParams = useSearchParams();
  const tableFromUrl = searchParams.get("table") || "0";

  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("kasir"); // 'kasir' atau 'gateway'
  const [showNameError, setShowNameError] = useState(false);
  const nameInputRef = useRef(null);

  const handleOrder = async () => {
    if (!customerName) {
      setShowNameError(true);
      nameInputRef.current?.focus();
      toast.error("Mohon isi nama Anda untuk melanjutkan");
      setTimeout(() => setShowNameError(false), 500); // Reset shake after animation
      return;
    }

    const paymentTypeEnum = paymentMethod === "kasir" ? "CASH" : "GATEWAY";

    setLoading(true);
    try {
      const response = await axiosInstance.post("/order", {
        customerName,
        notes: note,
        tableNumber: tableFromUrl,
        paymentType: paymentTypeEnum,
        items: cart.map((item) => ({
          menuId: item.id,
          quantity: item.quantity,
        })),
      });

      const orderData = response.data.data;

      if (!orderData) {
        throw new Error("Data pesanan tidak diterima dari server");
      }

      if (paymentMethod === "kasir") {
        clearCart();
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = `/menu/order-received?id=${orderData.id}`;
        }, 800);
      } else {
        // ALUR GATEWAY: Buka Midtrans Snap
        if (orderData?.snapToken) {
          window.snap.pay(orderData.snapToken, {
            onSuccess: (res) => {
              clearCart();
              setIsRedirecting(true);
              window.location.href = `/menu/order-received?id=${orderData.id}`;
            },
            onPending: (res) => {
              clearCart();
              setIsRedirecting(true);
              window.location.href = `/menu/order-received?id=${orderData.id}`;
            },
            onError: () => toast.error("Pembayaran gagal, silakan coba lagi."),
            onClose: () =>
              toast("Pembayaran belum selesai. Segera selesaikan pembayaran Anda.", {
                icon: "⚠️",
              }),
          });
        } else {
          toast.error("Gagal mendapatkan token pembayaran dari Midtrans.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan koneksi atau server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-10">
      {/* Load Midtrans Snap Script (Sandbox) */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      />

      <Navbar />

      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative w-24 h-24 mb-6"
            >
              <div className="absolute inset-0 bg-[#E9C46A]/20 rounded-full animate-ping" />
              <div className="relative bg-white rounded-full p-4 shadow-xl border border-gray-100 flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-[#E9C46A]" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Pesanan Diterima!
            </h2>
            <p className="text-gray-400 font-medium animate-pulse">
              Sedang menyiapkan struk digital Anda...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-2xl mx-auto px-4 pt-20 lg:pt-28 pb-10">
        {/* Header Section */}
        <div className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
          <Link
            href="/menu"
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
          >
            <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight">
              Checkout
            </h1>
            <p className="text-[10px] lg:text-sm text-gray-400 font-medium">
              Lengkapi detail pesanan Anda
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-3xl shadow-sm text-center border border-gray-100"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-gray-200" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Keranjang Kosong
            </h2>
            <Link
              href="/menu"
              className="mt-6 inline-block px-8 py-3 bg-[#E9C46A] text-gray-900 rounded-2xl font-bold"
            >
              Lihat Menu
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* 1. Informasi Pemesan */}
            <section className="bg-white p-5 lg:p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5 lg:mb-6">
                <div className="p-1.5 lg:p-2 bg-blue-50 rounded-lg text-blue-500">
                  <User size={16} />
                </div>
                <h2 className="text-sm lg:text-base font-bold text-gray-800">Informasi Pemesan</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Nama Lengkap *
                  </label>
                  <motion.div
                    animate={showNameError ? { x: [-4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className={`w-full bg-gray-50 border-2 ${showNameError ? "border-red-400 bg-red-50/30" : "border-transparent"} focus:border-[#E9C46A] focus:bg-white rounded-2xl px-4 py-3 lg:py-4 outline-none transition-all font-medium text-sm lg:text-base`}
                    />
                  </motion.div>
                </div>
                <div>
                  <label className="block text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Catatan (Opsional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Contoh: Tidak pedas, extra gula.."
                    rows={2}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#E9C46A] focus:bg-white rounded-2xl px-4 py-3 lg:py-4 outline-none transition-all font-medium resize-none text-sm lg:text-base"
                  />
                </div>
              </div>
            </section>

            {/* 2. Pilih Metode Pembayaran */}
            <section className="bg-white p-5 lg:p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5 lg:mb-6">
                <div className="p-1.5 lg:p-2 bg-yellow-50 rounded-lg text-[#E9C46A]">
                  <CreditCard size={16} />
                </div>
                <h2 className="text-sm lg:text-base font-bold text-gray-800">Metode Pembayaran</h2>
              </div>

              <div className="grid gap-3">
                {/* Opsi Kasir */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod("kasir")}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === "kasir"
                      ? "border-[#E9C46A] bg-yellow-50/50"
                      : "border-gray-50 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 lg:p-3 rounded-xl ${paymentMethod === "kasir" ? "bg-[#E9C46A] text-white" : "bg-white text-gray-400"}`}
                    >
                      <Store size={18} className="lg:w-5 lg:h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-xs lg:text-sm">
                        Bayar di Kasir
                      </p>
                      <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium">
                        Tunai / QRIS Outlet
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "kasir" && (
                    <div className="w-2 h-2 bg-[#E9C46A] rounded-full mr-2" />
                  )}
                </motion.div>

                {/* Opsi Payment Gateway */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod("gateway")}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    paymentMethod === "gateway"
                      ? "border-[#E9C46A] bg-yellow-50/50"
                      : "border-gray-50 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 lg:p-3 rounded-xl ${paymentMethod === "gateway" ? "bg-[#E9C46A] text-white" : "bg-white text-gray-400"}`}
                    >
                      <Wallet size={18} className="lg:w-5 lg:h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-xs lg:text-sm">
                        Online Payment
                      </p>
                      <p className="text-[9px] lg:text-[10px] text-gray-500 font-medium">
                        Transfer / E-Wallet / CC
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "gateway" && (
                    <div className="w-2 h-2 bg-[#E9C46A] rounded-full mr-2" />
                  )}
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {paymentMethod === "gateway" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100"
                  >
                    <p className="text-[11px] text-blue-600 font-medium leading-relaxed">
                      💡 <strong>Penting:</strong> Pesanan Anda akan otomatis
                      diteruskan ke dapur{" "}
                      <strong>setelah pembayaran berhasil</strong> dikonfirmasi
                      oleh sistem.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* 3. Ringkasan & Submit */}
            <section className="bg-white p-5 lg:p-6 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-sm lg:text-base font-bold text-gray-800 mb-5 lg:mb-6">
                Ringkasan Pesanan
              </h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-500 font-medium">
                      {item.name}{" "}
                      <strong className="text-gray-800 ml-1">
                        x{item.quantity}
                      </strong>
                    </span>
                    <span className="font-bold text-gray-800">
                      Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t-2 border-dashed border-gray-100 space-y-3">
                <div className="flex justify-between text-gray-400 font-medium text-sm">
                  <span>Subtotal</span>
                  <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-gray-900">
                  <span>Total</span>
                  <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={loading}
                className={`w-full mt-8 ${loading ? "bg-gray-400" : "bg-gray-900 hover:bg-black"} text-white rounded-2xl py-4 lg:py-5 font-bold lg:font-black text-base lg:text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-gray-200 cursor-pointer`}
              >
                {loading
                  ? "Memproses..."
                  : paymentMethod === "kasir"
                    ? "Konfirmasi Pesanan"
                    : "Bayar Sekarang"}
                <ChevronRight size={20} className="text-[#E9C46A]" />
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;
