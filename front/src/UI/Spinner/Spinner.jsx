import React from "react";
import "./Spinner.css";

const Spinner = props => {
  return (
    <div className="wrapper">
      <div className="loader">
        <div className="inner one" />
        <div className="inner two" />
        <div className="inner three" />
      </div>
    </div>
  );
};

export default Spinner;
