import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, styled } from "@mui/material";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { GiSandsOfTime } from "react-icons/gi";
import {
  BoxBodyTable,
  BoxDataTable,
  BoxHeaderTable,
} from "../../assets/styled/muistyled";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#e8e8e8e1",
    color: "#46474bfb",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(8),
    border: "1px solid #dadde9",
  },
}));

const TableAgentUpload = ({ dataAgent, handleState }) => {
  const [agents, setAgents] = useState([]);
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
  useEffect(() => {
    setAgents(dataAgent);
  }, [dataAgent]);
  console.log(agents);
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
          <BoxDataTable
            key={index}
            sx={
              agent.Request
                ? {
                    background: "#aac4fca9",
                    "&:hover": {
                      background: "#aac4fca9",
                    },
                  }
                : {}
            }
          >
            <Box sx={{ width: "25%" }}>
              <Typography variant="body2"> {agent.Agent} </Typography>
            </Box>
            <Box sx={{ width: "20%" }}>
              <Typography variant="body2"> {agent.Ident}</Typography>
            </Box>
            <Box sx={{ width: "20%" }}>
              <HtmlTooltip
                arrow
                placement="top"
                title={
                  <>
                    <Typography color="inherit" variant="caption">
                      Team Leader: {agent.NameTL}
                    </Typography>
                  </>
                }
              >
                <Typography variant="body2">{agent.NameTeam} </Typography>
              </HtmlTooltip>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Typography variant="body2">{agent.Lob} </Typography>
            </Box>
            <Box sx={{ width: "5%" }}>
              <IconButton
                onClick={() => handleState(agent.Ident)}
                disabled={agent.Request}
              >
                {agent.Request ? (
                  <GiSandsOfTime color="#3047B0" size={18} />
                ) : (
                  <BsTrash color="#3047B0" size={18} />
                )}
              </IconButton>
            </Box>
          </BoxDataTable>
        ))}
      </BoxBodyTable>
    </Box>
  );
};

export default TableAgentUpload;
