import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Box from "../../../components/Box/Box";
import "./TeacherHome.css";
import getTeacherId from "../../../utils/getTeacherId";
import { Link } from "react-router-dom";

export default function TeacherHome() {
  const [currentTab, setCurrentTab] = useState("Home");
  return (
    <div>
      <NavBar title="Home | List Doubts" />
      <div className="Student-Nav">
        <div onClick={() => setCurrentTab("Home")}>Home</div>
        <div onClick={() => setCurrentTab("Solving")}>Currently Solving</div>
        <div onClick={() => setCurrentTab("Dashboard")}>Dashboard</div>
      </div>
      {currentTab === "Home" ? (
        <Home />
      ) : currentTab === "Solving" ? (
        <Solving />
      ) : currentTab === "Dashboard" ? (
        <Dashboard />
      ) : null}
    </div>
  );
}

function Home() {
  const [doubts, setDoubts] = useState([]);

  const acceptDoubt = async (doubt_id) => {
    const teacher_id = getTeacherId();
    if (!teacher_id) {
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_URL}/teacher/acceptDoubt`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ doubt_id, teacher_id }),
      }
    );
    const body = await response.json();
    console.log(body);
    fetchUnresolvedDoubts();
  };

  const fetchUnresolvedDoubts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/teacher/fetchUnresolvedDoubts`
    );
    const body = await response.json();
    console.log(body);
    setDoubts(body);
  };

  useEffect(() => {
    fetchUnresolvedDoubts();
  }, []);

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Home</h1>
      <div>
        {doubts.map((doubt) => (
          <Box key={doubt.id} className="DoubtCard TeacherDoubtCard">
            <div className="title">{doubt.title}</div>
            <button onClick={() => acceptDoubt(doubt.id)}>Accept</button>
          </Box>
        ))}
      </div>
    </div>
  );
}

function Solving() {
  const [doubts, setDoubts] = useState([]);
  const fetchMyDoubts = async () => {
    const teacher_id = getTeacherId();
    if (!teacher_id) return;

    const response = await fetch(
      `${process.env.REACT_APP_URL}/teacher/fetchMyDoubts/?teacher_id=${teacher_id}`
    );
    const body = await response.json();
    console.log(body);
    setDoubts(body);
  };

  useEffect(() => {
    fetchMyDoubts();
  }, []);

  return (
    <div>
      <div>
        <h1 style={{ marginLeft: "20px" }}>Currently Solving</h1>
        <div>
          {doubts.map((doubt) => (
            <Box key={doubt.id} className="DoubtCard TeacherDoubtCard">
              <div className="title">{doubt.title}</div>
              <Link to={`/teacher/solve/${doubt.id}`}>Solve</Link>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ marginLeft: "20px" }}>Dashboard</h1>
      </div>
    </div>
  );
}
