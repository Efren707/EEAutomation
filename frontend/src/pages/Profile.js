import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCurrentUser, updateEmail } from "../services/api";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getCurrentUser().then(data => setEmail(data.email));
  }, []);

  const handleUpdate = async () => {
    try {
      await updateEmail(newEmail);
      setMessage("Email updated successfully");
    } catch {
      setMessage("Error updating email");
    }
  };

  return (
    <Layout>
      <div className="card p-4 shadow">
        <h4>Profile</h4>

        <p><strong>Current Email:</strong> {email}</p>

        <input
          className="form-control mt-3"
          placeholder="New email"
          onChange={(e) => setNewEmail(e.target.value)}
        />

        <button className="btn btn-primary mt-3" onClick={handleUpdate}>
          Update Email
        </button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </Layout>
  );
}