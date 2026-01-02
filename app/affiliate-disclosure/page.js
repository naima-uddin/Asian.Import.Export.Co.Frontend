import AmazonAffiliateAdvertiserDisclosure from "@/components/Footer/AmazonAffiliateAdvertiserDisclosure";
import React from "react";

export const metadata = {
  title: "Affiliate Disclosure | Asian Import Export Co LTD",
  description:
    "Asian Import Export Co LTD affiliate disclosure and advertiser information. Learn about our partnerships and how we maintain transparency with our customers.",
  keywords: [
    "affiliate disclosure",
    "advertiser disclosure",
    "transparency",
    "partnerships",
  ],
  openGraph: {
    title: "Affiliate Disclosure - Asian Import Export Co LTD",
    description: "Our affiliate disclosure and advertiser information",
    url: "https://asianimportexport.com/affiliate-disclosure",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/affiliate-disclosure",
  },
};

export default function page() {
  return (
    <>
      <AmazonAffiliateAdvertiserDisclosure />
    </>
  );
}
