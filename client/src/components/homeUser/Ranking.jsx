import React from "react";
import { Typography, Box, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import avatarIMG from "../../assets/temp-image/avatar.png";

const BoxRanking = styled(Box)(({ theme }) => ({
  height: "40vh",
  padding: ".5rem",
  backgroundColor: "#f9f9f9",
  margin: ".5rem 0",
  borderRadius: "5px",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "6px",
  },

  "&::-webkit-scrollbar-track": {
    background: "white",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",
  },
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

const Ranking = ({ ranking, useName }) => {
  return (
    <BoxRanking>
      {ranking && ranking.length > 1 ? (
        ranking.map((user, index) => (
          <CardRanking
            sx={useName === user.Agent && { background: "#3047B030" }}
            key={index}
          >
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
    </BoxRanking>
  );
};

export default Ranking;
