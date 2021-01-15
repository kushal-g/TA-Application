import React, { useEffect, useState } from "react";
import Box from "../../../components/Box/Box";
import NavBar from "../../../components/NavBar/NavBar";
import "./StudentHome.css";
import base64 from "base-64";
import cookie from "react-cookies";
import getStudentId from "../../../utils/getStudentId";

export default function StudentHome() {
  const [currentTab, setCurrentTab] = useState("Home");

  return (
    <div>
      <NavBar title="Home |  Doubts" />
      <div className="Student-Nav">
        <div onClick={() => setCurrentTab("Home")}>Home</div>
        <div onClick={() => setCurrentTab("Raise")}>Raise Doubt</div>
      </div>
      {currentTab === "Home" ? (
        <DoubtsList />
      ) : currentTab === "Raise" ? (
        <RaiseDoubt goHome={() => setCurrentTab("Home")} />
      ) : null}
    </div>
  );
}

function DoubtsList() {
  const [doubts, setDoubts] = useState([]);

  const fetchDoubts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/student/fetchDoubts`
    );
    const body = await response.json();
    console.log(body);
    setDoubts(body);
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ marginLeft: "20px" }}>Home</h1>
        <div style={{ textAlign: "right", marginRight: "20px" }}>
          {doubts.length} Doubts
        </div>
      </div>
      {doubts.map((doubt) => (
        <Box key={doubt.id} className="DoubtCard">
          <div className="title">{doubt.title}</div>
          <div className="body">{doubt.body}</div>
          <div className="asker-details">
            Asked by: {doubt.name} on{" "}
            {new Date(doubt.created_at).toLocaleString()}
          </div>
          {doubt.answer && (
            <>
              <div style={{ fontSize: "15px" }} className="body">
                Answer: <br />
                {doubt.answer}
              </div>
              <div style={{ fontSize: "13px" }} className="body">
                Answered by: {doubt.resolver.name} on{" "}
                {new Date(doubt.resolved_at).toLocaleString()}
              </div>
            </>
          )}
          <div className="separator"></div>
          <CommentBox doubt={doubt} refreshData={fetchDoubts} />
        </Box>
      ))}
    </div>
  );
}

function CommentBox({ doubt, refreshData }) {
  const [comment, setComment] = useState("");

  const addComment = async () => {
    const student_id = getStudentId();
    console.log(student_id);
    if (student_id) {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/student/addComment`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            body: comment,
            doubt_id: doubt.id,
            student_id,
          }),
        }
      );
      const body = await response.json();
      console.log(body);
      setComment("");
      refreshData();
    }
  };
  return (
    <div className="Comment-Box">
      <div style={{ marginBottom: "15px" }}>
        {doubt.comments.length} Comments
      </div>
      {doubt.comments.map((comment) => (
        <div className="Comment" key={comment.id}>
          <span style={{ fontWeight: 600 }}>{comment.name}</span>:{" "}
          {comment.body}
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          placeholder="Add Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment}>Comment</button>
      </div>
    </div>
  );
}

function RaiseDoubt(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const raise = async () => {
    const userInfo = JSON.parse(
      base64.decode(cookie.load("coding-ninjas-demo"))
    );
    if (userInfo["account_type"] !== "Student") {
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_URL}/student/askDoubt`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          student_id: userInfo.id,
        }),
      }
    );
    const responseBody = await response.json();
    console.log(responseBody);
    setTitle("");
    setBody("");
    props.goHome();
  };
  return (
    <div>
      <Box className="RaiseDoubt">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button onClick={raise}>Ask Doubt</button>
      </Box>
    </div>
  );
}
