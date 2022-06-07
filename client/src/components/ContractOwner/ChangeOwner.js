import React,{useState,useEffect} from 'react'
import getWeb3 from '../../getWeb3';
import Estate from "../../contracts/Estate.json";
function ChangeOwner() {
  let [account,setAccount] = useState(null);
  let [contract,setContract] = useState(null);
  let [addr,setAddr] = useState(null);
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
const change=async()=>{
  
  await contract.methods.changeContractOwner(addr).send({ from: account[0] })
}
useEffect(() => {
  
  metaLogin()
  });
  return (
    <div>
      Change Contract Owner
      <form class="requires-validation" novalidate>

                        <div className="col-md-12 mt-4">
                           <input onChange={(e)=>setAddr(e.target.value)} value={addr} className="form-control" type="text" name="address" placeholder="Account Address" required/>
                           <div className="valid-feedback">Full Name field is valid!</div>
                           <div className="invalid-feedback">Full Name field cannot be blank!</div>
                        </div>
                        <div class="form-button mt-3">
                            <button id="submit" type="submit" class="btn btn-primary" onClick={()=>change()}>Register</button>
                        </div>
        </form>

    </div>
  )
}

export default ChangeOwner