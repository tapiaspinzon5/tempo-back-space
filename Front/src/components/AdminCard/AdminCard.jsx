import React from "react";
import { useSelector } from "react-redux";
import { Grid, styled, Typography, Box } from "@mui/material";
import XLSX from "xlsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  validateFieldsCreateTeams,
  validateHeadersCreateTeam,
} from "../../helpers/helpers";
import { createTeamSuperUser } from "../../utils/api";

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
  "&:hover": {
    background: "#f2f2f2",
  },
}));

export const AdminCard = ({ data, disabledCard }) => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.idccms;

  //Funcion para  validar campos Archivo .csv
  const loadFile = (e) => {
    const fileCSV = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        /* Parse data */
        const ab = e.target.result;
        const wb = XLSX.read(ab, { type: "array" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        //const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const data = XLSX.utils
          .sheet_to_json(ws, { header: 1 })
          .map((colum) => {
            return [
              colum[0],
              colum[1]?.toString(),
              colum[2]?.toString(),
              colum[3]?.toString(),
              colum[4],
              colum[5],
              colum[6],
              colum[7],
            ];
          });

        if (data.length > 1) {
          let differentsHeaders = validateHeadersCreateTeam(data[0]);

          if (differentsHeaders) {
            reject(" Wrong Headers!");
            return;
          }

          data.shift();
          let incorrectValues = validateFieldsCreateTeams(data);

          if (incorrectValues) {
            reject(" Wrong values!");
            return;
          }
          resolve(data);
        } else {
          reject("No data!");
        }
        /* Update state */
      };
      reader.readAsArrayBuffer(fileCSV);
    });
  };

  const uploadFile = async (e) => {
    const fileCSV = e.target.files[0];
    if (fileCSV === undefined || fileCSV.type !== "application/vnd.ms-excel") {
      MySwal.fire({
        title: <p>Only files in .csv format</p>,
        icon: "error",
      });
    } else {
      try {
        data = await loadFile(e);
        e.target.value = null;
      } catch (error) {
        MySwal.fire({
          title: <p> {error} </p>,
          icon: "error",
        });
        e.target.value = null;
        return;
      }

      //setData(data);
      const resp = await createTeamSuperUser(data, idccms);

      if (resp.status === 200) {
        MySwal.fire({
          title: <p>File upload</p>,
          icon: "success",
        });
      }
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
