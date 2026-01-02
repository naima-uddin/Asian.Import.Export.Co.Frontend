import SubcategoryPageClient from "./SubcategoryPageClient";
import fs from "fs";
import path from "path";

// Generate static params for all category/subcategory combinations
export async function generateStaticParams() {
  const categoriesPath = path.join(process.cwd(), "public", "categories.json");
  const categoriesData = fs.readFileSync(categoriesPath, "utf8");
  const categories = JSON.parse(categoriesData);

  const nameToSlug = (name) => name.replace(/\s+/g, "-");

  const params = [];

  categories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        params.push({
          category: nameToSlug(category.name),
          subcategory: nameToSlug(subcategory.name),
        });
      });
    }
  });

  return params;
}

export default function SubcategoryPage() {
  return <SubcategoryPageClient />;
}
