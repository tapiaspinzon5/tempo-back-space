import React from "react";
import Chart from "react-apexcharts";

const MulticircularProgress = () => {
  //Radial Bar

  const seriesRadial = [67, 84, 97, 61, 34];
  const optionsRadial = {
    radialBar: {
      dataLabels: {
        total: {
          show: true,
          label: "TOTAL",
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["TEAM A", "TEAM B", "TEAM C", "TEAM D", "TEAM E"],
  };

  return (
    <Chart
      options={optionsRadial}
      series={seriesRadial}
      type="radialBar"
      //width="500"
    />
  );
};

export default MulticircularProgress;
