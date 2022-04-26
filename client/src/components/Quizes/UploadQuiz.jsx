import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Box, styled } from "@mui/system";
import XLSX from "xlsx";
import { validateFields, validateHeaders } from "../../helpers/helpers";
import { uploadQuizes } from "../../utils/api";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import { ButtonActionBlue } from "../../assets/styled/muistyled";
import { BiTrash } from "react-icons/bi";
import FormSetupQuiz from "./FormSetupQuiz";

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
}));

const BoxUpFile = styled(Box)(() => ({
  margin: "1rem 0",
  input: {
    display: "none",
  },
  label: {
    height: "1.5rem",
    width: "100%-1rem",
    border: "1px solid #3047B0",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "1rem",
    color: "#3047B0",
  },
}));

const ButtonAddMission = styled(Button)(() => ({
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
}));

const ModalBox = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  borderRadius: "20px",
  boxShadow: "2px 2px 5px #2f2f2f",
  padding: "1rem",
  backgroundColor: "RGBA(255,255,255,0.9)",
}));
const BoxSteeper = styled(Box)(() => ({
  ul: {
    display: "flex",
    listStyle: "none",
    margin: "2rem 0",
    li: {
      height: "5px",
      width: "30%",
      marginLeft: "2px",
      borderRadius: "4px",
      border: "1px solid #3047B0",
    },
  },
}));

const UploadQuiz = ({ setLoading }) => {
  const [fileName, setFileName] = useState(null);
  const [dataQuiz, setDataQuiz] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const loadFile = (e) => {
    setLoading(true);
    const fileQuiz = e.target[2].files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        /* Parse data */
        const ab = e.target.result;
        const wb = XLSX.read(ab, { type: "array" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        
        const data = XLSX.utils
          .sheet_to_json(ws, { header: 1 })
          .map((colum) => {
            return [
              colum[0]?.toString(),
              colum[1]?.toString(),
              colum[2]?.toString(),
              colum[3]?.toString(),
              colum[4]?.toString(),
              colum[5]?.toString(),
              colum[6]?.toString(),
              colum[7]?.toString(),
              colum[8]?.toString(),
              colum[9],
              colum[10]?.toString(),
              colum[11]?.toString(),
            ];
          });

        if (data.length > 1) {
          let differentsHeaders = validateHeaders(data[0]);

          if (differentsHeaders) {
            reject(" Wrong Headers!");
            return;
          }

          data.shift();
          let incorrectValues = validateFields(data);

          if (incorrectValues) {
            reject(" Wrong values!");
            return;
          }
          resolve(data);
        } else {
          reject("No data!");
        }
        /* Update state */
      };
      reader.readAsArrayBuffer(fileQuiz);
    });
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const fileQuiz = e.target[2].files[0];
    let data = [];
    handleClose();
    if (
      fileQuiz === undefined ||
      (fileQuiz.type !== "text/csv" &&
        fileQuiz.type !== "application/vnd.ms-excel")
    ) {
      setLoading(false);
      setFileName(null);
      MySwal.fire({
        title: <p>Only files in .csv format</p>,
        icon: "error",
      });
    } else {
      try {
        data = await loadFile(e);
        e.target.value = null;
      } catch (error) {
        setLoading(false);
        setFileName(null);
        MySwal.fire({
          title: <p> {error} </p>,
          icon: "error",
        });
        e.target.value = null;
        return;
      }

      //setData(data);
      const resp = await uploadQuizes({ data });

      if (resp.status === 200) {
        setLoading(false);
        MySwal.fire({
          title: <p>File upload</p>,
          icon: "success",
          confirmButtonText: "Accept",
          allowOutsideClick: false,
        }).then((resultado) => {
          if (resultado.value) {
            window.location.reload();
          }
        });
      }
    }
  };

  const handleQuizSetup = (e) => {
    setDataQuiz({
      ...dataQuiz,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <BoxUpQuiz>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox sx={{ width: { xs: "390px", md: "500px", lg: "500px" } }}>
          <BoxSteeper>
            <ul>
              <li style={{ background: "#3047B0" }}></li>
              <li></li>
              <li></li>
            </ul>
          </BoxSteeper>
          <Box>
            <Typography variant="h6" color="#3047B0" fontWeight={700}>
              Upload Quiz
            </Typography>
            <BoxUpFile>
              <form onSubmit={uploadFile}>
                <label htmlFor="quiz">
                  {fileName && fileName.name}
                  {fileName ? (
                    <Box>
                      <ButtonActionBlue type="submit">Upload</ButtonActionBlue>
                      <IconButton onClick={() => setFileName(null)}>
                        <BiTrash />
                      </IconButton>
                    </Box>
                  ) : (
                    "Upload Quiz File"
                  )}
                </label>
                <input
                  type="file"
                  id="quiz"
                  name="quiz"
                  onChange={(e) => setFileName(e.target.files[0])}
                  // onChange={(e) => uploadFile(e)}
                />
              </form>
            </BoxUpFile>
            <Typography variant="h7" color="#3047B0" fontWeight={700}>
              Complete the form
            </Typography>
          </Box>
          <FormSetupQuiz
            handleQuizSetup={handleQuizSetup}
            fileName={fileName}
            dataQuiz={dataQuiz}
          />
          <Box display="flex" justifyContent="end" width="100%">
            {/* <ButtonActionBlue sx={{ marginRight: "2rem" }}>
              Back
            </ButtonActionBlue> */}
            <ButtonActionBlue
              //disabled={fileName ? true : false}
              disabled
            >
              Next
            </ButtonActionBlue>
          </Box>
        </ModalBox>
      </Modal>

      <ButtonAddMission onClick={handleOpen}>
        <AiOutlineFileAdd size={44} />
      </ButtonAddMission>
    </BoxUpQuiz>
  );
};

export default UploadQuiz;
