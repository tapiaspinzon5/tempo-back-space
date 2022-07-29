import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import { ButtonActionBlue, InputText } from "../../assets/styled/muistyled";

const BoxMain = styled(Box)(() => ({
  padding: "1rem",
  borderRadius: "10px",
  boxShadow: "1px 1px 5px #e9e9e9",
}));
const BoxSearch = styled(Box)(() => ({
  // marginBottom: "1rem",
  input: {
    padding: "5px 1rem",
    borderRadius: "10px",
    border: "1px solid #0087FF",
    ":focus": {
      color: "#3047B0",
    },
  },
}));
const BoxAccounts = styled(Box)(() => ({
  width: "100%",
  overflow: "scroll",
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

  label: {
    color: "#3047B0",
  },
}));

const SearchDirCampaign = ({
  dataCampaign,
  setShowAccounts,
  newUser,
  setNewUser,
  check,
  setCheck,
}) => {
  const [search, setSearch] = useState("");
  const [dataAccount, setDataAccount] = useState(dataCampaign);
  // const [check, setCheck] = useState(newUser?.idCampaign || []);

  const handleFilter = (e) => {
    setSearch(e.target.value);
    let accountIn = e.target.value;
    const dataFilter = dataCampaign.filter((account) =>
      account.nameCampaign.toLowerCase().includes(accountIn.toLowerCase())
    );
    setDataAccount(dataFilter);
  };

  const handleSelectAccount = (e) => {
    // let tempList = dataAccount.map((acc) =>
    //   acc.IdAccount === e.target.value ? { ...acc, checked: !acc.checked } : acc
    // );
    //console.log(tempList);

    setCheck([...check, e.target.value]);
    // const accountCheck = dataAccount.map((account) => {
    //   if (e.target.value === dataAccount.IdCampaign) {
    //     account.check;
    //   }
    // });

    setNewUser({
      ...newUser,
      idCampaign: [...check, e.target.value],
    });
  };
  const handleSetAccount = (e) => {
    setShowAccounts(false);
  };

  return (
    <BoxMain>
      <BoxSearch>
        <InputText
          fullWidth
          placeholder="Search Account"
          value={search}
          onChange={(e) => handleFilter(e)}
        />
      </BoxSearch>
      <BoxAccounts
        sx={
          newUser
            ? {
                height: "100px",
              }
            : {
                height: "200px",
                marginY: "1rem",
              }
        }
      >
        {dataAccount.map((camp) => (
          <Box height="25px" display="flex" alignItems="center" marginTop={2}>
            {" "}
            <input
              type="checkbox"
              id="account"
              name="account"
              //checked={check.includes(camp.IdCampaign) ? true : false}
              value={camp.IdCampaign}
              onChange={(e) => handleSelectAccount(e)}
              style={{
                height: "20px",
                marginRight: ".5rem",
              }}
            />
            <label htmlFor="account">
              {camp.IdCampaign}-{camp.nameCampaign}
            </label>
          </Box>
        ))}
      </BoxAccounts>
      {newUser ? (
        ""
      ) : (
        <Box textAlign="end">
          <ButtonActionBlue sx={{ padding: "2px" }} onClick={handleSetAccount}>
            Ok
          </ButtonActionBlue>
        </Box>
      )}
    </BoxMain>
  );
};

export default SearchDirCampaign;
