import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import React from "react";

const SelectAnalytics = ({
  label,
  dataSearch,
  context,
  setSelectKpi,
  selectKpi,
}) => {
  return (
    <Box width="100%" marginTop={1}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">KPI</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectKpi}
          label="KPI"
          onChange={(e) => setSelectKpi(e.target.value)}
        >
          {dataSearch.map((element, index) => (
            <MenuItem value={element} key={index}>
              {element}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectAnalytics;
