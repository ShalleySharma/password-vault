# 🛡️ Password Vault & Generator (MVP)

A **privacy-first password manager** built with **Next.js, Node.js, MongoDB, and TypeScript**.  
Users can generate, encrypt, store, edit, and delete passwords — all **securely and instantly**.

---

## 🚀 Features

✅ Authentication (Signup / Login) using JWT  
✅ Password Generator (length slider, numbers, symbols, exclude look-alikes)  
✅ Personal Vault – save entries with:
- Title  
- Username  
- Password  
- URL  
- Notes  
✅ Client-side encryption (AES) — your data is encrypted **before it reaches the server**  
✅ Copy to clipboard (auto clears after 10–20s)  
✅ Search / Filter vault items  
✅ Responsive & Fast UI built with **Next.js**  
✅ Dark Mode (completed!)  
✅ TypeScript for safer, cleaner code  

---

## 🟩 Optional (Future Enhancements)

- 2FA (TOTP)  
- Tags / folders  
- Export / import encrypted file  

---

## 🔒 Security Highlights

> "All vault data is encrypted on the client side before being sent — the server never sees plain text."

- AES encryption (via **crypto-js / Web Crypto API**)  
- JWT tokens for user sessions  
- Hashed passwords using **bcrypt**  
- No secrets stored in local logs  

---

## 🧰 Tech Stack

| Layer       | Technology                          |
|------------|------------------------------------|
| Frontend   | Next.js (React + TypeScript)       |
| Backend    | Node.js + Express / Next.js API    |
| Database   | MongoDB                            |
| Auth       | JSON Web Tokens (JWT)              |
| Encryption | AES (Client-side)                  |

---

## ⚙️ Setup Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ShalleySharma/password-vault.git
cd password-vault
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create Environment File
Create a `.env` file in the root directory with:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_ENCRYPTION_KEY=your_client_side_aes_key
```

### 4️⃣ Run the Development Server
```bash
npm run dev
```


### Visit ➜ http://localhost:3000

## 🧪 Demo Flow (Screen Recording)

- Sign up (create a new account)
- Login using your credentials
- Add a new password entry to the vault
- Save it to the vault
- Search, edit, or delete an entry
- Copy password → auto-clears after 10s


## 🔍 Crypto Library Note

**Why Crypto-JS (AES) for Client-Side Encryption:**

- **Lightweight**: Minimal footprint, perfect for web applications
- **Battle-tested**: Widely used and trusted in production environments
- **Browser-native**: Works directly in browsers without additional dependencies
- **Secure**: Implements AES encryption standard for robust data protection
- **Zero-knowledge**: Ensures server never sees plaintext passwords



## 🌐 Live Demo & Repo

🟢 Live Demo: coming soon
📦 GitHub Repo: https://github.com/ShalleySharma/password-vault
