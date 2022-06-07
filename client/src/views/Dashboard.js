import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import getWeb3 from '../getWeb3';
import Estate from "../contracts/Estate.json";

import CDashboard from '../components/ContractOwner/CDashboard';
import AdminDashboard from '../components/Admin/AdminDashboard';
import UserDashboard from '../components/User/UserDashboard';

const Dashboard=()=>
{

 let navigate=useNavigate();




  const checkUser= ()=>{
   
    let check = localStorage.getItem('user');
    if (check==1)
    {
     
      return (<CDashboard/>)
    }
    else if(check==2)
    {
      return(<AdminDashboard/>)
    }
    else if(check==3)
    {
      return(<UserDashboard/>)
    }
    
    }
  
  useEffect(() => {
    if(!localStorage.getItem('is_login')) {
       navigate("/");

    }
   
  },[]);
  return (
    <div>
      {checkUser()}
      
      
    </div>
    
  )
}

export default Dashboard