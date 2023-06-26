exports.agroupQuestions = (result) => {
  let rows = [];
  let rows2 = [];

  // Agrupamos por learningPlan
  result.forEach((e, index) => {
    // Si existe el LP solo inserta el curso
    if (rows[e.IdExamen]) {
      rows[e.IdExamen].Respuestas.push({
        idP: index + 1,
        Pregunta: e?.Pregunta,
        RespuestasAG: e?.RespuestasAG,
        /*  Respuesta1: e?.Respuesta1,
        Respuesta2: e?.Respuesta2,
        Respuesta3: e?.Respuesta3,
        Respuesta4: e?.Respuesta4, */
        //RespuestaCorrecta: e?.RespuestaCorrecta,
        /* Answer1: e?.Answer1,
        Answer2: e?.Answer2 || "",
        Answer3: e?.Answer3 || "",
        Answer4: e?.Answer4 || "", */
        Tenior:
          e?.T1 != "0" && e?.T2 != "0" && e?.T3 != "0" && e?.T4 != "0"
            ? "all"
            : [e?.T1, e?.T2, e?.T3, e?.T4].find((e) => e != "0"),
        idPregunta: e?.idPregunta,
        TypeQuestionId: e?.TypeQuestionId,
        TypeQuestion: e?.TypeQuestion,
        TypeContent: e?.TypeContent,
        urlContent: e?.urlContent,
        DescriptionContent: e?.DescriptionContent,
      });
    }

    // Si no existe el LP, lo crea por 1a vez
    if (!rows[e.IdExamen]) {
      rows[e.IdExamen] = {
        IdExamen: e.IdExamen,
        NameExam: e.NameExam,
        DescriptionExam: e.DescriptionExam,
        ApprovalExam: e.ApprovalExam,
        UrlBadge: e.UrlBadge,
        Category: e?.Category,
        Respuestas: [
          {
            idP: index + 1,
            Pregunta: e?.Pregunta,
            RespuestasAG: e?.RespuestasAG,
            /* Respuesta1: e?.Respuesta1,
            Respuesta2: e?.Respuesta2,
            Respuesta3: e?.Respuesta3,
            Respuesta4: e?.Respuesta4,
            RespuestaCorrecta: e?.RespuestaCorrecta,
            Answer1: e?.Answer1,
            Answer2: e?.Answer2 || "",
            Answer3: e?.Answer3 || "",
            Answer4: e?.Answer4 || "", */
            Tenior:
              e?.T1 != "0" && e?.T2 != "0" && e?.T3 != "0" && e?.T4 != "0"
                ? "all"
                : [e?.T1, e?.T2, e?.T3, e?.T4].find((e) => e != "0"),
            idPregunta: e?.idPregunta,
            TypeQuestionId: e?.TypeQuestionId,
            TypeQuestion: e?.TypeQuestion,
            TypeContent: e?.TypeContent,
            urlContent: e?.urlContent,
            DescriptionContent: e?.DescriptionContent,
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
