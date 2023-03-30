exports.agroupQuestions = (result) => {
  let rows = [];
  let rows2 = [];

  // Agrupamos por learningPlan
  result.forEach((e) => {
    // Si existe el LP solo inserta el curso
    if (rows[e.IdExamen]) {
      rows[e.IdExamen].Respuestas.push({
        Pregunta: e?.Pregunta,
        Respuesta1: e?.Respuesta1,
        Respuesta2: e?.Respuesta2,
        Respuesta3: e?.Respuesta3,
        Respuesta4: e?.Respuesta4,
        RespuestaCorrecta: e?.RespuestaCorrecta,
        Answer1: e?.Answer1,
        Answer2: e?.Answer2 || "",
        Answer3: e?.Answer3 || "",
        Answer4: e?.Answer4 || "",
        T1: e?.T1,
        T2: e?.T2,
        T3: e?.T3,
        T4: e?.T4,
        idPregunta: e?.idPregunta,
        TypeQuestionId: e?.TypeQuestionId,
        TypeQuestion: e?.TypeQuestion,
      });
    }

    // Si no existe el LP, lo crea por 1a vez
    if (!rows[e.IdExamen]) {
      rows[e.IdExamen] = {
        IdExamen: e.IdExamen,
        nameExam: e.nameExam,
        DescriptionExam: e.DescriptionExam,
        ApprovalExam: e.ApprovalExam,
        Respuestas: [
          {
            Pregunta: e?.Pregunta,
            Respuesta1: e?.Respuesta1,
            Respuesta2: e?.Respuesta2,
            Respuesta3: e?.Respuesta3,
            Respuesta4: e?.Respuesta4,
            RespuestaCorrecta: e?.RespuestaCorrecta,
            Answer1: e?.Answer1,
            Answer2: e?.Answer2 || "",
            Answer3: e?.Answer3 || "",
            Answer4: e?.Answer4 || "",
            T1: e?.T1,
            T2: e?.T2,
            T3: e?.T3,
            T4: e?.T4,
            idPregunta: e?.idPregunta,
            TypeQuestionId: e?.TypeQuestionId,
            TypeQuestion: e?.TypeQuestion,
          },
        ],
      };
    }
  });

  // removemos los null del array
  rows.forEach((el) => {
    rows2.push(el);
  });

  return rows2[0];
};
