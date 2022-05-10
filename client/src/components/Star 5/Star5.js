import React, { useEffect, useRef } from "react";
import { Liquid } from "@antv/g2plot";

export const Star5 = () => {
  const ref = useRef();

  useEffect(() => {
    const liquidPlot = new Liquid(ref.current, {
      percent: 0.53,
      autoFit: true,

      outline: {
        border: 8,
        distance: 5,
        style: {
          stroke: "#FFC100",
          strokeOpacity: 0.65,
        },
      },
      wave: {
        count: 3,
        length: 200,
      },
      theme: {
        styleSheet: {
          brandColor: "#FAAD14",
        },
      },

      statistic: {
        content: {
          content: "53%",
          style: {
            color: "#FF0",
          },
        },
      },
    });
    liquidPlot.render();
    return () => liquidPlot.destroy();
  }, []);

  return (
    <div>
      <div ref={ref} style={{ height: "35vh" }}></div>
    </div>
  );
};
