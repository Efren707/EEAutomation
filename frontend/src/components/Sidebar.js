import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="mb-4">EE Automation</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/profile">
            Profile
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/settings">
            Settings
          </Link>
        </li>

      </ul>
    </div>
  );
}