import React, { useState, useEffect } from "react";
import { Typography, Grid, styled } from "@mui/material";
import { useSelector } from "react-redux";
//import Header from "../components/homeUser/Header";
import Footer from "../../components/Footer";
import { loadQuizes } from "../../utils/api";
import { CardCountDesc } from "../../components/Counts/CardCountDesc";
import { UploadCount } from "../../components/Counts/UploadCount";

const MainUpCount = styled(Grid)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  minHeight: "90vh",
  width: "100%",
  padding: "0 2rem 2rem",
  [theme.breakpoints.down("md")]: {
    top: "15px",
  },
}));

export const UpCount = () => {
  const userData = useSelector((store) => store.loginUser.userData);

  const idccms = userData.idccms;

  const [myCounts, setMyCounts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const counts = await loadQuizes(idccms);
      setMyCounts(counts.data);
    };

    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <Grid width="100%">
      <MainUpCount>
        <Typography variant="h5" fontWeight="bold" mt={4}>
          Acquire new skills to strengthen your progress
        </Typography>
        <Typography variant="body1" mt={2}>
          Acquire new skills to strengthen your progress
        </Typography>
        <Grid container spacing={3} mt={4}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <UploadCount idccms={idccms} />
          </Grid>
          {myCounts?.map((count) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={count.IdExamen}>
              <CardCountDesc count={count} />
            </Grid>
          ))}
        </Grid>
      </MainUpCount>
      <Footer />
    </Grid>
  );
};
