import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCurrentUser } from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser(data))
      .catch(() => console.log("Unauthorized"));
  }, []);

  if (!user) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="card p-4 shadow">
        <h4>Profile</h4>

        <div className="mt-3">
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <button className="btn btn-primary mt-3">
          Edit Profile
        </button>
      </div>
    </Layout>
  );
}