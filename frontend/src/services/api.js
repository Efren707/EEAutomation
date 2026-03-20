const API_URL = "http://localhost:8080";

export const registerUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const loginUser = async (email, password) => {
  await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
};

export const logoutUser = async () => {
  await fetch("http://localhost:8080/auth/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const getCurrentUser = async () => {
  const res = await fetch("http://localhost:8080/api/user/me", {
    credentials: "include",
  });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  return res.json();
};