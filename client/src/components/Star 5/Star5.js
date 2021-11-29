import React, { useEffect, useRef } from "react";
import { Liquid } from "@antv/g2plot";

export const Star5 = () => {
  const ref = useRef();
  useEffect(() => {
    const liquidPlot = new Liquid(ref.current, {
      percent: 0.5,
      shape: (x, y, width, height) => {
        const path = [];
        const w = Math.min(width, height);

        for (let i = 0; i < 5; i++) {
          path.push([
            i === 0 ? "M" : "L",
            (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
            (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
          ]);
          path.push([
            "L",
            (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
            (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
          ]);
        }
        path.push(["Z"]);
        return path;
      },
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
        length: 400,
      },
      theme: {
        styleSheet: {
          brandColor: "#FAAD14",
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
          content: "dsgfdgfdg",
          style: {
            color: "#FF0",
          },
        },
      },
    });
    liquidPlot.render();
  }, []);
  return (
    <div>
      <h2>Estrella 5 puntas</h2>
      <div ref={ref}></div>
    </div>
  );
};
