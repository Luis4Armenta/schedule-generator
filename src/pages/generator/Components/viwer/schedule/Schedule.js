import React, { forwardRef } from 'react'
import Session from './Session';
import transformCourses from "./utils";

const Schedule = forwardRef((props, ref) => {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const horasDia = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];
  const {selectedSchedule} = props 

 
  let courses = []
  if (selectedSchedule && selectedSchedule.courses) {
    courses = transformCourses(selectedSchedule.courses);
  }

  // Datos de eventos
  let eventos = [
  ];

  const colores = [
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

  // Función para verificar si hay un evento en un día y hora específicos
  const obtenerEvento = (dia, hora) => {
    return eventos.find(e => e.dia === dia && e.inicio <= hora && e.fin > hora);
  };


  function obtenerColorAleatorio() {
    const coloresDisponibles = colores.filter(color => !color.usado);
  
    if (coloresDisponibles.length === 0) {
      colores.forEach(color => color.usado = false);
    }
  
    const colorSeleccionado = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
    colorSeleccionado.usado = true;
  
    return colorSeleccionado;
  }

  let coursesProps = {}
  const loadEvents = () => {
    
    for (const course of courses) {
        let props = coursesProps[course.subject];

        if (!props) {
          const color = obtenerColorAleatorio()
          coursesProps[course.subject] = {
            color: color,
            showing: false
          }
          props = coursesProps[course.subject];
        }


        for (const session of course.sessions) {
          eventos = eventos.concat({
            color: props.color,
            show: props.showing,
            contenido: course.subject,
            dia: session.day,
            inicio: session.start,
            fin: session.end,
            teacher: course.teacher,
            subject: course.subject,
            sequence: course.sequence,
            positiveScore: course.positiveScore,
          })
        }
      }
    }

  loadEvents();
  return (
    <div className="container-fluid">
      <div className="table-responsive overflow-auto m-3" style={{height: '60vh'}}>
        {courses.length === 0 &&
          <div className='w-100 h-100 rounded border-dark-subtle text-center d-flex flex-column align-items-center justify-content-center text-body-secondary' style={{border: '2px dashed'}}>
            
            <i className="bi bi-calendar4-week fs-1"></i>
            <h2>Selecciona un horario para mostrar...</h2>
          </div>
        }

        {courses.length !== 0 && <table className="table table-bordered" style={{tableLayout: 'fixed'}} ref={ref}>
          <thead>
            <tr>
              <th className='text-center'>
                Hora
              </th>
              {diasSemana.map((dia, index) => (
                <th key={dia} className='text-center fs-6'>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horasDia.map((hora) => (
              <tr key={hora} style={{height: '10px'}}>
                <th key={hora} className='text-center fs-6'>{hora}</th>
                {diasSemana.map((dia) => {
                  const evento = obtenerEvento(dia, hora);
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