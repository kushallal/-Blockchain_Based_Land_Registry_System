import React,{useEffect, useState} from 'react'
import getWeb3 from '../../getWeb3';
import Estate from "../../contracts/Estate.json";

const ViewUserDetails=(props)=> {
    
    let[userdetails,setUserdetails]=useState({});
   
    const  metaLogin = async () =>{ 
        
        try {

            props.contract.options.address = "0xcb7460E4B7B6c58f1d0EdF8134Ba1A4974769cD0";
            
            
            let data = await props.contract.methods.viewUserDetails(props.user).call();
              setUserdetails(data);
              console.log(data);
          } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              'Failed to load web3, accounts, or contract. Check console for details.'
            );
            console.error(error);
          }

    }
    const verify=async(unuser)=>{
        let data=await props.contract.methods.verifyUser(unuser).send({ from: props.account[0] })
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
               <strong>{props.index+1}. {userdetails.name}</strong>      
                </button>
              </h2>
              <div id={"collapse"+props.index} class="accordion-collapse collapse " aria-labelledby={"heading"+props.index} data-bs-parent="#accordionExample">
              <div class="accordion-body">
              <div class='row'>
                     <div class='col-3'><strong>Name</strong></div>
                     <div class='col-3'>{userdetails.name}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>Citizenship Number</strong></div>
                     <div class='col-3'>{userdetails.citizenshipNo}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>User Address</strong></div>
                     <div class='col-3'>{userdetails.id}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>E-mail</strong></div>
                     <div class='col-3'>{userdetails.email}</div>
                 </div>
                 <div>
                        <div class='col-3'><strong></strong></div>
                     <div class='col-3'><button type="button" class="btn btn-success" onClick={()=>verify(props.user)}>Verify User</button></div>
                    
                 </div>
                </div>
              
              </div>

            </div>
        </div>
  )
}

export default ViewUserDetails