import React, { useState } from "react";
import { Grid, Typography, styled, Button, Box } from "@mui/material";
import podium from "../../assets/podium.svg";
import { useTheme } from "@mui/material/styles";
import { Star5 } from "../Star 5/Star5";
import MulticircularProgress from "../progressCharts/MulticircularProgress";

const RankingBox = styled(Grid)`
  border: 1px solid #f2f2f2;
  height: 52vh;
  padding: 3px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BoxButtons = styled(Box)((theme) => ({
  display: "flex",
  justifyContent: "flex-end",
  button: {
    textTransform: "none",
    color: "#000",
    //background: "#f4f4f4",
  },
}));

const ButtonLeft = styled(Button)((theme) => ({
  borderRadius: "10px 0 0 10px",
}));

const ButtonRight = styled(Button)((theme) => ({
  borderRadius: "0 10px 10px 0",
}));

const PodioBox = styled(Grid)(() => ({
  border: "1px solid #f2f2f2",
  height: "52vh",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  img: {
    height: "45vh",
  },
}));

const Ranking = () => {
  const theme = useTheme();
  const [showTeam, setShowTeam] = useState(false);
  const [showPodio, setShowPodio] = useState(false);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" color="#0087FF" mt={4}>
          Progress
        </Typography>
        <RankingBox>
          {showTeam ? <MulticircularProgress /> : <Star5 />}

          <BoxButtons>
            <ButtonLeft
              onClick={() => setShowTeam(false)}
              sx={
                showTeam
                  ? {
                      backgroundColor: "#f4f4f4",
                    }
                  : {
                      backgroundColor: "#BDBDBD",
                    }
              }
            >
              Me
            </ButtonLeft>
            <ButtonRight
              onClick={() => setShowTeam(true)}
              sx={
                showTeam
                  ? {
                      backgroundColor: "#BdBDBD",
                    }
                  : {
                      backgroundColor: "#f4f4f4",
                    }
              }
            >
              Team
            </ButtonRight>
          </BoxButtons>
        </RankingBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" color="#0087FF" mt={4}>
          Winners{" "}
        </Typography>
        <PodioBox
          sx={{
            background: theme.palette.background.navigator,
            color: "text.primary",
          }}
        >
          <img src={podium} alt="podium" />

          <BoxButtons>
            <ButtonLeft
              onClick={() => setShowPodio(false)}
              sx={
                showPodio
                  ? {
                      backgroundColor: "#f4f4f4",
                    }
                  : {
                      backgroundColor: "#BDBDBD",
                    }
              }
            >
              Actual
            </ButtonLeft>
            <ButtonRight
              onClick={() => setShowPodio(true)}
              sx={
                showPodio
                  ? {
                      backgroundColor: "#BdBDBD",
                    }
                  : {
                      backgroundColor: "#f4f4f4",
                    }
              }
            >
              Mes
            </ButtonRight>
          </BoxButtons>
        </PodioBox>
      </Grid>
    </Grid>
  );
};

export default Ranking;
