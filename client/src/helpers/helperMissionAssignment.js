export const dataToSend = (missions, data, QAname, context) => {
	const nameMissions = [];
	const idMissions = [];
	const idAssigned = [];
	const fcmTokens = [];
	const initDate = [];
	const endDate = [];
	missions.forEach((mission) => {
		nameMissions.push(mission.Name);
		idMissions.push(mission.Id);
		initDate.push(mission.start);
		endDate.push(mission.end);
	});
	if (data[0].Ident) {
		data.forEach((agent) => {
			idAssigned.push(agent.Ident);
			fcmTokens.push(agent.Token);
		});
	} else if (data[0].idLob) {
		data.forEach((lob) => {
			idAssigned.push(lob.idLob);
		});
	} else {
		data.forEach((tm) => {
			idAssigned.push(tm.idTeam);
		});
	}
	return {
		userName: QAname, // usuario logueado notificar quien lo asigno
		nameMissions,
		idMissions,
		idAssigned,
		fcmTokens, // vuela para team lob null
		initDate,
		endDate,
		context, // agent, LOB, Team
	};
};
