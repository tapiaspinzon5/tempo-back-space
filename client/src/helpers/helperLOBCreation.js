export const createTeamLeaderList = (data, name, userData) => {
  const TLList = data.filter((tl) => tl.checked === true);
  const list = [];
  const emails = [];
  TLList.forEach((tl) => {
    list.push(tl.idccms);
    if (tl.Email) {
      emails.push({
        email: tl.Email,
        name: tl.name,
        rol: "Pilot",
        rolManager: "Operations Commander",
        manager: userData,
      });
    }
  });
  return { lobName: name, tlIdccms: list, emails };
};

export const filterTeamLeaderList = (data) => {
  let list = [];
  data.forEach((tl) => {
    list.push({
      idccms: tl.identTL,
      idLob: tl.idLob,
      name: tl.NameTL,
      checked: true,
      idTeam: tl.idTeam,
      action: "",
      replacement: [],
      redistribute: [],
      msgDel:
        "Are you sure? By Deleting the team you will be deactivating the agents on the platform.",
      error: false,
      msgError: "",
    });
  });
  return list;
};

export const getTLDuplicates = (allData, dataList, dataUser) => {
  let duplicatesList = dataList.filter((tl) => tl.idccms === dataUser.ident);
  let duplicatesLobs = allData.filter((tl) => tl.identTL === dataUser.ident);
  if (duplicatesList.length > 0 || duplicatesLobs.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const getLobNameDuplicate = (allData, name) => {
  let duplicates = allData.filter(
    (tl) => tl.NameLob.toLowerCase() === name.toLowerCase()
  );
  if (duplicates.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const nextHelper = (dte, kpiList, OMList) => {
  const checkDataKpi = kpiList.filter((kpi) => kpi.checked === true);
  const checkDataOM = OMList.filter((OM) => OM.checked === true);
  const kpiCheck = kpiList.filter((kpi) => kpi.checked === true);
  const kpiDB = kpiList.filter((item1) =>
    dte.some((item2) => item1.idMD === item2.idMD)
  );
  const kpiEdit = kpiDB.concat(
    kpiCheck.filter((bo) => kpiDB.every((ao) => ao.idMD !== bo.idMD))
  );
  return { oml: checkDataOM, kpitw: checkDataKpi, kpi: kpiEdit };
};

export const dataLobsToSend = (dataLobs, nameLOB) => {
  let context = 2;
  let idLob = dataLobs[0].idLob;
  const data = dataLobs.filter((lob) => lob.checked);
  if (data.length > 0) {
    const dts = data.map((lob) =>
      lob.CriticalPoint && lob.Q1 && lob.Q2 && lob.Q3 && lob.Q4 && lob.OrderKpi
        ? [
            nameLOB,
            lob.Kpi,
            lob.Q1,
            lob.Q2,
            lob.Q3,
            lob.Q4,
            lob.CriticalPoint,
            lob.OrderKpi,
            lob.LoadType,
            lob.idKpiMD,
          ]
        : "Some field in the kpis is empty"
    );

    const cp = data.map((el) =>
      (el.OrderKpi === "asc" &&
        el.Q1 > el.CriticalPoint &&
        el.Q2 > el.CriticalPoint &&
        el.Q3 > el.CriticalPoint &&
        el.Q4 > el.CriticalPoint &&
        el.Q1 >= el.Q2 &&
        el.Q2 >= el.Q3 &&
        el.Q3 >= el.Q4) ||
      (el.OrderKpi === "dsc" &&
        el.Q1 < el.CriticalPoint &&
        el.Q2 < el.CriticalPoint &&
        el.Q3 < el.CriticalPoint &&
        el.Q4 < el.CriticalPoint &&
        el.Q1 <= el.Q2 &&
        el.Q2 <= el.Q3 &&
        el.Q3 <= el.Q4)
        ? [
            el.nameCampaign,
            el.Kpi,
            el.Q1,
            el.Q2,
            el.Q3,
            el.Q4,
            el.CriticalPoint,
            el.OrderKpi,
            el.LoadType,
            el.idKpiMD,
          ]
        : el.OrderKpi === "asc"
        ? "If you select ASC, the targets in each quartile must be greater than the critical point and descending from T1 to T4."
        : "If you select DSC, the targets in each quartile must be less than the critical point and drop from T4 to T1."
    );
    const verification = dts.filter(
      (el) => el === "Some field in the kpis is empty"
    );
    const verificationTarget = cp.filter(
      (el) =>
        el ===
          "If you select ASC, the targets in each quartile must be greater than the critical point and descending from T1 to T4." ||
        el ===
          "If you select DSC, the targets in each quartile must be less than the critical point and drop from T4 to T1."
    );
    if (verification.length > 0) {
      return verification;
    } else if (verificationTarget.length > 0) {
      return verificationTarget;
    } else {
      return { context, idLob, data: dts };
    }
  } else {
    return ["Some field is empty"];
  }
};

export const filterLobList = async (data) => {
  const hash = {};
  let lobData = await data.filter(function (current) {
    let exists = !hash[current.NameLob];
    hash[current.NameLob] = true;
    return exists;
  });
  //return lobData;
  const lwd = await lobsWithDate(lobData);
  return lwd;
};

const dateConfig = (date) => {
  let fecha;
  let hora;
  let fechaBase = new Date(date).toLocaleString([], {
    timeZone: "Etc/UTC",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let now = new Date().toLocaleString([], {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let fa = new Date(
    `${now.split("/")[1]}/${now.split("/")[0]}/${now.split("/")[2]}`
  );
  let fb = new Date(
    `${fechaBase.split("/")[1]}/${fechaBase.split("/")[0]}/${
      fechaBase.split("/")[2]
    }`
  );
  if (
    now.replace(",", "").split(" ")[0] ===
    fechaBase.replace(",", "").split(" ")[0]
  ) {
    hora = Math.trunc((fa - fb) / 60000);
    if (hora < 31) {
      fecha = `${hora} minutes ago`;
    } else {
      fecha = fechaBase.replace(",", "").split(" ")[1];
    }
  } else {
    fecha = fechaBase.replace(",", "").split(" ")[0];
  }

  return fecha;
};

const lobsWithDate = (data) => {
  const lwd = data.map((lob) => {
    const fecha = dateConfig(lob.DateRegistry);
    lob.DateRegistry = fecha;
    return lob;
  });
  return lwd;
};

export const editLobsToSend = (dataLobs, dbkpidata) => {
  let context = 2;
  //let idLob = dataLobs[0].IdLob;
  let idcampaign = dataLobs[0].IdCampaign;
  const data = dataLobs.filter((lob) => lob.checked);
  const wd = dbkpidata.filter((lob) => lob.checked);
  if (data.length > 0) {
    const dts = data.map((lob) =>
      lob.CriticalPoint && lob.Q1 && lob.Q2 && lob.Q3 && lob.Q4 && lob.OrderKpi
        ? [
            lob.Campaign,
            lob.Kpi,
            lob.Q1,
            lob.Q2,
            lob.Q3,
            lob.Q4,
            lob.CriticalPoint,
            lob.OrderKpi,
            lob.LoadType,
            lob.idKpiMD,
          ]
        : "Some field in the kpis is empty"
    );
    const ex = wd.map((el) => [
      el.Campaign,
      el.Kpi,
      el.Q1,
      el.Q2,
      el.Q3,
      el.Q4,
      el.CriticalPoint,
      el.OrderKpi,
      el.LoadType,
      el.idKpiMD,
    ]);
    const cp = data.map((el) =>
      (el.OrderKpi === "asc" &&
        el.Q1 > el.CriticalPoint &&
        el.Q2 > el.CriticalPoint &&
        el.Q3 > el.CriticalPoint &&
        el.Q4 > el.CriticalPoint &&
        el.Q1 >= el.Q2 &&
        el.Q2 >= el.Q3 &&
        el.Q3 >= el.Q4) ||
      (el.OrderKpi === "dsc" &&
        el.Q1 < el.CriticalPoint &&
        el.Q2 < el.CriticalPoint &&
        el.Q3 < el.CriticalPoint &&
        el.Q4 < el.CriticalPoint &&
        el.Q1 <= el.Q2 &&
        el.Q2 <= el.Q3 &&
        el.Q3 <= el.Q4)
        ? [
            el.Campaign,
            el.Kpi,
            el.Q1,
            el.Q2,
            el.Q3,
            el.Q4,
            el.CriticalPoint,
            el.OrderKpi,
            el.LoadType,
            el.idKpiMD,
          ]
        : el.OrderKpi === "asc"
        ? "If you select ASC, the targets in each quartile must be greater than the critical point and descending from T1 to T4."
        : "If you select DSC, the targets in each quartile must be less than the critical point and drop from T4 to T1."
    );
    const verification = dts.filter(
      (el) => el === "Some field in the kpis is empty"
    );
    const verificationTarget = cp.filter(
      (el) =>
        el ===
          "If you select ASC, the targets in each quartile must be greater than the critical point and descending from T1 to T4." ||
        el ===
          "If you select DSC, the targets in each quartile must be less than the critical point and drop from T4 to T1."
    );
    if (verification.length > 0) {
      return verification;
    } else if (verificationTarget.length > 0) {
      return verificationTarget;
    } else {
      if (wd.length === dts.length) {
        const verEdit = dts.concat(
          ex.filter((bo) =>
            dts.every(
              (ao) =>
                ao[0] !== bo[0] ||
                ao[1] !== bo[1] ||
                ao[2] !== bo[2] ||
                ao[3] !== bo[3] ||
                ao[4] !== bo[4] ||
                ao[5] !== bo[5] ||
                ao[6] !== bo[6] ||
                ao[7] !== bo[7] ||
                ao[8] !== bo[8] ||
                ao[9] !== bo[9]
            )
          )
        );
        //return { context, idLob, data: dts, idcampaign };
        if (verEdit.length === dts.length) {
          return ["You did not edit any field"];
        } else {
          return { context, data: dts, idcampaign };
        }
      } else {
        return { context, data: dts, idcampaign };
      }
    }
  } else {
    return ["Some field is empty"];
  }
};

export const redistributeValidate = (dataTL) => {
  const filterTL = dataTL.filter((tl) => tl.action === "Redistribute");
  const filterNewTL = filterTL.filter((tl) =>
    tl.redistribute.filter((ag) => ag.newTeam === "").length > 0 ? true : false
  );
  return filterNewTL;
};

export const shortName = (word) => {
  let p = word.indexOf(" ");
  const newName = word.substring(0, p + 2);

  return newName;
};

export const dataToSendTLEdit = (newTLs, tlListDel, nameLob, idLob) => {
  //preguntar si solo se agregan los nuevos tl o todos los checkeados nuevamente
  const dtstlr = [];
  //filtrar los tl  change, delete y redistribute
  const tlc = tlListDel.filter((tl) => tl.action === "Change");
  const tld = tlListDel.filter((tl) => tl.action === "Delete");
  const tlr = tlListDel.filter((tl) => tl.action === "Redistribute");

  const dtstlc = tlc.map((tl) => [tl.idTeam, tl.replacement.idccms]);
  //preguntar si solo arreglo o arreglo de arreglos
  const dtstld = tld.map((tl) => tl.idccms);

  tlr.map(
    (tl) =>
      tl.redistribute.filter((ag) => dtstlr.push([ag.idNewTeam, ag.Ident]))
    //dtstlr.push(tl.redistribute.map((ag) => [ag.idNewTeam, ag.Ident]))
  );
  const dtsnt = newTLs.map((tl) => tl.idccms);

  return {
    lobName: nameLob,
    context: 2,
    idLob: idLob,
    createNewTL: dtsnt,
    changeTL: dtstlc,
    reassingTeam: dtstlr.length > 0 ? dtstlr : [],
    inactivateTeam: dtstld,
  };
};
