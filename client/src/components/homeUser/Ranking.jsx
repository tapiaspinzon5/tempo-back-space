import React from "react";
import { Grid, Typography, styled } from "@mui/material";
import RankingUser from "../cardUser/RankingUser";
import podium from "../../assets/podium.svg";
import { useTheme } from "@mui/material/styles";

const RankingBox = styled(Grid)`
  border: 1px solid #f2f2f2;
  height: 452px;
  padding: 3px;
  border-radius: 10px;
`;

const PodioBox = styled(Grid)`
  border: 1px solid #f2f2f2;
  height: 452px;

  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Ranking = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Ranking</Typography>
          <RankingBox>
            <RankingUser /> <RankingUser /> <RankingUser />
          </RankingBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Podio de ganadores </Typography>
          <PodioBox
            sx={{
              background: theme.palette.background.navigator,
              color: "text.primary",
            }}
          >
            <img src={podium} alt="podium" height="210" />
          </PodioBox>
        </Grid>
      </Grid>
    </>
  );
};

export default Ranking;
