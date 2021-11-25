import React from "react";

import { Grid, Typography, styled } from "@mui/material";
import RankingUser from "../cardUser/RankingUser";

const RankingBox = styled(Grid)`
  border: 1px solid #f2f2f2;
  height: 17rem;
  margin-right: 2rem;
  border-radius: 10px;
`;

const Ranking = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Ranking</Typography>
          <RankingBox>
            <RankingUser />{" "}
          </RankingBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Ranking </Typography>
          <RankingBox>2</RankingBox>
        </Grid>
      </Grid>
    </>
  );
};

export default Ranking;
