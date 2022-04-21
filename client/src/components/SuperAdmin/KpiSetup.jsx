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

const KpiSetup = () => {
  return (
    <Box>
      <Box>
        <BoxKPI display="flex">
          <Box width="20%">
            <Typography variant="body2" marginLeft={1}>
              {" "}
              Kpi Name
            </Typography>
          </Box>
          <Box width="20%" padding="0.1rem">
            <InputText
              name="criticalPoint"
              variant="outlined"
              type="text"
              fullWidth
              //onChange={}
              //value={}
            />
          </Box>
          <Box width="10%" padding="0.1rem">
            <InputText
              name="q1"
              variant="outlined"
              type="text"
              fullWidth
              //onChange={}
              //value={}
            />
          </Box>
          <Box width="10%" padding="0.1rem">
            <InputText
              name="q2"
              variant="outlined"
              type="text"
              fullWidth
              //onChange={}
              //value={}
            />
          </Box>
          <Box width="10%" padding="0.1rem">
            <InputText
              name="q3"
              variant="outlined"
              type="text"
              fullWidth
              //onChange={}
              //value={}
            />
          </Box>
          <Box width="10%" padding="0.1rem">
            <InputText
              name="q4"
              variant="outlined"
              type="text"
              fullWidth
              //onChange={}
              //value={}
            />
          </Box>

          <BoxCheck width="10%" padding="0.1rem">
            <input type="radio" id="asc" name="kpi1" value="asc" />
          </BoxCheck>
          <BoxCheck width="10%" padding="0.1rem">
            <input type="radio" id="dsc" name="kpi1" value="dsc" />
          </BoxCheck>
        </BoxKPI>
      </Box>
    </Box>
  );
};

export default KpiSetup;
