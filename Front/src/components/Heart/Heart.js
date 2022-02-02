import React, { useEffect, useRef } from "react";
import { Liquid } from "@antv/g2plot";

export const Heart = () => {
  const ref = useRef();
  useEffect(() => {
    const liquidPlot = new Liquid(ref.current, {
      percent: 0.5,
      shape: function (x, y, width, height) {
        const r = width / 4;
        const dx = x - width / 2;
        const dy = y - height / 2;
        return [
          ["M", dx, dy + r * 2],
          ["A", r, r, 0, 0, 1, x, dy + r],
          ["A", r, r, 0, 0, 1, dx + width, dy + r * 2],
          ["L", x, dy + height],
          ["L", dx, dy + r * 2],
          ["Z"],
        ];
      },
      outline: {
        border: 4,
        distance: 8,
        style: {
          stroke: "#F00",
          strokeOpacity: 0.65,
        },
      },
      theme: {
        styleSheet: {
          brandColor: "#F00",
        },
      },
      wave: {
        length: 400,
      },
      pattern: {
        type: "dot",
        cfg: {
          size: 4,
          padding: 4,
          rotation: 0,
          fill: "#FFF",
          isStagger: true,
        },
      },
      statistic: {
        content: {
          content: "hola",
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
      <h2>Corazon</h2>
      <div ref={ref}></div>
    </div>
  );
};
