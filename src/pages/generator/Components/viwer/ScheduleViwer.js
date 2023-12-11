import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Schedule from './schedule/Schedule'

const ScheduleViwer = () => {

  return (
    <div className='card w-100 h-100'>
      <div className='card-body p-2 h-100'>
        <div>
          <div className='row'>
            <p className='fs-3 text-center mt-4  mb-0 mfw-semibold'>Horario</p>
            <hr className='mb-4 mt-3 text-gray-100 bg-dark shadow-sm' style={{width: '85%', margin: '0 auto'}}/>
          </div>
          <div className='row'>
            <div className='h-100'>
              <Schedule />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ScheduleViwer