import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { userLogin, userRegister, userLogout } from "../lib/redux/slice/userSlice";
import { useLoginRegisterMutation } from "../lib/redux/api/apiSlice";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  // RTK Query hooks
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginRegisterMutation();
  const [register, { isLoading: isRegisterLoading, error: registerError }] = useLoginRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Use RTK Query for login
        const result = await login({
          userName: username,
          status: true,
        }).unwrap();

        // Update Redux state with API response
        dispatch(
          userLogin({
            userName: result.user.userName,
            status: result.user.status,
          })
        );

        // Store token for future requests
        localStorage.setItem("token", result.token);
      } else {
        // Use RTK Query for registration
        const result = await register({
          userName: username,
          status: true,
        }).unwrap();

        // Update Redux state with API response
        dispatch(
          userRegister({
            userName: result.user.userName,
            status: result.user.status,
          })
        );

        // Store token for future requests
        localStorage.setItem("token", result.token);
      }

      navigate("/");
    } catch (error) {
      console.error("Authentication failed:", error);
      // Error handling is done by RTK Query hooks
    }
  };

  const handleLogout = () => {
    dispatch(userLogout({ userName: "", status: false }));
    localStorage.removeItem("token");
  };

  // Get current error and loading state
  const currentError = isLogin ? loginError : registerError;
  const isLoading = isLogin ? isLoginLoading : isRegisterLoading;

  if (user.status) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Welcome, {user.userName}!</h2>
        <p>You are logged in.</p>
        <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {/* Error Display */}
      {currentError && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
            border: "1px solid #f5c6cb",
          }}>
          Authentication failed. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isLoading ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1,
          }}>
          {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "15px" }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}>
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
