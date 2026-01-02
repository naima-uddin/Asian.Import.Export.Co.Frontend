# SEO Implementation Guide

## Overview

Comprehensive SEO has been implemented across all pages of the Asian Import Export Co LTD website, including both static and dynamic pages.

## What's Been Implemented

### 1. **Root Layout SEO** (app/layout.js)

- ✅ Complete metadata configuration with title templates
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card tags
- ✅ Robots meta tags with specific Google Bot instructions
- ✅ Verification tags (Google, Bing, Yandex placeholders)
- ✅ Organization JSON-LD structured data
- ✅ Website JSON-LD structured data with search functionality

### 2. **Home Page SEO** (app/page.js)

- ✅ Optimized title and description
- ✅ Extended keywords list
- ✅ Open Graph and Twitter metadata
- ✅ FAQ JSON-LD structured data for rich snippets
- ✅ Canonical URL

### 3. **Product Pages** (app/product/[id]/page.jsx)

- ✅ Dynamic metadata generation based on product data
- ✅ Product-specific titles, descriptions, and keywords
- ✅ Product JSON-LD structured data (Schema.org Product type)
- ✅ Breadcrumb JSON-LD structured data
- ✅ Dynamic Open Graph images using product images
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ Robots meta tags

### 4. **Category Pages** (app/products/c/[category]/page.jsx)

- ✅ Dynamic metadata based on category/subcategory
- ✅ Product count in descriptions
- ✅ Category-specific keywords
- ✅ Open Graph and Twitter metadata
- ✅ Canonical URLs

### 5. **All Products Page** (app/products/page.jsx)

- ✅ Comprehensive metadata
- ✅ Full keyword coverage
- ✅ Social media tags

### 6. **Subcategory Pages** (app/products/c/[category]/[subcategory]/page.jsx)

- ✅ Client-side dynamic metadata using ClientSideMetadata component
- ✅ Automatic title and description updates
- ✅ Canonical URL management
- ✅ Open Graph tag updates

### 7. **Static Pages**

All static pages have proper metadata:

- ✅ About Us (app/aboutUs/page.jsx)
- ✅ Contact (app/contact/page.jsx)
- ✅ Shipping & Delivery (app/shipping/page.jsx)
- ✅ Privacy Policy (app/privacy/page.jsx)
- ✅ Affiliate Disclosure (app/affiliate-disclosure/page.js)
- ✅ Checkout (app/checkout/page.jsx) - noindex for security

### 8. **Dynamic Sitemap** (app/sitemap.js)

- ✅ Next.js 13+ App Router sitemap
- ✅ Automatically includes all products
- ✅ Automatically includes all categories and subcategories
- ✅ Proper priority and change frequency settings
- ✅ Reads from categories.json for dynamic content

### 9. **Robots.txt** (app/robots.js)

- ✅ Next.js 13+ App Router robots.txt
- ✅ Allows all search engines
- ✅ Blocks checkout and order success pages
- ✅ Links to sitemap.xml

### 10. **Structured Data Library** (src/lib/structuredData.js)

Comprehensive JSON-LD generators for:

- ✅ Organization schema
- ✅ Website schema with search action
- ✅ Product schema with offers, ratings, and properties
- ✅ Breadcrumb schema
- ✅ CollectionPage schema
- ✅ ItemList schema
- ✅ FAQ schema

### 11. **Client-Side Metadata Component** (src/components/shared/ClientSideMetadata.jsx)

- ✅ Handles dynamic metadata for client components
- ✅ Updates document title
- ✅ Updates meta descriptions
- ✅ Updates canonical URLs
- ✅ Updates Open Graph tags

## How to Use

### Update Your Domain

Replace `https://asianimportexport.com` with your actual domain in:

1. app/layout.js - metadataBase
2. src/lib/structuredData.js - all schema URLs
3. app/sitemap.js - baseUrl
4. app/robots.js - baseUrl
5. src/components/shared/ClientSideMetadata.jsx - canonical URLs

### Add Google Search Console Verification

In `app/layout.js`, replace:

```javascript
google: "your-google-verification-code";
```

with your actual Google Search Console verification code.

### Add Open Graph Image

Create an image at `public/og-image.jpg` with dimensions 1200x630px for social media sharing.

## SEO Best Practices Implemented

### Technical SEO

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Meta descriptions (150-160 characters)
- ✅ Canonical URLs to prevent duplicate content
- ✅ Mobile-responsive design
- ✅ Fast loading times with Next.js optimization
- ✅ XML sitemap
- ✅ Robots.txt configuration

### On-Page SEO

- ✅ Unique titles for every page
- ✅ Descriptive meta descriptions
- ✅ Keyword optimization
- ✅ Internal linking structure
- ✅ Image alt attributes
- ✅ Clean URL structure

### Structured Data (Schema.org)

- ✅ Organization markup
- ✅ Website markup with site search
- ✅ Product markup with pricing
- ✅ Breadcrumb navigation
- ✅ FAQ markup for rich snippets
- ✅ Aggregate ratings and reviews

### Social Media Optimization

- ✅ Open Graph tags for Facebook, LinkedIn
- ✅ Twitter Card tags
- ✅ Social media images
- ✅ Proper titles and descriptions

## Testing Your SEO

### 1. Google Rich Results Test

URL: https://search.google.com/test/rich-results

- Test product pages for Product schema
- Test home page for Organization and FAQ schema

### 2. Google Search Console

- Submit your sitemap: https://asianimportexport.com/sitemap.xml
- Monitor indexing status
- Check for crawl errors
- View search performance

### 3. Open Graph Debugger

Facebook: https://developers.facebook.com/tools/debug/
Twitter: https://cards-dev.twitter.com/validator

### 4. Page Speed Insights

URL: https://pagespeed.web.dev/

- Test Core Web Vitals
- Monitor performance scores

### 5. Mobile-Friendly Test

URL: https://search.google.com/test/mobile-friendly

## Generating Sitemap

The sitemap is automatically generated at build time using Next.js App Router conventions. To manually generate, run:

```bash
npm run build
```

The sitemap will be available at `/sitemap.xml`

## Monitoring and Maintenance

### Weekly Tasks

- Check Google Search Console for errors
- Monitor indexing status
- Review search queries and rankings

### Monthly Tasks

- Update meta descriptions if needed
- Add new keywords based on search trends
- Review and update structured data
- Check for broken links

### Quarterly Tasks

- Comprehensive SEO audit
- Competitor analysis
- Update content strategy
- Review and optimize underperforming pages

## Additional Recommendations

### 1. Content Optimization

- Write detailed product descriptions (300+ words for important products)
- Create category landing pages with unique content
- Add blog section for content marketing
- Include customer testimonials and reviews

### 2. Link Building

- Submit to relevant directories
- Partner with industry websites
- Create shareable content
- Guest posting opportunities

### 3. Local SEO (if applicable)

- Create Google Business Profile
- Add local business schema
- Get customer reviews
- Local directory listings

### 4. Performance Optimization

- Optimize images (WebP format, lazy loading)
- Enable caching
- Use CDN for static assets
- Minimize JavaScript and CSS

### 5. Analytics Setup

- Install Google Analytics 4
- Set up conversion tracking
- Monitor user behavior
- Track e-commerce events

## Common SEO Issues and Solutions

### Issue: Pages not indexed

**Solution**:

- Submit sitemap to Google Search Console
- Check robots.txt doesn't block important pages
- Ensure pages have proper metadata
- Create internal links to new pages

### Issue: Low rankings

**Solution**:

- Improve content quality and length
- Optimize for target keywords
- Build quality backlinks
- Improve page speed and Core Web Vitals

### Issue: Duplicate content

**Solution**:

- Use canonical tags (already implemented)
- Ensure unique meta descriptions
- Avoid thin content
- Use 301 redirects for moved pages

## Support and Resources

### Documentation

- Next.js SEO: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Schema.org: https://schema.org/
- Google Search Central: https://developers.google.com/search

### Tools

- Google Search Console
- Google Analytics
- Screaming Frog SEO Spider
- Ahrefs or SEMrush for keyword research

---

**Last Updated**: December 31, 2025
**Implemented By**: GitHub Copilot
**Status**: ✅ Complete and Production Ready
