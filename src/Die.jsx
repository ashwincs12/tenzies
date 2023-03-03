import React from "react";
import "./style.css";

export default function Die(props) {
  return (
    <section>
      <span
        className={`box ${props.isHeld ? "held" : ""}`}
        onClick={props.handleClick}
      >
        <p>{props.value}</p>
      </span>
    </section>
  );
}
