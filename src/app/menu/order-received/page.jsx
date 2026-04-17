// app/menu/order-received/page.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Clock,
  AlertCircle,
  Printer,
  ChevronLeft,
  CheckCircle2,
  Store,
  Loader2,
} from "lucide-react";
import { getOrderById } from "@/app/services/order.service";
import { toPng } from "html-to-image";

const OrderReceivedPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const receiptRef = useRef(null);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    getOrderById(orderId)
      .then((data) => {
        console.log("DATA PESANAN DARI API:", data);
        setOrder(data);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleDownload = async () => {
    if (receiptRef.current === null) return;

    try {
      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        backgroundColor: "#F8F9FA", // Warna background gambar
      });

      const link = document.createElement("a");
      link.download = `struk-${order.orderNumber || order.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Gagal mengunduh struk", err);
      toast.error("Gagal mengunduh struk, silakan coba lagi.");
    }
  };

  // Logika untuk menentukan konten berdasarkan status
  const getStatusContent = () => {
    if (!order) return null;

    if (order.status === "CONFIRMED") {
      return {
        icon: (
          <CheckCircle2 className="w-12 h-12 lg:w-16 lg:h-16 text-green-500" />
        ),
        title: "Pembayaran Berhasil!",
        message:
          "Pesanan Anda telah diterima dan sedang diproses oleh dapur. Silakan tunggu di meja Anda.",
        color: "bg-green-50",
        badge: "SUKSES",
      };
    }

    if (order.status === "PENDING") {
      if (order.paymentType === "CASH") {
        return {
          icon: <Store className="w-16 h-16 text-blue-500" />,
          title: "Menunggu Pembayaran Kasir",
          message:
            "Silakan tunjukkan nomor order ini ke kasir untuk melakukan pembayaran tunai.",
          color: "bg-blue-50",
          badge: "BAYAR DI KASIR",
        };
      }

      // Jika pilih Payment Gateway tapi belum bayar
      return {
        icon: <Clock className="w-16 h-16 text-yellow-500" />,
        title: "Menunggu Pembayaran Online",
        message:
          "Segera selesaikan pembayaran Anda. Pesanan akan diteruskan ke dapur setelah pembayaran diverifikasi.",
        color: "bg-yellow-50",
        badge: "PENDING",
      };
    }

    if (order.status === "FAILED") {
      return {
        icon: <AlertCircle className="w-16 h-16 text-red-500" />,
        title: "Pembayaran Gagal",
        message: "Waktu pembayaran telah habis atau transaksi ditolak.",
        instruction: "Silakan Membuat Pesanan Baru",
        color: "bg-red-50",
        badge: "GAGAL / EXPIRED",
      };
    }

    return {
      icon: <AlertCircle className="w-12 h-12 lg:w-16 lg:h-16 text-gray-500" />,
      title: "Status Tidak Diketahui",
      message:
        "Mohon tunggu sebentar, kami sedang mengecek status pesanan Anda... atau hubungi staf kami.",
      color: "bg-gray-50",
      badge: "PROCESSING",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center px-4 pt-20 pb-10 w-full">
        {/* Skeleton Icon */}
        <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gray-200 rounded-full animate-pulse mb-6" />

        <div className="flex flex-col items-center gap-3 mb-8 lg:mb-10">
          <div className="w-40 lg:w-48 h-6 lg:h-8 bg-gray-200 rounded-xl animate-pulse" />
          <div className="w-56 lg:w-64 h-3 lg:h-4 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Skeleton Receipt Card */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="bg-gray-100 h-20 lg:h-24 w-full animate-pulse" />
          <div className="p-6 lg:p-8 space-y-6">
            <div className="w-full h-12 bg-gray-50 rounded-2xl animate-pulse" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="w-24 h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="flex justify-between">
                <div className="w-32 h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
            <div className="border-t-2 border-dashed border-gray-100 py-4">
              <div className="flex justify-between">
                <div className="w-20 h-6 bg-gray-100 rounded animate-pulse" />
                <div className="w-24 h-6 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2">
          <Loader2 className="w-6 h-6 text-[#E9C46A] animate-spin" />
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.4em]">
            Sinkronisasi Pesanan...
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Pesanan tidak ditemukan
      </div>
    );
  }

  const content = getStatusContent();

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center px-4 pt-12 lg:pt-20 pb-10">
      {/* Ikon Animasi Berhasil */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className="mb-4 lg:mb-6"
      >
        <div className="bg-green-100 p-3 lg:p-4 rounded-full">
          {content.icon}
        </div>
      </motion.div>

      <div className="text-center mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight mb-2">
          {content.title}
        </h1>
        <p className="text-sm lg:text-base text-gray-500 font-medium px-4 lg:px-6">
          {content.message}
        </p>
      </div>

      {/* Card Struk Digital */}
      <motion.div
        ref={receiptRef}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
      >
        {/* Header Struk */}
        <div className="bg-gray-900 p-4 lg:p-6 text-center text-white">
          <p className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-1">
            Order ID
          </p>
          <h2 className="text-xl lg:text-2xl font-black tracking-widest">
            #{order.id}
          </h2>

          {order.tableNumber &&
            order.tableNumber !== "0" &&
            order.tableNumber !== "null" && (
              <p className="mt-2 text-xs font-bold tracking-widest text-[#E9C46A]">
                MEJA {order.tableNumber}
              </p>
            )}
        </div>

        <div className="p-5 lg:p-6">
          {/* Instruksi Pembayaran */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 mb-6 lg:mb-8 text-center">
            <p className="text-xs lg:text-sm text-yellow-800 font-bold leading-relaxed">
              {content.instruction}
            </p>
            <div className="mt-2 inline-block px-3 py-1 bg-white/50 rounded-full text-[9px] lg:text-[10px] font-black tracking-widest text-gray-500 border border-white">
              STATUS: {content.badge}
            </div>
          </div>

          {/* Ringkasan Pesanan */}
          <div className="space-y-4">
            <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
              Ringkasan Pesanan
            </h3>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm lg:text-base"
                >
                  <div>
                    <p className="font-bold">{item.menu.name}</p>
                    <p className="text-[10px] lg:text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">
                    Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>

            {/* Efek Garis Putus-putus Struk */}
            <div className="border-t-2 border-dashed border-gray-100 my-4 lg:my-6 relative">
              <div className="absolute -left-8 -top-2 w-4 h-4 bg-[#F8F9FA] rounded-full shadow-inner"></div>
              <div className="absolute -right-8 -top-2 w-4 h-4 bg-[#F8F9FA] rounded-full shadow-inner"></div>
            </div>

            <div className="flex justify-between text-lg lg:text-xl font-black">
              <span>Total</span>
              <span>Rp{order.totalPrice.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        {/* Footer Card */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition uppercase tracking-widest cursor-pointer"
          >
            <Printer size={14} />
            Simpan Struk (PNG)
          </button>
        </div>
      </motion.div>

      {/* Navigasi Bawah */}
      <div className="mt-10 flex flex-col items-center gap-6 w-full max-w-md">
        <Link
          href="/menu"
          className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-2xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm cursor-pointer"
        >
          <ChevronLeft size={18} />
          Kembali ke Menu
        </Link>

        <div className="flex flex-col items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="opacity-20 grayscale"
          />
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.4em]">
            Cafe House
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderReceivedPage;
