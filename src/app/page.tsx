import ProductCard from "@/components/ProductCard";
import { getStripeProducts } from "@/lib/stripe";

export default async function IndexPage() {
  const products = await getStripeProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageUrl={product.image}
          title={product.name}
          price={product.price}
          priceId={product.priceId?.toString() ?? null}
        />
      ))}
    </div>
  );
}
