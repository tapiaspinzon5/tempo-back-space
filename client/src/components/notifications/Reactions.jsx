import React from "react";
import like from "../../assets/Icons/like.png";
import love from "../../assets/Icons/love.png";
import great from "../../assets/Icons/great.png";
import { Box } from "@mui/system";
import { IconButton, Typography, styled } from "@mui/material";

const ReactButton = styled(IconButton)((theme) => ({
  //   "&:hover": {
  //     img: {
  //       transform: "scale(1.5)",
  //     },
  //   },
}));

const Reactions = () => {
  return (
    <Box width="100%">
      <ReactButton>
        <img className="reactImage" src={like} alt="like" height={18} />{" "}
      </ReactButton>
      <Typography variant="caption" color="#3047b0">
        23
      </Typography>
      <ReactButton>
        <img className="reactImage" src={love} alt="love" height={18} />{" "}
      </ReactButton>
      <Typography variant="caption" color="#3047b0">
        3
      </Typography>
      <ReactButton>
        <img className="reactImage" src={great} alt="great" height={18} />{" "}
      </ReactButton>
      <Typography variant="caption" color="#3047b0">
        2
      </Typography>
    </Box>
  );
};

export default Reactions;
