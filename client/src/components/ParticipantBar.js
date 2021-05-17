import React from "react";

export default function ParticipantBar(props) {
  return (
    <div  className="friendImageMessageContainer">
      <div
        style={{
          backgroundImage: `url("http://placekitten.com/200/300")`,
        }}
        className="friendImageMessage"
      >
        <p style={{ fontSize: ".1em", margin: "0px" }} className="whiteText">
          {props.name}
        </p>
      </div>
    </div>
  );
}
