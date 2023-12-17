function transformCourses(inputCourses) {
  return inputCourses.map(course => {
    const { teacher, subject, teacher_popularity, schedule, sequence } = course;

    const daysMapping = {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
    };

    const sessions = [];

    for (const day in schedule) {
      if (schedule[day]) {
        sessions.push({
          day: daysMapping[day],
          start: schedule[day][0],
          end: schedule[day][1]
        });
      }
    }

    const positiveScore = teacher_popularity;

    return {
      subject,
      sequence,
      teacher,
      positiveScore, 
      sessions
    }
  });
}

export default transformCourses;