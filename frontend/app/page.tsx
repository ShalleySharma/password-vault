"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "🔐",
      title: "End-to-End Encryption",
      description: "Your passwords are encrypted on your device before being stored"
    },
    {
      icon: "🛡️",
      title: "Secure Storage",
      description: "Military-grade encryption keeps your data safe and private"
    },
    {
      icon: "⚡",
      title: "Instant Access",
      description: "Access your passwords anywhere, anytime with secure authentication"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Main hero section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-8 shadow-2xl">
            <span className="text-4xl">🔐</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            Password Vault
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Securely store, manage, and protect all your passwords with
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> military-grade encryption</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50">
              🔒 Client-side encryption • 🛡️ Zero-knowledge architecture • ⚡ Instant sync
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 mb-10 flex flex-row flex-nowrap gap-4 justify-center max-w-md w-full mx-auto p-4">
          <a
            href="/auth/login"
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 px-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl font-bold text-sm"
          >
            🔑 Login
          </a>
          <a
            href="/auth/signup"
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 px-3 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl font-bold text-sm"
          >
            ✨ Sign Up
          </a>
          <a
            href="/vault"
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-3 px-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-700 transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl font-bold text-sm"
          >
            🏦 Go to Vault
          </a>
        </div>

        {/* Feature showcase */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-2xl">{features[currentFeature].icon}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {features[currentFeature].title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {features[currentFeature].description}
            </p>
          </div>

          {/* Feature indicators */}
          <div className="flex justify-center space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentFeature
                    ? 'bg-indigo-500 w-6'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>256-bit AES Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Zero Trust Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
