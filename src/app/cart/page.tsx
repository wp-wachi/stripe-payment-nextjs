"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-5">🛒 Your Shopping Cart</h1>

      {/* If cart is empty */}
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link
            href="/"
            className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border rounded-md p-4 shadow-sm bg-white"
              >
                {/* Product Image */}
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="rounded"
                />

                {/* Product Details */}
                <h3 className="text-sm font-medium mt-2">{item.name}</h3>
                <p className="text-red-500 font-semibold">
                  ฿{item.price} x {item.quantity}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 w-full"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary Section */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold">Total: ฿{totalPrice}</h2>
            <Link href="/checkout">
              <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
