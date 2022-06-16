import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  BoxBodyTable,
  BoxDataTable,
  BoxHeaderTable,
} from "../../assets/styled/muistyled";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

const UserTablePermissions = ({ dataAgent, setCheckUser }) => {
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
    <Box padding={1}>
      <BoxHeaderTable>
        <Box sx={{ width: "10%" }}></Box>
        <Box sx={{ width: "15%" }} onClick={() => handleOrder("idccms")}>
          <Typography variant="body1">
            {" "}
            CCMS
            {order === "ASC" && column === "idccms" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "25%" }} onClick={() => handleOrder("name")}>
          <Typography variant="body1">
            {" "}
            Name
            {order === "ASC" && column === "name" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "25%" }} onClick={() => handleOrder("team")}>
          <Typography variant="body1">
            {" "}
            Team
            {order === "ASC" && column === "team" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "25%" }} onClick={() => handleOrder("lob")}>
          <Typography variant="body1">
            {" "}
            LOB
            {order === "ASC" && column === "lob" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "25%" }} onClick={() => handleOrder("campaign")}>
          <Typography variant="body1">
            {" "}
            Campaign
            {order === "ASC" && column === "campaign" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
        <Box sx={{ width: "25%" }} onClick={() => handleOrder("rol")}>
          <Typography variant="body1">
            {" "}
            Rol
            {order === "ASC" && column === "rol" ? (
              <RiArrowDownSFill />
            ) : (
              <RiArrowUpSFill />
            )}
          </Typography>
        </Box>
      </BoxHeaderTable>
      <BoxBodyTable>
        {agents.map((agent, index) => (
          <BoxDataTable key={index}>
            <Box sx={{ width: "10%" }}>
              <input
                type="radio"
                id="user"
                name="user"
                value={agent.idccms}
                onChange={(e) => setCheckUser(e.target.value)}
                style={{ height: "1.2rem", width: "1.2rem" }}
              />
            </Box>
            <Box sx={{ width: "15%" }}>
              <Typography variant="body2"> {agent.idccms}</Typography>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Typography variant="body2"> {agent.name}</Typography>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Typography variant="body2"> {agent.team}</Typography>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Typography variant="body2"> {agent.lob}</Typography>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Typography variant="body2"> {agent.campaign}</Typography>
            </Box>
            <Box sx={{ width: "25%" }}>
              <Typography variant="body2"> {agent.rol}</Typography>
            </Box>
          </BoxDataTable>
        ))}
      </BoxBodyTable>
    </Box>
  );
};

export default UserTablePermissions;
