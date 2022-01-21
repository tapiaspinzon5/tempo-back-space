import React, { useEffect, useRef } from "react";
import { Bullet } from "@antv/g2plot";

export const LinearGauge = ({ value }) => {
  const ref = useRef();
  useEffect(() => {
    const data = [
      {
        title: "",
        ranges: [value.TargetQ4 - 10, value.TargetQ4, value.TargetQ1],
        kpi: [value.ACTUAL],
        target: value.Target,
      },
    ];

    const bulletPlot = new Bullet(ref.current, {
      data,
      measureField: "kpi",
      rangeField: "ranges",
      targetField: "target",
      xField: "title",
      color: {
        range: ["#FF0023", "#DBE500", "#00E53A"],
        measure: "#FFFFFF",
        target: "#005ABC",
      },
      size: {
        measure: 5,
        range: 10,
      },
      bulletStyle: {
        range: {
          fillOpacity: 1,
          target: { lineWidth: 20 },
          range: { r: 10 },
        },
      },
      xAxis: {
        line: null,
      },
      yAxis: false,
      label: {
        target: {
          offsetX: -18,
          offsetY: 25,
        },
      },
      legend: false,
    });

    bulletPlot.render();
    return () => bulletPlot.destroy();
  }, []);

  return (
    <div>
      <div ref={ref} style={{ height: "10vh" }}></div>
    </div>
  );
};
