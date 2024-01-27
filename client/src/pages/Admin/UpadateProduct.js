import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpadateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState({});
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");

    //get single Product

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            // console.log("get single product",data)
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error);
            // toast.error("Error While Geatting  Single Product ");
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);

    //  console.log("Product", id)

    // get All category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wents wrong in getting Category");
        }
    };


    useEffect(() => {
        getAllCategory();
    }, []);


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category._id);
            const { data } = await axios.put(
                `/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.success(data?.message);
                navigate("/dashboard/admin/products");
                
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

const handleDelete=async()=>{
     try {
        let ansewer=window.prompt("Are you Sure want to delete this product ?")
        if(!ansewer) return;
        const {data}=await axios.delete(`/api/v1/product/delete-product/${id}`);
        toast.success(data.message);
        console.log("toast message  for delete",data)
        navigate("/dashboard/admin/products")
        
     } catch (error) {
        console.log(error)
        toast.error("Something went wrong");
        
     }
}
   
    return (
        <Layout>
            <div className="pagePadding container-fluid ">
                <div className="row  w-100">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 w-75">
                        <h1>Update Product</h1>
                        <div
                            className="m-1"
                            style={{ overflowY: "scroll", maxHeight: "60vh" }}
                        >
                            <Select
                                variant={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                { categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            <div className="mb-3">
                                <label className="btn btn-outline-secondary  col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setPhoto(e.target.files[0])
                                        }
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                       
                                        <img
                                            src={ id ? `/api/v1/product/product-photo/${id}`:""}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter Product name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    variant={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? "Yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="my-3 text-end">
                            <button
                                className="btn btn-warning m-1"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                            <button
                                className="btn btn-danger m-1"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>

                            
                        </div>
                   
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpadateProduct;
