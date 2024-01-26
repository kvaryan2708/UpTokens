import {useState,useEffect} from "react";
import Web3 from "web3";
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


import NavDropdown from 'react-bootstrap/NavDropdown';
import WithdrawEth from "./WithdrawEth"
import WithdrawSTK from "./WithdrawSTK"
import WithdrawRWT from "./WithdrawRWT"
import BuyToken from "./BuyToken"
import Home from "./Home"
import Owner from "./Owner"
import Stake from "./Stake"
import UnStake from "./UnStake"
import User from "./User"
import { Spinner } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link ,Outlet} from "react-router-dom";

function App() {
const [con,setCon]=useState(false);
const [account,setAccount]=useState('0x000..');
const [balance,setBalance]=useState(0);
const [reward,setReward]=useState(0);
const [address,setAddress]=useState();
 

  const [state, setState] = useState({
    web3: null,
    contract1: null,
     contract2:null,contract3:null,
   
  });
  const [dictator,setDictator]=useState(false);
    async function loadWeb3() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        
        await window.ethereum.enable();
        const tokenABI=[
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
              }
            ],
            "name": "ERC20InsufficientAllowance",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
              }
            ],
            "name": "ERC20InsufficientBalance",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "approver",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidApprover",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidReceiver",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidSender",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidSpender",
            "type": "error"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "allowance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "decimals",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "symbol",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ]
        const tokenAddress='0xD9b8653652c40e8C6177227E1a8C420997B7Ac72';
        const tokenABI2=[
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
              }
            ],
            "name": "ERC20InsufficientAllowance",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
              }
            ],
            "name": "ERC20InsufficientBalance",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "approver",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidApprover",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidReceiver",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidSender",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidSpender",
            "type": "error"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "allowance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "decimals",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "symbol",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]
        const tokenAddress2='0x1B10B5Ec31dB577f8316E6ABf0563F278A9aCD6C';

        const tokenABI3=[
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "ammount",
                "type": "uint256"
              }
            ],
            "name": "requestEthforRWT",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "ammount",
                "type": "uint256"
              }
            ],
            "name": "requestEthforSTK",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "requestToken",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "rewardAmmount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "ammount",
                "type": "uint256"
              }
            ],
            "name": "rewardWithdrawl",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "ammount",
                "type": "uint256"
              }
            ],
            "name": "stake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "staked_ammount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "ad",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_stake",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "reward",
                "type": "address"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "withdraw_staked",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "ammount",
                "type": "uint256"
              }
            ],
            "name": "withdrawEth",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "ammount",
                "type": "uint256"
              }
            ],
            "name": "withdrawRWT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "ammount",
                "type": "uint256"
              }
            ],
            "name": "withdrawSTK",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "stateMutability": "payable",
            "type": "receive"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "deposits",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getBalanace",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "lastUpdTime",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "rewards",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "s_rewardToken",
            "outputs": [
              {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "s_stakingToken",
            "outputs": [
              {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]

        const tokenAddress3='0x5eC034e8dd669c4B163708a9a422aa87F42b5D4D';
        setAddress(tokenAddress3);
      
        const contract1= new web3.eth.Contract(tokenABI, tokenAddress);
        const contract2= new web3.eth.Contract(tokenABI2, tokenAddress2);
        const contract3= new web3.eth.Contract(tokenABI3, tokenAddress3);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setState({web3,contract1,contract2,contract3});
        setCon(true);
        if(account==='0xd377254722D3274f66eB66c392925F6052335CcB'){
          setDictator(true);
        }
       
      } else {
        console.log("MetaMask is not installed. Please install it.");
      }
    }
    const [loading, setLoading] = useState(false);
  

    // if(account==='0x24e27593ca36a2A3D941B0fdC2B839a08484111c'){
    //   setDictator(true);
    // }
    useEffect(() => {
      const {web3}=state;
      const handleTransaction = (status) => {
        // Set loading based on the transaction status
        setLoading(status === 'start');
      };
  
      // Connect to MetaMask provider
     
  
      // Listen for the 'transactionHash' event (start of the transaction)
      window.ethereum.on('transactionHash', () => {
        handleTransaction('start');
      });
  
      // Listen for the 'receipt' event (end of the transaction)
      window.ethereum.on('receipt', () => {
        handleTransaction('end');
      });
  
      return () => {
        // Clean up event listeners when component unmounts
        window.ethereum.removeAllListeners('transactionHash');
        window.ethereum.removeAllListeners('receipt');
      };
    }, [state]);
    


    async function getBalance() {
      const {contract1}=state;
     try {
       const balance = Number(await contract1.methods.balanceOf(account).call());
       //console.log(balance);
       setBalance(balance);
     } catch (error) {
       console.error('Error fetching balance:', error);
     }
   }
   async function getReward() {
    const {contract2}=state;
   try {
     const reward= Number(await contract2.methods.balanceOf(account).call());
     //console.log(balance);
     setReward(reward);
   } catch (error) {
     console.error('Error fetching balance:', error);
   }
 }

 
useEffect(()=>{
  
  getBalance();getReward();
},[getBalance,getReward])
const [val,setVal]=useState();
const [numtoken,setNumtoken]=useState();


const [staked,setStaked]=useState(0);
async function stakedAmmount() {
  const {web3,contract3}=state;
  try {
   const rewardVal=Number(await contract3.methods.staked_ammount().call({from:account}));
    //console.log(balance);
    setStaked(rewardVal);
    
    
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}
useEffect(()=>{
  stakedAmmount();
},[stakedAmmount])


  

  
useEffect(() => {
  // Simulate a click on the "Stake" Nav.Link when the component mounts
  const stakeNavLink = document.getElementById('home');

  if (stakeNavLink) {
    stakeNavLink.click();
  }
}, []);
  return (
    <div className="App">
    <div className="he"><h1><b>UpTokens</b></h1></div>
      <button className="connect" onClick={loadWeb3} >connect</button>
      <div className="staked" >Staked: {staked} STK</div>
     <div className="add">{account}</div>

     
     <div className="bal"><p>Balance</p>  {balance} STK</div>
     <div className="rew"><p>Rewards</p> {reward} RWT</div>
<br/><br/>
     {loading ?(
      <div className="popup">Loading  <Spinner animation="border" variant="light" size="sm" className="ms-1" /></div>
     ):("")}
     
     <Router>
 
 <Navbar bg="dark"  data-bs-theme="dark" fixed="top" >
 <Container>
 <Navbar.Brand href="#home">UpTokens</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto">
     <Nav.Link id="home" as={Link} to="Home">Home</Nav.Link>
       <Nav.Link as={Link} to="User">User</Nav.Link>
       <Nav.Link as={Link} to="Owner">Owner</Nav.Link>
      
       
     </Nav>
   </Navbar.Collapse>
 </Container>
</Navbar>

 <Routes>
  <Route id="home" exact path="Home" element={<Home/>}/>
   <Route exact path="User" element={
 <>    
  
   

<div className="box">

<Navbar bg="dark" data-bs-theme="dark"  >
<Container>

<Nav className="me-auto" >
<Nav.Link id="stake-nav-link" as={Link} to="BuyToken">
 BuyToken
</Nav.Link>
<Nav.Link  as={Link} to="Stake">
 Stake
</Nav.Link>
<Nav.Link as={Link} to="UnStake">
 UnStake
</Nav.Link>
</Nav>
</Container>
</Navbar> 
<Outlet/>
</div>
   
   
   <User
     web3={state.web3}
     contract1={state.contract1}
     contract2={state.contract2}
     contract3={state.contract3}

     account={account}
     address={address}
     getBalance={getBalance}
     getReward={getReward}
   />
   
  </> }>

  <Route exact path="BuyToken" element={<BuyToken
web3={state.web3}
contract1={state.contract1}
contract2={state.contract2}
contract3={state.contract3}

account={account}
getBalance={getBalance}/>}/>
<Route exact path="Stake" element={<Stake
web3={state.web3}
contract1={state.contract1}
contract2={state.contract2}
contract3={state.contract3}

account={account}
address={address}
getBalance={getBalance}
  stakedAmmount={stakedAmmount}/>}/>

<Route exact path="UnStake" element={<UnStake
web3={state.web3}
contract1={state.contract1}
contract2={state.contract2}
contract3={state.contract3}

account={account}
getBalance={getBalance}
/>}/>
   </Route>      
 

   <Route exact path="Owner" element={
   
 <>    
  
  

<div className="box1">

<Navbar bg="dark" data-bs-theme="dark"  >
<Container>

<Nav className="me-auto" >
<Nav.Link id="own" as={Link} to="WithdrawEth" className="me-5">
 ETH
</Nav.Link>
<Nav.Link  as={Link} to="WithdrawSTK" className="me-5">
STK
</Nav.Link>
<Nav.Link as={Link} to="WithdrawRWT" className="me-5">
 RWT
</Nav.Link>
</Nav>
</Container>
</Navbar> 
<Outlet/>
</div>
   
   <Owner account={account}/>
  
   
  </> }>

  <Route exact path="WithdrawEth" element={<WithdrawEth
web3={state.web3}
contract1={state.contract1}
contract2={state.contract2}
contract3={state.contract3}

account={account}
/>}/>
<Route exact path="WithdrawSTK" element={<WithdrawSTK
web3={state.web3}
contract1={state.contract1}
contract2={state.contract2}
contract3={state.contract3}

account={account}
address={address}
getBalance={getBalance}/>}/>

<Route exact path="WithdrawRWT" element={<WithdrawRWT
web3={state.web3}
contract1={state.contract1}
contract2={state.contract2}
contract3={state.contract3}

account={account}
address={address}
getReward={getReward}
/>}/>
   </Route>      
 
 </Routes>
 </Router>


     </div>
    
  );
}

export default App;


