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
            <div className="pagePadding container-fluid ">
                <div className="row w-100">
                    <div className="col-md-3 ">
                        <AdminMenu />
                    </div>

                    <div className="col-md-9 ">
                        <h1 className="text-center">All Products List</h1>
                        <div
                            className="row g-4"
                            style={{ maxHeight: "60vh", overflowY: "scroll" }}
                        >
                            {products?.map((p) => (
                                <div className="col-3 mb-3"   key={p._id}>
                                    <Link
                                      
                                        to={`/dashboard/admin/product/${p.slug}`}
                                        className="product-link"
                                    >
                                        <div className="card">
                                            <img
                                                  style={{height:"116px"}}
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                className="card-img-top"
                                                alt={p.name} 
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {p.name.substring(0,35)}...
                                                </h5>
                                                <p className="card-text">
                                                    {p.description.substring(0,40)}...
                                                </p>
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
