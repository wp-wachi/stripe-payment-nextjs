import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

interface StripeError extends Error {
  statusCode?: number;
}

// Handle preflight requests
export async function OPTIONS(): Promise<NextResponse> {
  const headersList = await headers();
  const origin = headersList.get("origin") || "*";

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// Handle checkout session creation
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "*";

    const body = await request.json();
    const { line_items } = body;

    if (!line_items || !Array.isArray(line_items)) {
      return new NextResponse(JSON.stringify({ error: "Invalid line items" }), {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return new NextResponse(
      JSON.stringify({ url: session.url }), // Return URL instead of redirecting
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (err) {
    const error = err as StripeError;
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: error.statusCode || 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}
