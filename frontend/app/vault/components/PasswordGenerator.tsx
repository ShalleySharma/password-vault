"use client";
import React, { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+{}[]<>?";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      navigator.clipboard.writeText("");
      setCopied(false);
    }, 10000); // clears clipboard after 10 sec
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">🔐 Password Generator</h2>

      <div className="space-y-3">
        <label className="flex justify-between">
          Length: <span>{length}</span>
        </label>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
          Include Uppercase
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
          Include Numbers
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
          Include Symbols
        </label>

        <button
          onClick={generatePassword}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Generate
        </button>

        {password && (
          <div className="mt-4">
            <div className="flex items-center justify-between border p-2 rounded-md bg-gray-100 dark:bg-gray-800">
              <span className="break-all text-sm">{password}</span>
              <button onClick={copyPassword} className="text-blue-600 text-sm font-semibold">
                {copied ? "Copied ✅" : "Copy"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Clears clipboard automatically after 10 seconds</p>
          </div>
        )}
      </div>
    </div>
  );
}
