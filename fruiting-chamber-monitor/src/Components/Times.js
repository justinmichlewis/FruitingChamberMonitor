import React from "react";

const Times = (props) => {
  const timeFormat = (time) => {
    if (time < 12) {
      return time + "AM";
    } else if (time === 12) {
      return time + "AM";
    } else {
      return time - 12 + "PM";
    }
  };

  if (props.times !== undefined) {
    return (
      <div>
        <h5>Times Fan Will Run:</h5>
        {props.times.map((time, index) => (
          <span>{timeFormat(time)} </span>
        ))}
      </div>
    );
  } else {
    return <div>Times</div>;
  }
};

export default Times;
