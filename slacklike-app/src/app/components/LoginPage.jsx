import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

const LoginPage = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const clearError = () => {
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUsers = JSON.parse(localStorage.getItem("savedUsers"));

    if (
      savedUsers &&
      savedUsers.some(
        (user) => user.username === username && user.password === password
      )
    ) {
      setError("");
      const loggedInUser = savedUsers.find(
        (user) => user.username === username
      );
      if (loggedInUser) setLoggedInUser(loggedInUser);
      navigate("/home");
    } else {
      setUsername("");
      setPassword("");
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div>
      <form className="loginForm" onSubmit={handleLogin}>
        <Input
          key="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            clearError();
          }}
        />
        <br />

        <Input
          key="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
        />
        <br />

        {error && <p className="loginError">{error}</p>}

        <button className="loginButton" type="submit">
          Login
        </button>
      </form>

      <h5 className="loginLink">
        Don't have an account yet? <br />
        <Link to="/signup">Sign up</Link>!
      </h5>
    </div>
  );
};

export default LoginPage;
