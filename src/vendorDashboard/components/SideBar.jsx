import React from 'react'

const SideBar = ({showFirmHandler,showProductHandler,showAllProductsHandler}) => {
  return (
    <div className='sideBarSection'>
        <ul>
            <li onClick={showFirmHandler}>Add Firm</li>
            <li onClick={showProductHandler}>Add Products</li>
            <li onClick={showAllProductsHandler}>All Products</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default SideBar