import React, { useEffect, useRef } from "react";
import ProgressBar from "progressbar.js";

export const VelBar = ({ status }) => {
  const ref = useRef();

  const styles = { width: "200px", height: "100px", margin: "50px auto" };
  useEffect(() => {
    const semiBar = new ProgressBar.SemiCircle(ref.current, {
      //color: "violet",
      strokeWidth: 6,
      trailWidth: 6,
      trailColor: "#DADADA",
      easing: "bounce",
      from: { color: "#3946EC", width: 6 },
      to: { color: "#3946EC", width: 6 },
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

    semiBar.animate(status, {
      duration: 2000,
    });

    return () => {
      semiBar.destroy();
    };
  }, [status]);

  return (
    <div>
      <h2>Speed Bar</h2>
      <div ref={ref} style={styles}></div>
    </div>
  );
};
