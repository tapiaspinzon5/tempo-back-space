import React, { useState } from "react";
import { Box, styled, Typography, TextField } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { BsClock } from "react-icons/bs";

const CardMission = styled(Box)(() => ({
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem",
  borderRadius: "20px",
  marginBottom: "3px",
  color: "#3047b0",
}));
const MissionAssignmentCard = ({ mission, handleMissions, handleTime }) => {
  const [fecha, setFecha] = useState({ start: null, end: null });

  return (
    <CardMission>
      <input
        type="checkbox"
        className="checkBox"
        name={mission?.Name}
        checked={mission?.isChecked || false}
        onChange={handleMissions}
      />
      <Box width="55%">
        <Typography variant="body1">{mission.Name}</Typography>
        <Typography variant="caption">{mission.Topic}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <BsClock size={20} color="#3047B0" />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="caption" marginRight={1}>
          Time
        </Typography>
      </Box>
      <Box sx={{ display: "flex", mt: "1rem" }}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          sx={{ width: "20rem" }}
        >
          <DatePicker
            disabled={!mission?.isChecked}
            disablePast
            label="Start"
            value={fecha.start}
            onChange={(newValue) => {
              setFecha({ ...fecha, start: newValue });
              handleTime(
                "start",
                `${newValue.getFullYear()}-${
                  newValue.getMonth() + 1
                }-${newValue.getDate()}`,
                mission.Name,
                newValue
              );
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            disabled={!mission.start}
            disablePast
            minDate={new Date(fecha.start)}
            label="End"
            value={fecha.end}
            onChange={(newValue) => {
              setFecha({ ...fecha, end: newValue });

              handleTime(
                "end",
                `${newValue.getFullYear()}-${
                  newValue.getMonth() + 1
                }-${newValue.getDate()}`,
                mission.Name,
                newValue
              );
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </CardMission>
  );
};

export default MissionAssignmentCard;
