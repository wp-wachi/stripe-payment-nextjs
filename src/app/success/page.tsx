import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { JSX } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessProps {
  searchParams: Promise<{ session_id: string | null }>;
}

export default async function Success({
  searchParams,
}: SuccessProps): Promise<JSX.Element | void> {
  const { session_id } = await searchParams;

  if (!session_id) {
    // throw new Error("Please provide a valid session_id (`cs_test_...`)");
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CheckCircle className="w-24 h-24 text-green-500" />
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Order is completed
        </h1>
      </div>
    );
  }

  const { status } = await stripe.checkout.sessions.retrieve(session_id);

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CheckCircle className="w-24 h-24 text-green-500" />
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Order is completed
        </h1>
      </div>
    );
  }
}
