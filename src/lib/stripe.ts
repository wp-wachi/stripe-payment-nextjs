import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Fetch products and their prices from Stripe
export async function getStripeProducts() {
  try {
    // Fetch all products from Stripe
    const products = await stripe.products.list();

    // Fetch prices for each product
    const prices = await stripe.prices.list();

    // Map prices to their respective products
    const productsWithPrices = products.data.map((product) => {
      const price = prices.data.find((price) => price.product === product.id);

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0] || "/placeholder.png",
        priceId: product.default_price,
        price:
          price && price.unit_amount !== null ? price.unit_amount / 100 : null,
        currency: price ? price.currency.toUpperCase() : "N/A",
      };
    });

    return productsWithPrices;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function retrieve(clientSecret: string) {
  // const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
  // const resp = await stripe.paymentIntents.retrieve(id: pk, {
  //   client_secret: clientSecret,
  // });
  const resp = await stripe.paymentIntents.retrieve(clientSecret);
  console.log(resp);
}
