import React, { useEffect, useRef } from "react";
import { Liquid } from "@antv/g2plot";

const Diamond = () => {
  const ref = useRef();

  console.log(ref);
  useEffect(() => {
    const liquidPlot = new Liquid(ref.current, {
      percent: 0.53,
      autoFit: true,
      shape: "diamond",

      outline: {
        border: 8,
        distance: 5,
        style: {
          stroke: " #28c48d ",
          strokeOpacity: 0.65,
        },
      },
      wave: {
        count: 3,
        length: 200,
      },
      theme: {
        styleSheet: {
          brandColor: " #28c48d ",
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
            color: " #bcdce4 ",
          },
        },
      },
    });
    liquidPlot.render();
    return () => liquidPlot.destroy();
  }, []);

  return (
    <div>
      <div ref={ref} style={{ height: "32vh" }} />
    </div>
  );
};

export default Diamond;
