import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Top5Sales = () => {
    const [sales, setSales] = useState([]);
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const getAllSales = () => {
        axios.get(`${API_BASE_URL}/getsales`, CONFIG_OBJ)
            .then((result) => {
                setSales(result.data.sales);
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred while getting data of sales. Make sure to login'
                  })
            })

    }

    useEffect(() => {
        getAllSales();
    }, []);
    return (
        <div className='container'>
            <h3 className='text-center m-3'>TOP 5 SALES</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sales Id:</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Sale Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => {
                        return (
                            <tr key={sale._id}>
                                <th scope="row">{index+1}</th>
                                <td>{sale._id}</td>
                                <td>{sale.productName}</td>
                                <td>{sale.quantity}</td>
                                <td>{sale.amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
