import React from 'react'
import { MainPage } from '../../assets/styled/muistyled'
import Footer from '../../components/Footer'
import Header from '../../components/homeUser/Header'
import { Grid, Typography, styled, Box, Button } from '@mui/material'
import { FiDownload, FiUpload } from 'react-icons/fi'
import TableKPIUpload from '../../components/ReportingLead/TableKPIUpload'


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

    const uploadFile = (e) => {
    const fileKPI = e.target.files[0];
    console.log(fileKPI)
    }

  return (
    <MainPage minHeight='100vh'>
    <Header/>
    <Typography variant="h5" >Kpi's Upload Section</Typography>
<BoxButton>
   <Button  startIcon={<FiDownload />}>
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