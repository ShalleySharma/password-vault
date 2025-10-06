import api from "./api";

// Signup request
export const signup = async (name: string, email: string, password: string) => {
  const res = await api.post("/auth/signup", { name, email, password });
  return res.data;
};

// Login request
export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });

  // Save token to localStorage if exists
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};
