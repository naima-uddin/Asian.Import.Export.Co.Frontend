import { Suspense } from "react";
import ProductCatalog from "@/components/DynamicProductCatalog/ProductCatalog";
import fs from "fs";
import path from "path";

// Helper function to get category data
async function getCategoryData(categorySlug) {
  try {
    const categoriesPath = path.join(
      process.cwd(),
      "public",
      "categories.json"
    );
    const categoriesData = fs.readFileSync(categoriesPath, "utf8");
    const categories = JSON.parse(categoriesData);

    const categoryName = decodeURIComponent(categorySlug).replace(/-/g, " ");

    const category = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    const subcategory = category
      ? null
      : categories
          .find((cat) =>
            cat.subcategories?.some(
              (sub) => sub.name.toLowerCase() === categoryName.toLowerCase()
            )
          )
          ?.subcategories?.find(
            (sub) => sub.name.toLowerCase() === categoryName.toLowerCase()
          );

    return { category, subcategory, categoryName };
  } catch (error) {
    console.error("Error loading category:", error);
    return { category: null, subcategory: null, categoryName: "" };
  }
}

// Generate metadata for category pages
export async function generateMetadata({ params }) {
  // Await params in Next.js 15+
  const resolvedParams = await Promise.resolve(params);
  const { category, subcategory, categoryName } = await getCategoryData(
    resolvedParams.category
  );

  const itemName = category?.name || subcategory?.name || categoryName;
  const icon = category?.icon || "";
  const productCount = category
    ? category.subcategories?.reduce(
        (acc, sub) => acc + (sub.products?.length || 0),
        0
      )
    : subcategory?.products?.length || 0;

  return {
    title: `${itemName} ${icon} | Browse Products | Asian Import Export`,
    description: `Explore ${productCount}+ ${itemName.toLowerCase()} products. Wholesale prices, international shipping, quality guaranteed. ${
      category ? "Multiple subcategories available." : "Direct factory prices."
    }`,
    keywords: [
      itemName,
      `${itemName} wholesale`,
      `${itemName} supplier`,
      `${itemName} exporter`,
      "import export",
      "international shipping",
      "bulk orders",
      "B2B trade",
    ],
    openGraph: {
      title: `${itemName} - Asian Import Export Co LTD`,
      description: `Browse ${productCount}+ ${itemName.toLowerCase()} products with competitive wholesale prices.`,
      url: `https://asianimportexport.com/products/c/${resolvedParams.category}`,
      siteName: "Asian Import Export Co LTD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${itemName} - Asian Import Export`,
      description: `Browse ${productCount}+ products with competitive prices`,
    },
    alternates: {
      canonical: `/products/c/${resolvedParams.category}`,
    },
  };
}

// This function is required for static export
export async function generateStaticParams() {
  try {
    const categoriesPath = path.join(
      process.cwd(),
      "public",
      "categories.json"
    );
    const categoriesData = fs.readFileSync(categoriesPath, "utf8");
    const categories = JSON.parse(categoriesData);

    // Helper function to convert name to URL slug
    const nameToSlug = (name) => {
      return name.replace(/\s+/g, "-");
    };

    const params = [];

    // Generate params for all categories and subcategories
    categories.forEach((category) => {
      params.push({
        category: nameToSlug(category.name),
      });

      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          params.push({
            category: nameToSlug(subcategory.name),
          });
        });
      }
    });

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default function ProductsCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading products...
        </div>
      }
    >
      <ProductCatalog />
    </Suspense>
  );
}
