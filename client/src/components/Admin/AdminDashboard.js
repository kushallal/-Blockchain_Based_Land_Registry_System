import React,{useState} from 'react'
import VerifyLand from './VerifyLand';
import VerifyUser from './VerifyUser';

function AdminDashboard() {
  let [dashvalue,setDashvalue]= useState(localStorage.getItem('dashvalue'));
    const checkDash=(value)=>{
        setDashvalue(value);
        }
        const display=()=>
        {
          if (dashvalue==1)
          {
            localStorage.setItem('dashvalue',1);
            return (<VerifyUser/>)
          }
          else if(dashvalue==2)
          {
            localStorage.setItem('dashvalue',2)
            return (<VerifyLand/>)
            
    
            
          }
          
        }
  return (
    <div>
    <div class="container-fluid">
  <div class="row flex-nowrap">
      <div class="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-secondary">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/dashboard" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <span class="fs-5 d-none d-sm-inline">Dashboard</span>
              </a>
              <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="dashboard">
                  <li class="nav-item">
                      <a href='#'  class="nav-link align-middle px-0"  onClick={()=>checkDash(1)}>
                          <i class="fs-4 "></i> <span class="ms-1 d-none d-sm-inline" >Verify User</span>
                      </a>
                  </li>
                  
                  <li>
                      <a href="#" class="nav-link px-0 align-middle" onClick={()=>checkDash(2)}>
                          <i class="fs-4 color-white"></i> <span class="ms-1 d-none d-sm-inline">Verify Land</span></a>
                  </li>
                  
                  
              </ul>
            
             
          </div>
      </div>
      <div class="col py-3">
         {display() }
      </div>
  </div>
</div>
  </div>
  
  )
}

export default AdminDashboard