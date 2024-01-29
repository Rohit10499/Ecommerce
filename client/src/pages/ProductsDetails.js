import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductsDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts,setRelatedProducts]=useState([])
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      // console.log(data.product._id)
      setProduct(data?.product);
      getSimilarProduct(data?.product._id,data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

//get similar products
const getSimilarProduct=async(pid,cid)=>{
  try {
    const{data}=await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
    setRelatedProducts(data?.products);
 
    
  } catch (error) {
    console.log(error)
    
  }
}

  return (
    <Layout>
      <div className="container " style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-4">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
            />
          </div>
          <div className="col-8 ">
            <h1 className="text-center">Product Details</h1>
            <h6> Name : {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price : {product.price}</h6>
            {/* <h6>Category : {product.category.name}</h6> */}
            <button className="btn btn-secondary m-1">Add to cart</button>
          </div>
          <hr/>
          <div className="row container">
          <h6 className="text-center">Similar Products</h6>
          {relatedProducts.length<1 && (<p className="text-center">No Similar Products Found</p>)}
       
          {relatedProducts?.map((p) => (
              <div className="col-3 mb-3" key={p._id}>
            
                <div className="card">
                  <img
                  style={{height:"116px"}}
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text"> $ {p.price}</p>
                  
                    <button className="btn btn-secondary m-1">
                      Add to cart
                    </button>
                  </div>
                </div>
          
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsDetails;    
