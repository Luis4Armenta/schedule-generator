function transformCourses(inputCourses) {
  return inputCourses.map(course => {
    const { teacher, subject, teacher_positive_score, schedule, sequence, course_availability } = course;

    const daysMapping = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
    };

    const sessions = [];
    schedule.forEach(session => {
      sessions.push({
        day: daysMapping[session.day],
        start: session.start_time,
        end: session.end_time,
      })

    });

    const positiveScore = teacher_positive_score;

    return {
      subject,
      sequence,
      teacher,
      positiveScore, 
      sessions,
      course_availability
    }
  });
}

export default transformCourses;