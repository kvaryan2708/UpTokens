import { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import {toast} from "react-hot-toast"
function WithdrawEth({web3,contract1,contract2,contract3,account}){
    const [val,setVal]=useState();
    const [num,setNum]=useState(0);

    async function withdrawEth() {
        
        try {
          const id=toast.loading("Transaction is pending...");
          await contract3.methods.withdrawEth(val).send({from:account});
          toast.dismiss(id);
          toast.success('Transaction confirmed 👌');
          //console.log(balance);
          getBalance();
          setVal("");
           
          
        } catch (error) {
          console.error('Error in Withdrawing', error);
        }
      }
      async function getBalance() {
        
        try {
          const num=Number(await contract3.methods.getBalanace().call({from:account}));
          console.log(num);
          
          setNum(num);
        
          
        } catch (error) {
          console.error('Error in Withdrawing', error);
        }
      }
      useEffect(()=>{
        getBalance();
      },[getBalance])
    return(

        <div className="App">

            <div className="ethbal">Balance: {num} WEI</div>

            
             <div>
            <input
              type="number"
              id="val"
              required="required"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Amount in Wei"
            />
          </div>
          
          <button className="button" onClick={withdrawEth}>Withdraw</button>

        </div>
    );
}
export default WithdrawEth;