import React, { useState, useEffect } from "react";
import { MainPage } from '../../assets/styled/muistyled'
import Footer from '../../components/Footer'
import Header from '../../components/homeUser/Header'
import { Grid, Typography, styled, Box, Button } from '@mui/material'
import { FiDownload, FiUpload } from 'react-icons/fi'
import TableKPIUpload from '../../components/ReportingLead/TableKPIUpload'
import downloadTemplate from "../../assets/filesTemplatesCSV/Load_Kpi_Template.csv"
import { ModalLoading } from "../../components/ModalLoading";
import XLSX from "xlsx";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { validateFieldsUploadKPIs, validateHeadersUploadKPIs } from "../../helpers/helpers";
import { uploadKPIs } from "../../utils/api";

const MySwal = withReactContent(Swal);

const Item = styled(Box)(() => ({
  background: "#f9f9f9",
  borderRadius: "10px",
  p: {
    color: "#3047B0",
},

}));

const BoxButton= styled(Box)(( ) => ({
display:'flex',
margin:'1rem 0',
button:{
  boxShadow: "1px 1px 2px #A2A2A2",
  height: "2.5rem",
  borderRadius: "8px",
  background: "#F9F9F9 0% 0% no-repeat padding-box",
  marginRight:'2rem',
  textTransform:'none',
  color: "#3047B0",
  '&:hover':{
    boxShadow: "1px 1px 5px #A2A2A2",
  }
}

}))
const BoxUpKPI = styled(Box)(() => ({
  height: "2.5rem",
  width: "8rem",
  boxShadow: "1px 1px 3px #A2A2A2",
  borderRadius: "8px",
  background: "#F9F9F9 0% 0% no-repeat padding-box",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
   '&:hover':{
    boxShadow: "1px 1px 5px #A2A2A2",
  },
  input: {
    display: "none",
  },
  label: {
    cursor: "pointer",
    fontSize:'14px',
    color: "#3047B0",
    svg: {
      marginRight:'.5rem'
    },
  },
}));


const dataKPI = [
  {acron: 'AHT', description:'Average Handle Time', idKPI: 12},
  {acron: 'SSKI', description:'Soft Skills', idKPI: 23},
  {acron: 'QA', description:'Quality Assurance', idKPI: 34},
  {acron: 'EXE', description:'Execution', idKPI: 56},
  {acron: 'ABS', description:'Absemteeism', idKPI: 67},
]

const KpiUpload = () => {
  const userData = useSelector((store) => store.loginUser.userData);
  const idccms = userData.Idccms;
  const [loading, setLoading] = useState(false);

  const loadFile = (e) => {
    setLoading(true);
    const fileCSV = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        //Parse data
        const ab = e.target.result;
        const wb = XLSX.read(ab, { type: "array",cellDates:true,cellText:false });
        //Get first worksheet
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        //Convert array of arrays
        //const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const data = XLSX.utils
          .sheet_to_json(ws, { header: 1, raw:false,dateNF:"yyyy-mm-dd"})
          .map((colum) => {
            console.log(parseInt(colum[2]))
            return [
              colum[0]?.toString(),
              colum[1]?.toString(),
             isNaN(parseInt(colum[2]))?colum[2]: parseInt(colum[2]),
             isNaN(parseInt(colum[2]))?colum[3]: parseInt(colum[3]),
             colum[4]?.toString(),
             isNaN(parseInt(colum[2]))?colum[5]: parseInt(colum[5]),
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
    if (fileCSV === undefined || fileCSV.type !== "application/vnd.ms-excel") {
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
    <MainPage minHeight='100vh'>
      {loading && <ModalLoading />}
    <Header/>
    <Typography variant="h5" >Kpi's Upload Section</Typography>
<BoxButton>
   <Button  startIcon={<FiDownload />} onClick={() => downloadFile()}>
  Download Template
</Button>
    <BoxUpKPI>
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
    </BoxUpKPI>
</BoxButton>
    <Grid container >
    <Grid item xs={12} md={8} >
        <Item>
    <TableKPIUpload dataKPI={dataKPI}/>
        </Item>
    </Grid>
</Grid>
    <Footer/>
    </MainPage>
  )
}

export default KpiUpload