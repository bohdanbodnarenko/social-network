import React from "react";
import "./Spinner.css";

const Spinner = props => {
  const { small } = props;
  return (
    <div className={!small ? "wrapper" : 'small'}>
      <div className="loader">
        <div className="inner one" />
        <div className="inner two" />
        <div className="inner three" />
      </div>
    </div>
  );
};

export default Spinner;
