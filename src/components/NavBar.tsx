"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { getCartSize } = useCart();

  return (
    <nav className="p-4 shadow-md bg-white flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">
        🛍️ My Store
      </Link>
      <Link href="/cart" className="relative">
        🛒 Cart
        {getCartSize() > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getCartSize()}
          </span>
        )}
      </Link>
    </nav>
  );
}
