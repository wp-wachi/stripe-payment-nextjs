// import { useEffect, useState } from "react";
"use client";

import CheckoutForm from "@/components/checkout";
import { useSearchParams } from "next/navigation";

export default function PromptPayQrCode() {
  //   const [qrCode, setQrCode] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchQrCode = async () => {
  //       const response = await fetch("/api/promptpay_qrcode", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ clientSecret }),
  //       });

  //       if (response.ok) {
  //         const { qrCode } = await response.json();
  //         setQrCode(qrCode);
  //       }
  //     };

  //     fetchQrCode();
  //   }, [clientSecret]);

  const params = useSearchParams();
  const clientSecret = params!.get("client_secret")!;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* <Elements stripe={stripePromise} options={options}>
        <form>
          <PaymentElement />
          <button>Submit</button>
        </form>
      </Elements> */}

      <CheckoutForm clientSecret={clientSecret} />
    </div>
  );
}
