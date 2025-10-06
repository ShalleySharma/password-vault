"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { encryptData, decryptData } from "@/lib/crypto";

export default function VaultPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", username: "", password: "", url: "", notes: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchItems = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        setMessage("❌ Please log in first");
        return;
      }
      const res = await api.get(`/vault/${userId}`);
      const decryptedItems = res.data.map((item: any) => ({
        ...item,
        password: decryptData(item.password)
      }));
      setItems(decryptedItems);
    } catch (err: any) {
      setMessage("❌ Failed to load vault items");
    }
  };

  const saveItem = async () => {
    if (!form.title || !form.username || !form.password) {
      setMessage("❌ Please fill in title, username, and password");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const userId = localStorage.getItem("id");
      const encryptedPassword = encryptData(form.password);

      if (editingId) {
        // Update existing item
        await api.put(`/vault/${editingId}`, {
          title: form.title,
          username: form.username,
          password: encryptedPassword,
          url: form.url,
          notes: form.notes
        });
        setMessage("✅ Password entry updated successfully!");
      } else {
        // Add new item
        await api.post("/vault/add", {
          userId,
          title: form.title,
          username: form.username,
          password: encryptedPassword,
          url: form.url,
          notes: form.notes
        });
        setMessage("✅ Password entry added successfully!");
      }

      setForm({ title: "", username: "", password: "", url: "", notes: "" });
      setShowForm(false);
      setEditingId(null);
      fetchItems();
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("❌ Failed to save password entry");
    } finally {
      setIsLoading(false);
    }
  };

  const editItem = (item: any) => {
    setForm({
      title: item.title,
      username: item.username,
      password: item.password,
      url: item.url || "",
      notes: item.notes || ""
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setForm({ title: "", username: "", password: "", url: "", notes: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const deleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this password entry?")) return;

    try {
      await api.delete(`/vault/${itemId}`);
      setMessage("✅ Password entry deleted successfully!");
      fetchItems();
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("❌ Failed to delete password entry");
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setMessage(`✅ ${label} copied to clipboard!`);
    setTimeout(() => setMessage(""), 2000);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.url && item.url.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl text-white">🏦</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">My Password Vault</h1>
          <p className="text-gray-600 dark:text-gray-300">Securely store and manage your passwords</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
            message.includes('❌') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {message}
          </div>
        )}

        {/* Add Entry Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => {
              if (editingId) {
                cancelEdit();
              } else {
                setShowForm(!showForm);
              }
            }}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
          >
            {showForm ? '✖️ Cancel' : '➕ Add New Password Entry'}
          </button>
        </div>

        {/* Search Bar */}
        {items.length > 0 && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search by title, username, or URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-purple-400"
            />
          </div>
        )}

        {/* Add/Edit Entry Form */}
        {showForm && (
          <form
            onSubmit={e => {
              e.preventDefault();
              saveItem();
            }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xl mb-8 border border-gray-200/50 dark:bg-gray-900 dark:border-gray-700"
            noValidate
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              {editingId ? 'Edit Password Entry' : 'Add New Entry'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    placeholder="e.g., Gmail, Facebook, Bank"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-purple-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username/Email *
                  </label>
                  <input
                    placeholder="Enter username or email"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-purple-400"
                    required
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-purple-400"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Website URL
                  </label>
                  <input
                    placeholder="https://example.com"
                    value={form.url}
                    onChange={e => setForm({ ...form, url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    placeholder="Additional notes or reminders"
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? '💾 Saving...' : editingId ? '💾 Update Entry' : '💾 Save Entry'}
              </button>
            </div>
          </form>
        )}

        {/* Password Entries */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-400">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm ? "No matching entries found" : "No password entries yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? "Try adjusting your search terms" : "Click \"Add New Password Entry\" to get started"}
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-200/50 hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-900 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {item.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 text-sm hover:underline dark:text-purple-400 dark:hover:text-purple-300"
                        >
                          🌐 {item.url}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editItem(item)}
                      className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-gray-800"
                      title="Edit entry"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-gray-800"
                      title="Delete entry"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Username</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item.username}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                      />
                      <button
                        onClick={() => copyToClipboard(item.username, "Username")}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                        title="Copy username"
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Password</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="password"
                        value={item.password}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                      />
                      <button
                        onClick={() => copyToClipboard(item.password, "Password")}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                        title="Copy password"
                      >
                        👁️
                      </button>
                    </div>
                  </div>
                </div>

                {item.notes && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Notes</label>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg dark:text-gray-300 dark:bg-gray-800">{item.notes}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm hover:underline dark:text-gray-400 dark:hover:text-gray-300">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
