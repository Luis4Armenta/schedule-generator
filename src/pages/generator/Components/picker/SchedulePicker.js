
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './picker.css'
import { useMyContext } from '../../../../MyContext';

const SchedulePicker = ({ onSelect }) => {
  const { apiData } = useMyContext();
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    onSelect(schedule);
  }

  return (
    <div className='card shadow-sm'>
      <div className='card-body'>
        <h4 className='card-title text-left fw-semibold'>Tus mejores opciones</h4>
        <hr className='w-50 text-white-50 bg-dark shadow-sm'/>
        <div className="card-group overflow-auto">
          <div className="opciones-scroll">
            {
              
              apiData.map((item, index) => (
                <div className="card opcion shadow-sm" key={index} onClick={() => handleScheduleSelect(item)}>{index+1}</div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePicker