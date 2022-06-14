export const deleteDuplicatesScore = async (data) => {
	const hash = {};
	let printData = await data.filter(function (current) {
		let exists = !hash[current.id];
		hash[current.id] = true;
		return exists;
	});

	const dataOrder = printData.sort((a, b) => b.score - a.score);
	let cont = 1;
	dataOrder.forEach((el) => {
		if (el.score) {
			el.rank = cont;
			el.id = cont;
			cont += 1;
		} else {
			el.rank = dataOrder.length;
		}
	});

	return dataOrder;
};

export const deleteDuplicatesKpis = async (data, time) => {
	const hash = {};
	let printData = await data.filter(function (current) {
		let exists = !hash[current.id];
		hash[current.id] = true;
		return exists;
	});

	if (time === "Day") {
		const dataOrder =
			printData[0].OrderKpi === "asc"
				? printData.sort((a, b) => b.KPIR - a.KPIR)
				: printData.sort((a, b) => a.KPIR - b.KPIR);
		let cont = 1;
		dataOrder.forEach((el) => {
			el.rank = cont;
			el.KPIR = el.KPIR?.toFixed(2);
			cont += 1;
		});
		return dataOrder;
	} else if (time === "Week") {
		const dataOrder =
			printData[0].OrderKpi === "asc"
				? printData.sort((a, b) => b.AverageWeek - a.AverageWeek)
				: printData.sort((a, b) => a.AverageWeek - b.AverageWeek);
		let cont = 1;
		dataOrder.forEach((el) => {
			el.rank = cont;
			el.KPIR = el.AverageWeek?.toFixed(2);
			cont += 1;
		});
		return dataOrder;
	} else if (time === "Month") {
		const dataOrder =
			printData[0].OrderKpi === "asc"
				? printData.sort((a, b) => b.AverageMonth - a.AverageMonth)
				: printData.sort((a, b) => a.AverageMonth - b.AverageMonth);
		let cont = 1;
		dataOrder.forEach((el) => {
			el.rank = cont;
			el.KPIR = el.AverageMonth?.toFixed(2);
			cont += 1;
		});
		return dataOrder;
	}
};
