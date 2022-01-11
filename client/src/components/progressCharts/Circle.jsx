import React, { useEffect, useRef } from "react";
import { Liquid } from "@antv/g2plot";

const Circle = () => {
  const ref = useRef();

  console.log(ref);
  useEffect(() => {
    const liquidPlot = new Liquid(ref.current, {
      percent: 0.76,
      autoFit: true,

      outline: {
        border: 4,
        distance: 2,
        style: {
          stroke: "#00f",
          strokeOpacity: 0.65,
        },
      },
      wave: {
        count: 3,
        length: 200,
      },
      theme: {
        styleSheet: {
          brandColor: "#00f",
        },
      },
      /* pattern: {
          type: "square",
          cfg: {
            size: 4,
            padding: 4,
            rotation: 0,
            fill: "#FFF",
            isStagger: true,
          },
        }, */

      statistic: {
        content: {
          content: "76%",
          style: {
            color: "#FF0",
            fontSize: "25px",
          },
        },
      },
    });
    liquidPlot.render();
    return () => liquidPlot.destroy();
  }, []);

  return (
    <div>
      <div ref={ref} style={{ height: "25vh" }} />
    </div>
  );
};

export default Circle;
