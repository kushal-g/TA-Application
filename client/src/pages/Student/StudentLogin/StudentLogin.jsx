import React, { useState } from "react";
import Box from "../../../components/Box/Box";
import NavBar from "../../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import base64 from "base-64";
export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    setMsg("");
    const response = await fetch(`${process.env.REACT_APP_URL}/student/login`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const body = await response.json();
    console.log(body);
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
        <button onClick={login}>Submit</button>
        <div>{msg}</div>
        <div>
          Don't have an account?{" "}
          <Link to="/student/signup">Create a new one.</Link>
        </div>
      </Box>
    </div>
  );
}
