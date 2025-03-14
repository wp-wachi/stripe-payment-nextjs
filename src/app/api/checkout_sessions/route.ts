import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

interface StripeError extends Error {
  statusCode?: number;
}

export async function POST(): Promise<NextResponse> {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    if (!origin) {
      throw new Error("Origin header is missing");
    }

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1R2N0407WKnICzqtzQF4Z8LS",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (err) {
    const error = err as StripeError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
