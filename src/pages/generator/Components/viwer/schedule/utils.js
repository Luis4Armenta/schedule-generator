function getEventsFromCourses(inputCourses) {
  const events = [];
  const colors = [
    { bg: 'bg-primary', text: 'text-white' },
    { bg: 'bg-secondary', text: 'text-white' },
    { bg: 'bg-success', text: 'text-black' },
    { bg: 'bg-danger', text: 'text-white' },
    { bg: 'bg-warning', text: 'text-black' },
    { bg: 'bg-info', text: 'text-white' },
    { bg: 'bg-light', text: 'text-black' },
    { bg: 'bg-dark', text: 'text-white' },
    { bg: 'bg-success-subtle', text: 'text-success-emphasis' },
    { bg: 'bg-danger-subtle', text: 'text-danger-emphasis' },
    { bg: 'bg-warning-subtle', text: 'text-warning-emphasis' },
    { bg: 'bg-info-subtle', text: 'text-info-emphasis' },
  ];

  inputCourses.forEach(course => {
    const availableColors = colors.filter(color => !color.usado);

    // Si se acaban los colores se repiten
    if (availableColors.length === 0) {
      colors.forEach(color => color.usado = false);
    }

    const selectedColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    selectedColor.usado = true;

    const { teacher, subject, teacher_positive_score, schedule, sequence, course_availability } = course;

    const daysMapping = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
    };

    schedule.forEach(session => {
      events.push({
        dia: daysMapping[session.day],
        inicio: session.start_time,
        fin: session.end_time,
        
        color: selectedColor,
        show: false,
        teacher,
        subject,
        sequence,
        positiveScore: teacher_positive_score,
        availability: course_availability,
      });
    });
  })
  return events;
}

export default getEventsFromCourses;