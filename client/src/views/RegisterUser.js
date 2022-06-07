import React,{useState,useEffect} from 'react'
import getWeb3 from '../getWeb3';
import Estate from "../contracts/Estate.json";
function RegisterUser() {
    let [account,setAccount] = useState(null);
    let [contract,setContract] = useState(null);
    let [fname,setFname] = useState();
    let [email,setEmail] = useState();
    
    let [cnumber,setCnumber] = useState();
    let [photo, setPhoto] = useState();
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
    const Register=async()=>{
      let send = await contract.methods.registerUser(account[0],fname,cnumber,email).send({ from: account[0] })
    }

   useEffect(() => {
  
      metaLogin();
    });
  return (
   
    <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
          <div class="card-img-left d-none d-md-flex">
          
          </div>
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Register</h5>
            <form>

              <div class="form-floating mb-3">
                <input type="text" value={fname} onChange={(e)=>setFname(e.target.value)} class="form-control" id="floatingInputFullname" placeholder="fullname" required autofocus/>
                <label for="floatingInputFullname">Full Name</label>
              </div>

              <div class="form-floating mb-3">
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} class="form-control" id="floatingInputEmail" placeholder="name@example.com"/>
                <label for="floatingInputEmail">Email Address</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="floatingInputAddr" disabled/>
                <label for="floatingInputAddr">{account}</label>
              </div>
              <hr/>

              <div class="form-floating mb-3">
                <input type="number" value={cnumber} onChange={(e)=>setCnumber(e.target.value)} class="form-control" id="floatingCnumber" placeholder="Citizenship Number"/>
                <label for="floatingCnumber">Citizenship Number</label>
              </div>

              <div class="d-grid mb-2">
                <button onClick={()=>Register()} class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</button>
              </div>

              <a class="d-block text-center mt-2 small" href="/login">Have an account? Sign In</a>

              

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default RegisterUser