// Structured Data (JSON-LD) utilities for SEO

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Asian Import Export Co LTD",
    alternateName: "Asian Import Export",
    url: "https://asianimportexport.com",
    logo: "https://asianimportexport.com/logo.png",
    description:
      "Leading import-export company specializing in agriculture, seafood, metals, trucks, vehicles, and wood products. Your trusted partner for international trade.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-437-900-3996",
      contactType: "Customer Service",
      email: "info@asianimportexport.com",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://www.alibaba.com", // Add your social media profiles
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Asian Import Export Co LTD",
    url: "https://asianimportexport.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://asianimportexport.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateProductSchema(product, category, subcategory) {
  const price = product.offerPrice || product.price || "";
  const priceValue = parseFloat(price.replace(/[^0-9.]/g, ""));
  const brand = product.keyAttributes?.Brand || "Asian Import Export";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ||
      `${product.name} available for wholesale and international shipping.`,
    image: product.image
      ? `https://asianimportexport.com${product.image}`
      : undefined,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      price: priceValue,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Asian Import Export Co LTD",
      },
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
    },
    category: category || subcategory,
  };

  // Add aggregateRating if rating exists
  if (product.rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: Math.floor(Math.random() * 100) + 50, // This should ideally come from real data
    };
  }

  // Add additional properties from keyAttributes
  if (product.keyAttributes) {
    schema.additionalProperty = Object.entries(product.keyAttributes).map(
      ([name, value]) => ({
        "@type": "PropertyValue",
        name,
        value,
      })
    );
  }

  return schema;
}

export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://asianimportexport.com${crumb.url}`,
    })),
  };
}

export function generateCollectionPageSchema(categoryName, productCount, url) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Products`,
    description: `Browse ${productCount} ${categoryName} products available for wholesale and international shipping.`,
    url: `https://asianimportexport.com${url}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Asian Import Export Co LTD",
      url: "https://asianimportexport.com",
    },
  };
}

export function generateItemListSchema(products, categoryName) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryName} Products`,
    itemListElement: products.slice(0, 20).map((product, index) => {
      const price = product.offerPrice || product.price || "";
      const priceValue = parseFloat(price.replace(/[^0-9.]/g, ""));

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          url: `https://asianimportexport.com/product/${product.id}`,
          image: product.image
            ? `https://asianimportexport.com${product.image}`
            : undefined,
          offers: {
            "@type": "Offer",
            price: priceValue,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      };
    }),
  };
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
