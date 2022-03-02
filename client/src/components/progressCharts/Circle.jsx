import React, { useEffect, useRef } from "react";
import { Liquid } from "@antv/g2plot";

const Circle = ({ info }) => {
  const ref = useRef();
  useEffect(() => {
    const liquidPlot = new Liquid(ref.current, {
      percent: info.Level[0].Exp / info.Level[0].High,
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
      statistic: {
        content: {
          content: `${Math.trunc(info.Level[0].Exp)} XP`,
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
