import type { Request, Response } from "express";
import VaultItem from "../models/VaultItem.js";

export const addVaultItem = async (req: Request, res: Response) => {
  try {
    const { userId, title, username, password, url, notes } = req.body;
    if (!userId || !title || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const item = await VaultItem.create({ userId, title, username, password, url, notes });
    res.status(201).json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const getVaultItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }
    const items = await VaultItem.find({ userId });
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const updateVaultItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, username, password, url, notes } = req.body;
    if (!id || !title || !username || !password) {
      return res.status(400).json({ error: "Missing id or required fields" });
    }
    const item = await VaultItem.findByIdAndUpdate(
      id,
      { title, username, password, url, notes, updatedAt: new Date() },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ error: "Vault item not found" });
    }
    res.json(item);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const deleteVaultItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id parameter" });
    }
    const deleted = await VaultItem.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Vault item not found" });
    }
    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};
