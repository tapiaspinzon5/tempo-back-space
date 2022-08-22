export const helperDataChartCat = (data, context) => {
  //console.log(data);
  let categories = [];
  if (context == 1) {
    categories = data.map((dato) => {
      return dato.Date.slice(0, 10);
    });
  }
  return categories;
};
export const helperDataChartData = (data, context) => {
  // console.log(data);
  let dataChart;
  if (context == 1) {
    dataChart = data.map((dato) => {
      return dato.Score.toFixed(2);
    });
  }
  return dataChart;
};
