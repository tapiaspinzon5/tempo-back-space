import React, { useState, useEffect } from "react";
import {  Box, styled } from "@mui/material";
import { positionValue } from "../../helpers/helpers";
import {GoArrowSmallUp, GoArrowSmallDown} from 'react-icons/go'


const MainProgress = styled(Box)(() => ({
  overflow: "hidden",
  width:'95%',
}));

const BoxProgress = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  display: "flex",
  overflow: "hidden",
}));

const BoxChart = styled(Box)(() => ({
  height: ".6rem",
}));

const ProgressKPI = ({ value, target, kpi }) => {
  const [arrowPos, setArrowPos] = useState(0);
  const [dir, setDir] = useState(true)

  useEffect(() => {
    const pos = positionValue(kpi);
    setArrowPos(pos);
    if(kpi.TargetQ1 > kpi.TargetQ2){
      setDir(true)
    }else{
      setDir(false)
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box display='flex' alignItems='center' >

    <MainProgress>
      <Box
        sx={{
          borderTop: ".7rem solid #3047B0",
          borderLeft: ".5rem solid transparent",
          borderRight: ".5rem solid transparent",
          width: "1px",
          position: "relative",
          top: "5px",
          left: `${arrowPos}%`,
        }}
      />
      <BoxProgress>
        <BoxChart
          sx={{
            backgroundColor: "#ff5c00",
            width: "33.333%",
          }}
        ></BoxChart>
        <BoxChart
          sx={{
            backgroundColor: "#f5d200",
            width: "33.333%",
          }}
        ></BoxChart>
        <BoxChart
          sx={{
            background: "linear-gradient(270deg, #00af9b 0%, #00d769 100%)",
            width: "33.333%",
          }}
        ></BoxChart>
      </BoxProgress>
    </MainProgress>
      {
        dir?
      <GoArrowSmallUp  color=' #00d769'  size={25}/>
      :
      <GoArrowSmallDown color=' #00d769' size={25}/>
      }
    </Box>

  );
};

export default ProgressKPI;
