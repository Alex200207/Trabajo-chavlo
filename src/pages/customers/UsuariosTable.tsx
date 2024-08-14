import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";

const CustomerTable = () => {
    const [rows, setRows] = useState([]);// Almacenar datos

    useEffect(() => { // Obtener datos en cada render
        const fetchData = async () => {
             const response = await axios.get("http://localhost:3000/usuarios");
             setRows(response.data);
         };
         fetchData();
     }, []);

    interface Row {
        id_usuario: number;
        Nombre: string;
        Correo_electronico: string;
        Contraceña: number;
        rol: number;

    }
    
    const editarCustomer = (id: number) => () => {
        alert(id);
    }

    const eliminarCustomer = (id: number) => () => {
        alert(id);
    }

    const columns = [
        {
            name: "id_usuario",
            selector: (row: Row) => row.id_usuario
        },
        {
            name: "Nombre",
            selector: (row: Row) => row.Nombre
        },
        {
            name: "Correo_electronico",
            selector: (row: Row) => row.Correo_electronico
        },
        {
            name: "Contraceña:",
            selector: (row: Row) => row.Contraceña
        },
        {
            name: "rol",
            selector: (row: Row) => row.rol
        },

        
        {
            name: "Acciones",
            cell: (row: Row) => <><div id='tableButtons'>
                <button onClick={editarCustomer(row.id)} className="btn btn-primary"><i className="material-icons-outlined">edit</i></button>
                <button onClick={eliminarCustomer(row.id)} className="btn btn-primary"><i className="material-icons-outlined">delete_forever</i></button>
            </div>
            </>
        }
    ];



  return (
    <div className="container my-5">
        <DataTable columns={columns} data={rows} pagination selectableRows />
    </div>
  )
}

export default CustomerTable