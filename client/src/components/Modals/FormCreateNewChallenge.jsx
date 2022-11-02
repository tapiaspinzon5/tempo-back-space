import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ButtonActionBlue } from "../../assets/styled/muistyled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #fff",
  borderRadius: "20px",
  boxShadow: "3px 3px 5px #f9f9f9",
  p: 4,
};

const inicialDataNC = {
  action: "",
  kpi: "",
  unitKpi: "",
  quantity: 0,
};

const FormCreateNewChallenge = ({
  openModal,
  setOpenModal,
  handleSubmitNC,
  kpisInfo,
}) => {
  const [date1, setDate1] = useState([]);
  const [date2, setDate2] = useState([]);
  const [newChallenge, setNewChallenge] = useState(inicialDataNC);
  const handleClose = () => {
    setOpenModal(false);
    setNewChallenge(inicialDataNC);
    setDate1([]);
    setDate2([]);
  };
  const handleChange = (e) => {
    setNewChallenge({
      ...newChallenge,
      kpi: e.target.value,
      unitKpi: e.target.value.unitKpi,
    });
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          fontWeight={700}
          color="#3047B0"
        >
          Create a new Challenge
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <FormControl fullWidth sx={{ marginTop: "1rem" }}>
              <InputLabel id="action-select-label">Action</InputLabel>
              <Select
                labelid="action-select-label"
                id="action-select-label"
                value={newChallenge.action}
                label="Action"
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, action: e.target.value })
                }
              >
                <MenuItem value="Increase">Increase</MenuItem>
                <MenuItem value="Decrease">Decrease</MenuItem>
                <MenuItem value="Keep">Keep under</MenuItem>
                <MenuItem value="Keep over">Keep over</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: "1rem" }}>
              <InputLabel id="kpi-select-label">KPI</InputLabel>
              <Select
                labelid="kpi-select"
                id="kpi-select"
                value={newChallenge.kpi}
                label="KPI"
                onChange={handleChange}
              >
                {kpisInfo.map((kpi, index) => (
                  <MenuItem key={index + 13} value={kpi}>
                    {kpi.Kpi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: "1rem" }}>
              <InputLabel id="unit-textarea">Quantity</InputLabel>
              <OutlinedInput
                type="number"
                labelid="unit-textarea"
                variant="outline"
                label="Quantity"
                placeholder="Number"
                value={newChallenge.quantity}
                onChange={(e) =>
                  setNewChallenge({ ...newChallenge, quantity: e.target.value })
                }
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: "1rem" }}>
              <InputLabel id="unit-textarea">Measure Unit</InputLabel>
              <OutlinedInput
                labelid="unit-textarea"
                variant="outline"
                label="Measure Unit"
                placeholder="Unit"
                value={newChallenge.unitKpi}
                onChange={(e) => setNewChallenge({ ...newChallenge })}
              />
            </FormControl>
            <Box sx={{ display: "flex", mt: 2 }}>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                sx={{ width: "20rem" }}
              >
                <DatePicker
                  disablePast
                  label="Start"
                  value={date1.fechaStart || null}
                  onChange={(newValue) => {
                    setDate1({
                      date1: `${newValue.getFullYear()}-${
                        newValue.getMonth() + 1
                      }-${newValue.getDate()}`,
                      fechaStart: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  disablePast
                  minDate={new Date(date1)}
                  label="End"
                  value={date2.fechaEnd || null}
                  onChange={(newValue) => {
                    setDate2({
                      date2: `${newValue.getFullYear()}-${
                        newValue.getMonth() + 1
                      }-${newValue.getDate()}`,
                      fechaEnd: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box display="flex" justifyContent="flex-end" marginTop="1rem">
              <ButtonActionBlue
                sx={{ fontSize: "20px" }}
                onClick={() =>
                  handleSubmitNC(newChallenge, date1.date1, date2.date2)
                }
                disabled={
                  !newChallenge.action ||
                  !newChallenge.kpi ||
                  !newChallenge.quantity ||
                  !newChallenge.unitKpi ||
                  !date1.date1 ||
                  !date2.date2
                }
              >
                Let's do it
              </ButtonActionBlue>
            </Box>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormCreateNewChallenge;
