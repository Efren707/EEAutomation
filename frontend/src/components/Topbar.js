import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";

export default function Topbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
      <h5 className="mb-0">Dashboard</h5>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}