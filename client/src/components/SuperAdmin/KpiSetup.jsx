import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { InputText } from "../../assets/styled/muistyled";

const BoxKPI = styled(Box)(() => ({
  width: "100%",
  height: "3rem",
  background: "#e8e8e8",
  borderRadius: "10px",
  display: "flex",
  marginBottom: ".5rem",

  alignItems: "center",
  input: {
    background: "#fff",
    borderRadius: "10px",
    fontSize: "12px",
    padding: ".5rem 8px",
  },
}));
const BoxCheck = styled(Box)(() => ({
  textAlign: "center",
  input: {
    height: "1.8rem",
    width: "1.8rem",
  },
}));

const KpiSetup = ({ kpi, kpisList, setKpisList, kpiWork, setKpiWork }) => {
  const handleChange = (e, key) => {
    let value = e.target.value;
    if (key === "OrderKpi") {
      const changes = kpisList.map((k) =>
        k.Kpi === kpi.Kpi ? { ...k, [key]: value } : k
      );
      const changestw = kpiWork.map((k) =>
        k.Kpi === kpi.Kpi ? { ...k, [key]: value } : k
      );
      setKpisList(changes);
      setKpiWork(changestw);
    } else {
      if (value !== "") {
        if (!isNaN(value)) {
          const changes = kpisList.map((k) =>
            k.Kpi === kpi.Kpi ? { ...k, [key]: parseInt(value) } : k
          );
          const changestw = kpiWork.map((k) =>
            k.Kpi === kpi.Kpi ? { ...k, [key]: parseInt(value) } : k
          );
          setKpisList(changes);
          setKpiWork(changestw);
        }
      } else {
        const changes = kpisList.map((k) =>
          k.Kpi === kpi.Kpi ? { ...k, [key]: value } : k
        );
        const changestw = kpiWork.map((k) =>
          k.Kpi === kpi.Kpi ? { ...k, [key]: value } : k
        );
        setKpisList(changes);
        setKpiWork(changestw);
      }
    }
  };

  return (
    <Box>
      <Box>
        <BoxKPI display="flex">
          <BoxCheck width="10%" padding="0.1rem">
            <input
              style={{ borderRadius: "10px" }}
              type="checkbox"
              //   id={`${kpi.Kpi} - dsc`}
              //   name={`${kpi.Kpi}`}
              //   value="dsc"
              //   checked={kpi.OrderKpi === "dsc"}
              //   onChange={(e) => handleChange(e, "OrderKpi")}
            />
          </BoxCheck>
          <Box width="20%">
            <Typography variant="body2" marginLeft={1}>
              {kpi.Kpi}
            </Typography>
          </Box>
          <Box width="10%" padding="0.1rem">
            <InputText
              name="criticalPoint"
              variant="outlined"
              type="text"
              fullWidth
              onChange={(e) => handleChange(e, "CriticalPoint")}
              value={kpi.CriticalPoint}
            />
          </Box>
          <Box width="10%" padding="0.1rem">
            <InputText
              name="q1"
              variant="outlined"
              type="text"
              fullWidth
              onChange={(e) => handleChange(e, "Q1")}
              value={kpi.Q1}
            />
          </Box>
          <Box width="10%" padding="0.1rem">
            <InputText
              name="q2"
              variant="outlined"
              type="text"
              fullWidth
              onChange={(e) => handleChange(e, "Q2")}
              value={kpi.Q2}
            />
          </Box>
          <Box width="10%" padding="0.1rem">
            <InputText
              name="q3"
              variant="outlined"
              type="text"
              fullWidth
              onChange={(e) => handleChange(e, "Q3")}
              value={kpi.Q3}
            />
          </Box>
          <Box width="10%" padding="0.1rem">
            <InputText
              name="q4"
              variant="outlined"
              type="text"
              fullWidth
              onChange={(e) => handleChange(e, "Q4")}
              value={kpi.Q4}
            />
          </Box>

          <BoxCheck width="10%" padding="0.1rem">
            <input
              type="radio"
              id={`${kpi.Kpi} - asc`}
              name={`${kpi.Kpi}`}
              value="asc"
              checked={kpi.OrderKpi === "asc"}
              onChange={(e) => handleChange(e, "OrderKpi")}
            />
          </BoxCheck>
          <BoxCheck width="10%" padding="0.1rem">
            <input
              type="radio"
              id={`${kpi.Kpi} - dsc`}
              name={`${kpi.Kpi}`}
              value="dsc"
              checked={kpi.OrderKpi === "dsc"}
              onChange={(e) => handleChange(e, "OrderKpi")}
            />
          </BoxCheck>
        </BoxKPI>
      </Box>
    </Box>
  );
};

export default KpiSetup;
