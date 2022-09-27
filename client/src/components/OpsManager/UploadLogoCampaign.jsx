import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  styled,
  IconButton,
  Tooltip,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { MdInfoOutline } from "react-icons/md";
import { ButtonActionBlue } from "../../assets/styled/muistyled";
import logo1 from "../../assets/images/logo-tp-blue.svg";
import { FiFilePlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { requestWithData } from "../../utils/api";

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
  const userData = useSelector((store) => store.loginUser.userData);
  const { IdCampaign } = userData;
  const [logo, setLogo] = useState({
    file: null,
    img: null,
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(10);
  const [urlImg, setUrlImg] = useState("");
  const [error, setError] = useState("");

  const handleLogo = (e) => {
    const file = e.target.files[0];

    //console.log(file);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg+xml"
    ) {
      setError("");
      setLogo({
        file,
        img: URL.createObjectURL(e.target.files[0]),
      });
    } else if (file.size > 500000) {
      setError("Max size 5Mb");
      setLogo({
        file: null,
        img: null,
      });
    } else {
      setError("Only files in .png or .jpg format");
      setLogo({
        file: null,
        img: null,
      });
    }
  };

  const updateFiles = async () => {
    setLoading(true);

    if (!logo.file) return;
    const storageRef = ref(
      storage,
      `/Gamification/logosCampaign/${IdCampaign}`
    );
    const uploadTask = uploadBytesResumable(storageRef, logo.file);
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
          //console.log(url);
          setUrlImg(url);
          setUrlDB(url);
        });
      }
    );

    setLogo({
      file: null,
      img: null,
    });
    setLoading(false);
    setProgress(0);
  };

  const setUrlDB = async (url) => {
    // console.log("vamos a enviar esta vuelta a la base de datos: ", url);
    const uploadLogo = await requestWithData("uploadopsm", {
      context: 0,
      idLeader: 0,
      caso: 3,
      imageUrl: url,
      emails: [],
    });

    //  console.log(uploadLogo);
  };
  //console.log(urlImg);
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
              <label
                htmlFor="logoCampaign"
                style={error ? { border: "1px solid #f00" } : {}}
              >
                Upload <FiFilePlus size={22} />
              </label>
              <input
                type="file"
                id="logoCampaign"
                onChange={(e) => handleLogo(e)}
              />
            </BoxUploadFile>
            {error && <FormHelperText error>{error}</FormHelperText>}
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
                disabled={error || !logo.file ? true : false}
                onClick={() => updateFiles()}
              >
                Assignment
              </ButtonActionBlue>
            </Box>
          </Box>
          <Box display="flex" justifyContent="left" width="51%" marginLeft={1}>
            {progress > 0 ? (
              <img src={logo.img || logo1} alt="Logo Campaign" height={45} />
            ) : (
              <CircularProgress variant="determinate" value={progress} />
            )}
          </Box>
        </BoxRole>
      </Grid>
    </Grid>
  );
};

export default UploadLogoCampaign;
