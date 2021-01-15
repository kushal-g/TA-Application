import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "../../../components/Box/Box";
import NavBar from "../../../components/NavBar/NavBar";
import "./TeacherSolve.css";

export default function TeacherSolve(props) {
  const [doubt, setDoubt] = useState(false);
  const [answer, setAnswer] = useState("");

  const fetchDoubt = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/teacher/fetchDoubt?doubt_id=${props.match.params.doubt_id}`
    );
    const body = await response.json();
    console.log(body);
    setDoubt(body);
  };

  const submitAnswer = async () => {
    console.log(answer);
    const response = await fetch(
      `${process.env.REACT_APP_URL}/teacher/answer`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ answer, doubt_id: props.match.params.doubt_id }),
      }
    );
    const body = response.json();
    console.log(body);
    window.location.href = "/teacher/doubts";
  };

  const escalate = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/teacher/escalate`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ doubt_id: props.match.params.doubt_id }),
      }
    );
    const body = response.json();
    console.log(body);
    window.location.href = "/teacher/doubts";
  };

  useEffect(() => {
    fetchDoubt();
  }, []);

  return (
    <div>
      <NavBar title="Home | Solve Doubt" />
      <button
        style={{
          marginLeft: "10px",
          border: "none",
          fontWeight: "600",
          fontSize: "30px",
          background: "white",
        }}
        onClick={() => (window.location.href = "/teacher/doubts")}
      >{`<`}</button>
      <div className="TeacherSolve">
        <h1>Solve Doubt</h1>
        {doubt && (
          <div>
            <Box className="DoubtCard">
              <div className="title">{doubt.title}</div>
              <div className="body">{doubt.body}</div>
              <div className="asker-details">
                Asked by: {doubt.name} on{" "}
                {new Date(doubt.created_at).toLocaleString()}
              </div>
              <div className="separator"></div>
              <CommentBox doubt={doubt} />
            </Box>
            <div style={{ textAlign: "right" }}>
              <Box className="DoubtCard">
                <div className="body">Answer</div>
                <textarea
                  placeholder="Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
                <button onClick={submitAnswer}>Answer</button>
              </Box>
              <button onClick={escalate}>Escalate</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentBox({ doubt }) {
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
    </div>
  );
}
