import React, { useState } from "react";
import Box from "../../../components/Box/Box";
import NavBar from "../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="Auth">
      <NavBar title="Home | Student | Login" />
      <Box>
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
        <div>
          Don't have an account?{" "}
          <Link to="/student/signup">Create a new one.</Link>
        </div>
      </Box>
    </div>
  );
}
