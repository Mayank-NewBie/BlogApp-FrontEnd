import toast from "react-hot-toast";
import api from "../api/axios";
import { Link } from "react-router-dom";
const Navbar = ({ username }) => {
  const logout = async () => {
    try {
      await api.post("/auth/logout", {});
      window.location.reload();
      toast.success("logged Out");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <nav className="feed-navbar">
      <h2>DevBlog</h2>

      <div className="nav-right">
        <span>Hello, {username}</span>
        <Link to="/login">
          <button className="feed-logout-btn" onClick={logout}>
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
