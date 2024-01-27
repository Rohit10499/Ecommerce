import React, { useState } from 'react'
import Layout from "./../components/Layout/Layout"
import { useAuth } from '../context/auth'
function HomePage() {
  const [auth,setAuth]=useAuth();
  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);
  return (

    <Layout >
 
    <div className='row' style={{minHeight:"31.5rem",paddingTop:"4rem"}}>
      <div className='col-3'>
        <h6 className='text-center'>Filter By Category</h6>
      </div>
      <div className='col-9 '  >
        <h1 className='text-center'> All Products</h1>
        <div className='d-flex flex-wrap' >
          <h1 >Products</h1>
        </div> 
      
    </div>
  
   
   
    </div>
  
    
    
    
    
    </Layout>
  )
}

export default HomePage