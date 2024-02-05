import {useState,useEffect} from "react";
import Web3 from "web3";
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import {toast} from "react-hot-toast"


function User({web3,contract1,contract2,contract3,account,address,getBalance,getReward}){
    const [selectedTok,setSelectedTok]=useState('STK');
    const [val,setVal]=useState();
    const [numtoken,setNumtoken]=useState();
    const option=['STK','RWT'];
    const [loading,setLoading]=useState(false);
    const handleSelectTok = (event) => {
      setSelectedTok(event.target.value);
    };
   

   
      
      const [rewardVal,setRewardVal]=useState(0);
      async function rewardCal() {
        
        try {
          const id=toast.loading("Transaction is pending...");
          
          
          
         const rewardVal=Number(await contract3.methods.rewardAmmount().call({from:account}));
         toast.dismiss(id);
          toast.success('Transaction confirmed 👌');
          //console.log(balance);
          setRewardVal(rewardVal);
          setLoading(false);
          
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
      const [rval,setRval]=useState();
async function rewardWithdrawl() {
  
  try {
    const id=toast.loading("Transaction is pending...");
   await contract3.methods.rewardWithdrawl(rval).send({from:account});
   toast.dismiss(id);
   toast.success('Transaction confirmed 👌');
    //console.log(balance);
    getReward();
    setRval("");
    
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

async function swap() {
  
  try {
    if(selectedTok==='STK') {
      const id=toast.loading("Transaction is pending...");
    await contract1.methods.approve(address,val).send({from:account});
    await contract3.methods.requestEthforSTK(val).send({from:account});
    toast.dismiss(id);
    toast.success('Transaction confirmed 👌');}
    else{
      if(val<1000000){
        alert("Minimum 1000000 RWT")
      }
      else{
        const id=toast.loading("Transaction is pending...");
      await contract2.methods.approve(address,val).send({from:account});
      await contract3.methods.requestEthforRWT(val).send({from:account});
      toast.dismiss(id);
      toast.success('Transaction confirmed 👌');}
    }
    setVal("");
    getBalance();getReward();
    
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}
useEffect(() => {
  // Simulate a click on the "Stake" Nav.Link when the component mounts
  const stakeNavLink = document.getElementById('stake-nav-link');

  
    stakeNavLink.click();
  
}, []);
return(
<div className="App">
<div className="tokenEthSwap"><b>Token Etherum Swap</b><br/><br/>
     <p>Select Token
     <select value={selectedTok} onChange={handleSelectTok}>
      
        {option.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select></p>
      <div>
            <input
              type="number"
              id="val"
              required="required"
              value={val}
              onChange={(e) => (setVal(e.target.value))}
              placeholder="Amount to Swap "
            />
          </div>
          <button className="button" onClick={swap}>Swap</button>


     
     </div>

     <div className="rewardcal"><b>Reward Calculator</b><br/>
     <button className="button" onClick={rewardCal}> Calculate</button><br/>
     <p>mRWT Earning:- {rewardVal}</p>
     <b>Withdrawl</b><br/>
     <div>
            <input
              type="number"
              id="rval"
              required="required"
              value={rval}
              onChange={(e) => (setRval(e.target.value))}
              placeholder="Amount to Withdraw"
            />
          </div>
          <button className="button" onClick={rewardWithdrawl}>Proceed</button>
     </div>
    

</div>

);  
}

export default User;

       