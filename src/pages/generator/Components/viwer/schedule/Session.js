import React from 'react';
import './session.css'

const Session = ({ session }) => {
  const duracion = (new Date(`2022-01-01 ${session.fin}`) - new Date(`2022-01-01 ${session.inicio}`)) / 60000;
  const filasDuracion = duracion / 30;

  return (
    <td rowSpan={filasDuracion} className={`${session.color.bg} ${session.color.text} p-auto`}>
      <p className='text-center text-uppercase fw-semibold m-1 fs-6 lh-sm'>{session.subject}</p>
      <p className='text-center text-uppercase font-monospace m-1 fs-6 lh-sm'>4CM40</p>
      <p className='text-center text-capitalize fw-medium m-1 fs-6 lh-sm'>{session.teacher}</p>
      <p className='text-center m-1 fs-6 lh-sm '>{session.positiveScore}</p>
    </td>
  );
};

export default Session;