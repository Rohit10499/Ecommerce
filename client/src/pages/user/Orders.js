import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Order = () => {
  return (
    <Layout>
        <div className=' pnf container-fluid '>
    <div className='row w-100 m-3 p-3'>
        <div className='col-md-3 '>
                <UserMenu/>
            </div> 
            <div className='col-md-9'>
                <h1>All Orders</h1>
            </div>

            </div>
         </div>
    </Layout>
  )
}

export default Order 