import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';
import { useDispatch, useSelector } from 'react-redux';
import {  addLevel, addSemester, changeAvailableUses, changeCourseLength, changeCredits, changeEndTime, changeStartTime, removeLevel, removeSemester } from '../../../../store/slices/form/formSlice';
import { getSchedules } from '../../../../store/slices/form/thunks';
import CareerSelector from './components/CareerSelector'
import TeacherExcluder from './components/TeacherExcluder';
import SubjectExcluder from './components/SubjectExcluder';
import ExtraSubjectsProvider from './components/ExtraSubjectsProvider';
import RequiredSubjectsProvider from './components/RequiredSubjectsProvider';

const ScheduleGenerationForm = () => {
  const dispatch = useDispatch();

  const career = useSelector(state => state.form.career);
  const levels = useSelector(state => state.form.levels);
  const semesters = useSelector(state => state.form.semesters);
  const startTime = useSelector(state => state.form.startTime);
  const endTime = useSelector(state => state.form.endTime);
  const credits = useSelector(state => state.form.credits);
  const availableUses = useSelector(state => state.form.availableUses);
  const courseLength = useSelector(state => state.form.courseLength);
  const excludedTeachers = useSelector(state => state.form.excludedTeachers);
  const excludedSubjects = useSelector(state => state.form.excludedSubjects);
  const extraSubjects = useSelector(state => state.form.extraSubjects);
  const requiredSubjects = useSelector(state => state.form.requiredSubjects);
  
  const loading = useSelector(state => state.form.isGenerating);
  
  const [excludedTeachersModalOpen, setExcludedTeachersModalOpen] = useState(false);
  const [excludedSubjectModalOpen, setExcludedSubjectModalOpen] = useState(false);
  const [extraSubjectsModalOpen, setExtraSubjectsModalOpen] = useState(false);
  const [requiredSubjectsModalOpen, setRequiredSubjectsModalOpen] = useState(false);
  
  let handdleSubmit = (e) => {
    e.preventDefault();
    const params = {
      levels,
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


  const handleLevels = (event) => {
    if (event.target.checked) {
      dispatch(addLevel(event.target.value));
    } else {
      dispatch(removeLevel(event.target.value));
    }
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
        <CareerSelector />
        <TeacherExcluder isOpen={excludedTeachersModalOpen} setIsOpen={setExcludedTeachersModalOpen} />
        <SubjectExcluder isOpen={excludedSubjectModalOpen} setIsOpen={setExcludedSubjectModalOpen} />
        <ExtraSubjectsProvider isOpen={extraSubjectsModalOpen} setIsOpen={setExtraSubjectsModalOpen} />
        <RequiredSubjectsProvider isOpen={requiredSubjectsModalOpen} setIsOpen={setRequiredSubjectsModalOpen} />
        <div className="card-body pt-1">
          <div className='position-relative'>
            <p className='fs-4 text-center mt-2  mb-1 fw-medium'>Ajustes</p>
            <hr className='mb-3 mt-1 text-gray-100 bg-dark shadow-sm w-90' />
          </div>
          <form className="d-flex flex-column justify-content-between" onSubmit={handdleSubmit}>
              <div className="form-group my-1">
                <label className='fs-6 fw-medium'>Niveles:</label>
                <div>
                  {["1", "2", "3", "4", "5", "6", "7", "8"].map((nivel) => (
                    <div key={nivel} className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`nivel${nivel}`}
                        name="niveles"
                        value={nivel}
                        onChange={handleLevels}
                      />
                      <label className="form-check-label" htmlFor={`nivel${nivel}`}>
                        {nivel}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
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
                        {semestre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group my-1">
                <label className='fs-6 fw-medium'>Tiempo:</label>
                <div className="d-flex justify-content-between py-0 my-0">
                    <input title="Hora de entrada" type="time" className="form-control my-0 py-0" name="horaInicio" value={startTime} onChange={(e) => dispatch( changeStartTime(e.target.value) )} style={{height: '35px'}}/>
                  <div className=''>
                    <p className='mx-1 fw font-monospace fs-4 py-0 my-0'> - </p>
                  </div>
                    <input title="Hora de salida" type="time" className="form-control my-0 py-0" name="horaFin" value={endTime} onChange={(e) => dispatch( changeEndTime(e.target.value) )} style={{height: '35px'}}/>
                </div>
              </div>

              {/* Créditos - Input */}
              <div className="form-group my-1">
                <div className='row'>
                  <div className='col-6'>
                    <label className='fs-6 fw-medium'>Créditos:</label>
                    <input type="number" className="form-control form-control-sm" name="creditos" value={credits} onChange={(e) => dispatch( changeCredits(e.target.value) )}/>
                  </div>
                  <div className='col-6'>
                    <label className='fs-6 fw-medium'>Número de materias:</label>
                    <input type="number" className="form-control form-control-sm" name="creditos" value={courseLength} onChange={(e) => dispatch( changeCourseLength(Number(e.target.value)) )}/>
                  </div>

                </div>
              </div>
              <div className="form-group my-1">
                <label className='fs-6 fw-medium'>Usos disponibles:</label>
                <input type="number" className="form-control form-control-sm" name="creditos" value={availableUses} onChange={(e) => dispatch( changeAvailableUses(e.target.value))}/>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary" onClick={() => {setExcludedTeachersModalOpen(true)}}>
                  Excluir profesores
                </button>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary" onClick={() => {setExcludedSubjectModalOpen(true)}}>
                  Excluir asignaturas
                </button>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary" onClick={() => {setExtraSubjectsModalOpen(true)}}>
                  Asignaturas opcionales
                </button>
              </div>
              <div className="form-group my-1 d-grid mt-3">
                <button type="button" className="btn btn-outline-primary " onClick={() => {setRequiredSubjectsModalOpen(true)}}>
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
      </div>
  );
}

export default ScheduleGenerationForm