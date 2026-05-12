import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { username, email, password };
      await api.post("/auth/register", data);
      setUsername("");
      setEmail("");
      setPassword("");

      toast.success("User Successfully Registered");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-card">
        <h1>Register User</h1>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={(e) => {
              submitHandler(e);
            }}
          >
            Submit
          </button>
          <Link to="/login">Login</Link>
        </div>
        <h4 className="error">{error}</h4>
      </form>
    </div>
  );
};

export default RegisterPage;
