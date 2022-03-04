import React, { useEffect, useRef } from "react";
import { Liquid } from "@antv/g2plot";

const Diamond = ({ info }) => {
  const ref = useRef();

  useEffect(() => {
    const liquidPlot = new Liquid(ref.current, {
      percent: info.ChallengeWon[0].ChallengeWon / 100,
      autoFit: true,
      shape: "diamond",

      outline: {
        border: 4,
        distance: 2,
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
     

      statistic: {
        content: {
          content: `${Math.trunc(info.ChallengeWon[0].ChallengeWon)}%`,
          style: {
            color: " #bcdce4 ",
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

export default Diamond;
