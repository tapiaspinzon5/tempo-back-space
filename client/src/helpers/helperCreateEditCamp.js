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
					CriticalPoint: "",
					Q1: "",
					Q2: "",
					Q3: "",
					Q4: "",
					OrderKpi: "",
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
						CriticalPoint: "",
						Q1: "",
						Q2: "",
						Q3: "",
						Q4: "",
						OrderKpi: "",
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
					CriticalPoint: "",
					Q1: "",
					Q2: "",
					Q3: "",
					Q4: "",
					OrderKpi: "",
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
	if (checkDataKpi.length > 0 && checkDataOM.length > 0) {
		const dts = checkDataKpi.map((el) =>
			el.CriticalPoint && el.Q1 && el.Q2 && el.Q3 && el.Q4 && el.OrderKpi
				? [
						checkDataOM[0].idccms,
						name,
						el.Kpi,
						el.Q1,
						el.Q2,
						el.Q3,
						el.Q4,
						el.CriticalPoint,
						el.OrderKpi,
						el.LoadType ? 0 : 1,
						el.id,
				  ]
				: "Some field in the kpis is empty"
		);
		const verification = dts.filter(
			(el) => el === "Some field in the kpis is empty"
		);
		if (verification.length > 0) {
			return verification;
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
		return ["Some field is empty"];
	}
};
export const editHelper = (name, kpiList, OMList, wd) => {
	const checkDataKpi = kpiList.filter((kpi) => kpi.checked === true);
	const checkDataOM = OMList.filter((OM) => OM.checked === true);
	if (checkDataKpi.length > 0 && checkDataOM.length > 0) {
		const dts = checkDataKpi.map((el) =>
			el.CriticalPoint && el.Q1 && el.Q2 && el.Q3 && el.Q4 && el.OrderKpi
				? [
						checkDataOM[0].idccms,
						name,
						el.Kpi,
						el.Q1,
						el.Q2,
						el.Q3,
						el.Q4,
						el.CriticalPoint,
						el.OrderKpi,
						el.LoadType === 1 ? 1 : el.LoadType ? 0 : el.LoadType === 0 ? 0 : 1,
						el.idMD ? el.idMD : el.id ? el.id : 0,
				  ]
				: "Some field in the kpis is empty"
		);
		const ex = wd.map((el) => [
			el.identOM,
			el.nameCampaign,
			el.Kpi,
			el.Q1,
			el.Q2,
			el.Q3,
			el.Q4,
			el.CriticalPoint,
			el.OrderKpi,
			el.LoadType,
			el.idMD,
		]);
		const verification = dts.filter(
			(el) => el === "Some field in the kpis is empty"
		);
		if (verification.length > 0) {
			return verification;
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
								ao[9] !== bo[9] ||
								ao[10] !== bo[10]
						)
					)
				);
				if (verEdit.length === dts.length) {
					return ["no hubo edicion"];
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
							rol: "Operation Manager",
						},
					],
				];
			}
		}
	} else {
		return ["Some field is empty"];
	}
};
