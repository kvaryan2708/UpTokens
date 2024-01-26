import { useState, useEffect } from "react";
import {toast} from "react-hot-toast"
import Web3 from "web3";
import "./App.css";
import { Navbar, Container, Nav, Spinner } from 'react-bootstrap';

function BuyToken({web3,contract1,contract2,contract3,account,getBalance}){
    const [val,setVal]=useState();
    const [numtok,setNumtok]=useState(0);
    
    async function buySTK() {
        
        try {
          const id=toast.loading("Transaction is pending...");
          await contract3.methods.requestToken().send({from:account,value:val});
          
          toast.dismiss(id);
          toast.success('Transaction confirmed 👌');

     getBalance();
          setVal("");
          setNumtok("");
          
          
        } catch (error) {
          console.error('Error in buying', error);
        }
      }
      
    return(

        <div className="App">
         
            <h>Buy STK Tokens</h><br/><br/>

            
             <div>
            <input
              type="number"
              id="val"
              required="required"
              value={val}
              onChange={(e) => (setVal(e.target.value),setNumtok(e.target.value))}
              placeholder="Amount in Wei"
            />
          </div>
          <p>{numtok} mSTK</p>
          <button className="button" onClick={buySTK}>Buy</button>

        </div>
    );
}
export default BuyToken;