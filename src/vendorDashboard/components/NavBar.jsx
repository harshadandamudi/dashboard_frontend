import React from 'react'

const NavBar = ({showLoginHandler,showRegisterHandler,showLogout,logoutHandler }) => {
  return (
    <div className='navSection'>
        <div className='company'>
            Vendor Dashboard
        </div>
    <div className='userAuth'>
      {!showLogout ?
       <> <button onClick={showLoginHandler}>Login/</button>
        <button onClick={showRegisterHandler}>Register</button> </> :
        <button onClick={logoutHandler }> Logout </button> }
    </div>
    </div>
  )
}

export default NavBar