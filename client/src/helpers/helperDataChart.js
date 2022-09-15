export const helperKpi = (kpi) => {
  let kpiFiltrado = kpi?.map((k) => {
    return k.Kpi;
  });
  let nuevo = [...new Set(kpiFiltrado)];

  return nuevo;
};

export const helperPercentage = (data) => {
  let percentage;
  percentage = (data?.Completed * 100) / (data?.Failed + data?.Completed);
  return percentage;
};
export const helperDataChartCat = (data, context) => {
  let categories;
  if (context === 1) {
    categories = data.map((dato) => {
      let { Date } = dato;
      if (Date) {
        return Date?.slice(0, 10);
      } else {
        return 0;
      }
    });
  }
  if (context === 2 || context === 4) {
    categories = data.map((dato) => {
      return dato.DateRegistry.slice(0, 10);
    });
  }
  if (context === 3) {
    categories = data.map((dato) => {
      return dato.Pregunta;
    });
  }
  if (context === 5) {
    categories = data.map((dato) => {
      return dato.CalendarDate.slice(0, 10);
    });
  }

  const fechas = categories?.filter((dato) => dato !== 0);
  return fechas;
};

export const helperDataChartData = (data, context) => {
  let dato1;
  let dato2;
  let dato3;
  let dato4;
  let nameChart;
  let array = [];

  if (context === 1) {
    nameChart = data[0]?.Kpi;
    dato1 = data.map((dato) => {
      return dato.Score?.toFixed(2);
    });
    array = [dato1, dato3, dato2, nameChart];
  }
  if (context === 2) {
    nameChart = ["Assigned", "Aproved", "Failed"];
    //Asignados
    dato1 = data.map((dato) => {
      let { Assigned } = dato;
      return Assigned.toString();
    });
    //aprovados
    dato3 = data.map((dato) => {
      let { Completed } = dato;
      return Completed.toString();
    });
    //Fallidos
    dato2 = data.map((dato) => {
      let { Failed } = dato;
      return Failed.toString();
    });

    array = [dato1, dato3, dato2, nameChart];
  }

  if (context === 3) {
    nameChart = ["Aproved", "Failed"];

    //aprovados
    dato1 = data.map((dato) => {
      let { Completed } = dato;
      return Completed.toString();
    });
    //Fallidos
    dato2 = data.map((dato) => {
      let { Failed } = dato;
      return Failed.toString();
    });

    array = [dato1, dato2, dato3, nameChart];
  }
  if (context === 4) {
    nameChart = ["Team Leader", "Agent"];

    //aprovados
    dato1 = data.map((dato) => {
      let { AssignedTL } = dato;
      return AssignedTL.toString();
    });
    //Fallidos
    dato2 = data.map((dato) => {
      let { AssignedAgent } = dato;
      return AssignedAgent.toString();
    });

    array = [dato1, dato2, dato3, nameChart];
  }
  if (context === 5) {
    nameChart = ["Quizzes", "Challenges", "Users", "Login per User"];

    //quiezzes
    dato1 = data.map((dato) => {
      let { NroQuizzes } = dato;
      return NroQuizzes.toString();
    });
    //Challenges
    dato2 = data.map((dato) => {
      let { NroChallenges } = dato;
      return NroChallenges.toString();
    });
    //# Users
    dato3 = data.map((dato) => {
      let { NroUsers } = dato;
      return NroUsers.toString();
    });
    //AVG Login per User
    dato4 = data.map((dato) => {
      let { LoginsUser } = dato;
      return LoginsUser.toString();
    });

    array = [dato1, dato2, dato3, nameChart, dato4];
  }
  return array;
};
