import Layout from "../components/Layout";

export default function Settings() {
  return (
    <Layout>
      <div className="card p-4 shadow">
        <h4>Settings</h4>

        <div className="mt-3">
          <label className="form-label">Change Password</label>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="New password"
          />

          <button className="btn btn-warning">
            Update Password
          </button>
        </div>
      </div>
    </Layout>
  );
}