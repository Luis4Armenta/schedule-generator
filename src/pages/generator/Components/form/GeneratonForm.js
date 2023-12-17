import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';
import { useMyContext } from '../../../../MyContext';

const GeneratonForm = () => {
  const { updateApiData } = useMyContext();
  const [semesters, setSemesters] = useState([]);
  const [startTime, setStartTime] = useState('07:00');
  const [endTime, setEndTime] = useState('22:00');
  const [credits, setCredits] = useState(100);
  const [loading, setLoading] = useState(false);

  let handdleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await fetch("http://localhost:3000/schedules", {
        method: "POST",
        headers:  {'Content-Type':  'application/json'},
        body: JSON.stringify({
          "levels":["4"],
          "semesters":semesters,
          "start_time":startTime,
          "end_time":endTime,
          "career":"C",
          "shifts":["M", "V"],
          "length":7,
          "credits":credits,
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
        updateApiData(resJson);
        console.log(resJson);
      } else {
        console.log("Some error occured");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSemesters = (event) => {
    let updatedSemesters = [...semesters];
    if (event.target.checked) {
      updatedSemesters = [...semesters, event.target.value];
    } else {
      updatedSemesters.splice(semesters.indexOf(event.target.value), 1)
    }
    setSemesters(updatedSemesters);
    console.log(semesters)
  }

  return (
      <div className="card shadow-sm px-3 py-0 h-100">
        <div className="card-body pt-1">
          <div className='position-relative'>
            <p className='fs-4 text-center mt-2  mb-1 fw-medium'>Ajustes</p>
            <hr className='mb-3 mt-1 text-gray-100 bg-dark shadow-sm w-90' />
          </div>
          <form className="d-flex flex-column justify-content-between" onSubmit={handdleSubmit}>
              {/* Semestres - Checkbox */}
              <div className="form-group my-1">
                <label className='fs-6 fw-medium'>Semestres:</label>
                <div>
                  {["1", "2", "3", "4", "5", "6", "7", "8"].map((semestre) => (
                    <div key={semestre} className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`semestre${semestre}`}
                        name="semestres"
                        value={semestre}
                        onChange={handleSemesters}
                      />
                      <label className="form-check-label" htmlFor={`semestre${semestre}`}>
                        {semestre}ro
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tiempo - Inputs para hora de inicio y hora de fin */}
              <div className="form-group my-1">
                <label className='fs-6 fw-medium'>Tiempo:</label>
                <div className="d-flex">
                  <div className="mr-2">
                    <input type="text" className="form-control" name="horaInicio" placeholder="Ej. 09:00" onChange={(e) => setStartTime(e.target.value)}/>
                  </div>
                  <p className='mx-1 fw font-monospace fs-4'> - </p>
                  <div>
                    <input type="text" className="form-control" name="horaFin" placeholder="Ej. 17:00" onChange={(e) => setEndTime(e.target.value)}/>
                  </div>
                </div>
              </div>

              {/* Créditos - Input */}
              <div className="form-group my-1">
                <label className='fs-6 fw-medium'>Créditos:</label>
                <input type="number" className="form-control" name="creditos" onChange={(e) => setCredits(e.target.value)}/>
              </div>

              {/* Botón de envío */}
              <div className='d-grid mt-3'>
                <button type="submit" className="btn btn-outline-success btn-lg ">
                  Generar
                </button>
              </div>
          </form>
          {loading && (
            <div className="modal" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>
      </div>
  );
}

export default GeneratonForm