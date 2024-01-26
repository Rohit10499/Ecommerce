import React from 'react'
import Layout from "./../components/Layout/Layout"
import { useAuth } from '../context/auth'
function HomePage() {
  const [auth,setAuth]=useAuth()
  return (

    <Layout >
    <div className=' pnf container-fluid '>
  
 
     <h1>Home Page</h1>
    <pre style={{width:"100%", whiteSpace:"pre-wrap", wordWrap:"break-word"}}>
      {JSON.stringify(auth,null,4)}
    </pre>
    </div>
  
    
    
    
    
    </Layout>
  )
}

export default HomePage