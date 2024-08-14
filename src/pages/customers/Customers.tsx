import React from 'react'
import CustomerTable from './CustomerTable'


const Customers = () => {
  return (
    <>
        <h1 className='header-section-create'>Lista de Evento
            <button>Nuevo Evento</button>
        </h1>
        <hr />
        <CustomerTable />


    </>
  )
}

export default Customers