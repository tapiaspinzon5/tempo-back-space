import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Box, styled } from "@mui/system";
import XLSX from "xlsx";
import { validateFields, validateHeaders } from "../../helpers/helpers";
import { uploadQuizes } from "../../utils/api";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { ButtonActionBlue, InputText } from "../../assets/styled/muistyled";
import { BiTrash } from "react-icons/bi";
import FormSetupQuiz from "./FormSetupQuiz";
import MultiOptionQuestion from "./MultiOptionQuestion";
import TreuFalseQuestion from "./TreuFalseQuestion";

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
    padding: 0,
    li: {
      height: "5px",
      width: "30%",
      marginLeft: "2px",
      borderRadius: "4px",
      border: "1px solid #3047B0",
    },
  },
}));

const UploadQuiz = ({ setLoading, topics }) => {
  const [fileName, setFileName] = useState(null);
  const [dataQuiz, setDataQuiz] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [steep, setSteep] = useState(0);
  const [categoryStep, setCategoryStep] = useState([]);
  const [question, setQuestion] = useState([]);
  const [ask, setAsk] = useState([]);
  const { quizCategory, quizDescription, quizName, quizQuestions, quizTarget } =
    dataQuiz;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setDataQuiz([]);
    setCategoryStep([]);
    setQuestion([]);
    setEmpty(false);
    setAsk([]);
    setSteep(0);
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
            ];
          });

        if (data.length > 1) {
          let differentsHeaders = validateHeaders(data[0]);

          if (differentsHeaders) {
            reject(" Wrong Headers!");
            return;
          }

          data.shift();
          //validacion de campos
          let incorrectValues = validateFields(data, topics);

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
      const context = 1;
      const resp = await uploadQuizes(data, context);

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

  // Stepper  Section
  const handleNext = async () => {
    //validaciones//
    //setup de la mision
    if (
      !quizCategory ||
      !quizDescription ||
      !quizName ||
      !quizQuestions ||
      !quizTarget
    ) {
      setEmpty(true);
      return;
    } else {
      setEmpty(false);
    }

    //validacion por pregunta
    if (ask.questionType === "multipleChoice") {
      if (
        !ask[1] ||
        !ask[2] ||
        !ask[3] ||
        !ask[4] ||
        !ask.Q ||
        !ask.answer ||
        !ask.ask
      ) {
        setEmpty(true);

        return;
      } else {
        setEmpty(false);
      }
    }

    if (ask.questionType === "trueFalse") {
      if (!ask.Q || !ask.answer || !ask.ask) {
        setEmpty(true);

        return;
      } else {
        setEmpty(false);
      }
    }

    //salto Next depregunta
    if (steep < categoryStep.length - 1) {
      setSteep((prev) => prev + 1);
    }

    //asignacion al Arreglo para enviar
    if (ask.length !== 0) {
      if (!edit) {
        setQuestion([...question, [ask]]);
      } else {
        //setQuestion([...question, [steep][0]:ask]);
      }
      setAsk({ questionType: "multipleChoice" });
      if (steep === categoryStep.length - 1) {
        handleClose();
        MySwal.fire({
          title: <p>{`Are you sure you want create the mission?`}</p>,
          icon: "info",
          showDenyButton: true,
          confirmButtonText: "Accept",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            handleUp([...question, [ask]]);
          } else if (result.isDenied) {
            handleOpen();
          }
        });
        //handleUp();
      }
    } else {
      //agrega el setup al arreglo gral
      setQuestion([...question, [dataQuiz]]);
      setAsk({ questionType: "multipleChoice" });
    }
  };

  const handleBack = () => {
    if (steep > 0) {
      setSteep((prev) => prev - 1);

      // if (!question[1]) {
      //   setAsk([]);
      // }
    }
    if (question[steep]) {
      if (steep > 0) {
        setAsk(question[steep][0]);
      }
    }
    if (steep === 0) {
      setAsk([]);
    }
  };

  const handleUp = async (data) => {
    const context = 2;

    const resp = await uploadQuizes(data, context);

    if (resp.status === 200) {
      setLoading(false);
      MySwal.fire({
        title: <p>Mission created</p>,
        icon: "success",
        confirmButtonText: "Accept",
        //allowOutsideClick: false,
      }).then((resultado) => {
        if (resultado.value) {
          window.location.reload();
        }
      });
    }

    setQuestion([]);
    setDataQuiz([]);
    setCategoryStep([]);
    setSteep(0);
    setAsk([]);
  };

  useEffect(() => {
    const handleSteppep = () => {
      const range = (start, stop, step) =>
        Array.from(
          { length: (stop - start) / step + 1 },
          (_, i) => start + i * step
        );

      setCategoryStep(range(0, dataQuiz.quizQuestions, 1));
    };

    handleSteppep();
  }, [dataQuiz.quizQuestions]);

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
              {categoryStep.map((step) => (
                <li
                  style={steep === step ? { background: "#3047B0" } : {}}
                  key={step}
                ></li>
              ))}
            </ul>
          </BoxSteeper>

          {steep > 0 ? (
            <>
              <Box display="flex" justifyContent="space-between">
                <InputText
                  name="quizName"
                  label="Quiz Name"
                  variant="outlined"
                  onChange={handleQuizSetup}
                  value={dataQuiz.quizName}
                  sx={{ width: " 42%" }}
                />
                <FormControl sx={{ width: " 35%" }}>
                  <InputLabel id="questionType-label">Question Type</InputLabel>
                  <Select
                    labelId="questionType-label"
                    name="questionType"
                    value={ask.questionType || ""}
                    label="Question Type"
                    onChange={(e) =>
                      setAsk({ ...ask, questionType: e.target.value })
                    }
                    required
                  >
                    <MenuItem value="trueFalse">True or False</MenuItem>
                    <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: " 20%" }} error={!ask.Q && empty}>
                  <InputLabel id="questionType-label">Quartile</InputLabel>
                  <Select
                    labelId="quartile-label"
                    name="quartile"
                    value={ask.Q || ""}
                    label="Quartile"
                    onChange={(e) => setAsk({ ...ask, Q: e.target.value })}
                    required
                  >
                    {["All", "Q1", "Q2", "Q3", "Q4"].map((q) => (
                      <MenuItem value={q} key={q}>
                        {q}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText color="red">
                    {!ask.Q && empty ? "Field Requiered" : ""}
                  </FormHelperText>
                </FormControl>
              </Box>
              {ask.questionType === "trueFalse" ? (
                <TreuFalseQuestion
                  steep={steep}
                  ask={ask}
                  setAsk={setAsk}
                  empty={empty}
                  question={question}
                  setEdit={setEdit}
                />
              ) : (
                <MultiOptionQuestion
                  steep={steep}
                  ask={ask}
                  setAsk={setAsk}
                  empty={empty}
                  question={question}
                  setEdit={setEdit}
                />
              )}
            </>
          ) : (
            <>
              <Box>
                <Typography variant="h6" color="#3047B0" fontWeight={700}>
                  Upload Mission
                </Typography>
                <BoxUpFile>
                  <form onSubmit={uploadFile}>
                    <label htmlFor="quiz">
                      {fileName && fileName.name}
                      {fileName ? (
                        <Box>
                          <ButtonActionBlue type="submit">
                            Upload
                          </ButtonActionBlue>
                          <IconButton onClick={() => setFileName(null)}>
                            <BiTrash />
                          </IconButton>
                        </Box>
                      ) : (
                        "Upload Mission File"
                      )}
                    </label>
                    <input
                      type="file"
                      id="quiz"
                      name="quiz"
                      onChange={(e) => setFileName(e.target.files[0])}
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
                topics={topics}
                empty={empty}
              />
            </>
          )}
          <Box display="flex" justifyContent="end" width="100%">
            {steep > 0 && (
              <ButtonActionBlue
                sx={{ marginRight: "2rem", width: "8rem" }}
                onClick={handleBack}
              >
                Back
              </ButtonActionBlue>
            )}

            <ButtonActionBlue
              sx={{ width: "8rem" }}
              disabled={fileName}
              onClick={() => {
                handleNext();
              }}
            >
              {steep < categoryStep.length - 1 || steep === 0
                ? "Next"
                : "Send Mission"}
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
