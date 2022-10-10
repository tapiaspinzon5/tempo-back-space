import React from "react";
import Chart from "react-apexcharts";

const LineChartGP = ({ series, options, typeChart }) => {
  return (
    <div>
      <Chart options={options} series={series} type={typeChart} width="100%" />
    </div>
  );
};

export default LineChartGP;
