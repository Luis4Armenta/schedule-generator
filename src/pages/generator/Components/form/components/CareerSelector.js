import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { setCareer } from '../../../../../store/slices/form/formSlice';

const CareerSelector = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

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

  const handleCareerSelect = (career) => {
    dispatch(setCareer(career));
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          width: '42%',
          position: 'none'
        }, overlay: {
          display: 'flex',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
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
  );
}

export default CareerSelector;