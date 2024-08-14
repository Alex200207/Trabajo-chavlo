import React from 'react'
import CustomerTable from './CustomerTable'

const Customers = () => {
  return (
    <>
        <h1 className='header-section-create'>Lista de clientes
            <button>Nuevo Cliente</button>
        </h1>
        <hr />
        <CustomerTable />

    </>
  )
}

export default Customers