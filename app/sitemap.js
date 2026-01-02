import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://asianimportexport.com";

  // Read categories data
  const categoriesPath = path.join(process.cwd(), "public", "categories.json");
  const categoriesData = fs.readFileSync(categoriesPath, "utf8");
  const categories = JSON.parse(categoriesData);

  // Helper function to convert name to URL slug
  const nameToSlug = (name) => {
    return name.replace(/\s+/g, "-");
  };

  const currentDate = new Date();

  // Static pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aboutUs`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Add all product pages
  categories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        if (subcategory.products) {
          subcategory.products.forEach((product) => {
            routes.push({
              url: `${baseUrl}/product/${product.id}`,
              lastModified: currentDate,
              changeFrequency: "weekly",
              priority: 0.8,
            });
          });
        }
      });
    }
  });

  // Add category and subcategory pages
  categories.forEach((category) => {
    const categorySlug = nameToSlug(category.name);
    routes.push({
      url: `${baseUrl}/products/c/${categorySlug}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.7,
    });

    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        const subcategorySlug = nameToSlug(subcategory.name);
        routes.push({
          url: `${baseUrl}/products/c/${subcategorySlug}`,
          lastModified: currentDate,
          changeFrequency: "daily",
          priority: 0.6,
        });
      });
    }
  });

  return routes;
}
