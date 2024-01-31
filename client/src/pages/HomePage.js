import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Price";
import { toast } from "react-toastify";
function HomePage() {
  const navigate=useNavigate()
  const [cart,setCart]=useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(1)
  const [loading, setLoading] = useState(false);
 
  //get Total Count 
  const getTotal=async()=>{
    try {
      const {data}=await axios.get(`/api/v1/product/product-count`)
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
      
    }
  }

  //filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get All category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);



  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //get All products

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)

      setProducts(data.products);
    } catch (error) {
      setLoading(false)

      console.log(error);
    }
  };
  useEffect(() => {
    if(!checked.length || !radio.length)
    getAllProducts();
  }, [checked.length,radio.length]);

  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();

  },[checked,radio])

//get filterd product

const filterProduct =async()=>{
  try {
    const {data}=await axios.post(`/api/v1/product/product-filters`,{checked,radio})
    setProducts(data?.products)
    
  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <Layout>
    <div className="container">
      <div className="row " style={{ minHeight: "31.5rem", paddingTop: "4rem" }}>
        <div className="col-3">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
      
        {/* filter Price */}
        <h6 className="text-center">Filter By Price</h6>
        <div className="d-flex flex-column">
        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            </div>
            
            <div className="d-flex  mt-2 ">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-9 ">
      
          <h1 className="text-center "> All Products</h1>
          <div class="row  g-4">
            {/* <h1 >Products</h1> */}     
            {products?.map((p) => (
              <div className="col-3 mb-3" key={p._id}>
            
                <div className="card ">
                  <img
                  style={{height:"116px"}}
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{p.name.substring(0,35)}...</h6>
                    <p className="card-text">{p.description.substring(0,40)}...</p>
                    <p className="card-text"> $ {p.price}</p>
                    <div  className="row">
                    <div className="col-4">
                    <button className="btn btn-primary btn-sm " onClick={()=>navigate(`product/${p.slug}`)}>
                      More
                    </button>
                    </div>
                    <div className="col-8">
                    <button className="btn btn-secondary  btn-sm" onClick={()=>{setCart([...cart,p]);
                    localStorage.setItem("cart",JSON.stringify([...cart,p]))
                    toast.success("Item added to cart")
                    }}>
                      Add to cart
                    </button>
                    </div>
                   
                  
                    </div>
                  </div>
                </div>
          
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
          {
                products && products.length<total &&(
                  <button className="btn btn-warning" onClick={(e)=>{e.preventDefault();
                  setPage(page+1)
                  }}
                  >
                  {loading ? "Loading..." :"Loadmore"}
                   </button>
                )
          }
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

export default HomePage;
