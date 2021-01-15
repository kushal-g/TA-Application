import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Box from "../../../components/Box/Box";
import "./TeacherHome.css";
import getTeacherId from "../../../utils/getTeacherId";
import { Link } from "react-router-dom";
import formatSeconds from "../../../utils/formatSeconds";

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
              <button
                onClick={() =>
                  (window.location.href = `/teacher/solve/${doubt.id}`)
                }
              >
                Solve
              </button>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(false);

  const fetchStats = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/teacher/stats`);
    const body = await response.json();
    console.log(body);
    setStats(body);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <div>
        <h1 style={{ marginLeft: "20px" }}>Dashboard</h1>
        {stats && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Box className="Dashboard-Box">
                <div>{stats.totalDoubts}</div>
                <div>Doubts Asked</div>
              </Box>
              <Box className="Dashboard-Box">
                <div>{stats.totalDoubtsResolved}</div>
                <div>Doubts Resolved</div>
              </Box>
              <Box className="Dashboard-Box">
                <div>{stats.totalEscalated}</div>
                <div>Doubts Escalated</div>
              </Box>

              <Box className="Dashboard-Box">
                <div>{formatSeconds(stats.avgResolutionTime)}</div>
                <div>Avg. Doubt Resolution Time</div>
              </Box>
            </div>
            <div>
              <Box className="TA-Report">
                <div>TAs Report</div>
                <div>
                  {stats.teachers.map((teacher) => (
                    <div key={teacher.id} className="Report-Card">
                      <div>{teacher.name}</div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>Doubts Accepted: {teacher.doubtsAccepted} </div>

                        <div>
                          Doubts Resolved: {teacher.resolvedDoubts.numResolved}
                        </div>
                        <div>Doubts Escalated : {teacher.doubtsEscalated}</div>
                        <div>
                          Avg Doubt Resolution Time:{" "}
                          {formatSeconds(
                            teacher.resolvedDoubts.totalTime /
                              teacher.resolvedDoubts.numResolved
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
