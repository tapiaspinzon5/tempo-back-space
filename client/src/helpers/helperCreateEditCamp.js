export const getOMDuplicates = (allData, dataList, dataUser) => {
	let duplicatesList = dataList.filter((om) => om.idccms === dataUser.ident);
	let duplicatesCamp = allData.filter((om) => om.identOM === dataUser.ident);
	if (duplicatesList.length > 0 || duplicatesCamp.length > 0) {
		return true;
	} else {
		return false;
	}
};

export const getCampNameDuplicate = (allData, name) => {
	const duplicates = allData.filter(
		(camp) => camp.nameCampaign.toLowerCase() === name.toLowerCase()
	);
	if (duplicates.length > 0) {
		return true;
	} else {
		return false;
	}
};

export const getkpisDuplicates = (kpiList, kpiData) => {
	const dwc = kpiData.map((el) =>
		el.checked
			? el
			: {
					...el,
					checked: false,
			  }
	);
	const kpiCheck = kpiList.filter((kpi) => kpi.checked === true);
	if (kpiCheck.length > 0) {
		const duplicates = kpiCheck.concat(
			dwc.filter((bo) => kpiCheck.every((ao) => ao.id !== bo.id))
		);
		return duplicates;
	} else {
		const dwc = kpiData.map((el) =>
			el.checked
				? el
				: {
						...el,
						checked: false,
				  }
		);
		return dwc;
	}
};

export const getCheckToEdit = (dte, kpiList, kpiData) => {
	const dwc = kpiData.map((el) =>
		el.checked
			? el
			: {
					...el,
					checked: false,
			  }
	);
	const kpiCheck = kpiList.filter((kpi) => kpi.checked === true);
	const kpiDB = kpiList.filter((item1) =>
		dte.some((item2) => item1.idMD === item2.idMD)
	);
	const kpiEdit = kpiDB.concat(
		kpiCheck.filter((bo) => kpiDB.every((ao) => ao.idMD !== bo.idMD))
	);
	const listView = kpiEdit.concat(
		dwc.filter((bo) => kpiEdit.every((ao) => ao.idMD !== bo.id))
	);

	return listView;
};

export const addHelper = (dte, kpiList) => {
	const kpiCheck = kpiList.filter((kpi) => kpi.checked === true);
	const kpiDB = kpiList.filter((item1) =>
		dte.some((item2) => item1.idMD === item2.idMD)
	);
	const kpiEdit = kpiDB.concat(
		kpiCheck.filter((bo) => kpiDB.every((ao) => ao.idMD !== bo.idMD))
	);
	return kpiEdit;
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

export const createHelper = (name, kpiList, OMList) => {
	const checkDataKpi = kpiList.filter((kpi) => kpi.checked === true);
	const checkDataOM = OMList.filter((OM) => OM.checked === true);
	if (checkDataKpi.length > 0 && checkDataOM.length > 0 && name) {
		const dts = checkDataKpi.map((el) => [
			checkDataOM[0].idccms,
			name,
			el.Kpi,
			el.id,
			el.LoadType ? 0 : 1,
		]);

		return [
			dts,
			[
				{
					email: checkDataOM[0].email,
					name: checkDataOM[0].name,
					rol: "Operations Commander",
				},
			],
		];
	} else {
		return ["Some field is empty"];
	}
};

export const editHelper = (name, kpiList, OMList, wd) => {
	const checkDataKpi = kpiList.filter((kpi) => kpi.checked === true);
	const checkDataOM = OMList.filter((OM) => OM.checked === true);
	if (checkDataKpi.length > 0 && checkDataOM.length > 0 && name) {
		const dts = checkDataKpi.map((el) => [
			checkDataOM[0].idccms,
			name,
			el.Kpi,
			el.idMD ? el.idMD : el.id ? el.id : 0,
			el.LoadType === 1 ? 1 : el.LoadType ? 0 : el.LoadType === 0 ? 0 : 1,
		]);
		const ex = wd.map((el) => [
			el.IdentOM,
			el.nameCampaign,
			el.Kpi,
			el.idMD,
			el.LoadType ? el.LoadType : 1,
		]);

		if (wd.length === dts.length) {
			const verEdit = dts.concat(
				ex.filter((bo) =>
					dts.every(
						(ao) =>
							ao[0] !== bo[0] ||
							ao[1] !== bo[1] ||
							ao[2] !== bo[2] ||
							ao[3] !== bo[3] ||
							ao[4] !== bo[4]
					)
				)
			);
			if (verEdit.length === dts.length) {
				return ["You did not edit any field"];
			} else {
				return [
					dts,
					[
						{
							email: checkDataOM[0].email,
							name: checkDataOM[0].name,
							rol: "Operation Manager",
						},
					],
				];
			}
		} else {
			return [
				dts,
				[
					{
						email: checkDataOM[0].email,
						name: checkDataOM[0].name,
						rol: "Operations Commander",
					},
				],
			];
		}
	} else {
		return ["Some field is empty"];
	}
};

const dateConfig = (date) => {
	let fecha;
	let hora;
	let fechaBase = new Date(date).toLocaleString([], {
		//timeZone: "Etc/UTC",
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
const dateConfig2 = (date) => {
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

export const campsWithDate = (data) => {
	const lwd = data.map((camp) => {
		const fecha = dateConfig(camp.DateRegistry);
		camp.DateRegistry = fecha;
		return camp;
	});
	return lwd;
};

export const refreshCampsWithDate = (data) => {
	const lwd = data.map((camp) => {
		const fecha = dateConfig2(camp.DateRegistry);
		camp.DateRegistry = fecha;
		return camp;
	});
	return lwd;
};
