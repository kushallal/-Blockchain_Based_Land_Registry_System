import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'
function Nav(props) {
    const logout=()=>{
        localStorage.removeItem('is_login');
        localStorage.removeItem('address');
        localStorage.removeItem('contract');
        localStorage.removeItem('user');
        props.setLogin(false);
        window.location.reload(false);


        
    }
    useEffect(() => {
       
    },[props.login]);
  return (
    
  
        <nav class="navbar navbar-expand-lg navbar-light bg-info">
          
  <Link class="navbar-brand" to="/">
    <img src={logo} width="70" height="70" class="d-inline-block align-top" alt=""/>

  </Link>
    
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <ul class="navbar-nav">
      <li class="nav-item active">
      <Link class="nav-link" to="/">Home</Link>

        
      </li>
      
      {localStorage.getItem("is_login")?<>
      <li class="nav-item">
        <Link class="nav-link" to="/dashboard">Dashboard</Link>
      </li>
      <li class="nav-item">
      <a class="nav-link " onClick={()=>logout()} href="#">Logout</a>
    </li></>:<><li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/register">Register</a>
      </li></>}
      
    </ul>
    </div>
    </nav>
    
  )
}

export default Nav