import React from "react";
import { Typography, styled, Box, Avatar } from "@mui/material";
import avatarIMG from "../../assets/temp-image/avatar.png";

const BoxRanking = styled(Box)(({ theme }) => ({
  height: "40vh",
  padding: ".5rem",
  backgroundColor: "#f9f9f9",
  margin: ".5rem 0",
  borderRadius: "5px",
  overflowY: "scroll",
}));

const CardRanking = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  padding: "5px",
  borderRadius: "3px",
  marginBottom: "0.3rem",
  p: {
    color: "#3047B0",
    margin: "0 .5rem",
    fontSize: "12px",
  },
  div: {
    display: "flex",
    alignItems: "center",
  },
}));

const Ranking = ({ ranking }) => {
  return (
    <BoxRanking>
      {ranking && ranking.length > 3 ? (
        ranking.map((user, index) => (
          <CardRanking>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {index + 1}
              </Typography>
              <Avatar alt={user.Agent} src={avatarIMG} />
              <Typography variant="body2" fontWeight="bold" color="initial">
                {user.Agent}
              </Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold" color="initial">
              {user?.ResObtenidoExp} XP
            </Typography>
          </CardRanking>
        ))
      ) : (
        <CardRanking>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {"The Game Starts Soon"}
            </Typography>
          </Box>
        </CardRanking>
      )}

      {/* <CardRanking>
        <Box>
          <Typography variant="body2" fontWeight="bold">
            4
          </Typography>
          <Avatar alt="Pepito" src="" />
          <Typography variant="body2" fontWeight="bold" color="initial">
            {ranking[3] && ranking[3]?.Agent}
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight="bold" color="initial">
          {ranking[3] && `${ranking[3]?.ResObtenido} XP`}
        </Typography>
      </CardRanking>
      {ranking[4] && (
        <CardRanking>
          <Box>
            <Typography variant="body2" fontWeight="bold" marginRight={2}>
              5
            </Typography>
            <Avatar alt="Pepito" src="" />
            <Typography variant="body2" fontWeight="bold" color="initial">
              {ranking[4]?.Agent}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight="bold" color="initial">
            {`${ranking[4]?.ResObtenido} XP`}
          </Typography>
        </CardRanking>
      )}
      {ranking[5] && (
        <CardRanking>
          <Box>
            <Typography variant="body2" fontWeight="bold" marginRight={2}>
              6
            </Typography>
            <Avatar alt="Pepito" src="" />
            <Typography variant="body2" fontWeight="bold" color="initial">
              {ranking[5]?.Agent}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight="bold" color="initial">
            {`${ranking[5]?.ResObtenido} XP`}
          </Typography>
        </CardRanking>
      )} 
      */}
    </BoxRanking>
  );
};

export default Ranking;
