
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './picker.css'
import { useMyContext } from '../../../../MyContext';

const SchedulePicker = () => {
  const { apiData } = useMyContext();
  let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20];

  return (
    <div className='card shadow-sm'>
      <div className='card-body'>
        <h4 className='card-title text-left fw-semibold'>Tus mejores opciones</h4>
        <hr className='w-50 text-white-50 bg-dark shadow-sm'/>
        <div className="card-group overflow-auto">
          <div className="opciones-scroll">
            {
              
              apiData.map((item, index) => (
                <div className="card opcion shadow-sm" key={index}>{index+1}</div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePicker