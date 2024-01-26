// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Staking is ReentrancyGuard {
    using SafeMath for uint256;
    address public immutable owner;
     IERC20 public s_stakingToken;
  IERC20 public s_rewardToken;

  mapping(address=>uint256) public deposits;
  mapping(address=>uint256) public rewards;
  mapping(address=>uint256) public lastUpdTime;

    constructor(address ad,address _stake,address reward){
        owner=ad;
         s_stakingToken=IERC20(_stake);
          s_rewardToken=IERC20(reward);
    }
function requestToken() external  nonReentrant payable{
   
 s_stakingToken.transfer(msg.sender,msg.value);
}
receive() external payable{}

function requestEthforSTK(uint256 ammount) external nonReentrant payable{
    
    bool status=s_stakingToken.transferFrom(msg.sender,address(this),ammount);//require Approval
    require(status,"Insufficient Tokens");
    address  payable rec=payable(msg.sender);
    rec.transfer(ammount);

}
function requestEthforRWT(uint256 ammount) external nonReentrant payable{
    require(ammount>=1000000);
    bool status=s_rewardToken.transferFrom(msg.sender,address(this),ammount);//require Approval
    require(status,"Insufficient Tokens");
    address  payable rec=payable(msg.sender);
    uint256 res=ammount/1000000;
    rec.transfer(res);

}



function stake(uint256 ammount) external nonReentrant {
      require(ammount>=100,"Minimum staking amount is 100 Tokens");
     bool status=s_stakingToken.transferFrom(msg.sender,address(this),ammount); //require approval
      require(status,"Insufficient Tokens");
      if(deposits[msg.sender]>0){
        rewards[msg.sender]+=(deposits[msg.sender]*(block.timestamp-lastUpdTime[msg.sender])*10)/1000;
       
      }
      deposits[msg.sender]+=ammount;
       lastUpdTime[msg.sender]=block.timestamp;
}

function rewardVal(address ad) internal view returns(uint256){
    return rewards[ad]+((deposits[ad]*(block.timestamp-lastUpdTime[ad])*10)/1000);
}

function rewardAmmount() external nonReentrant returns(uint256){
    return rewardVal(msg.sender);
}

function rewardWithdrawl(uint256 ammount) external nonReentrant {
  rewards[msg.sender]=rewardVal(msg.sender);
  lastUpdTime[msg.sender]=block.timestamp;
  require(rewards[msg.sender]>=ammount,"Insufficient Tokens");
   bool status=s_rewardToken.transfer(msg.sender,ammount);
   require(status,"Reverted");

   rewards[msg.sender]-=ammount;
}
function staked_ammount() external nonReentrant returns(uint256){
    return deposits[msg.sender];
}
function withdraw_staked(uint256 amount) external nonReentrant {
    require(amount>=100,"Minimum staking amount is 100 Tokens");
    require(deposits[msg.sender]<=amount,"Insufficient Tokens");
     bool status=s_stakingToken.transfer(msg.sender,amount);
     require(status,"Reverted");
     rewards[msg.sender]+=rewardVal(msg.sender);
     lastUpdTime[msg.sender]=block.timestamp;
     deposits[msg.sender]-=amount;
}


function getBalanace() public view returns(uint256){
    return address(this).balance;
}

function withdrawEth(uint256 ammount) external nonReentrant payable {
    require(owner==msg.sender,"You are not Owner");
    require(address(this).balance>=ammount,"Ammount Overflowed");
    address payable rec=payable(msg.sender);
    rec.transfer(ammount);

}

function withdrawSTK(uint256 ammount) external nonReentrant  {
      require(owner==msg.sender,"You are not Owner");
    bool status=s_stakingToken.transfer(msg.sender,ammount);
    require(status,"Ammount exceeded");
}
function withdrawRWT(uint256 ammount) external nonReentrant  {
      require(owner==msg.sender,"You are not Owner");
    bool status=s_rewardToken.transfer(msg.sender,ammount);
    require(status,"Ammount exceeded");
}

}