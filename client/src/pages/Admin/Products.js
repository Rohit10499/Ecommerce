import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("somethitg went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="pagesPadding pnf container-fluid ">
        <div className="row p-3 w-100">
          <div className="col-md-3 ">
            <AdminMenu />
          </div>

          <div className="col-md-9 ">
            <h1 className="text-center">All Products List</h1>
            <div className="row">
              {products?.map((p) => (
                <div className="col-3 mb-3">
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link" >
              
                  <div className="card" >
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
                </div>

                
             ))}
            </div>
          </div>
          </div>
      </div>
    </Layout>
  );
};

export default Products;
