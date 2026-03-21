const API_URL = "http://localhost:8080";

export const registerUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json;
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
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const getCurrentUser = async () => { 
  const res = await fetch(`${API_URL}/api/user/me`, {
    credentials: "include",
  });
  
  if (res.status === 401) { 
    throw new Error("Unauthorized"); 
  } 
  
  return res.json(); 
  
};

export const updateEmail = async (email) => { 
  const res = await fetch(`${API_URL}/api/user/update-email`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  
  if (!res.ok) throw new Error("Failed to update email"); 

};

export const changePassword = async (oldPassword, newPassword) => { 
  const res = await fetch(`${API_URL}/api/user/change-password`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  
  if (!res.ok) throw new Error("Failed to change password"); 
}

export const uploadImage = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files allowed");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/files/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  return res.json;
};