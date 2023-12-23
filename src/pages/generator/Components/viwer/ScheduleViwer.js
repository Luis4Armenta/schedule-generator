import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Schedule from './schedule/Schedule'
import { useDispatch, useSelector } from 'react-redux';
import { displaySchedule } from '../../../../store/slices/viwer/viwerSlice';

const ScheduleViwer = () => {
  const dispatch = useDispatch();
  
  const schedulePicked = useSelector(state => state.picker.schedulePicked);
  const displayedSchedule = useSelector(state => state.viwer.displayedSchedule);

  useEffect(() => {
    dispatch( displaySchedule( schedulePicked ) );
  }, [schedulePicked, dispatch]);
  
  return (
    <div className='card w-100 h-100'>
      <div className='card-body p-2 h-100'>
        <div>
          <div className='row'>
            <p className='fs-4 text-center mt-1  mb-1 fw-medium'>Horario</p>
            <hr className='mb-3 mt-1 text-gray-100 bg-dark shadow-sm' style={{width: '85%', margin: '0 auto'}}/>
          </div>
          <div className='row'>
            <div className='h-100'>
              <Schedule selectedSchedule={displayedSchedule}/>
            </div>
          </div>
          <div className='row text-end w-100'>
            <div className='col-12'>
              <span className='d-inline'>
                {displayedSchedule ? <p>Popularidad: {displayedSchedule.popularity.toFixed(4)} | Total de creditos requerido: {displayedSchedule.total_credits_required}</p>
                : <p>Popularidad: 0.0000 | Total de creditos requerido: 0</p>}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ScheduleViwer