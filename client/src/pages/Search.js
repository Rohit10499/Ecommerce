
import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues]=useSearch()
  return (
  <Layout>


    <div className='container'>
        <div className='text-center'>
        <h1>Search Result</h1>
       <h6>{values?.results.length < 1 ?"No Products Found" :`Found ${values?.results.length}`}</h6>


       <div className="row g-4">
            {/* <h1 >Products</h1> */}     
            {values?.results?.map((p) => (
              <div className="col-3 mb-3" key={p._id}>
                <div className="card">
                  <img
                  style={{height:"116px"}}
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{p.name.substring(0,50)}</h6>
                    <p className="card-text">{p.description.substring(0,55)}...</p>
                    <p className="card-text"> $ {p.price}</p>
                    <div className='row'>
                    <div className='col-6'>
                    <button className="btn btn-primary btn-sm ">
                      More Details
                    </button>
                    </div>
                    <div className='col-6'>
                    <button className="btn btn-secondary btn-sm">
                      Add to cart
                    </button>
                    </div>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            ))}
          </div>
        </div>
    </div>
  </Layout>
  )
}

export default Search