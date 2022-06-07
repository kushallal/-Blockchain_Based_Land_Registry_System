import React,{useEffect, useState} from 'react'
import getWeb3 from '../../getWeb3';
import Estate from "../../contracts/Estate.json";

const ViewLandDetails=(props)=> {
    
    let[landdetails,setLanddetails]=useState({});
   
    const  metaLogin = async () =>{ 
        
        try {

            props.contract.options.address = "0xcb7460E4B7B6c58f1d0EdF8134Ba1A4974769cD0";
            let data = await props.contract.methods.viewLandDetails(props.land).call();
              setLanddetails(data);
              console.log(data);
          } catch (error) {
            // Catch any errors for any of the above operations.
            
            console.error(error);
          }

    }
    const verify=async(unland)=>{
        let data=await props.contract.methods.verifyLand(unland).send({ from: props.account[0] })
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
               <strong> {landdetails.id}</strong>      
                </button>
              </h2>
              <div id={"collapse"+props.index} class="accordion-collapse collapse " aria-labelledby={"heading"+props.index} data-bs-parent="#accordionExample">
              <div class="accordion-body">
              <div class='row'>
                     <div class='col-3'><strong>Id</strong></div>
                     <div class='col-3'>{landdetails.id}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>Owner's Address</strong></div>
                     <div class='col-3'>{landdetails.oAddr}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>Area</strong></div>
                     <div class='col-3'>{landdetails.area}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>District</strong></div>
                     <div class='col-3'>{landdetails.district}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>Municipality</strong></div>
                     <div class='col-3'>{landdetails.vdcMunicipality}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>Ward Number</strong></div>
                     <div class='col-3'>{landdetails.wardNo}</div>
                 </div>
                 <div class='row'>
                     <div class='col-3'><strong>Kitta Number</strong></div>
                     <div class='col-3'>{landdetails.kittaNo}</div>
                 </div>
                 
                </div>
                

              </div>

            </div>
        </div>
  )
}

export default ViewLandDetails