import React, { forwardRef } from 'react'
import Session from './Session';
import getEventsFromCourses from "./utils";

const Schedule = forwardRef((props, ref) => {
  const {selectedSchedule} = props 

  const hours = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];  

 
  let events = []
  if (selectedSchedule && selectedSchedule.courses) {
    events = getEventsFromCourses(selectedSchedule.courses);
  }

  // Función para verificar si hay un evento en un día y hora específicos
  const getEvent = (day, hour) => {
    return events.find(e => e.dia === day && e.inicio <= hour && e.fin > hour);
  };

  return (
    <div className="container-fluid">
      <div className="table-responsive overflow-auto m-3" style={{height: '60vh'}}>
        {events.length === 0 &&
          <div className='w-100 h-100 rounded border-dark-subtle text-center d-flex flex-column align-items-center justify-content-center text-body-secondary' style={{border: '2px dashed'}}>
            
            <i className="bi bi-calendar4-week fs-1"></i>
            <h2>Selecciona un horario para mostrar...</h2>
          </div>
        }

        {events.length !== 0 && <table className="table table-bordered" style={{tableLayout: 'fixed'}} ref={ref}>
          <thead>
            <tr>
              <th className='text-center'>
                Hora
              </th>
              {days.map((dia, index) => (
                <th key={dia} className='text-center fs-6'>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hora) => (
              <tr key={hora} style={{height: '10px'}}>
                <th key={hora} className='text-center fs-6'>{hora}</th>
                {days.map((dia) => {
                  const evento = getEvent(dia, hora);
                  if (evento) {
                    if (evento.show) {
                      return null;
                    } else {
                      evento.show = true;
                      return <Session key={`${dia}_${hora}`} session={evento}/>
                    }
                  }
                  return (
                    <td key={`${dia}_${hora}`}>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </div>
  );
});

export default Schedule