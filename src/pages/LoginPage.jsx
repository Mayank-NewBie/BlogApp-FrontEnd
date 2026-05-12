import api from "../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  const [credential, setcredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { credential, password };
      const response = await api.post("/auth/login", data);
      setcredential("");
      setPassword("");

      if (response) {
        setUser(response.data.userData);
        return navigate("/feed", { replace: true });
      }
      toast.success("Login Successfull");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={submitHandler}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="username or email"
            value={credential}
            onChange={(e) => {
              setcredential(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">submit</button>
        </form>
        <h4 className="error">{error}</h4>
      </div>
    </div>
  );
};

export default LoginPage;
