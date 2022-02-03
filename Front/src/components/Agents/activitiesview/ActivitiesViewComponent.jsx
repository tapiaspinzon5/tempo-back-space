import React from "react";
import { Typography, Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BoxCard = styled(Box)(() => ({
  maxWidth: "19.625rem",
  borderRadius: "10px",
}));
const CardViewer = styled(Box)(({ theme }) => ({
  //height: "14rem",
  height: "9rem",
  maxWidth: "19.625rem",
  boxShadow: "1px 1px 5px #A2A2A2",
  borderRadius: "10px 10px 0 0 ",
  //background: "#F9F9F9 0% 0% no-repeat padding-box",

  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "left",
  boxSizing: "border-box",
  "&:hover": {
    boxShadow: " 3px 3px 5px #A2A2A2",
    opacity: 1,
  },
  p: {
    width: "70%",
    margin: "1rem",
    color: "white",
    fontWeight: 500,
  },
}));

const DownSection = styled(Box)(({ theme }) => ({
  boxShadow: "1px 1px 5px #A2A2A2",
  maxWidth: "20rem",
  height: "4rem",
  background: "rgba(0, 0, 255, 0.616)",
  borderRadius: "0 0  10px 10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  button: {
    color: "#000",
    background: "#fff",
    textTransform: "none",
    fontWeight: "bold",
    width: "111px",
    padding: 0,
    borderRadius: "10px",
    "&:hover": {
      background: "#e6e6e6e0",
    },
  },
}));

const ActivitiesViewComponent = ({ activity, img1, context }) => {
  const navigate = useNavigate();
  // const [background, setbackground] = useState(false);

  const { NameActivity, IdActivity } = activity;

  return (
    <BoxCard
      sx={{
        backgroundImage: `linear-gradient(45deg, rgba(255, 0, 0, 0.2), rgba(0, 0, 150, 0.2)), url(${img1})`,
      }}
    >
      <CardViewer>
        {/* <img src={img1} alt="" /> */}
        <Typography variant="body1" textAlign="left">
          {NameActivity}
        </Typography>
      </CardViewer>
      <DownSection
      //sx={{ background }}
      >
        <Button
          onClick={() => navigate(`/activitiesview/${IdActivity}/${context}`)}
        >
          See more
        </Button>
      </DownSection>
    </BoxCard>
  );
};

export default ActivitiesViewComponent;
