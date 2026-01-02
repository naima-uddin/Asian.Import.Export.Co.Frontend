import CheckoutPage from "@/PageComponents/CheckoutPage";

export const metadata = {
  title: "Checkout | Complete Your Order | Asian Import Export",
  description:
    "Complete your order securely with Asian Import Export Co LTD. Multiple payment options, flexible terms, and worldwide shipping available.",
  keywords: [
    "checkout",
    "order",
    "payment",
    "secure checkout",
    "international shipping",
  ],
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/checkout",
  },
};

export default function Checkout() {
  return <CheckoutPage />;
}
