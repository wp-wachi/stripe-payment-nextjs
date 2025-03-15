import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["files.stripe.com"], // Allow external Stripe images
  },
};

export default nextConfig;
