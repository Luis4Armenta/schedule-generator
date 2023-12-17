import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { json } from 'react-router-dom';

const GeneratonForm = () => {
  const [semester, setSemester] = useState(1);
  const [startTime, setStartTime] = useState('07:00');
  const [endTime, setEndTime] = useState('22:00');
  const [credits, setCredits] = useState(100);
  const [Message, setMessage] = useState("");

  let handdleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/schedules", {
        method: "POST",
        headers:  {'Content-Type':  'application/json'},
        body: JSON.stringify({
          "levels":["4"],
          "semesters":["4"],
          "start_time":"07:00",
          "end_time":"15:00",
          "career":"C",
          "shifts":["M"],
          "length":7,
          "credits":100,
          "available_uses":0,
          "excluded_teachers":[],
          "excluded_subjects":[],
          "extra_subjects":[],
          "required_subjects":[]
        })
      }

      
      );
      let resJson = await res.json();
      if (res.status === 200) {
        console.log("User created successfully");
        console.log(resJson);
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
      <div className="card shadow-sm p-3" style={{height: '100%'}}>
        <div className="card-body">
          <div className='position-relative'>
            <p className='card-title text-center fs-4 fw-semibold'>Parametros</p>
            <hr className='w-90 shadow-sm'/>
          </div>
          <form className="d-flex flex-column justify-content-between" onSubmit={handdleSubmit}>
              {/* Semestres - Checkbox */}
              <div className="form-group my-3 my-1">
                <label className='fs-5 fw-medium'>Semestres:</label>
                <div>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((semestre) => (
                    <div key={semestre} className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`semestre${semestre}`}
                        name="semestres"
                        value={semestre}
                      />
                      <label className="form-check-label" htmlFor={`semestre${semestre}`}>
                        {semestre}ro
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tiempo - Inputs para hora de inicio y hora de fin */}
              <div className="form-group my-3">
                <label className='fs-5 fw-medium my-1'>Tiempo:</label>
                <div className="d-flex">
                  <div className="mr-2">
                    <input type="text" className="form-control" name="horaInicio" placeholder="Ej. 09:00" />
                  </div>
                  <p className='mx-1 fw font-monospace fs-4'> - </p>
                  <div>
                    <input type="text" className="form-control" name="horaFin" placeholder="Ej. 17:00" />
                  </div>
                </div>
              </div>

              {/* Créditos - Input */}
              <div className="form-group my-3">
                <label className='fs-5 fw-medium my-1'>Créditos:</label>
                <input type="number" className="form-control" name="creditos" />
              </div>

              {/* Botón de envío */}
              <div className='d-grid'>
                <button type="submit" className="btn btn-outline-success btn-lg ">
                  Generar
                </button>
              </div>
          </form>
        </div>
      </div>
  );
}

export default GeneratonForm