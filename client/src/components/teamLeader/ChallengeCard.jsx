import React from "react";
import { Box, Typography, styled, Button } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";
import bgChallenge from "../../assets/temp-image/challenge.png";

const BoxChallengeCard = styled(Box)(() => ({
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  marginBottom: "10px",
  height: "90px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  button: {
    textTransform: "none",
    border: "1px solid blue",
    borderRadius: "10px",
    padding: ".6rem 1.2rem",
    color: "#3047b0",
    background: "#fff",
    marginLeft: "2rem",
    "&:hover": {
      boxShadow: "0px 3px 6px #3047b0",
      background: "#e8e8e8",
    },
  },
  p: {
    color: "white",
  },
}));

const ChallengeCard = ({ challenge }) => {
  return (
    <BoxChallengeCard
      sx={{
        backgroundImage: `linear-gradient(90deg, rgba(52, 48, 102, 0.8), rgba(0, 135, 255, 0.2)), url(${bgChallenge})`,
      }}
    >
      {challenge.DescriptionChallenge !== "0" ? (
        <>
          <Typography variant="body1" color="initial">
            {challenge.DescriptionChallenge}
          </Typography>
          <Button>
            <FiTrash2 />
          </Button>
        </>
      ) : (
        <Typography variant="h6" color="initial">
          No Challenges assignment
        </Typography>
      )}
    </BoxChallengeCard>
  );
};

export default ChallengeCard;
