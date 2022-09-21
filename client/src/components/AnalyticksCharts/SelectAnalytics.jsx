import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectAnalytics = ({
  label,
  dataSearch,
  context,
  setSelectKpi,
  selectKpi,
}) => {
  console.log(dataSearch);
  return (
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
  );
};

export default SelectAnalytics;
