import React, { useState,useEffect } from 'react'
import getWeb3 from '../../getWeb3';
import Estate from "../../contracts/Estate.json";
import ViewAdminDetails from './ViewAdminDetails';

function AdminList() {
  let [account,setAccount] = useState(null);
    let [contract,setContract] = useState(null);
    let [list,setList]=useState([])
   
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
    const display=async()=>{
      
      let data = await contract.methods.ReturnAllAdminList().call()
      setList(data);
      
    }
    
    
    useEffect(() => {
  
      metaLogin();
    });

  return (
    <div>
     
      <button onClick={()=>display()} class='btn btn-secondary'>
    View Administrator List 
    
    </button>
    <hr/>
    <table style={{width:"100%"}}>
      
    
    {list.map((user,index)=>{
      return  <tr key={index}> 
      <td style={{width:"100%"}}>
        <ViewAdminDetails user={user} index={index} account={account} contract={contract}/>


    </td>
      </tr>
    })}
    
    
    </table>
    </div>
    
  )
}

export default AdminList