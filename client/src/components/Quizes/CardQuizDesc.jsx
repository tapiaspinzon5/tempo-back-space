import React from "react";
import { CgTrash } from "react-icons/cg";
import { AiOutlineEye } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { Typography, Box, styled, IconButton, Grid } from "@mui/material";
import imgTP from "../../assets/images/mission_image.jpg";
import { disabledMission } from "../../utils/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const CardQuiz = styled(Grid)(({ theme }) => ({
  // height: "21.875rem",
  // maxWidth: "20rem",
  background: "#0f0",
  margin: "0 1rem 1rem 0",
  boxShadow: "1px 1px 5px #A2A2A2",
  borderRadius: "10px",
  background: "#F9F9F9 0% 0% no-repeat padding-box",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "&:hover": {
    boxShadow: " 3px 3px 5px #A2A2A2",
    opacity: 1,
  },
  img: {
    borderRadius: "10px",
  },

  // div: {
  //   marginLeft: "auto",
  //   paddingRight: "1rem",
  //   svg: {
  //     color: "#3047B0",
  //   },
  //},
}));

const CardQuizDesc = ({ quiz, getData, showList }) => {
  const { CantidadPreguntas, DescriptionExam, NameExam, fechaRegistro } = quiz;
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
        //window.location.reload();
      }
    });
  };

  const deleteMission = async (idMission) => {
    const respDelete = await disabledMission({ idMission });

    if (respDelete.data[0]) {
      MySwal.fire({
        title: <p>{`${respDelete.data[0].Result}`}</p>,
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "Accept",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    } else {
      getData();
    }
  };

  return (
    <CardQuiz
      sx={
        showList
          ? { flexDirection: "row", height: "5rem", width: "100%" }
          : { flexDirection: "column", width: "210px", height: "18rem" }
      }
    >
      <img
        src={imgTP}
        alt=""
        loading="lazy"
        style={showList ? { height: "100%" } : { width: "100%" }}
      />
      <Box
        display="flex"
        sx={
          showList
            ? {
                alignItems: "center",
                flex: 1,
              }
            : {
                flexDirection: "column",
                flex: 1,
              }
        }
      >
        <Typography
          variant="bidy1"
          fontWeight="bold"
          color={"#3047B0"}
          m={1}
          sx={showList ? { width: "260px" } : { textAlign: "center" }}
        >
          {NameExam}
        </Typography>
        <Typography
          variant="body2"
          height="2.8rem"
          display="flex"
          m={1}
          sx={
            showList
              ? {
                  flex: 1,
                  alignItems: "center",
                }
              : {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                }
          }
        >
          {DescriptionExam}
        </Typography>
        <Typography variant="body2" align="center">
          {fecha}
        </Typography>
      </Box>
      <Box>
        <IconButton
          onClick={() => handleDelete(quiz.idexamen, NameExam)}
          disabled={true}
        >
          <AiOutlineEye size={20} color={"#3047B0"} />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(quiz.idexamen, NameExam)}
          disabled={true}
        >
          <FiEdit3 size={20} color={"#3047B0"} />
        </IconButton>
        <IconButton onClick={() => handleDelete(quiz.idexamen, NameExam)}>
          <CgTrash size={20} color={"#3047B0"} />
        </IconButton>
      </Box>

      {/* <Box>
        {" "}
      
      </Box>
      
      <Typography variant="body2" align="center">
        Questions: {CantidadPreguntas}
      </Typography> */}
    </CardQuiz>
  );
};

export default CardQuizDesc;
