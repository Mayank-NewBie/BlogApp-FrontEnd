import api from "./api/axios";
import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import SinglePostPage from "./pages/SinglePostPage";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/me");

      setUser(res.data);
    } catch (error) {
      setUser(null);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/feed" replace />
            ) : (
              <LoginPage setUser={setUser} />
            )
          }
        />
        <Route
          path="/feed"
          element={
            loading ? (
              <h1>loading...</h1>
            ) : user ? (
              <FeedPage user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/singlePost/:postId"
          element={
            loading ? (
              <h1>loading...</h1>
            ) : user ? (
              <SinglePostPage user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="*"
          element={loading ? <h1>loading...</h1> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
