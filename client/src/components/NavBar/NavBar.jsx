import React from "react";
import cookie from "react-cookies";
import base64 from "base-64";
import "./NavBar.css";

export default function NavBar({ title }) {
  const logout = () => {
    cookie.remove("coding-ninjas-demo", { path: "/" });
    window.location.href = "/";
  };
  let isLoggedIn = false;
  try {
    isLoggedIn = JSON.parse(base64.decode(cookie.load("coding-ninjas-demo")))[
      "id"
    ];
  } catch (e) {
    isLoggedIn = false;
  }

  return (
    <div className="NavBar">
      <div>{title}</div>
      <div>{isLoggedIn ? <button onClick={logout}>Logout</button> : null}</div>
    </div>
  );
}
