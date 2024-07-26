import React from 'react'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from "sweetalert2";
import { useState } from 'react';
import { useEffect } from 'react';

export const TotalRevenue = () => {
  const [totalrevenue, setTotalrevenue] = useState(0);
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const totalRevenue = () => {
    axios.get(`${API_BASE_URL}/totalrevenue`, CONFIG_OBJ)
      .then((result) => {
        console.log(result);
        const revenue = result.data.totalRevenue;
        const totalAmount = typeof revenue === 'object' ? parseFloat(revenue.$numberDecimal) : revenue;
        setTotalrevenue(totalAmount);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: err.response.data.error
        })
      });
  }


  useEffect(() => {
    totalRevenue();
  }, []);

  return (
    <div>
      <>
        <h3 className='text-center m-3'>TODAYS'S REVENUE IS {totalrevenue}</h3>
      </>
    </div>
  )
}
