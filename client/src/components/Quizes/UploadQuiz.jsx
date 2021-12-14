import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Box, styled } from "@mui/system";

const MySwal = withReactContent(Swal);

const BoxUpQuiz = styled(Box)(({ theme }) => ({
  height: "21.875rem",
  maxWidth: "20rem",
  boxShadow: "1px 1px 5px #A2A2A2",
  borderRadius: "10px",
  background: "#F9F9F9 0% 0% no-repeat padding-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  input: {
    display: "none",
  },
  label: {
    height: "140px",
    width: "140px",
    borderTop: "8px solid #0087FF",
    borderRight: "8px solid #0087FF",
    borderBottom: "5px dashed #0087FF",
    borderLeft: "3px dashed #0087FF",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(45deg)",
    cursor: "pointer",
    svg: {
      color: "#3047B0",
      transform: "rotate(-45deg)",
    },
  },
}));

const UploadQuiz = () => {
  const uploadFile = (e) => {
    console.log(e.target.files[0]);
    const fileQuiz = e.target.files[0];
    if (
      fileQuiz === undefined ||
      fileQuiz.type !== "application/vnd.ms-excel"
    ) {
      console.log("solo archivos en formato .csv");
      MySwal.fire({
        title: <p>Only files in .csv format</p>,
        icon: "error",
      });
    } else {
      console.log("archivo correcto");
      MySwal.fire({
        title: <p>File upload</p>,
        icon: "success",
      });
    }
  };

  return (
    <BoxUpQuiz>
      <label htmlFor="quiz">
        <AiOutlineFileAdd size={44} />
      </label>
      <input
        type="file"
        id="quiz"
        name="quiz"
        onChange={(e) => uploadFile(e)}
      />
    </BoxUpQuiz>
  );
};

export default UploadQuiz;
