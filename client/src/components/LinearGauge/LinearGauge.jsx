import React, { useEffect, useRef } from "react";
import { Bullet } from "@antv/g2plot";

export const LinearGauge = ({ value }) => {
  const ref = useRef();
  useEffect(() => {
    const data = [
      {
        title: `${value.name}/${value.unit}`,
        ranges: [value.bad, value.warning, value.good],
        kpi: [value.value],
        target: value.target,
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
        measure: 10,
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
