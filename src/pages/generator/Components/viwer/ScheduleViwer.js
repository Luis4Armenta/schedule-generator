import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Schedule from './schedule/Schedule'

const ScheduleViwer = ({ selectSchedule }) => {

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
              <Schedule selectedSchedule={selectSchedule}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ScheduleViwer