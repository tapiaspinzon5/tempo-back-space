exports.getNumberOfDays = (start) => {
  const date1 = new Date(start);
  const date2 = new Date();

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  if (diffInDays < 90) return "Q4";
  else if (diffInDays >= 90 && diffInDays < 180) return "Q3";
  else if (diffInDays >= 180 && diffInDays < 270) return "Q2";
  else if (diffInDays >= 270) return "Q1";
};
