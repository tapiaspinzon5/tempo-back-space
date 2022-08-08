import React, { useState } from "react";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { InputText } from "../../assets/styled/muistyled";

const SearchComponent = ({ dataSearch, label }) => {
  const defaultProps = {
    options: dataSearch,
    getOptionLabel: (option) => option.label,
  };

  const handleSelect = (newValue) => {
    console.log(newValue);
  };
  return (
    <Box marginTop={1}>
      <Autocomplete
        {...defaultProps}
        disablePortal
        id="combo-box-demo"
        options={dataSearch}
        getOptionLabel={(option) => option.Agent}
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
