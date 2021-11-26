import React from "react";

import { Grid, Typography, styled } from "@mui/material";
import RankingUser from "./RankingUser";

const RankingBox = styled(Grid)`
  border: 1px solid #f2f2f2;
  min-height: auto;
  margin-right: 2rem;
  border-radius: 10px;
`;

const TeamsRanking = ({data}) => {

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={4} md={12}>
          <Typography variant="h6">Ranking</Typography>
          <RankingBox>

            {
              data.teams.map(data => (
                <RankingUser 
                  key={data.id}
                  data = {data}/>
              ))
            }

          </RankingBox>
        </Grid>
        
      </Grid>
    </>
  );
};

export default TeamsRanking;
