import React from "react";
import { Grid, styled, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const CardContainer = styled(Grid)(({ theme }) => ({
  marginTop: "25px",
  input: {
    display: "none",
  },
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  display: "flex",

  width: "55vh",
  height: "70vh",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  padding: "15px",
  alignItems: "center",
  justifyContent: "center",
}));

export const AdminCard = ({ data, disabledCard }) => {
  const uploadFile = (e) => {
    console.log(e.target.files[0]);
    const fileQuiz = e.target.files[0];
    if (
      fileQuiz === undefined ||
      fileQuiz.type !== "application/vnd.ms-excel"
    ) {
      console.log("solo archivos en formato .csv");
      MySwal.fire({
        title: <p>Only files in .csv format</p>,
        icon: "error",
      });
    } else {
      console.log("archivo correcto");
      MySwal.fire({
        title: <p>File upload</p>,
        icon: "success",
      });
    }
  };
  return (
    <>
      <CardContainer>
        <CardContent>
          <label htmlFor="quiz" style={{ cursor: "pointer" }}>
            <img src={data.url} alt="top-Ten" />

            <Typography
              variant="h6"
              align="center"
              fontWeight="bold"
              sx={{ m: "10px", color: "#3047B0" }}
            >
              {data.title}
            </Typography>
          </label>
          <input
            type="file"
            id="quiz"
            name="quiz"
            onChange={(e) => uploadFile(e)}
          />
        </CardContent>
      </CardContainer>
    </>
  );
};
