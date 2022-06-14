import React, { useState, useEffect } from "react";
import { Typography, Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/temp-image/Enmascarargrupo2044.png";

const BoxCard = styled(Box)(() => ({
  maxWidth: "19.6rem",
  borderRadius: "10px",
}));

const CardViewer = styled(Box)(({ theme }) => ({
  height: "9rem",
  maxWidth: "100%",
  boxShadow: "1px 1px 5px #A2A2A2",
  borderRadius: "10px 10px 0 0 ",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "start",
  padding: "1rem",
  color: "white",
  boxSizing: "border-box",
  img: {
    background: "blue",
    height: "90px",
    width: "90px",
    borderRadius: "50%",
  },
  "&:hover": {
    boxShadow: " 3px 3px 5px #A2A2A2",
    opacity: 1,
  },
}));

const DownSection = styled(Box)(({ theme }) => ({
  boxShadow: "1px 1px 5px #A2A2A2",
  maxWidth: "20rem",
  height: "4rem",
  background: "red",
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

const CardActivityManage = ({ quiz }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [background, setbackground] = useState(false);
  const { EstadoExamen, ExamName, IdExamen, expTime, CantidadPreguntas } = quiz;

  useEffect(() => {
    switch (EstadoExamen) {
      case "Failed":
        setbackground("rgba(255, 0, 0, 0.616) 0% 0% no-repeat padding-box");
        setActive(true);
        break;
      case "Pending":
        setbackground("rgba(245, 210, 0, 0.616) 0% 0% no-repeat padding-box");

        break;
      case "Start":
        setbackground(
          "transparent linear-gradient(180deg, rgba(48, 71, 176, 0.616) 0%, rgba(0, 135, 255, 0.616) 100%) 0% 0% no-repeat padding-box"
        );
        break;
      case "Approved":
        setbackground("#00D769 0% 0% no-repeat padding-box");
        setActive(true);
        break;
      default:
        break;
    }
    //eslint-disable-next-line
  }, [EstadoExamen]);

  return (
    <>
      <BoxCard
        sx={{
          backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 150, 0.2)),url(${img1})`,
        }}
      >
        <CardViewer>
          <Typography variant="body1">{ExamName}</Typography>
          <Typography variant="body2">
            # Questions: {CantidadPreguntas}
          </Typography>
          <Typography variant="body2">Exp. Time: {expTime}</Typography>
        </CardViewer>
        <DownSection sx={{ background }}>
          <Button
            onClick={() =>
              navigate(`/quizdetails/${IdExamen}/${EstadoExamen}/${ExamName}`)
            }
            disabled={active}
          >
            {EstadoExamen}
          </Button>
        </DownSection>
      </BoxCard>
    </>
  );
};

export default CardActivityManage;
