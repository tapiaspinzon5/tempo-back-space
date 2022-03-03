import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const LineChartGP = ({ series, options }) => {
  useEffect(() => {}, []);

  return (
    <div>
      <Chart options={options} series={series} type="bar" width="100%" />
    </div>
  );
};

export default LineChartGP;
