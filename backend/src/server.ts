import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import vaultRoutes from "./routes/vaultRoutes.js";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test route to check backend connection
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully!" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/vault", vaultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
