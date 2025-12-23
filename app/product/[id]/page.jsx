import ProductDetailsContent from "@/components/DynamicProductCatalog/ProductDetails";
import { Suspense } from "react";

// Force dynamic rendering - no static generation or caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const dynamicParams = true;

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="loading loading-spinner loading-lg"></div></div>}>
      <ProductDetailsContent key={params.id} />
    </Suspense>
  );
}
