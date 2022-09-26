import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  styled,
  IconButton,
  Tooltip,
} from "@mui/material";
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { MdInfoOutline } from "react-icons/md";
import { ButtonActionBlue } from "../../assets/styled/muistyled";
import logo1 from "../../assets/images/logo-tp-blue.svg";
import { FiFilePlus } from "react-icons/fi";

const BoxRole = styled(Grid)(() => ({
  height: "8rem",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#F9F9F9",
  boxShadow: "3px 3px 5px #00000029",
  borderRadius: "10px",
  padding: "0.5rem",
}));

const BoxUploadFile = styled(Box)(() => ({
  //background: "#fff",
  input: {
    display: "none",
  },
  label: {
    display: "inline-block",
    width: "100%-1rem",
    border: "1px solid #c4c3c3",
    height: "3rem",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    color: "#3047b0",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const UploadLogoCampaign = () => {
  const [logo, setLogo] = useState({
    file: null,
    img: null,
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImg, setUrlImg] = useState("");

  const handleLogo = (e) => {
    setLogo({
      file: e.target.files[0],
      img: URL.createObjectURL(e.target.files[0]),
    });
  };

  const updateFiles = (file, name, key) => {
    setLoading(true);
    console.log(file, name);
    if (!file) return;
    const storageRef = ref(storage, `/Gamification/logosCampaign/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // console.log(url);
          setUrlImg(url);
        });
      }
    );
    setLoading(false);
  };

  console.log(logo);
  return (
    <Grid container>
      <Grid item xs={12} md={2}>
        <Box display="flex" alignItems="center" height="100%">
          <Typography variant="h6" color="#3047b0">
            Account Logo Bar
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <BoxRole>
          <Box width="40%" sx={{}}>
            <BoxUploadFile>
              <label htmlFor="logoCampaign">
                Upload <FiFilePlus size={22} />
              </label>
              <input
                type="file"
                id="logoCampaign"
                onChange={(e) => handleLogo(e)}
              />
            </BoxUploadFile>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "3px",
              }}
            >
              <Tooltip
                title={
                  <>
                    <Typography variant="caption" color="initial">
                      Only Files .png or .jpg format
                    </Typography>
                  </>
                }
              >
                <IconButton sx={{ background: "#fff", marginRight: "1rem" }}>
                  <MdInfoOutline color="#3047B0" />
                </IconButton>
              </Tooltip>
              <ButtonActionBlue
                disabled={logo.file ? false : true}
                //onClick={() => handleSubmitRL(rLead, newRL)}
              >
                Assignment
              </ButtonActionBlue>
            </Box>
          </Box>
          <Box display="flex" justifyContent="left" width="51%" marginLeft={1}>
            <img src={logo.img || logo1} alt="Logo Campaign" height={60} />
          </Box>
        </BoxRole>
      </Grid>
    </Grid>
  );
};

export default UploadLogoCampaign;
