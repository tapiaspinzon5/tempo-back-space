export const createTeamLeaderList = (data, name, userData) => {
	const TLList = data.filter((tl) => tl.checked === true);
	const list = [];
	const emails = [];
	TLList.forEach((tl) => {
		list.push([tl.idccms]);
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
		list.push({ idccms: tl.identTL, name: tl.NameTL, checked: true });
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

/* {
    "idLob": 1155,
    "NameLob": "5643543543",
    "nameCampaign": "Campaña Matito",
    "NameTeam": "Team Maria Guerra carmona LOB 5643543543",
    "Kpi": "AHT",
    "idKpiMD": 3,
    "LoadType": 1,
    "checked": true,
    "CriticalPoint": 88,
    "Q1": 88,
    "Q2": 88,
    "Q3": 88,
    "Q4": 88,
    "OrderKpi": "asc"
} */
/* [
"KPI",
"Q1",
"Q2",
"Q3",
"Q4",
"CriticalPoint",
"OrderKpi",
"typeLoad",
"idKpiMD",
] */

export const dataLobsToSend = (dataLobs) => {
	let context = 2;
	let idLob = dataLobs[0].idLob;
	const data = dataLobs.filter((lob) => lob.checked);
	const dts = data.map((lob) => [
		lob.nameCampaign,
		lob.Kpi,
		lob.Q1,
		lob.Q2,
		lob.Q3,
		lob.Q4,
		lob.CriticalPoint,
		lob.OrderKpi,
		lob.LoadType,
		lob.idKpiMD,
	]);
	return { context, idLob, data: dts };
};
