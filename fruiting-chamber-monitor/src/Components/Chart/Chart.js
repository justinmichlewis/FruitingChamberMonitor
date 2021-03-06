import React from "react";
import GaugeChart from "react-gauge-chart";
import "./Chart.css";

const Chart = (props) => {
  const chartStyle = {
    width: 350,
  };
  if (props.value === undefined || props.value === "NaN") {
    return (
      <div>
        <h5 className="dis">{props.title}</h5>
        <div className="loading">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  if (props.kind === "h") {
    return (
      <div>
        <h5 className="dis">{props.title}</h5>
        <GaugeChart
          id={props.chartID}
          nrOfLevels={3}
          arcsLength={[0.5, 0.25, 0.25]}
          needleColor="#000000"
          textColor={
            (props.value / 100).toFixed(2) > 0.74 ? "#00FF00" : "#FFCC00"
          }
          colors={["#FF0000", "#FFFF00", "#00FF00"]}
          animate={false}
          percent={(props.value / 100).toFixed(2)}
          style={chartStyle}
        />
      </div>
    );
  } else if (props.kind === "t") {
    return (
      <div>
        <h6 className="dis">{props.title}</h6>
        <GaugeChart
          id={props.chartID}
          nrOfLevels={3}
          needleColor="#000000"
          textColor={
            (props.value / 100).toFixed(2) > 0.7 &&
            (props.value / 100).toFixed(2) < 0.8
              ? "#00FF00"
              : "#FFCC00"
          }
          colors={["#FF0000", "#FFFF00", "#00FF00"]}
          animate={false}
          percent={(props.value / 100).toFixed(2)}
          style={chartStyle}
          formatTextValue={(value) => value + "*f"}
        />
      </div>
    );
  } else if (props.kind === "c") {
    console.log("1000 ", props.value / 1000, "100", props.value / 100);
    return (
      <div>
        <h6 className="dis">{props.title}</h6>
        <GaugeChart
          id={props.chartID}
          nrOfLevels={2}
          needleColor="#000000"
          textColor={
            (props.value / 1000).toFixed(2) > props.threshold
              ? "#FFFF00"
              : "#00FF00"
          }
          colors={["#00FF00", "#FFFF00"]}
          animate={false}
          percent={(props.value / 1000).toFixed(2)}
          style={chartStyle}
          formatTextValue={(value) => value * 10}
        />
      </div>
    );
  } else {
    return <h1>Shits fucked up</h1>;
  }
};

export default Chart;
