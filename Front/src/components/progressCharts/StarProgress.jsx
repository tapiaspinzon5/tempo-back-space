import React, { useEffect, useRef } from "react";
import { Liquid } from "@antv/g2plot";

const StarProgress = () => {
  const ref = useRef();

 
  useEffect(() => {
    const liquidPlot = new Liquid(ref.current, {
      percent: 0.53,
      autoFit: true,

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
        border: 4,
        distance: 2,
        style: {
          stroke: "#f5be55 ",
          strokeOpacity: 0.65,
        },
      },
      wave: {
        count: 3,
        length: 200,
      },
      theme: {
        styleSheet: {
          brandColor: "#f5be55 ",
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
          content: "53%",
          style: {
            color: "#FFFB00",
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

export default StarProgress;
