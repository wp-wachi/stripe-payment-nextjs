"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [customerName, setCustomerName] = useState("Wachirapong Prasertwong");
  const [email, setEmail] = useState("oriounited@gmail.com");
  const [address, setAddress] = useState("261/594");
  const [checkoutMethod, setCheckoutMethod] = useState("normal");
  const router = useRouter();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  );

  // Handle checkout (for now, just log details)
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const lineItems = cart.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ line_items: lineItems }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to the Stripe checkout page
      } else {
        console.error("Error:", data.error);
        alert("Checkout failed: " + data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error);
        alert("Checkout failed: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        alert("Checkout failed due to an unexpected error.");
      }
    }
  };

  const handleCheckoutDirectApi = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPaymentIntent(totalPrice * 100);
  };

  const createPaymentIntent = async (amount: number) => {
    try {
      const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      if (!backendBaseUrl) {
        throw new Error("Backend base URL is not set");
      }

      const response = await fetch(`${backendBaseUrl}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (data.data.client_secret) {
        router.push(
          `/promptpay_qrcode?client_secret=${data.data.client_secret}`
        );
      } else {
        console.error("Error:", data.error);
        alert("Checkout failed: " + data.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error);
        alert("Checkout failed: " + error.message);
      } else {
        console.error("Unexpected error:", error);
        alert("Checkout failed due to an unexpected error.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (checkoutMethod === "normal") {
      handleCheckout(e);
    } else {
      handleCheckoutDirectApi(e);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-5">🛒 Checkout</h1>

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Cart Summary */}
          <div className="border rounded-md p-4 shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-3">🛍️ Order Summary</h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b pb-3 mb-3"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="rounded"
                />
                <div className="ml-3">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-red-500 font-semibold">
                    ฿{item.price} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}

            <h2 className="text-xl font-semibold">Total: ฿{totalPrice}</h2>
          </div>

          {/* Right: Checkout Form */}
          <div className="border rounded-md p-4 shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-3">📝 Customer Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Shipping Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                ></textarea>
              </div>

              {/* Checkout Method */}
              <div>
                <label className="block text-sm font-medium">
                  Checkout Method
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="checkoutMethod"
                      value="normal"
                      checked={checkoutMethod === "normal"}
                      onChange={(e) => setCheckoutMethod(e.target.value)}
                      className="mr-2"
                    />
                    Normal Checkout
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="checkoutMethod"
                      value="directApi"
                      checked={checkoutMethod === "directApi"}
                      onChange={(e) => setCheckoutMethod(e.target.value)}
                      className="mr-2"
                    />
                    Direct API Checkout
                  </label>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm & Pay
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
