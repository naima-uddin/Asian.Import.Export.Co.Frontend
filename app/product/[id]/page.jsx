import ProductDetailsContent from "@/components/DynamicProductCatalog/ProductDetails";
import { Suspense } from "react";
import fs from "fs";
import path from "path";

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    const categoriesPath = path.join(
      process.cwd(),
      "public",
      "categories.json"
    );
    const categoriesData = fs.readFileSync(categoriesPath, "utf8");
    const categories = JSON.parse(categoriesData);

    const productIds = [];

    for (const category of categories) {
      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          if (subcategory.products) {
            subcategory.products.forEach((product) => {
              productIds.push({ id: product.id.toString() });
            });
          }
        }
      }
    }

    return productIds;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Helper function to get product data
async function getProductData(id) {
  try {
    const categoriesPath = path.join(
      process.cwd(),
      "public",
      "categories.json"
    );
    const categoriesData = fs.readFileSync(categoriesPath, "utf8");
    const categories = JSON.parse(categoriesData);

    let productData = null;
    let categoryName = "";
    let subcategoryName = "";

    for (const category of categories) {
      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          if (subcategory.products) {
            const product = subcategory.products.find(
              (p) => p.id === parseInt(id)
            );
            if (product) {
              productData = product;
              categoryName = category.name;
              subcategoryName = subcategory.name;
              break;
            }
          }
        }
      }
      if (productData) break;
    }

    return {
      product: productData,
      category: categoryName,
      subcategory: subcategoryName,
    };
  } catch (error) {
    console.error("Error loading product:", error);
    return { product: null, category: "", subcategory: "" };
  }
}

// Generate metadata for the product page
export async function generateMetadata({ params }) {
  // Await params in Next.js 15+
  const resolvedParams = await Promise.resolve(params);
  const { product, category, subcategory } = await getProductData(
    resolvedParams.id
  );

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const price = product.offerPrice || product.price || "";
  const brand = product.keyAttributes?.Brand || "Asian Import Export";
  const description =
    product.description ||
    `Buy ${product.name} at competitive prices. ${brand} product available for wholesale and international shipping.`;

  return {
    title: `${product.name} | ${brand} | Asian Import Export`,
    description: description.substring(0, 160),
    keywords: [
      product.name,
      brand,
      category,
      subcategory,
      "wholesale",
      "import export",
      "international shipping",
      ...(product.keyAttributes?.Size ? [product.keyAttributes.Size] : []),
      ...(product.keyAttributes?.Pattern
        ? [product.keyAttributes.Pattern]
        : []),
    ],
    openGraph: {
      title: `${product.name} - ${brand}`,
      description: description.substring(0, 160),
      url: `https://asianimportexport.com/product/${product.id}`,
      siteName: "Asian Import Export Co LTD",
      images: [
        {
          url: product.image || "/og-image.jpg",
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ${brand}`,
      description: description.substring(0, 160),
      images: [product.image || "/og-image.jpg"],
    },
    alternates: {
      canonical: `/product/${product.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}
