import React from "react";
import "./style.css";

const Pointer = props => {
  const { color, name, id } = props;
  return (
    <div>
      <div
        className="pin bounce"
        id={id}
        style={{ backgroundColor: color }}
        title={name}
      />
      <div className="pulse" />
    </div>
  );
};

export default Pointer;
