# Email System Configuration

## Overview
The application now has two separate email endpoints for different purposes:

---

## 1. General Contact Form Email
**Endpoint:** `POST /api/send-email`

**Used For:** General inquiries from the Contact page (`/contact`)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "ABC Corp",
  "message": "I have a question about...",
  "subject": "General Inquiry"
}
```

**Email Recipients:**
- Sends to: Admin/Owner email (specified in `OWNER_EMAIL` env variable)

**Email Content:**
- Subject: "General Inquiry from Website"
- Contains customer details and message
- Professional HTML template

**Frontend Usage:**
```javascript
// From /contact page
const response = await fetch('http://localhost:5000/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name, email, phone, company, message, subject
  })
});
```

---

## 2. Cart Invoice Email
**Endpoint:** `POST /api/send-invoice`

**Used For:** Order confirmation when customer places an order through cart

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "notes": "Please deliver before 5pm"
  },
  "items": [
    {
      "id": "4001",
      "name": "Product Name",
      "price": 29.99,
      "quantity": 2,
      "image": "/path/to/image.png"
    }
  ],
  "subtotal": 59.98,
  "total": 59.98,
  "orderDate": "2025-12-22T10:30:00.000Z",
  "paymentMethod": "credit-card"
}
```

**Email Recipients:**
- **Customer Email:** Order confirmation with invoice details
- **Admin Email:** New order notification

**Email Content:**

### Customer Email:
- Subject: `Order Confirmation - ORD-XXXXX`
- Beautiful HTML template with:
  - Order ID and date
  - Shipping information
  - Complete item list with images, quantities, prices
  - Subtotal and total in USD
  - Payment method selected
  - Next steps for payment

### Admin Email:
- Subject: `🔔 New Order Received - ORD-XXXXX - $XX.XX`
- Professional HTML template with:
  - Order summary
  - Customer contact details (clickable phone/email)
  - Complete item list
  - Payment method
  - Action checklist

**Frontend Usage:**
```javascript
// From /checkout page
const orderData = {
  customer: formData,
  items: cart,
  subtotal: getCartTotal(),
  total: getCartTotal(),
  orderDate: new Date().toISOString(),
  paymentMethod: formData.paymentMethod,
};

const response = await fetch('http://localhost:5000/api/send-invoice', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderData),
});
```

---

## Product Details Page Changes

### ❌ Removed Features:
- ~~Contact Supplier button~~ (completely removed)
- ~~ContactModal component import~~ (removed)
- ~~showContactModal state~~ (removed)
- ~~Product inquiry form~~ (removed)

### ✅ Remaining Features:
- Add to Cart button (with quantity selector)
- Product details display
- Technical specifications
- Recommended products

**Reason for Removal:** 
All customer inquiries should go through the dedicated Contact page (`/contact`), which provides a complete contact form. This centralizes all communication and provides better tracking.

---

## Environment Variables Required

```env
# Backend .env file
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-email-password
OWNER_EMAIL=admin@asianimportexport.com
PORT=5000
```

---

## Email Flow Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    Customer Actions                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
        ┌───────────────┐          ┌──────────────┐
        │ General       │          │ Place Order  │
        │ Inquiry       │          │ from Cart    │
        │ (/contact)    │          │ (/checkout)  │
        └───────┬───────┘          └──────┬───────┘
                │                         │
                ▼                         ▼
    ┌──────────────────────┐   ┌──────────────────────┐
    │ /api/send-email      │   │ /api/send-invoice    │
    └──────────┬───────────┘   └──────┬───────────────┘
               │                       │
               ▼                       ├──────────┬─────────┐
        ┌──────────┐                  ▼          ▼         ▼
        │  Admin   │           Customer    Admin    Order DB
        │  Email   │           Invoice     Alert    (Future)
        └──────────┘
```

---

## Testing Checklist

### General Contact Email:
- [ ] Navigate to /contact page
- [ ] Fill out contact form
- [ ] Submit form
- [ ] Verify admin receives email
- [ ] Check email formatting

### Cart Invoice Email:
- [ ] Add products to cart
- [ ] Go to checkout
- [ ] Fill customer information
- [ ] Select payment method
- [ ] Place order
- [ ] Verify customer receives invoice email
- [ ] Verify admin receives order notification
- [ ] Check both emails have correct formatting
- [ ] Verify order ID is generated
- [ ] Confirm all product details are included

---

## Future Enhancements

1. **Email Tracking**
   - Track email delivery status
   - Resend email option

2. **Order Database**
   - Store orders in database
   - Order history for customers
   - Admin dashboard for order management

3. **Email Templates**
   - Multiple language support
   - Customizable branding
   - PDF attachment for invoices

4. **Notifications**
   - SMS notifications
   - Real-time order updates
   - Shipping tracking emails
