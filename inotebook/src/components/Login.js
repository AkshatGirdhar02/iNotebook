import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  // const host = `http://localhost:${process.env.REACT_APP_BACKEND_PORT}`;
  const host="https://i-notebook-sepia.vercel.app";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //To send credentials to database,need to use this
      // body data type must match "Content-Type" header
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //Save the authToken and Redirect to home page
      localStorage.setItem('token', json.authToken);
      console.log("Successfully logged in");
      navigate("/");
    } else {
      alert(json.error);
    }
    setCredentials({ email: "", password: "" });
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Login</h2>
      <form id="Loginform" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
          />
          <label>
            <input type="checkbox" onClick={togglePasswordVisibility} />
            Show Password
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
