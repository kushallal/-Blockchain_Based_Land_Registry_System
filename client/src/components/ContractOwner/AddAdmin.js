import React,{useState,useEffect} from 'react'
import getWeb3 from '../../getWeb3';
import Estate from "../../contracts/Estate.json";
function AddAdmin() {
    let [name,setName]= useState(null);
    let [addr,setAddr]= useState(null);
    let [dist,setDist]= useState(null);
    let [munic,setMunic]= useState(null);
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
        let send = await contract.methods.addAdmin(addr,name,dist,munic).send({ from: account[0] })
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
                    <h3>Add Administrator</h3>
                    
                    <form class="requires-validation" novalidate>

                        <div className="col-md-12 mt-4">
                           <input onChange={(e)=>setName(e.target.value)} value={name} className="form-control" type="text" name="name" placeholder="Full Name" required/>
                           <div className="valid-feedback">Full Name field is valid!</div>
                           <div className="invalid-feedback">Full Name field cannot be blank!</div>
                        </div>

                        <div className="col-md-12 mt-4">
                            <input onChange={(e)=>setAddr(e.target.value)} value={addr} className="form-control" type="text" name="addr" placeholder="Account Address" required/>
                             <div className="valid-feedback">Private Key field is valid!</div>
                             <div className="invalid-feedback">Private Key field cannot be blank!</div>
                        </div>

                      


                       <div class="col-md-12 mt-4">
                          <input onChange={(e)=>setDist(e.target.value)} value={dist} class="form-control" type="text" name="district" placeholder="District" required/>
                           <div class="valid-feedback">District field is valid!</div>
                           <div class="invalid-feedback">District field cannot be blank!</div>
                       </div>

                       <div class="col-md-12 mt-4">
                          <input onChange={(e)=>setMunic(e.target.value)} value={munic} class="form-control" type="text" name="municipality" placeholder="Municipality" required/>
                           <div class="valid-feedback">Municipality field is valid!</div>
                           <div class="invalid-feedback">Municipality field cannot be blank!</div>
                       </div>

                       

                    <div class="form-check mt-4">
                      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                      <label class="form-check-label">I confirm that all data are correct</label>
                     <div class="invalid-feedback">Please confirm that the entered data are all correct!</div>
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

export default AddAdmin