import React from "react";
import { Link } from "react-router-dom";
import Box from "../../components/Box/Box";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <NavBar title="Home" />
      <Box>
        Login as:
        <Link className="Home-button" to="/teacher">
          Teacher
        </Link>
        <Link className="Home-button" to="/student">
          Student
        </Link>
      </Box>
    </div>
  );
}
