import { useState } from "react";
import Layout from "../components/Layout";
import { changePassword } from "../services/api";

export default function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = async () => {
    try {
      await changePassword(oldPassword, newPassword);
      setMessage("Password updated successfully");
    } catch {
      setMessage("Error changing password");
    }
  };

  return (
    <Layout>
      <div className="card p-4 shadow">
        <h4>Settings</h4>

        <input
          type="password"
          className="form-control mt-2"
          placeholder="Old password"
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control mt-2"
          placeholder="New password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="btn btn-warning mt-3" onClick={handleChange}>
          Change Password
        </button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </Layout>
  );
}