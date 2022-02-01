import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
//import Header from "../components/homeUser/Header";
import Footer from "../../components/Footer";
import { downloadDataAdmin } from "../../utils/api";

import { UploadCampaign } from "../../components/Campaigns/UploadCampaign";
import { ModalLoading } from "../../components/ModalLoading";

const MainUpCampaign = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "90vh",
  width: "100%",
  padding: "0 2rem 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

export const UpCampaign = () => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector((store) => store.loginUser.userData);

  const idccms = userData.idccms;

  const [myCampaign, setMyCampaign] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const campaign = await downloadDataAdmin(idccms, 2);
      setMyCampaign(campaign.data);
    };

    getData();
    // eslint-disable-next-line
  }, []);

  //console.log(myCampaign);
  return (
    <>
      {loading && <ModalLoading />}
      <Grid width="100%">
        <MainUpCampaign>
          <Typography variant="h5" fontWeight="bold" mt={4}>
            Acquire new skills to strengthen your progress
          </Typography>
          <Typography variant="body1" mt={2}>
            Acquire new skills to strengthen your progress
          </Typography>
          <Grid container spacing={3} mt={4}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <UploadCampaign idccms={idccms} setLoading={setLoading} />
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={9} xl={8}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>Teams</TableCell>
                      <TableCell align="right" sx={{ color: "#fff" }}>
                        Team Leads
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#fff" }}>
                        Reporting Lead
                      </TableCell>
                      <TableCell align="right" sx={{ color: "#fff" }}>
                        QA Lead
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myCampaign.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "#fff" }}
                        >
                          {row.nombre}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "#fff" }}>
                          {row.teamLeads}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "#fff" }}>
                          {row.reportingLeads}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "#fff" }}>
                          {row.QALeads}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainUpCampaign>
        <Footer />
      </Grid>
    </>
  );
};

/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */
