import React from "react";
import "./Box.css";

export default function Box(props) {
  return (
    <div className="Box" style={props.style}>
      {props.children}
    </div>
  );
}
