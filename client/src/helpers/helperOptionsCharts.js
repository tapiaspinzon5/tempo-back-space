export const optionCharts = (role) => {
  let option;
  switch (role) {
    case "Super Admin":
      option = [
        { type: "KPIS", context: 1 },
        { type: "Missions", context: 2 },
        { type: "Questions", context: 3 },
        { type: "Challenges", context: 4 },
        { type: "Usage Data", context: 5 },
      ];
      break;
    case "Cluster Director":
      option = [
        { type: "KPIS", context: 1 },
        { type: "Missions", context: 2 },
        { type: "Questions", context: 3 },
        { type: "Challenges", context: 4 },
        { type: "Usage Data", context: 5 },
      ];
      break;
    case "Operation Manager":
      option = [
        { type: "KPIS", context: 1 },
        { type: "Missions", context: 2 },
        { type: "Challenges", context: 4 },
      ];
      break;
    case "Reporting Lead":
      option = [
        { type: "KPIS", context: 1 },
        { type: "Missions", context: 2 },
        { type: "Questions", context: 3 },
        { type: "Challenges", context: 4 },
        { type: "Usage Data", context: 5 },
      ];
      break;
    case "QA Lead":
      option = [
        { type: "KPIS", context: 1 },
        { type: "Missions", context: 2 },
        { type: "Questions", context: 3 },
      ];
      break;
    case "Team Leader":
      option = [
        { type: "KPIS", context: 1 },
        { type: "Challenges", context: 4 },
      ];
      break;

    default:
      break;
  }

  return option;
};
