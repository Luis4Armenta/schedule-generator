import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { setCareer } from '../../../../../store/slices/form/formSlice';

const CareerSelector = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const careers = [
    {
      nombre: 'Administración industrial',
      clave: 'A'
    },
    {
      nombre: 'Ciencias de la Informática',
      clave: 'C'
    },
    {
      nombre: 'Ingeniería Ferroviaria',
      clave: 'F'
    }, {
      nombre: 'Ingeniería Industrial',
      clave: 'I'
    },
    {
      nombre: 'Ingeniería Informática',
      clave: 'N'
    },
    {
      nombre: 'Ingeniería en Sistemas Automatrices',
      clave: 'S'
    },
    {
      nombre: 'Ingeniería en Transporte',
      clave: 'T'
    }
  ];

  const handleCareerSelect = (career) => {
    dispatch(setCareer(career));
    setIsOpen(false);
  };


  Modal.setAppElement('#root');
  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          width: '80%',
          height: '90%',
          position: 'none',
          background: 'none',
          border: 'none',
          padding: '0px'
        }, overlay: {
          display: 'flex',
          backgroundColor: 'rgba(17, 17, 17, 0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
    >
      <div className='card shadow-sm'>
        <div className='card-body'>
          <p className='card-title text-center fw-medium fs-5'>Selecciona tu carrera</p>
          <hr className='w-90 text-white-50 bg-dark shadow-sm mt-0' style={{margin: 'auto'}}/>
          <div className="row row-cols-1 row-cols-md-3 overflow-auto g-4 m-1">
            {careers.map((item, index) => (
              <div className='col'>
                <div
                  className={`card shadow-sm text-center fs-6 p-4 h-100 opcion1`}
                  key={index}
                  onClick={() => handleCareerSelect(item.clave)}
                >
                  <div className='card-body w-100 d-flex align-items-center'>
                    <p className='w-100 text-center '>
                      {item.nombre}

                    </p>

                  </div>

              </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </Modal>
  );
}

export default CareerSelector;