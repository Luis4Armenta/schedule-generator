import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { addExcludedSubjects, addExcludedTeachers, addExtraSubject, addRequiredSubject, addSemester, changeAvailableUses, changeCourseLength, changeCredits, changeEndTime, changeStartTime, removeExcludedSubjects, removeExcludedTeachers, removeExtraSubject, removeRequiredSubject, removeSemester, setCareer } from '../../../../store/slices/form/formSlice';
import { getSchedules } from '../../../../store/slices/form/thunks';

const GeneratonForm = () => {
  const dispatch = useDispatch();

  const semesters = useSelector(state => state.form.semesters);

  const startTime = useSelector(state => state.form.startTime);
  const endTime = useSelector(state => state.form.endTime);

  const credits = useSelector(state => state.form.credits);
  const career = useSelector(state => state.form.career);
  const availableUses = useSelector(state => state.form.availableUses);
  const courseLength = useSelector(state => state.form.courseLength);
  
  const excludedTeachers = useSelector(state => state.form.excludedTeachers);
  const excludedSubjects = useSelector(state => state.form.excludedSubjects);
  
  const extraSubjects = useSelector(state => state.form.extraSubjects);
  const requiredSubjects = useSelector(state => state.form.requiredSubjects);
  
  
  const loading = useSelector(state => state.form.isGenerating);

  const [careerModalOpen, setCareerModalOpen] = useState(true);

  const [excludedTeacherInput, setExcludedTeacherInput] = useState('');
  const [excludedTeachersModalOpen, setExcludedTeachersModalOpen] = useState(false);

  const [excludedSubjectsInput, setExcludedSubjectInput] = useState('');
  const [excludedSubjectModalOpen, setExcludedSubjectModalOpen] = useState(false);
  
  const [extraSubjectInputName, setExtraSubjectInputName] = useState('');
  const [extraSubjectInputLevel, setExtraSubjectInputLevel] = useState(0);
  const [extraSubjectInputSemester, setExtraSubjectInputSemester] = useState(0);
  const [extraSubjectsModalOpen, seteExtraSubjectsModalOpen] = useState(false);

  const [requiredSubjectInputName, setRequiredSubjectInputName] = useState('');
  const [requiredSubjectInputLevel, setRequiredSubjectInputLevel] = useState(0);
  const [requiredSubjectInputSemester, setRequiredSubjectInputSemester] = useState(0);
  const [requiredSubjectsModalOpen, setRequiredaSubjectsModalOpen] = useState(false);


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


  const handdleAddExcludedTeacher = () => {
    dispatch( addExcludedTeachers(excludedTeacherInput) )
    setExcludedTeacherInput('');
  }

  const handdleAddExcludedSubject = () => {
    dispatch( addExcludedSubjects(excludedSubjectsInput) )
    setExcludedSubjectInput('');
  }

  const handleAddExtraSubject = () => {
    const newExtraSubject = [`${extraSubjectInputLevel}${career}M${extraSubjectInputSemester}`, extraSubjectInputName]

    dispatch( addExtraSubject(newExtraSubject) );
    setExtraSubjectInputName('');
    setExtraSubjectInputLevel(0);
    setExtraSubjectInputSemester(0);
  }

  const handleAddRequiredSubject = () => {
    const newRequiredSubject = [`${requiredSubjectInputLevel}${career}M${requiredSubjectInputSemester}`, requiredSubjectInputName]

    dispatch( addRequiredSubject(newRequiredSubject) );
    setRequiredSubjectInputName('');
    setRequiredSubjectInputLevel(0);
    setRequiredSubjectInputSemester(0);
  }

  const handdleRemoveExcludedTeacher = (teacher) => {
    dispatch( removeExcludedTeachers(teacher) )
  }

  const handdleRemoveExcludedSubeject = (subject) => {
    dispatch( removeExcludedSubjects(subject) )
  }

  const handleRemoveExtraSubject = (extraSubject) => {
    dispatch( removeExtraSubject(extraSubject) )
  }

  const handleRemoveRequiredSubject = (requiredSubject) => {
    dispatch( removeRequiredSubject(requiredSubject) )
  }

  let handdleSubmit = (e) => {
    e.preventDefault();
    const params = {
      semesters,
      semesters,
      startTime,
      endTime,
      career,
      courseLength,
      credits,
      availableUses,
      excludedTeachers,
      excludedSubjects,
      extraSubjects,
      requiredSubjects,
    };

    dispatch( getSchedules(params) );
  }

  const handleCareerSelect = (career) => {
    dispatch(dispatch( setCareer(career) ))
    setCareerModalOpen(false);
  }


  const handleSemesters = (event) => {
    if (event.target.checked) {
      dispatch(addSemester(event.target.value));
    } else {
      dispatch(removeSemester(event.target.value));
    }
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
              <div className="card-group overflow-auto d-flex justify-content-center">
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
                    <input type="text" className="form-control" name="horaInicio" placeholder="Ej. 09:00" value={startTime} onChange={(e) => dispatch( changeStartTime(e.target.value) )}/>
                  </div>
                  <p className='mx-1 fw font-monospace fs-4'> - </p>
                  <div>
                    <input type="text" className="form-control" name="horaFin" placeholder="Ej. 17:00" value={endTime} onChange={(e) => dispatch( changeEndTime(e.target.value) )}/>
                  </div>
                </div>
              </div>

              {/* Créditos - Input */}
              <div className="form-group my-1">
                <div className='row'>
                  <div className='col-6'>
                    <label className='fs-6 fw-medium'>Créditos:</label>
                    <input type="number" className="form-control" name="creditos" value={credits} onChange={(e) => dispatch( changeCredits(e.target.value) )}/>
                  </div>
                  <div className='col-6'>
                    <label className='fs-6 fw-medium'>Número de materias:</label>
                    <input type="number" className="form-control" name="creditos" value={courseLength} onChange={(e) => dispatch( changeCourseLength(Number(e.target.value)) )}/>
                  </div>

                </div>
              </div>
              <div className="form-group my-1">
                <label className='fs-6 fw-medium'>Usos disponibles:</label>
                <input type="number" className="form-control" name="creditos" value={availableUses} onChange={(e) => dispatch( changeAvailableUses(e.target.value))}/>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary btn-lg " onClick={() => {setExcludedTeachersModalOpen(true)}}>
                  Excluir profesores
                </button>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary btn-lg " onClick={() => {setExcludedSubjectModalOpen(true)}}>
                  Excluir asignaturas
                </button>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary btn-lg " onClick={() => {seteExtraSubjectsModalOpen(true)}}>
                  Asignaturas opcionales
                </button>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary btn-lg " onClick={() => {setRequiredaSubjectsModalOpen(true)}}>
                  Asiganturas requeridas
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
                <button className='btn btn-outline-success mt-4' onClick={() => {setExcludedTeachersModalOpen(false)}}>Guardar</button>
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
                <button className='btn btn-outline-success mt-4' onClick={() => {setExcludedSubjectModalOpen(false)}}>Guardar</button>
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
            <h5 className='card-header text-center'>Asignaturas opcionales</h5>
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
                <button className='btn btn-outline-success mt-4' onClick={() => {seteExtraSubjectsModalOpen(false)}}>Guardar</button>
              </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={requiredSubjectsModalOpen}
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
            <h5 className='card-header text-center'>Asignaturas requeridas</h5>
            <div className='card-body'>
              <div className='container-fluid'>

              <div className='row mb-3'>
                <div className='form-row'>
                  <div className='row'>
                    <div className='col-6'>
                      <label>Nivel de la asginatura:</label>
                      <input type='number' className='form-control'  value={requiredSubjectInputLevel} onChange={(e) => setRequiredSubjectInputLevel(e.target.value)}></input>
                    </div>
                    <div className='col-6'>
                      <label>Semestre de la asginatura:</label>
                      <input type='number' className='form-control'  value={requiredSubjectInputSemester} onChange={(e) => setRequiredSubjectInputSemester(e.target.value)}></input>
                    </div>

                  </div>
                  <div className='row'>
                    <div className='col-9'>
                      <label>Nombre de la asignatura:</label>
                      <input type='text' className='form-control'  value={requiredSubjectInputName} onChange={(e) => setRequiredSubjectInputName(e.target.value)}></input>
                    </div>
                    <div className='col-3'>
                      <button className='btn btn-primary w-100 mt-4' onClick={handleAddRequiredSubject}>Agregar</button>
                    </div>

                  </div>
                </div>
              </div>
              <div className='row my-2'>
                <div className='d-flex flex-row-reverse flex-wrap'>
                  {requiredSubjects.map((subject, index) => (
                    <span class="badge bg-danger mx-1 my-1 excluded-teacher" index={index} onClick={() => handleRemoveRequiredSubject(subject)}>{subject[0]} {subject[1]}</span>
                  ))}

                </div>
              </div>
              <div className='row d-flex '>
                <button className='btn btn-outline-success mt-4' onClick={() => setRequiredaSubjectsModalOpen(false)}>Guardar</button>
              </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
  );
}

export default GeneratonForm