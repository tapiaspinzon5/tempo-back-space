exports.orderAssign = (result) => {
  let rows = [];
  let rows2 = [];

  // Agrupamos por learningPlan
  result.forEach((e) => {
    // Si existe el LP solo inserta el curso
    if (rows[e.idExamen]) {
      rows[e.idExamen].Respuestas.push({
        Pregunta: e?.Pregunta,
        Respuesta1: e?.Respuesta1,
        Respuesta2: e?.Respuesta2,
        Respuesta3: e?.Respuesta3,
        Respuesta4: e?.Respuesta4,
        Answer1: e?.Answer1,
        Answer2: e?.Answer2,
        Answer3: e?.Answer3,
        Answer4: e?.Answer4,
        AnswerUser1: e?.AnswerUser1,
        AnswerUser2: e?.AnswerUser2,
        AnswerUser3: e?.AnswerUser3,
        AnswerUser4: e?.AnswerUser4,
        idPregunta: e?.idPregunta,
        TypeQuestionId: e?.TypeQuestionId,
        TypeQuestion: e?.TypeQuestion,
      });
    }

    // Si no existe el LP, lo crea por 1a vez
    if (!rows[e.idExamen]) {
      rows[e.idExamen] = {
        PreguntasCorrectas: e.PreguntasCorrectas,
        TotalPreguntas: e.TotalPreguntas,
        Calificación: e.Calificación,
        EstadoExamen: e.EstadoExamen,
        idExamen: e.idExamen,
        NombreExamen: e.NombreExamen,
        DescriptionExam: e.DescriptionExam,
        UrlBadge: e.UrlBadge,
        idUser: e.idUser,
        Respuestas: [
          {
            Pregunta: e?.Pregunta,
            Respuesta1: e?.Respuesta1,
            Respuesta2: e?.Respuesta2,
            Respuesta3: e?.Respuesta3,
            Respuesta4: e?.Respuesta4,
            Answer1: e?.Answer1,
            Answer2: e?.Answer2,
            Answer3: e?.Answer3,
            Answer4: e?.Answer4,
            AnswerUser1: e?.AnswerUser1,
            AnswerUser2: e?.AnswerUser2,
            AnswerUser3: e?.AnswerUser3,
            AnswerUser4: e?.AnswerUser4,
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

  let questionsOrdered = rows2.map((exam) => {
    // Ordenamos las actividades por la columna orderActivity
    let sortedCourses = exam.Respuestas.sort((r1, r2) =>
      r1.idPregunta > r2.idPregunta ? 1 : r1.idPregunta < r2.idPregunta ? -1 : 0
    );

    exam.Respuestas = sortedCourses;
    return exam;
  });

  return questionsOrdered;
};
