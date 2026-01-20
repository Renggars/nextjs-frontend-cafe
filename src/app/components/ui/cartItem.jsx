import Image from "next/image";
import { X } from "lucide-react";
import useCartStore from "@/app/store/useCartStore";

const BASE_URL = "http://localhost:4001";

const CartItem = ({ item }) => {
  const { decrementQuantity, incrementQuantity, removeFromCart } =
    useCartStore();

  return (
    <div className="flex items-center space-x-6 bg-white rounded-xl shadow p-3 relative">
      <div className="relative w-20 h-20 shrink-0">
        <Image
          src={`${BASE_URL}${item.imageUrl}`}
          alt={item.name}
          width={100}
          height={100}
          className="object-cover rounded-lg"
          unoptimized
        />
        <button
          onClick={() => removeFromCart(item.id)}
          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">
          Rp{(item.price * item.quantity).toLocaleString("id-ID")}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => decrementQuantity(item.id)}
            className="w-7 h-7 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            −
          </button>

          <span className="font-medium w-4 text-center">{item.quantity}</span>

          <button
            onClick={() => incrementQuantity(item.id)}
            className="w-7 h-7 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
