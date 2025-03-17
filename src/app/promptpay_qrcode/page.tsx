"use client";

import { Suspense } from "react";
import CheckoutForm from "@/components/checkout";
import { useSearchParams } from "next/navigation";

function PromptPayQrCodeContent() {
  const params = useSearchParams();
  const clientSecret = params?.get("client_secret");

  if (!clientSecret) {
    return <div>Error: Missing client secret</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <CheckoutForm clientSecret={clientSecret} />
    </div>
  );
}

export default function PromptPayQrCode() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PromptPayQrCodeContent />
    </Suspense>
  );
}
