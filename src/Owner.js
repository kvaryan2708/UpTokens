import { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

function Owner({account}){
 const [is,setIs]=useState(false)

useEffect(()=>{
 if(account!='0xd377254722D3274f66eB66c392925F6052335CcB'){
  setIs(true);
 }
},[account])
    useEffect(() => {
        // Simulate a click on the "Stake" Nav.Link when the component mounts
        const stakeNavLink = document.getElementById('own');
      
        if (stakeNavLink) {
          stakeNavLink.click();
        }
      }, [account]);
    return(
        <div className="App">
        {is ? (<div className="hj"><h1><b>You are not Owner !</b></h1></div>) :('')}
        
        </div>
    );
}
export default Owner;