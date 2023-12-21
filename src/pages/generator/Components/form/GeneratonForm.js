import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';
import { useMyContext } from '../../../../MyContext';
import Modal from 'react-modal';

const GeneratonForm = () => {
  const { updateApiData } = useMyContext();
  const [semesters, setSemesters] = useState([]);
  const [startTime, setStartTime] = useState('07:00');
  const [endTime, setEndTime] = useState('22:00');
  const [credits, setCredits] = useState(100);
  const [loading, setLoading] = useState(false);
  const [availableUses, setAvailableUses] = useState(1);

  const [career, setCareer] = useState('');
  const [careerModalOpen, setCareerModalOpen] = useState(true);

  const [excludedTeachers, setExcludedTeachers] = useState([]);
  const [excludedTeacherInput, setExcludedTeacherInput] = useState('');
  const [excludedTeachersModalOpen, setExcludedTeachersModalOpen] = useState(false);

  const [excludedSubjects, setExcludedSubjects] = useState([]);
  const [excludedSubjectsInput, setExcludedSubjectInput] = useState('');
  const [excludedSubjectModalOpen, setExcludedSubjectModalOpen] = useState(false);
  
  const [extraSubjects, setExtraSubjects] = useState([]);
  const [extraSubjectInputName, setExtraSubjectInputName] = useState('');
  const [extraSubjectInputLevel, setExtraSubjectInputLevel] = useState(0);
  const [extraSubjectInputSemester, setExtraSubjectInputSemester] = useState(0);
  const [extraSubjectsModalOpen, seteExtraSubjectsModalOpen] = useState(false);

  const careers = [
    {
      nombre: 'A. industrial',
      clave: 'A'
    }, 
    {
      nombre: 'C. de la Informática',
      clave: 'C'
    },
    {
      nombre: 'Ing Ferroviaria',
      clave: 'F'
    }, {
      nombre: 'Ing Industrial',
      clave: 'I'
    },
    {
      nombre: 'Ing Informática',
      clave: 'N'
    },
    {
      nombre: 'Sistemas Automatrices',
      clave: 'S'
    },
    {
      nombre: 'Ing en Transporte',
      clave: 'T'
    }
    ];

  const handleExcludedTeachers = () => {
    setExcludedTeachersModalOpen(true);
  };

  const handleExcludedSubjects = () => {
    setExcludedSubjectModalOpen(true);
  };

  const handleExtraSubjects = () => {
    seteExtraSubjectsModalOpen(true);
  }

  const closeExcludedTeachersModal = () => {
    setExcludedTeachersModalOpen(false);
  }

  const closeExcludedSubjectsModal = () => {
    setExcludedSubjectModalOpen(false);
  }

  const closeExtraSubjectsModal = () => {
    seteExtraSubjectsModalOpen(false);
  }

  const handdleAddExcludedTeacher = () => {
    setExcludedTeachers([...excludedTeachers, excludedTeacherInput]);
    setExcludedTeacherInput('');
  }

  const handdleAddExcludedSubject = () => {
    setExcludedSubjects([...excludedSubjects, excludedSubjectsInput]);
    setExcludedTeacherInput('');
  }

  const handleAddExtraSubject = () => {
    const newExtraSubject = [`${extraSubjectInputLevel}CM${extraSubjectInputSemester}`, extraSubjectInputName]

    setExtraSubjects([...extraSubjects, newExtraSubject]);
    setExtraSubjectInputName('');
    setExtraSubjectInputLevel(0);
    setExtraSubjectInputSemester(0);
  }

  const handdleRemoveExcludedTeacher = (teacher) => {
    const newArr = excludedTeachers.filter(item => item !== teacher);

    setExcludedTeachers(newArr);
  }

  const handdleRemoveExcludedSubeject = (subject) => {
    const newArr = excludedSubjects.filter(item => item !== subject);

    setExcludedSubjects(newArr);
  }

  const handleRemoveExtraSubject = (extraSubject) => {
    const newArr = extraSubjects.filter(item => item !== extraSubject);

    setExtraSubjects(newArr);
  }

  let handdleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await fetch("http://localhost:3000/schedules", {
        method: "POST",
        headers:  {'Content-Type':  'application/json'},
        body: JSON.stringify({
          "levels":semesters,
          "semesters":semesters,
          "start_time":startTime,
          "end_time":endTime,
          "career":career,
          "shifts":["M", "V"],
          "length":7,
          "credits":credits,
          "available_uses":availableUses,
          "excluded_teachers":excludedTeachers,
          "excluded_subjects":excludedSubjects,
          "extra_subjects":extraSubjects,
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

  const handleCareerSelect = (career) => {
    setCareer(career);
    setCareerModalOpen(false);
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
        <Modal
          isOpen={careerModalOpen}
          style={{content:{
            width: '42%',
            position: 'none'
          }, overlay: {
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            justifyContent: 'center',
            alignItems: 'center'
          }}}
        >
          <div className='card shadow-sm'>
            <div className='card-body'>
              <p className='card-title text-left fw-medium fs-5'>Selecciona tu carrera</p>
              <div className="card-group">
                  {careers.map((item, index) => (
                    <div
                      className={`card opcion1 shadow-sm text-center fs-6 p-4`}
                      key={index}
                      onClick={() => handleCareerSelect(item.clave)}
                    >
                      <p className='m-4'>
                        {item.nombre}

                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

        </Modal>
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
                    <input type="text" className="form-control" name="horaInicio" placeholder="Ej. 09:00" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
                  </div>
                  <p className='mx-1 fw font-monospace fs-4'> - </p>
                  <div>
                    <input type="text" className="form-control" name="horaFin" placeholder="Ej. 17:00" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
                  </div>
                </div>
              </div>

              {/* Créditos - Input */}
              <div className="form-group my-1">
                <label className='fs-6 fw-medium'>Créditos:</label>
                <input type="number" className="form-control" name="creditos" value={credits} onChange={(e) => setCredits(e.target.value)}/>
              </div>
              <div className="form-group my-1">
                <label className='fs-6 fw-medium'>Usos disponibles:</label>
                <input type="number" className="form-control" name="creditos" value={availableUses} onChange={(e) => setAvailableUses(e.target.value)}/>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary btn-lg " onClick={handleExcludedTeachers}>
                  Excluir profesores
                </button>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary btn-lg " onClick={handleExcludedSubjects}>
                  Excluir asignaturas
                </button>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary btn-lg " onClick={handleExtraSubjects}>
                  Asignaturas Extra
                </button>
              </div>

              {/* Botón de envío */}
              <div className='d-grid mt-3'>
                <hr />
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
        <Modal
          isOpen={excludedTeachersModalOpen}
          style={{content:{
            width: '42%',
            position: 'none'
          }, overlay: {
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            justifyContent: 'center',
            alignItems: 'center'
          }}}
        >
          <div className='card'>
            <h5 className='card-header text-center'>Excluir profesores</h5>
            <div className='card-body'>
              <div className='container-fluid'>

              <div className='row mb-3'>
                <div className='form-row'>
                  <div className='row'>
                    <div className='col-9'>
                      <label>Ingresa el nombre del profesor a excluir:</label>
                      <input type='text' className='form-control'  value={excludedTeacherInput} onChange={(e) => setExcludedTeacherInput(e.target.value)}></input>
                    </div>
                    <div className='col-3'>
                      <button className='btn btn-primary w-100 mt-4' onClick={handdleAddExcludedTeacher}>Excluir</button>
                    </div>

                  </div>
                </div>
              </div>
              <div className='row my-2'>
                <div className='d-flex flex-row-reverse flex-wrap'>
                  {excludedTeachers.map((teacher, index) => (
                    <span class="badge bg-danger mx-1 my-1 excluded-teacher" index={index} onClick={() => handdleRemoveExcludedTeacher(teacher)}>{teacher}</span>
                  ))}

                </div>
              </div>
              <div className='row d-flex '>
                <button className='btn btn-outline-success mt-4' onClick={closeExcludedTeachersModal}>Guardar</button>
              </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={excludedSubjectModalOpen}
          style={{content:{
            width: '42%',
            position: 'none'
          }, overlay: {
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            justifyContent: 'center',
            alignItems: 'center'
          }}}
        >
          <div className='card'>
            <h5 className='card-header text-center'>Excluir asginaturas</h5>
            <div className='card-body'>
              <div className='container-fluid'>

              <div className='row mb-3'>
                <div className='form-row'>
                  <div className='row'>
                    <div className='col-9'>
                      <label>Ingresa el nombre de la asignatura a excluir:</label>
                      <input type='text' className='form-control'  value={excludedSubjectsInput} onChange={(e) => setExcludedSubjectInput(e.target.value)}></input>
                    </div>
                    <div className='col-3'>
                      <button className='btn btn-primary w-100 mt-4' onClick={handdleAddExcludedSubject}>Excluir</button>
                    </div>

                  </div>
                </div>
              </div>
              <div className='row my-2'>
                <div className='d-flex flex-row-reverse flex-wrap'>
                  {excludedSubjects.map((subject, index) => (
                    <span class="badge bg-danger mx-1 my-1 excluded-teacher" index={index} onClick={() => handdleRemoveExcludedSubeject(subject)}>{subject}</span>
                  ))}

                </div>
              </div>
              <div className='row d-flex '>
                <button className='btn btn-outline-success mt-4' onClick={closeExcludedSubjectsModal}>Guardar</button>
              </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={extraSubjectsModalOpen}
          style={{content:{
            width: '42%',
            position: 'none'
          }, overlay: {
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            justifyContent: 'center',
            alignItems: 'center'
          }}}
        >
          <div className='card'>
            <h5 className='card-header text-center'>Asignaturas extra</h5>
            <div className='card-body'>
              <div className='container-fluid'>

              <div className='row mb-3'>
                <div className='form-row'>
                  <div className='row'>
                    <div className='col-6'>
                      <label>Nivel de la asginatura:</label>
                      <input type='number' className='form-control'  value={extraSubjectInputLevel} onChange={(e) => setExtraSubjectInputLevel(e.target.value)}></input>
                    </div>
                    <div className='col-6'>
                      <label>Semestre de la asginatura:</label>
                      <input type='number' className='form-control'  value={extraSubjectInputSemester} onChange={(e) => setExtraSubjectInputSemester(e.target.value)}></input>
                    </div>

                  </div>
                  <div className='row'>
                    <div className='col-9'>
                      <label>Nombre de la asignatura:</label>
                      <input type='text' className='form-control'  value={extraSubjectInputName} onChange={(e) => setExtraSubjectInputName(e.target.value)}></input>
                    </div>
                    <div className='col-3'>
                      <button className='btn btn-primary w-100 mt-4' onClick={handleAddExtraSubject}>Agregar</button>
                    </div>

                  </div>
                </div>
              </div>
              <div className='row my-2'>
                <div className='d-flex flex-row-reverse flex-wrap'>
                  {extraSubjects.map((subject, index) => (
                    <span class="badge bg-danger mx-1 my-1 excluded-teacher" index={index} onClick={() => handleRemoveExtraSubject(subject)}>{subject[0]} {subject[1]}</span>
                  ))}

                </div>
              </div>
              <div className='row d-flex '>
                <button className='btn btn-outline-success mt-4' onClick={closeExtraSubjectsModal}>Guardar</button>
              </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
  );
}

export default GeneratonForm