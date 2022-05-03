export const dataToSendAgents = (missions, data, QAname, context) => {
	const nameMissions = [];
	const idMissions = [];
	const idccmsAssigned = [];
	const fcmTokens = [];
	const expTime = [];
	missions.forEach((mission) => {
		nameMissions.push(mission.missionName);
		idMissions.push(mission.id);
		expTime.push(mission.time);
	});
	data.forEach((agent) => {
		idccmsAssigned.push(agent.id);
		fcmTokens.push(agent.fcmToken);
	});
	return {
		userName: QAname,
		nameMissions,
		idMissions,
		idccmsAssigned,
		fcmTokens,
		expTime,
		context,
	};
};

export const dataToSendLobsTeams = (missions, data, QAname) => {
	const nameMissions = [];
	const idMissions = [];
	const idccmsAssigned = [];
	const fcmTokens = [];
	missions.forEach((mission) => {
		nameMissions.push(mission.missionName);
		idMissions.push(mission.id);
	});
	data.forEach((agent) => {
		idccmsAssigned.push(agent.id);
		fcmTokens.push(agent.fcmToken); //Definir si se recorre el arreglo y se envia uno o si se envia un arreglo de arreglos
	});
	return {
		userName: QAname,
		nameMissions,
		idMissions,
		idccmsAssigned,
		fcmTokens,
	};
};

export const dataToSendTeams = (missions, data) => {};
