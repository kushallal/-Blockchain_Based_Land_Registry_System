import React,{useState,useEffect} from 'react'
import getWeb3 from '../../getWeb3';
import Estate from "../../contracts/Estate.json";
function AddLand() {
    let [area,setArea]= useState(null);
    let [district,setDistrict]= useState(null);
    let [vdc,setVdc]= useState(null);
    let [ward,setWard]= useState(null);
    let [kitta,setKitta]= useState(null);
    let [account,setAccount] = useState(null);
    let [contract,setContract] = useState(null);
    const  metaLogin = async () =>{ 
        try {

            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();

            const deployedNetwork = Estate.networks[networkId];
            const instance = new web3.eth.Contract(
              Estate.abi,
              deployedNetwork && deployedNetwork.address,
            );
            instance.options.address = "0xcb7460E4B7B6c58f1d0EdF8134Ba1A4974769cD0";
            setAccount(accounts);
            setContract(instance);
                
          } catch (error) {
            // Catch any errors for any of the above operations.
            
            console.error(error);
          }

    }
    useEffect(() => {
  
        metaLogin()
        });
    const add=async()=>{
        let send = await contract.methods.addLand(area,district,vdc,ward,kitta).send({ from: account[0] })
        console.log(send);
    }
    useEffect(() => {
  
        metaLogin();
      });

  return (
    <div className='container'>    
        <div className="form-body">
    <div className="row">
        <div className="form-holder">
            <div className="form-content">
                <div className="form-items">
                    <h3>Add Land</h3>
                    
                    <form class="requires-validation" novalidate>

                        <div className="col-md-12 mt-4">
                           <input onChange={(e)=>setArea(e.target.value)} value={area} className="form-control" type="text" name="name" placeholder="Area(in Square Feet)" required/>
                           <div className="valid-feedback">Area field is valid!</div>
                           <div className="invalid-feedback">Area field cannot be blank!</div>
                        </div>
                        <div className="col-md-12 mt-4">
                           <input onChange={(e)=>setDistrict(e.target.value)} value={district} className="form-control" type="text" name="district" placeholder="District" required/>
                           <div className="valid-feedback">District field is valid!</div>
                           <div className="invalid-feedback">District field cannot be blank!</div>
                        </div>
                        <div className="col-md-12 mt-4">
                           <input onChange={(e)=>setVdc(e.target.value)} value={vdc} className="form-control" type="text" name="vdc" placeholder="VDC/Municipality" required/>
                           <div className="valid-feedback">VDC field is valid!</div>
                           <div className="invalid-feedback">VDC field cannot be blank!</div>
                        </div>
                        <div className="col-md-12 mt-4">
                           <input onChange={(e)=>setWard(e.target.value)} value={ward} className="form-control" type="text" name="wardno" placeholder="Ward Number" required/>
                           <div className="valid-feedback">Ward field is valid!</div>
                           <div className="invalid-feedback">Ward field cannot be blank!</div>
                        </div>
                        <div className="col-md-12 mt-4">
                           <input onChange={(e)=>setKitta(e.target.value)} value={kitta} className="form-control" type="text" name="kitta" placeholder="Kitta Number" required/>
                           <div className="valid-feedback">Kitta field is valid!</div>
                           <div className="invalid-feedback">Kitta field cannot be blank!</div>
                        </div>
                       
              

                        <div class="form-button mt-3">
                            <button id="submit" type="submit" class="btn btn-primary" onClick={()=>add()}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

    </div>
  )
}

export default AddLand