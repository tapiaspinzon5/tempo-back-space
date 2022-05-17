import React, { useState } from "react";
import { Box, Typography, Switch } from "@mui/material";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import {
  BoxBodyTable,
  BoxDataTable,
  BoxHeaderTable,
} from "../../assets/styled/muistyled";

const TableAgentUpload = ({ dataAgent }) => {
  const [agents, setAgents] = useState(dataAgent);
  const [order, setOrder] = useState("ASC");
  const [column, setColumn] = useState("");

  const handleOrder = (col) => {
    if (order === "ASC") {
      const sorted = [...agents].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setAgents(sorted);
      setOrder("DSC");
    } else if (order === "DSC") {
      const sorted = [...agents].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setAgents(sorted);
      setOrder("ASC");
    }
    setColumn(col);
  };

  return (
    <Box padding="1rem">
      <BoxHeaderTable>
        <Box sx={{ width: "25%" }} onClick={() => handleOrder("agent")}>
          <Typography variant="body1">
            {" "}
            Agents
            {order === "ASC" && column === "agent" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "20%" }} onClick={() => handleOrder("ccmsid")}>
          <Typography variant="body1">
            {" "}
            CCMS
            {order === "ASC" && column === "ccmsid" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "20%" }} onClick={() => handleOrder("teamLead")}>
          <Typography variant="body1">
            {" "}
            Team Lead
            {order === "ASC" && column === "teamLead" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "25%" }}>
          <Typography variant="body1" onClick={() => handleOrder("lob")}>
            {" "}
            LOB
            {order === "ASC" && column === "lob" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "5%" }} />
      </BoxHeaderTable>
      <BoxBodyTable>
        {agents.map((agent, index) => (
          <BoxDataTable key={index}>
            <Box sx={{ width: "25%" }}>
              <Typography variant="body2"> {agent.agent}</Typography>
            </Box>
            <Box sx={{ width: "20%" }}>
              <Typography variant="body2"> {agent.ccmsid}</Typography>
            </Box>
            <Box sx={{ width: "20%" }}>
              <Typography variant="body2">{agent.teamLead} </Typography>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Typography variant="body2">{agent.lob} </Typography>
            </Box>
            <Box sx={{ width: "5%" }}>
              {" "}
              <Switch
                //checked={}
                //onChange={handleChange}
                name="checkedA"
                size="small"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Box>
          </BoxDataTable>
        ))}
      </BoxBodyTable>
    </Box>
  );
};

export default TableAgentUpload;
