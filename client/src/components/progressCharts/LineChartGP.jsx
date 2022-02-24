import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const LineChartGP = () => {
  const [options, setOption] = useState({
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
        "domingo",
      ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "KPI Name",
      data: [30, 40, 45, 50, 49, 60, 17, 54, 43, 78, 90, 90],
    },
  ]);

  useEffect(() => {}, []);

  return (
    <div>
      <Chart options={options} series={series} type="area" width="100%" />
    </div>
  );
};

export default LineChartGP;
