import React from "react";
import { useSelector } from "react-redux";
import XLSX from "xlsx";
import { Grid, styled, Typography, Box } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "../components/homeUser/Header";
import Footer from "../components/Footer";
import { AdminCard } from "../components/AdminCard/AdminCard";
import img1 from "../assets/images/OM-1.svg";
import img2 from "../assets/images/OM-2.svg";
import img3 from "../assets/images/OM-3.svg";
import {
  validateFieldsTeamOM,
  validateHeadersTeamOM,
} from "../helpers/helpers";
import { createTeamOperationManager } from "../utils/api";

const MainHomeOM = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "95vh",
  width: "100%",
  padding: "0 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

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

const dataCard = [
  {
    id: 1,
    url: img1,
    title: "Account Name Assignment",
  },
  { id: 2, url: img2, title: "Creation of LOB´s" },
  { id: 3, url: img3, title: "Assigning Team Members" },
];

////////////////////////////////////////
export const HomeOM = () => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.idccms;

  const loadFile = (e) => {
    let file = e.target.files[0];

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
        const data = XLSX.utils
          .sheet_to_json(ws, { header: 1 })
          .map((colum) => {
            return [
              colum[0],
              colum[1]?.toString(),
              colum[2]?.toString(),
              colum[3]?.toString(),
            ];
          });

        

        if (data.length > 1) {
          /* Update state */
          let differentsHeaders = validateHeadersTeamOM(data[0]);
          data.shift();
          let incorrectValues = validateFieldsTeamOM(data);

          if (differentsHeaders) {
           
            reject("Headers no coinciden");
            return;
          }

          if (incorrectValues) {
           
            reject("Existen campos incorrectos");
            return;
          }
          resolve(data);
        } else {
          reject("El archivo no contiene información.");
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadFile = async (e) => {
    
    const fileCSV = e.target.files[0];
    let data = [];
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
      const resp = await createTeamOperationManager(data, idccms);

   

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
      <MainHomeOM sx={{ bgcolor: "background.default", color: "text.primary" }}>
        <Header />
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={4}>
            <AdminCard data={dataCard[0]} />
          </Grid> */}
          <Grid item xs={12} md={4}>
            {/* <AdminCard data={dataCard[1]} /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <CardContainer>
              <CardContent>
                <label htmlFor="quiz" style={{ cursor: "pointer" }}>
                  <img src={img3} alt="top-Ten" />

                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    sx={{ m: "10px", color: "#3047B0" }}
                  >
                    Assigning Team Members
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
          </Grid>
        </Grid>
        <Footer />
      </MainHomeOM>
    </>
  );
};
