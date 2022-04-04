import React, { useState, useEffect } from "react";
import {
  MainPage,
  BoxUpFile,
  ButtonAction,
} from "../../assets/styled/muistyled";
import Footer from "../../components/Footer";
import Header from "../../components/homeUser/Header";
import { Grid, Typography, styled, Box } from "@mui/material";
import { FiDownload, FiUpload } from "react-icons/fi";
import TableKPIUpload from "../../components/ReportingLead/TableKPIUpload";
import downloadTemplate from "../../assets/filesTemplatesCSV/Load_Kpi_Template.csv";
import { ModalLoading } from "../../components/ModalLoading";
import XLSX from "xlsx";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  validateFieldsUploadKPIs,
  validateHeadersUploadKPIs,
} from "../../helpers/helpers";
import { getKPIsCampaign, uploadKPIs } from "../../utils/api";

const MySwal = withReactContent(Swal);

const Item = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  p: {
    color: "#3047B0",
  },
}));

const BoxButton = styled(Box)(() => ({
  display: "flex",
  margin: "1rem 0",
}));

/* const dataKPI = [
  { acron: "AHT", description: "Average Handle Time", idKPI: 12 },
  { acron: "SSKI", description: "Soft Skills", idKPI: 23 },
  { acron: "QA", description: "Quality Assurance", idKPI: 34 },
  { acron: "EXE", description: "Execution", idKPI: 56 },
  { acron: "ABS", description: "Absemteeism", idKPI: 67 },
]; */

const KpiUpload = () => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [dataKpi, setDataKpi] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      setTableLoading(true);
      const kpis = await getKPIsCampaign(idccms);
      setTableLoading(false);
      setDataKpi(kpis.data);
    };
    getdata();
    // eslint-disable-next-line
  }, []);

  const loadFile = (e) => {
    setLoading(true);
    const fileCSV = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        //Parse data
        const ab = e.target.result;
        const wb = XLSX.readFile(ab, {
          type: "array",
          cellDates: true,
          cellText: false,
          cellNF: false,
        });
        //Get first worksheet
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        //Convert array of arrays
        const data = XLSX.utils
          .sheet_to_json(ws, {
            header: 1,
            defval: "",
            blankrows: true,
            raw: true,
            //dateNF: "yyyy-mm-dd",
          })
          .map((colum) => {
            console.log(colum[4]);
            return [
              colum[0]?.toString(),
              colum[1]?.toString(),
              isNaN(parseInt(colum[2])) ? colum[2] : parseFloat(colum[2]),
              isNaN(parseInt(colum[3])) ? colum[3] : parseFloat(colum[3]),
              colum[4] === "Date"
                ? colum[4]
                : `${colum[4].getFullYear()}-${
                    colum[4].getMonth() + 1
                  }-${colum[4].getDate()}`,
              isNaN(parseInt(colum[5])) ? colum[5] : parseFloat(colum[5]),
            ];
          });

        if (data.length > 1) {
          let differentsHeaders = validateHeadersUploadKPIs(data[0]);

          if (differentsHeaders) {
            reject(" Wrong Headers!");
            return;
          }

          data.shift();
          let incorrectValues = validateFieldsUploadKPIs(data);

          if (incorrectValues) {
            reject(" Wrong values!");
            return;
          }
          resolve(data);
        } else {
          reject("No data!");
        }
        //Update state
      };
      reader.readAsArrayBuffer(fileCSV);
    });
  };

  const uploadFile = async (e) => {
    const fileCSV = e.target.files[0];
    let data;
    if (
      fileCSV === undefined ||
      (fileCSV.type !== "text/csv" &&
        fileCSV.type !== "application/vnd.ms-excel")
    ) {
      setLoading(false);
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
        MySwal.fire({
          title: <p> {error} </p>,
          icon: "error",
        });
        e.target.value = null;
        return;
      }

      //setData(data);
      const resp = await uploadKPIs(data, idccms);

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

  const downloadFile = () => {
    var link = document.createElement("a");
    link.setAttribute("download", "Upload KPI template");
    //link.href = Quiz_template;
    link.href = downloadTemplate;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <MainPage minHeight="100vh">
      {loading && <ModalLoading />}
      <Header />
      <Typography variant="h5">Kpi's Upload Section</Typography>
      <BoxButton>
        <ButtonAction startIcon={<FiDownload />} onClick={() => downloadFile()}>
          Download Template
        </ButtonAction>
        <BoxUpFile>
          <label htmlFor="kpi">
            <FiUpload size={20} />
            Upload
          </label>
          <input
            type="file"
            id="kpi"
            name="kpi"
            onChange={(e) => uploadFile(e)}
          />
        </BoxUpFile>
      </BoxButton>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Item>
            <TableKPIUpload dataKPI={dataKpi} tableLoading={tableLoading} />
          </Item>
        </Grid>
      </Grid>
      <Footer />
    </MainPage>
  );
};

export default KpiUpload;
