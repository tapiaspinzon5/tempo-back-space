import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const BasicColumnChart = ({
  categories,
  nameChart1,
  nameChart2,
  nameChart3,
  dataChart1,
  dataChart2,
  dataChart3,
  nameChart4,
  dataChart4,
}) => {
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
        name: nameChart1,
        data: dataChart1,
      },
      {
        name: nameChart2,
        data: dataChart2,
      },
      {
        name: nameChart3,
        data: dataChart3,
      },
      {
        name: nameChart4,
        data: dataChart4,
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
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
      },
      series: [
        {
          name: nameChart1,
          data: dataChart1,
        },
        {
          name: nameChart2,
          data: dataChart2,
        },
        {
          name: nameChart3,
          data: dataChart3,
        },
        {
          name: nameChart4,
          data: dataChart4,
        },
      ],
    });
    // eslint-disable-next-line
  }, [categories, dataChart1, dataChart2, dataChart3]);

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
