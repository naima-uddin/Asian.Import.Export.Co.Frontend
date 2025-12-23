import ProductDetailsContent from "@/components/DynamicProductCatalog/ProductDetails";
import { Suspense } from "react";

// Force dynamic rendering - no static generation or caching
export const revalidate = 0;

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="loading loading-spinner loading-lg"></div></div>}>
      <ProductDetailsContent  />
    </Suspense>
  );
}
