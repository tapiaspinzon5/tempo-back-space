import React, { useState, useEffect } from "react";
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
  setIdMission,
  idMission,
  selectKpi,
  agent,
  disabled,
}) => {
  const [defaultProps, setDefaultProps] = useState({});

  //console.log(dataSearch);

  useEffect(() => {
    setDefaultProps({
      options: dataSearch,
      getOptionLabel: (option) => (option.label ? option.label : ""),
    });
  }, []);

  const handleSelect = (newValue) => {
    //Para Agentes
    if (context === "agents") {
      setAgent(newValue);
      setCaso(4);
    }
    //Para KPI
    if (context === "kpi") {
      setSelectKpi(newValue);
    }
    //Para Missions
    if (context === "missions") {
      setIdMission(newValue);
    }
  };

  return (
    <Box marginTop={1}>
      <Autocomplete
        {...defaultProps}
        disablePortal
        disabled={disabled}
        id="combo-box-demo"
        options={dataSearch}
        getOptionLabel={(option) =>
          option.Agent || option.Nombre || option || ""
        }
        value={selectKpi || agent || idMission || ""}
        // autoComplete
        // includeInputInList
        onChange={(e, newValue) => handleSelect(newValue)}
        sx={{ width: "100%" }}
        renderInput={(params) => <InputText {...params} label={label} />}
      />
    </Box>
  );
};

export default SearchComponent;
