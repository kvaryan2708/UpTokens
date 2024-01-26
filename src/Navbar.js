import React from 'react'
import { Link ,Outlet} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Link to="BuyToken" className='button'>Buy STK</Link>&nbsp;&nbsp;&nbsp;
        <Link to="Stake" className='button'>Stake</Link>&nbsp;&nbsp;&nbsp;
        <Link to="UnStake" className='button'>UnStake</Link>&nbsp;&nbsp;&nbsp;
        <Outlet/>
    </div>
  )
}

export default Navbar