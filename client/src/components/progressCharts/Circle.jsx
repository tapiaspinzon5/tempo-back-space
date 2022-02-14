import React, { useEffect, useRef } from "react";
import { Liquid } from "@antv/g2plot";

const Circle = ({ info }) => {
  const ref = useRef();
  useEffect(() => {
    const liquidPlot = new Liquid(ref.current, {
      percent: info.TotalExperiences[0].TotalExp / 45,
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
          content: `${Math.trunc(info.TotalExperiences[0].TotalExp)} XP`,
          style: {
            color: "#00f",
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
