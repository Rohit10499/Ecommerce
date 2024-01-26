import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Profile = () => {
  return (
  <Layout>
   <div className='pagesPadding pnf container-fluid '>
    <div className='row w-100 m-3 p-3'>
        <div className='col-md-3 '>
            <UserMenu/>
        </div>
        <div className='col-md-9'>
            <h1>Your Profile</h1>
        </div>
    </div>
    </div>
  </Layout>
  )
}

export default Profile