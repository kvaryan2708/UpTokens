import { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

function Home(){

    return(
        <div className="App">
            
            <div className="home">
       <p> <b>Hey Welcome to UpTokens</b></p>
         On This Platform You can buy and stake STK Tokens and 
         get RWT tokens as reward for your Staked Tokens. You can
        easily exchange RWT and STK Tokens with ETH using UpTokens.You can also add
        STK and RWT Token to your metamask wallet.
        </div>
        
        <div className="home1">
            Use this Address <b>'0xD9b8653652c40e8C6177227E1a8C420997B7Ac72'</b> to import 
            <b> STK Tokens </b>to your metamask wallet
        </div>

        <div className="home2">
            Use this Address <b>'0x1B10B5Ec31dB577f8316E6ABf0563F278A9aCD6C'</b> to import 
            <b> RWT Tokens </b>to your metamask wallet
        </div>
        </div>
    );
}
export default Home;