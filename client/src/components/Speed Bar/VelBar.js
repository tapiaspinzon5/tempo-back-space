import React, { useEffect, useRef } from "react";
import ProgressBar from "progressbar.js";

export const VelBar = () => {
  const ref = useRef();
  const styles = { width: "500px", height: "200px", margin: "50px auto" };
  useEffect(() => {
    const semiBar = new ProgressBar.SemiCircle(ref.current, {
      color: "violet",
      strokeWidth: 2,
      trailWidth: 8,
      trailColor: "blue",
      easing: "bounce",
      from: { color: "#FF0099", width: 1 },
      to: { color: "#FF9900", width: 2 },
      text: {
        value: "0",
        className: "progress-text",
        style: {
          color: "black",
          position: "absolute",
          top: "45%",
          left: "50%",
          padding: 0,
          margin: 0,
          transform: null,
        },
      },
      step: (state, shape) => {
        shape.path.setAttribute("stroke", state.color);
        shape.path.setAttribute("stroke-width", state.width);
        shape.setText(Math.round(shape.value() * 100) + " %");
      },
    });

    semiBar.animate(0.494, {
      duration: 2000,
    });
  }, []);

  return (
    <div>
      <h2>Speed Bar</h2>
      <div ref={ref} style={styles}></div>
    </div>
  );
};
