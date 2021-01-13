import React, { useState } from "react";
import Box from "../../../components/Box/Box";
import NavBar from "../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";

export default function StudentSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="Auth">
      <NavBar title="Home | Student | Sign up" />
      <Box>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Already have an account? <Link to="/student">Sign In.</Link>
        </div>
      </Box>
    </div>
  );
}
