<h1>
  <img src="public/img/logo-green-small.png" alt="Tournado Logo" width="28" style="vertical-align: middle; margin-right: 8px;" />
  Tournado – Tour Booking API
</h1>

**Tournado** is a full-featured RESTful API for a travel tour booking platform. It supports user authentication, tour search and filtering, reviews, secure Stripe payments, and admin-level management. Built using Node.js, Express, MongoDB, and Stripe.

---

## 🚀 Features

- 🔐 User signup, login, logout with JWT-based authentication
- 🧾 Secure tour booking via Stripe Checkout
- 🗺️ Tour browsing with search, filter, sort, and pagination
- ✏️ Profile update & photo upload for users
- 📝 Leave and read reviews on tours
- 🛠️ Admin CRUD functionality for tours, users, reviews, and bookings
- 🌐 Cross-origin access enabled for frontend via CORS
- ☁️ Hosted on Render

---

## 🔗 API Documentation

📘 Full API docs are available via Postman:

**👉 [View Tournado Postman Docs](https://documenter.getpostman.com/view/26656359/2sB34cngvb)**

You can import this documentation directly into Postman to test endpoints.

---

## 📦 Folder Structure

```
📦tournado/
├── controllers/        # All business logic for routes
├── models/             # Mongoose schemas and models
├── routes/             # Express route definitions
├── public/             # Static files (images, etc.)
├── utils/              # Helper functions (e.g., error handling, email, Stripe)
├── views/              # Pug templates (optional)
├── config.env          # Environment variables
├── app.js              # Express app setup
├── server.js           # Server entry point
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/tournado.git
cd tournado
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` or `config.env` file in the root:

```env
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tournado
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=your-email@example.com
EMAIL_PASSWORD=your-password
EMAIL_HOST=smtp.mailtrap.io
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### 4. Start the App

```bash
npm start
```

For development with auto-restart (requires `nodemon`):

```bash
npm run dev
```

---

## 🤝 Contributing

Pull requests are welcome! Please follow existing patterns and write clean, tested code.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Credits

Built by Nikhil as part of a backend learning using Node.js, MongoDB and Stripe.

---
