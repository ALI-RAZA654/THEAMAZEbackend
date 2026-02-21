# THE AMAZE - Complete API Documentation
## Base URL: `http://localhost:5000`

---

## 🚀 HOW TO USE POSTMAN COLLECTION
1. Postman open karo
2. **Import** button dabao (top left)
3. File `THE-AMAZE-API.postman_collection.json` select karo
4. Collection import ho jayegi
5. **Pehle "Register" phir "Login"** karo, token milega
6. Token ko `TOKEN` variable mein paste karo

---

## 🔐 AUTH APIs

### 1. Register User
- **Method:** `POST`
- **URL:** `/api/auth/register`
- **Body (JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@theamaze.fashion",
  "password": "admin123",
  "isAdmin": true
}
```

### 2. Login
- **Method:** `POST`
- **URL:** `/api/auth/login`
- **Body (JSON):**
```json
{
  "email": "admin@theamaze.fashion",
  "password": "admin123"
}
```
- **Response:** User object + JWT Token ← **YE TOKEN COPY KARO!**

### 3. Logout (New)
- **Method:** `POST`
- **URL:** `/api/auth/logout`

### 4. Verify Token (New)
- **Method:** `GET`
- **URL:** `/api/auth/verify`
- **Auth Required:** ✅ User/Admin Token

---

## 🛍️ PRODUCT APIs

### 5. Get All Products
- **Method:** `GET`
- **URL:** `/api/products`

### 6. Get Single Product
- **Method:** `GET`
- **URL:** `/api/products/:id`

### 7. Create Product
- **Method:** `POST`
- **URL:** `/api/products`
- **Auth Required:** ✅ Admin Token
- **Body (JSON):**
```json
{
  "name": "Luxury Silk Dress",
  "category": "Dresses",
  "description": "A stunning luxury silk dress.",
  "price": 25000,
  "salePrice": 20000,
  "stock": 50,
  "featured": true,
  "mainImage": "https://via.placeholder.com/500",
  "hoverImage": "https://via.placeholder.com/500",
  "variants": [
    { "colorName": "Black", "image": "https://via.placeholder.com/500" },
    { "colorName": "Gold", "image": "https://via.placeholder.com/500" }
  ],
  "gallery": [
    "https://via.placeholder.com/500"
  ]
}
```

### 8. Update Product
- **Method:** `PUT`
- **URL:** `/api/products/:id`
- **Auth Required:** ✅ Admin Token

### 9. Delete Product
- **Method:** `DELETE`
- **URL:** `/api/products/:id`
- **Auth Required:** ✅ Admin Token

### 10. Quick Updates (New)
- **Update Stock:** `PATCH /api/products/:id/stock` (Body: `{ "stock": 100 }`)
- **Toggle Featured:** `PATCH /api/products/:id/featured`
- **Toggle Flash Sale:** `PATCH /api/products/:id/flash-sale`
- **Auth Required:** ✅ Admin Token

### 11. Product Filters (New)
- **Get by Category:** `GET /api/products/category/:category`
- **Get Featured:** `GET /api/products/featured`

---

## 📦 ORDER APIs

### 12. Get All Orders (Admin)
- **Method:** `GET`
- **URL:** `/api/admin/orders` (or `/api/orders`)
- **Auth Required:** ✅ Admin Token

### 13. Get Order Stats (New)
- **Method:** `GET`
- **URL:** `/api/admin/orders/stats`
- **Auth Required:** ✅ Admin Token

### 14. Get Order Revenue (New)
- **Method:** `GET`
- **URL:** `/api/admin/orders/revenue`
- **Auth Required:** ✅ Admin Token

### 15. Create Order
- **Method:** `POST`
- **URL:** `/api/orders`
- **Auth Required:** ✅ User Token
- **Body (JSON):**
```json
{
  "orderItems": [
    {
      "name": "Luxury Silk Dress",
      "qty": 1,
      "image": "https://via.placeholder.com/500",
      "price": 25000,
      "selectedColor": "Black",
      "product": "PRODUCT_ID_HERE"
    }
  ],
  "shippingAddress": {
    "fullName": "Ali Raza",
    "address": "123 Street, Lahore",
    "city": "Lahore",
    "postalCode": "54000",
    "country": "Pakistan",
    "phone": "03001234567"
  },
  "paymentMethod": "Cash on Delivery",
  "totalAmount": 25000
}
```

### 16. Update Order Status
- **Method:** `PUT`
- **URL:** `/api/orders/:id/status`
- **Auth Required:** ✅ Admin Token
- **Body:** `{ "status": "Confirmed" }`

---

## ⚡ FLASH SALE APIs

### 17. Get Flash Sale
- **Method:** `GET`
- **URL:** `/api/flash-sale`

### 18. Create/Update Flash Sale
- **Method:** `POST` / `PUT`
- **URL:** `/api/flash-sale`
- **Auth Required:** ✅ Admin Token
- **Body (JSON):**
```json
{
  "active": true,
  "discountPercentage": 30,
  "endTime": "2026-12-31T23:59:59.000Z",
  "bannerText": "Mega Flash Sale - 30% OFF Everything!"
}
```

### 19. Toggle Flash Sale (New)
- **Method:** `PATCH`
- **URL:** `/api/flash-sale/toggle`
- **Auth Required:** ✅ Admin Token

---

## 📊 DASHBOARD APIs

### 20. Dashboard Overview (Updated)
- **Method:** `GET`
- **URL:** `/api/dashboard/overview`
- **Auth Required:** ✅ Admin Token
- **Response:** Orders count, revenue, chart data, recent orders.

### 21. Low Stock Products (New)
- **Method:** `GET`
- **URL:** `/api/dashboard/low-stock`
- **Auth Required:** ✅ Admin Token

---

## 🦸 HERO APIs

### 22. Get/Update Hero
- **Get:** `GET /api/hero`
- **Update:** `POST /api/hero` (Admin)
- **Body:** `{ "title": "New", "subtitle": "...", "image": "..." }`

### 23. Toggle Spotlight (New)
- **Method:** `PATCH`
- **URL:** `/api/hero/toggle-spotlight`
- **Auth Required:** ✅ Admin Token

---

## 🏆 TRUST STATS APIs

### 24. Get/Update Trust Stats
- **Get:** `GET /api/trust`
- **Update:** `PUT /api/trust` (Admin)

### 25. Update Icon (New)
- **Method:** `PATCH`
- **URL:** `/api/trust/icon`
- **Body:** `{ "id": "STAT_ID", "icon": "new-icon-name" }`
- **Auth Required:** ✅ Admin Token

---

## 📩 CONTACT APIs

### 26. Send/Get Messages
- **Send:** `POST /api/contact`
- **Get All:** `GET /api/contact` (Admin)

### 27. Contact Subjects (New)
- **Get Subjects:** `GET /api/contact/subjects`
- **Add Subject:** `POST /api/contact/subjects` (Admin)
- **Body:** `{ "name": "Order Inquiry" }`

---

## ⭐ REVIEW APIs

### 28. Get/Create/Update Reviews
- **Get:** `GET /api/reviews`
- **Create:** `POST /api/reviews`
- **Approve/Reject:** `PUT /api/reviews/:id` (Admin)
- **Delete:** `DELETE /api/reviews/:id` (Admin)

### 29. Toggle Global Reviews (New)
- **Method:** `PATCH`
- **URL:** `/api/reviews/toggle`
- **Auth Required:** ✅ Admin Token

---

## 💳 PAYMENT SETTINGS APIs

### 30. Get/Update Payment Methods
- **Get:** `GET /api/payment/settings`
- **Update:** `PUT /api/payment/settings` (Admin)

### 31. Toggle Cash on Delivery (New)
- **Method:** `PATCH`
- **URL:** `/api/payment/cod-toggle`
- **Auth Required:** ✅ Admin Token

---

## 🎟️ PROMO CODE APIs

### 32. Promo Code Operations
- **Validate:** `POST /api/promo/validate`
- **Get All:** `GET /api/promo` (Admin)
- **Create:** `POST /api/promo` (Admin)
- **Update Marquee:** `PUT /api/promo` (Admin)
- **Delete:** `DELETE /api/promo/:id` (Admin)

### 33. Toggle Promo Marquee (New)
- **Method:** `PATCH`
- **URL:** `/api/promo/toggle`
- **Auth Required:** ✅ Admin Token

---

## � IMAGE UPLOAD API (New)

### 34. Upload Image
- **Method:** `POST`
- **URL:** `/api/upload`
- **Type:** `form-data`
- **Key:** `image` (Select File)
- **Response:** `{ "path": "/uploads/filename.jpg" }`

---

## ⚠️ IMPORTANT NOTES

- **Token** login ke baad milta hai. Usse `Authorization: Bearer TOKEN` header mein dalo.
- **Admin only** routes ke liye `isAdmin: true` wala user chahiye.
- **`PRODUCT_ID_HERE`** ki jagah real MongoDB `_id` dalo jo product create hone ke baad milta hai.
- **Server Restart:** Agar naya route kaam na kare, toh terminal mein `CTRL+C` daba kar wapis `npm run dev` chalayein.
