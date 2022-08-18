import React, { useState } from "react";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { InputText } from "../../assets/styled/muistyled";

const SearchComponent = ({
  dataSearch,
  label,
  context,
  setAgent,
  setSelectKpi,
  setCaso,
}) => {
  const defaultProps = {
    options: dataSearch,
    getOptionLabel: (option) => option.label,
  };

  const handleSelect = (newValue) => {
    if (context === "agents") {
      setAgent(newValue);
      setCaso(4);
    }
    if (context === "kpi") {
      setSelectKpi(newValue);
    }
  };

  //console.log(dataSearch);
  return (
    <Box marginTop={1}>
      <Autocomplete
        {...defaultProps}
        disablePortal
        id="combo-box-demo"
        options={dataSearch}
        getOptionLabel={(option) => option.Agent || option.Kpi}
        //value={campaign}
        onChange={(e, newValue) => handleSelect(newValue)}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <InputText
            {...params}
            label={label}
            //onChange={handleInput}
            //onClick={handleInput}
          />
        )}
      />
    </Box>
  );
};

export default SearchComponent;
