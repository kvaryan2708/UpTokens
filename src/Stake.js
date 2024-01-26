import { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import {toast} from "react-hot-toast"
function Stake({web3,contract1,contract2,contract3,account,address,getBalance,stakedAmmount}){
    const [val,setVal]=useState();
    

    async function stake() {
        
        try {
          const id=toast.loading("Transaction is pending...");
       
            await contract1.methods.approve(address,val).send({from:account});
          await contract3.methods.stake(val).send({from:account});
          toast.dismiss(id);
          toast.success('Transaction confirmed 👌');
          //console.log(balance);
          getBalance();stakedAmmount();
          setVal("");
        } catch (error) {
          console.error('Error in buying', error);
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
              placeholder="Amount to Stack"
            />
          </div>
          <p>Minimum 100 STK</p>
          <button className="button" onClick={stake}>Stake</button>

        </div>
    );
}
export default Stake;