import React, { useState } from "react";
import Box from "../../../components/Box/Box";
import NavBar from "../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import base64 from "base-64";

export default function StudentSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const signup = async () => {
    setMsg("");
    const response = await fetch(
      `${process.env.REACT_APP_URL}/student/signup`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );
    const body = await response.json();
    if (body.id) {
      body["account_type"] = "Student";
      cookie.save("coding-ninjas-demo", base64.encode(JSON.stringify(body)), {
        path: "/",
      });
      window.location.href = "/student/doubts";
    } else {
      setMsg(body.msg);
    }
  };
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
        <button onClick={signup}>Submit</button>
        <div>{msg}</div>
        <div>
          Already have an account? <Link to="/student">Sign In.</Link>
        </div>
      </Box>
    </div>
  );
}
