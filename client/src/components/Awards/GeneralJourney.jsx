import { useEffect, useState } from "react";
import { Grid, Box, styled, Typography } from "@mui/material";
import HeadWinners from "./HeadWinners";
import bgPodium from "../../assets/images/awards/bgPodium.png";
import imagePodium1 from "../../assets/images/awards/primero.png";
import imagePodium2 from "../../assets/images/awards/segundo.png";
import imagePodium3 from "../../assets/images/awards/tercero.png";
import first from "../../assets/images/awards/first.png";
import second from "../../assets/images/awards/second.png";
import tirdth from "../../assets/images/awards/thirt.png";
import Liston from "./Liston";
import "../../assets/styled/awards.css";
import { requestWithData } from "../../utils/api";

const BoxPodium = styled(Box)(() => ({
  backgroundImage: `url(${bgPodium})`,
  backgroundRepeat: `no-repeat`,
  backgroundSize: "contain",
  backgroundPosition: "center bottom",
  width: "80%",
  //height: { xs: "70vh", xl: "72vh" },
}));

const Boxposition = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  span: {
    background: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
    marginTop: ".5rem",
    padding: "3px 8px",
    borderRadius: "3px",
    color: "#fff",
  },
}));

const GeneralJourney = ({ setSection, handleClose, dataGJ }) => {
  return (
    <Grid
      height={"100%"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <HeadWinners
        setSection={setSection}
        title="General Juorney"
        handleClose={handleClose}
      />
      <Box
        width={1}
        display="flex"
        justifyContent="center"
        //alignItems="flex-end"
        height={"auto"}
      >
        <BoxPodium>
          <Box display="flex" justifyContent="space-evenly" marginBottom={6}>
            <Boxposition sx={{ marginTop: { xs: "6rem", xl: "8rem" } }}>
              <img src={imagePodium2} alt="" width="60%" />
              <Box sx={{ marginTop: "-3rem" }}>
                <Liston
                  name={dataGJ[1]?.Agent?.toLowerCase() || ""}
                  sx={{ width: "200px" }}
                />
              </Box>
              <Typography
                variant="caption"
                gutterBottom
                textTransform="capitalize"
              >
                TL. {dataGJ[0]?.TL?.toLowerCase() || ""}
              </Typography>

              <img src={second} alt="" width="13%" />
            </Boxposition>
            {/* //////////////// */}
            <Boxposition>
              <img src={imagePodium1} alt="" width="60%" />
              <Box sx={{ marginTop: "-3rem" }}>
                <Liston name={dataGJ[0]?.Agent?.toLowerCase() || ""} />
              </Box>
              <Typography
                variant="caption"
                gutterBottom
                textTransform="capitalize"
              >
                TL. {dataGJ[0]?.TL?.toLowerCase() || ""}
              </Typography>

              <img src={first} alt="" width="15%" />
            </Boxposition>
            {/* //////////////// */}
            <Boxposition sx={{ marginTop: { xs: "6rem", xl: "9rem" } }}>
              <img src={imagePodium3} alt="" width="60%" />
              <Box sx={{ marginTop: "-3rem" }}>
                <Liston name={dataGJ[2]?.Agent?.toLowerCase() || ""} />
              </Box>
              <Typography
                variant="caption"
                gutterBottom
                textTransform="capitalize"
              >
                TL. {dataGJ[0]?.TL?.toLowerCase() || ""}
              </Typography>

              <img src={tirdth} alt="" width="13%" />
            </Boxposition>
            {/* //////////////// */}
          </Box>
        </BoxPodium>
      </Box>
    </Grid>
  );
};

export default GeneralJourney;
