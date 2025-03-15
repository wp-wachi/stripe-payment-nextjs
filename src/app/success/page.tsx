import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { JSX } from "react";

interface SuccessProps {
  searchParams: {
    sessionId: string;
  };
}

export default async function Success({
  searchParams,
}: SuccessProps): Promise<JSX.Element | void> {
  const { sessionId } = searchParams;

  if (!sessionId) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const { status, customer_details } = await stripe.checkout.sessions.retrieve(
    sessionId,
    {
      expand: ["line_items", "payment_intent"],
    }
  );

  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
        </p>
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </section>
    );
  }
}
