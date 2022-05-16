import React from "react";
import { CgTrash } from "react-icons/cg";
import { Typography, Box, styled, IconButton } from "@mui/material";
import imgTP from "../../assets/images/tp_short.png";
import { disabledMission } from "../../utils/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const CardQuiz = styled(Box)(({ theme }) => ({
  height: "21.875rem",
  maxWidth: "20rem",
  boxShadow: "1px 1px 5px #A2A2A2",
  borderRadius: "10px",
  background: "#F9F9F9 0% 0% no-repeat padding-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",

  img: {
    background: "blue",
    height: "104px",
    width: "104px",
    borderRadius: "50%",
  },
  "&:hover": {
    boxShadow: " 3px 3px 5px #A2A2A2",
    opacity: 1,
  },
  div: {
    marginLeft: "auto",
    paddingRight: "1rem",
    svg: {
      color: "#3047B0",
    },
  },
}));

const CardQuizDesc = ({ quiz }) => {
  const { CantidadPreguntas, Descripcion, NameExam, fechaRegistro } = quiz;
  let fecha;
  let hora;
  let fechaBase = new Date(fechaRegistro).toLocaleString([], {
    timeZone: "Etc/UTC",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let now = new Date().toLocaleString([], {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let fa = new Date(
    `${now.split("/")[1]}/${now.split("/")[0]}/${now.split("/")[2]}`
  );
  let fb = new Date(
    `${fechaBase.split("/")[1]}/${fechaBase.split("/")[0]}/${
      fechaBase.split("/")[2]
    }`
  );
  if (
    now.replace(",", "").split(" ")[0] ===
    fechaBase.replace(",", "").split(" ")[0]
  ) {
    hora = Math.trunc((fa - fb) / 60000);
    if (hora < 31) {
      fecha = `${hora} minutes ago`;
    } else {
      fecha = fechaBase.replace(",", "").split(" ")[1];
    }
  } else {
    fecha = fechaBase.replace(",", "").split(" ")[0];
  }

  const handleDelete = async (idMission, missionName) => {
    MySwal.fire({
      title: <p>{`Are you sure you want to delete ${missionName}?`}</p>,
      icon: "info",
      showDenyButton: true,
      confirmButtonText: "Accept",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMission(idMission);
        window.location.reload();
      } else if (result.isDenied) {
        console.log("no se quito nada ");
      }
    });
  };

  const deleteMission = async (idMission) => {
    const data = await disabledMission({ idMission });
    console.log(data);
  };

  return (
    <CardQuiz>
      <Box>
        {" "}
        <IconButton onClick={() => handleDelete(quiz.idexamen, NameExam)}>
          <CgTrash />
        </IconButton>
      </Box>

      <img src={imgTP} alt="" />

      <Typography variant="h6" fontWeight="bold" align="center">
        {NameExam}
      </Typography>
      <Typography variant="body2" align="center">
        {Descripcion}
      </Typography>
      <Typography variant="body2" align="center">
        {fecha}
      </Typography>
      <Typography variant="body2" align="center">
        Questions: {CantidadPreguntas}
      </Typography>
    </CardQuiz>
  );
};

export default CardQuizDesc;
