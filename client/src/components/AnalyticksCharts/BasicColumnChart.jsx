import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BasicColumnChart = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
  });

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        width="100%"
      />
    </div>
  );
};

export default BasicColumnChart;
