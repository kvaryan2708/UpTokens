import { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import {toast} from "react-hot-toast"
function UnStake({web3,contract1,contract2,contract3,account,getBalance}){
    const [val,setVal]=useState();
    

    async function stake() {
        
        try {
          const id=toast.loading("Transaction is pending..."); 
          await contract3.methods.withdraw_staked(val).send({from:account});
          toast.dismiss(id);
          toast.success('Transaction confirmed 👌');
          //console.log(balance);
          getBalance();
          setVal("");
        } catch (error) {
          console.error('Error in withdrawing', error);
        }
      }
    return(

        <div className="App">
            <h>Enter STK Ammount</h>
            <br/><br/>
             <div>
            <input
              type="number"
              id="val"
              required="required"
              value={val}
              onChange={(e) => (setVal(e.target.value))}
              placeholder="Amount to Withdraw"
            />
          </div>
          <p>Minimum 100 STK</p>
          <button className="button" onClick={stake}>UnStake</button>

        </div>
    );
}
export default UnStake;