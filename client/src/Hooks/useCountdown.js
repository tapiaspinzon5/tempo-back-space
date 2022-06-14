import { useEffect, useState } from "react";

const useCountdown = (dateIni, DateEnd) => {
  let start = false;
  let countDownDate = "";
  if (new Date(dateIni).getTime() - new Date().getTime() > 0) {
    countDownDate = new Date(dateIni).getTime();
    start = true;
  } else {
    countDownDate = new Date(DateEnd).getTime();

    if (new Date(DateEnd).getTime() - new Date().getTime() > 0) {
      start = false;
    } else {
      start = true;
    }
  }

  const [remainingTime, setremainingTime] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setremainingTime(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return countDown(remainingTime, start);
};

const countDown = (remainingTime, start) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const calcdays = Math.floor(remainingTime / day);
  const calchours = Math.floor((remainingTime % day) / hour);
  const calcminutes = Math.floor((remainingTime % hour) / minute);
  const calcseconds = Math.floor((remainingTime % minute) / second);

  const days = calcdays > 0 ? calcdays : 0;
  const hours = calchours > 0 ? calchours : 0;
  const minutes = calcminutes > 0 ? calcminutes : 0;
  const seconds = calcseconds > 0 ? calcseconds : 0;
  return [days, hours, minutes, seconds, start];
};

export { useCountdown };
