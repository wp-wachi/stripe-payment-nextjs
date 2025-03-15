"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  imageUrl: string;
  title: string;
  price?: number;
}

export default function ProductCard({
  id,
  imageUrl,
  title,
  price,
}: ProductCardProps) {
  const { addToCart } = useCart();
  return (
    <div className="border rounded-md shadow-sm bg-white">
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={300}
        layout="responsive"
      />
      <div className="p-4">
        {/* Product Title with line clamping */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-3">
          {title}
        </h3>

        {/* Product Price */}
        <p className="text-red-500 font-semibold">฿{price}</p>
        <button
          type="button"
          onClick={() =>
            addToCart({
              id,
              name: title,
              imageUrl,
              price: price ?? 0,
              quantity: 1,
            })
          }
          disabled={price == null}
          className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
