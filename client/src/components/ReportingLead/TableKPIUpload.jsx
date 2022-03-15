import React from 'react'
import { FiTrash2 } from 'react-icons/fi'; 

import { Box,  styled, Typography, IconButton } from "@mui/material";


const BoxHeaderTable = styled(Box)(() => ({
    display:'flex',
    textAlign:'center',
    backgroundColor:'#e8e8e8',
    padding:'5px', 
    borderRadius:'5px',

}))
const BoxBodyTable = styled(Box)(() => ({
    height:'40vh',
    overflowY:'scroll',
    "&::-webkit-scrollbar": {
    width: "6px",
},

"&::-webkit-scrollbar-track": {
    background: "white",
    
},
"&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e8e8e8",
    borderRadius: "20px",

  },
}))
const BoxDataTable = styled(Box)(() => ({
    display:'flex',
    alignItems:'center',
    textAlign:'center',
    backgroundColor:'#fff',
    marginTop:'10px',
    borderRadius:'5px',
    padding:'5px',
    
}))

const TableKPIUpload = ({dataKPI}) => {

  return (
   <Box padding= "1rem" >
        <BoxHeaderTable>
            <Box sx={{width:'30%'}}><Typography variant="body1" > Acron</Typography></Box>
            <Box sx={{width:'60%' }}><Typography variant="body1" > Description</Typography></Box>
            <Box sx={{width:'10%'}}></Box>
        </BoxHeaderTable>
        <BoxBodyTable>
        {
            dataKPI.map((kpi, index)=>(
        <BoxDataTable key={index}>
        <Box sx={{width:'30%'}}><Typography variant="body2" > {kpi.acron}</Typography></Box>
        <Box sx={{width:'60%' }}><Typography variant="body2" > {kpi.description}</Typography></Box>
        <Box sx={{width:'10%'}}>
        <IconButton >
                <FiTrash2  size={20}   color="#3047B0"/>
         </IconButton>
         </Box>
 </BoxDataTable>
            ))
        }
        </BoxBodyTable>
    </Box>
  )
}

export default TableKPIUpload