import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const BasicColumnChart = ({ categories, dataChart, nameChart }) => {
  const [state, setState] = useState({
    options: {
      chart: {
        height: 350,
        id: "basic-bar",
      },
      xaxis: {
        categories: categories,
      },
    },
    series: [
      {
        name: nameChart,
        data: dataChart,
      },
    ],
  });

  useEffect(() => {
    setState({
      options: {
        chart: {
          height: 350,
          id: "basic-bar",
        },
        xaxis: {
          categories: categories,
        },
      },
      series: [
        {
          name: nameChart,
          data: dataChart,
        },
      ],
    });
  }, [categories, dataChart]);

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        width="100%"
        height={450}
      />
    </div>
  );
};

export default BasicColumnChart;
