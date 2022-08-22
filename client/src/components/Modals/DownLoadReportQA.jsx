import React, { useState } from "react";
import { Typography, Box, styled, Button, TextField } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DownloadingComponent from "../DownloadingComponent";
import ExcelJS from "exceljs";
import { requestWithData } from "../../utils/api";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/loginDuck";
import { useNavigate } from "react-router-dom";

const MainModal = styled(Box)(() => ({
  minHeight: "50vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  textAlign: "center",

  h5: {
    fontWeight: 900,
    marginBottom: "2rem",
  },
}));

const MainButtons = styled(Box)(() => ({
  button: {
    textTransform: "none",
    color: "white",
    width: "177px",
    height: "61px",
    background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
  },
}));

export const DownLoadReportQA = ({ setModal }) => {
  const navigate = useNavigate();
  const rxDispatch = useDispatch();
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noData, setNoData] = useState(false);
  const [report, setReport] = useState(false);
  const [genInfo, setGenInfo] = useState([]);
  const [genMissInfo, setGenMissInfo] = useState([]);

  const generalInfoSheet = (workbook) => {
    const worksheet = workbook.getWorksheet("General Information");
    worksheet.columns = [
      { header: "LOB", key: "LOB" },
      { header: "Team Name", key: "Team" },
      { header: "CCMS ID", key: "ccmsid" },
      { header: "User", key: "Name" },
      { header: "Level", key: "Level" },
      { header: "EXP Points", key: "ExpPoint" },
      { header: "Quartile", key: "Quartile" },
      { header: "Badges Earned", key: "BadgesEarned" },
      { header: "Missions Assigned", key: "Missions Assigned" },
      { header: "Missions Approved", key: "MissionsApproved" },
      { header: "Missions Failed", key: "MissionsFailed" },
      { header: "Missions Score", key: "MissionsScore" },
      {
        header: "Missions Questions Approved",
        key: "MissionsQuestionsApproved",
      },
      { header: "Missions Questions Failed", key: "MissionsQuestionsFailed" },
      { header: "Kpi 1", key: "Kpi1" },
      { header: "Score Kpi 1", key: "ScoreKpi1" },
      { header: "Kpi 2", key: "Kpi2" },
      { header: "Score Kpi 2", key: "ScoreKpi2" },
      { header: "Kpi 3", key: "Kpi3" },
      { header: "Score Kpi 3", key: "ScoreKpi3" },
      { header: "Kpi 4", key: "Kpi4" },
      { header: "Score Kpi 4", key: "ScoreKpi4" },
      { header: "Kpi 5", key: "Kpi5" },
      { header: "Score Kpi 5", key: "ScoreKpi5" },
    ];
    worksheet.addRows(genInfo);
  };

  const missionsInfoSheet = (workbook) => {
    const worksheet = workbook.getWorksheet("Missions Information");
    worksheet.columns = [
      { header: "Campaign", key: "nameCampaign" },
      { header: "NameLob", key: "NameLob" },
      { header: "Team", key: "NameTeam" },
      { header: "CCMS ID", key: "idccms" },
      { header: "User", key: "Agent" },
      { header: "Id Examen", key: "IdExamen" },
      { header: "Exam Name", key: "ExamName" },
      { header: "Question", key: "Pregunta" },
      { header: "Answer", key: "Respuesta" },
      { header: "Correct Answer", key: "RespuestaCorrecta" },
      {
        header: "Approval Exam",
        key: "ApprovalExam",
      },
      { header: "Result", key: "ResObtenido" },
      { header: "Aprove?", key: "Aprobo" },
      { header: "Date", key: "FechaRegistro" },
      { header: "id Campaign", key: "idCampaign" },
      { header: "idLob", key: "idLob" },
      { header: "idQuestion", key: "IdPregunta" },
    ];
    worksheet.addRows(genMissInfo);
  };

  const handleReport = async () => {
    setLoading(true);
    const data1 = await requestWithData("getgeneralanalytics", {
      initDate: date1,
      endDate: date2,
    });
    const data2 = await requestWithData("getmissionsanswers", {
      initDate: date1,
      endDate: date2,
    });

    if (data1 && data1.status === 200 && data1.data.length > 0) {
      if (data1) {
        setReport(true);
        setLoading(false);
        setGenInfo(data1.data[0].Analitycs);
        setGenMissInfo(data2.data);
      } else {
        setLoading(false);
        setNoData(true);
      }
    } else if (data1 && data1.data === "UnauthorizedError") {
      rxDispatch(logoutAction());
      navigate("/");
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("General Information");
    workbook.addWorksheet("Missions Information");

    generalInfoSheet(workbook);
    missionsInfoSheet(workbook);

    let fecha = new Date().toLocaleDateString();
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Report_${fecha}.xlsx`;
    a.click();
    a.remove();
  };
  return (
    <MainModal>
      <Typography variant="h3" color="initial">
        Select Report Dates
      </Typography>
      {loading ? (
        <>
          <Typography variant="body1" color="initial">
            This process can take time, please do not close the window until the
            report is downloaded.
          </Typography>
          <DownloadingComponent theme={"Report"} />
        </>
      ) : report ? (
        <MainButtons>
          <Button sx={{ marginRight: "2rem" }} onClick={handleDownload}>
            Download Report
          </Button>
        </MainButtons>
      ) : (
        <Box
          sx={{
            display: "flex",
            margin: "2rem 0 0 2rem",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            sx={{ width: "20rem" }}
          >
            <DatePicker
              label="Start"
              value={date1}
              onChange={(newValue) => {
                setDate1(
                  `${newValue.getFullYear()}-${
                    newValue.getMonth() + 1
                  }-${newValue.getDate()}`
                );
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End"
              value={date2}
              onChange={(newValue) => {
                setDate2(
                  `${newValue.getFullYear()}-${
                    newValue.getMonth() + 1
                  }-${newValue.getDate()}`
                );
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ m: "0 4rem" }} />
              )}
            />
          </LocalizationProvider>
        </Box>
      )}
      <MainButtons>
        <Button sx={{ marginRight: "2rem" }} onClick={() => setModal(false)}>
          Return
        </Button>
        <Button sx={{ marginRight: "2rem" }} onClick={handleReport}>
          Generate Report
        </Button>
      </MainButtons>
    </MainModal>
  );
};
