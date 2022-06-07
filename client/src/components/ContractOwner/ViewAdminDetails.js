import React,{useEffect, useState} from 'react'
import getWeb3 from '../../getWeb3';
import Estate from "../../contracts/Estate.json";

const ViewAdminDetails=(props)=> {
    
    let[admin,setAdmin]=useState({});
   
    const  metaLogin = async () =>{ 
        
        try {

            props.contract.options.address = "0xcb7460E4B7B6c58f1d0EdF8134Ba1A4974769cD0";
            
            
            let data = await props.contract.methods.viewAdminDetails(props.user).call();
              setAdmin(data);
              console.log(data);
          } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              'Failed to load web3, accounts, or contract. Check console for details.'
            );
            console.error(error);
          }

    }
   const removeAdministrator=async (adminaddr)=>{
    let data=await props.contract.methods.removeAdmin(adminaddr).send({ from: props.account[0] });
    if (data){window.location.reload(false);}
    

   }
      useEffect(() => {
  
        metaLogin();

      },[]);
  
  return (
    <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id={"heading"+props.index}>
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+props.index} aria-expanded="false" aria-controls={"collapse"+props.index}>
               <strong>{props.index+1}. {admin.name}</strong>      
                </button>
              </h2>
              <div id={"collapse"+props.index} class="accordion-collapse collapse " aria-labelledby={"heading"+props.index} data-bs-parent="#accordionExample">
                <div class="accordion-body">
                 <div class='row'>
                     <div class='col-3'><strong>Name</strong></div>
                     <div class='col-3'>{admin.name}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>Admin Address</strong></div>
                     <div class='col-3'>{admin.addr}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>District</strong></div>
                     <div class='col-3'>{admin.district}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>Municipality</strong></div>
                     <div class='col-3'>{admin.vdcMunicipality}</div>
                 </div>
                 <div>
                        <div class='col-3'><strong></strong></div>
                     <div class='col-3'><button type="button" class="btn btn-danger" onClick={()=>removeAdministrator(props.user)}>Remove Admin</button></div>
                    
                 </div>
                </div>
              </div>

            </div>
        </div>
  )
}

export default ViewAdminDetails