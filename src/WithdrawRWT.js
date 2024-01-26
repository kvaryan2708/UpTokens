import { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import {toast} from "react-hot-toast"
function WithdrawRWT({web3,contract1,contract2,contract3,account,address,getReward}){
    const [val,setVal]=useState();
    const [num,setNum]=useState();

    async function withdrawRWT() {
        
        try {
          const id=toast.loading("Transaction is pending...");
          await contract3.methods.withdrawRWT(val).send({from:account});
          toast.dismiss(id);
          toast.success('Transaction confirmed 👌');
          //console.log(balance);
          getbalance();getReward();
          setVal("");
           
          
        } catch (error) {
          console.error('Error in Withdrawing', error);
        }
      }
      async function getbalance() {
        
        try {
          const num=Number(await contract2.methods.balanceOf(address).call());
          console.log(address);
          
          setNum(num);
        
          
        } catch (error) {
          console.error('Error in Withdrawing', error);
        }
      }
      useEffect(()=>{
        getbalance();
      },[ address, contract1, getbalance]);
    return(

        <div className="App">
            
            <div className="ethbal">Balance: {num} RWT</div>

            
             <div>
            <input
              type="number"
              id="val"
              required="required"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Amount of RWT"
            />
          </div>
          
          <button className="button" onClick={withdrawRWT}>Withdraw</button>

        </div>
    );
}
export default WithdrawRWT;