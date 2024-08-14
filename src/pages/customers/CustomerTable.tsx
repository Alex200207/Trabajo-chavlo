import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';

//
interface Row {
    id_evento: number;
    Titulo: string;
    Descripcion: string;
    id_usuario: number;
    id_lugar: number;
    id_categoria: number;
}

const CustomerTable: React.FC = () => {
    const [rows, setRows] = useState<Row[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/eventos");
                setRows(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const editarCustomer = (row: Row) => () => {

    }

  

    const eliminarCustomer = (row: Row) => () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Esta acción no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, estoy seguro!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/eventos/${row.id_evento}`);
                    setRows(prevRows => prevRows.filter(r => r.id_evento !== row.id_evento)); 
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El evento ha sido eliminado.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("Error deleting event:", error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo eliminar el evento.",
                        icon: "error"
                    });
                }
            }
        });
    }

    const columns = [
        {
            name: "ID Evento",
            selector: (row: Row) => row.id_evento,
        },
        {
            name: "Título",
            selector: (row: Row) => row.Titulo,
        },
        {
            name: "Descripción",
            selector: (row: Row) => row.Descripcion,
        },
        {
            name: "ID Usuario",
            selector: (row: Row) => row.id_usuario,
        },
        {
            name: "ID Lugar",
            selector: (row: Row) => row.id_lugar,
        },
        {
            name: "ID Categoría",
            selector: (row: Row) => row.id_categoria,
        },
        {
            name: "Acciones",
            cell: (row: Row) => (
                <div id='tableButtons'>
                    <button onClick={editarCustomer(row)} className="btn btn-primary">
                        <i className="material-icons-outlined">edit</i>
                    </button>
                    <button onClick={eliminarCustomer(row)} className="btn btn-danger">
                        <i className="material-icons-outlined">delete_forever</i>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="container my-5">
            <DataTable columns={columns} data={rows} pagination selectableRows />
        </div>
    );
}

export default CustomerTable;
