import React,{useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import getWeb3 from '../getWeb3';
import Estate from "../contracts/Estate.json";
import Metalogo from '../assets/MetaMask.png';
function Login(props) {
    let navigate = useNavigate();
    let [account,setAccount] = useState(null);
    let [contract,setContract] = useState(null);
    let [error,setError] =useState(null);
    
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
            alert(
              'Failed to load web3, accounts, or contract. Check console for details.'
            );
            console.error(error);
            
          }

    }
    const checkAuth = async()=>{
      
     
      localStorage.removeItem('is_login');
      localStorage.removeItem('address');
   
      const result =await contract.methods.isContractOwner(account[0]).call();
      
      
    if (result==true)
    {
        setError(false);
        localStorage.setItem('is_login',true);
        localStorage.setItem('address',account[0]);
        console.log(result)
        props.setLogin(true);
        localStorage.setItem('user',1);
        return navigate("/dashboard");
        

        

    }
    else {
      const result =await contract.methods.isAdmin(account[0]).call();
      if (result==true)
    {
        setError(false);
        localStorage.setItem('is_login',true);
        localStorage.setItem('address',account[0]);
        console.log(result)
        props.setLogin(true);
        localStorage.setItem('user',2);
        return navigate("/dashboard");

        

    }
    else{
      
      const result =await contract.methods.isUserVerified(account[0]).call();
      if ( result==true)
    {
        setError(false);
        localStorage.setItem('is_login',true);
        localStorage.setItem('address',account[0]);
        console.log(result)
        props.setLogin(true);
        localStorage.setItem('user',3);
        return navigate("/dashboard");

        

    }
      else{
        setError(true);}
      
    }
    }


}

useEffect(() => {
  
  metaLogin()
  });


  return (
    <div className="text-center" onClick={async () => checkAuth()}>
      
      <img src={Metalogo} height="200" />

      <div className="container mt-3">
          {error !== null ? 
        <> {error == true ?  <div class="alert alert-danger" role="alert">
          You are not authorized.
        </div> :  <div class="alert alert-success" role="alert">
        You are Login successfully.
        </div>}
        </>
        : ''}


      </div>
    </div>

  )
}

export default Login