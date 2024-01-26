import { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import {toast} from "react-hot-toast"

function WithdrawSTK({web3,contract1,contract2,contract3,account,address,getBalance}){
    const [val,setVal]=useState();
    const [num,setNum]=useState(0);

    async function withdrawSTK() {
        
        try {
          const id=toast.loading("Transaction is pending...");
          await contract3.methods.withdrawSTK(val).send({from:account});
          toast.dismiss(id);
          toast.success('Transaction confirmed 👌');
          //console.log(balance);
          getbalance();getBalance();
          setVal("");
           
          
        } catch (error) {
          console.error('Error in Withdrawing', error);
        }
      }
      async function getbalance() {
        
        try {
          const num=Number(await contract1.methods.balanceOf(address).call());
          console.log(num);
          
          setNum(num);
        
          
        } catch (error) {
          console.error('Error in Withdrawing', error);
        }
      }
      useEffect(()=>{
        getbalance();
      },[getbalance])
    return(

        <div className="App">

            <div className="ethbal">Balance: {num} mSTK</div>

            
             <div>
            <input
              type="number"
              id="val"
              required="required"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Amount of STK"
            />
          </div>
          
          <button className="button" onClick={withdrawSTK}>Withdraw</button>

        </div>
    );
}
export default WithdrawSTK;