import React, { forwardRef } from 'react';
import Session from './Session';
import getEventsFromCourses from "./utils";

// Componente Schedule que muestra el horario
const Schedule = forwardRef((props, ref) => {
  const { selectedSchedule } = props; // Obtener el horario seleccionado de las props

  // Lista de horas en incrementos de 30 minutos
  const hours = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  // Lista de días de la semana
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Obtener los eventos y atributos adicionales del horario seleccionado
  const { schedule, extraAttributes } = getEventsFromCourses(selectedSchedule ? selectedSchedule.courses : []);

  // Función para calcular el rowspan de una celda basada en la duración del evento
  const getRowspan = (start, end) => {
    const startIndex = hours.indexOf(start);
    const endIndex = hours.indexOf(end);
    return endIndex - startIndex;
  };

  return (
    <div className="container-fluid">
      <div className="table-responsive overflow-auto m-3" style={{ height: '60vh' }}>
        {/* Mostrar mensaje si no hay horarios seleccionados */}
        {(!selectedSchedule || selectedSchedule.courses.length === 0) &&
          <div className='w-100 h-100 rounded border-dark-subtle text-center d-flex flex-column align-items-center justify-content-center text-body-secondary' style={{ border: '2px dashed' }}>
            <i className="bi bi-calendar4-week fs-1"></i>
            <h2>Selecciona un horario para mostrar...</h2>
          </div>
        }

        {/* Mostrar tabla de horarios si hay cursos seleccionados */}
        {selectedSchedule && selectedSchedule.courses.length !== 0 && (
          <table className="table table-bordered" style={{ tableLayout: 'fixed' }} ref={ref}>
            <thead>
              <tr>
                <th className='text-center'>Hora</th>
                {days.map((day) => (
                  <th key={day} className='text-center fs-6'>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, hourIndex) => (
                <tr key={hour} style={{ height: '10px' }}>
                  <th key={hour} className='text-center fs-6'>{hour}</th>
                  {days.map((day, dayIndex) => {
                    const evento = schedule[hourIndex][dayIndex];

                    // Si es la primera vez que aparece el evento en este día
                    if (evento && !extraAttributes[evento.key].days) {
                      extraAttributes[evento.key].days = [day];
                      evento.color = extraAttributes[evento.key].color;
                      evento.rowSpan = getRowspan(evento.inicio, evento.fin);
                      evento.key = `${day}_${hour}`;
                      return <Session key={`${day}_${hour}`} session={evento} />;
                    // Si el evento vuelve a aparecer en este día
                    } else if (evento && !extraAttributes[evento.key].days.includes(day)) {
                      extraAttributes[evento.key].days.push(day);
                      evento.color = extraAttributes[evento.key].color;
                      evento.rowSpan = getRowspan(evento.inicio, evento.fin);
                      evento.key = `${day}_${hour}`;
                      return <Session key={`${day}_${hour}`} session={evento} />;
                    // Si el evento ya ha sido mostrado en este día, no hacer nada
                    } else if (evento && extraAttributes[evento.key].days.includes(day)) {
                      return null;
                    }
                    return <td key={`${day}_${hour}`}></td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
});

export default Schedule;
