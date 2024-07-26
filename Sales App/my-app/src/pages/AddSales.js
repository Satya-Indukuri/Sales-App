import React from 'react'
import { useState } from 'react';
import '../pages/AddSales.css'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from "sweetalert2";

export const AddSales = () => {

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState();
    const [amount, setAmount] = useState();

    const addsale = (e)=>{
        e.preventDefault();
        const request = {productName, quantity, amount};
        axios.post(`${API_BASE_URL}/addsale`, request, CONFIG_OBJ )
        .then((result)=>{
            if(result.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: "Sale added to the database"
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: err.response.data.error
            })
        })

    }

    return (
        <div className='container'>
            <h3 className='text-center m-3'>ADD SALE ENTRY</h3>
            <form onSubmit={(e)=>addsale(e)} className='shadow border-left-1 border-right-1 border-bottom-1 p-4 rounded'>
                <div className="form-group mb-2">
                    <label className='text-muted'>Product Name</label>
                    <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="form-group mb-2">
                    <label className='text-muted'>Quantity</label>
                    <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label className='text-muted'>Amount</label>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" step="0.01" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary submit-button-sales">Submit</button>
            </form>
        </div>
    )
}
