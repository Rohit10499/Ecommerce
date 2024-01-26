import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryFrom from "../../components/Form/CategoryFrom";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle from
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Somethig went wrong in input form");
    }
  };

  //get all category

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
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message)
    }
  };

  // Delete category
  const handleDelete=async(pId)=>{
    // e.preventDefault();
  try {
    const  {data}=await axios.delete(`/api/v1/category/delete-category/${pId}`);
    if(data.success){
      toast.success("Category is deleted");
      getAllCategory();
    }else{
      toast.error(data.message);
    }
    
  } catch (error) {
    console.log(error)
    toast.error("something wents wrong")
   
  }
     
  }
  return (
    <Layout>
       <div className=' pnf container-fluid '>
    <div className='row w-100 m-3 p-3'>
        <div className='col-md-3 '>
            <AdminMenu />
          </div>
          <div className="col-md-9">
          <div className="  p-3 w-75 ">
            <h1>Manage Category</h1>
             <CategoryFrom
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <div>
              <table className="table border">
                <thead>
                  <tr className="border">
                    <th className="col-6 text-center ">Name</th>
                    <th className="col-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr className="border" key={c._id}>
                      <td className="border text-center p-0">{c.name}</td>
                      <td className="border text-center p-0">
                        <button
                          className="btn btn-primary btn-sm ms-2"
                          onClick={() => {
                            setOpen(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm ms-2" onClick={()=>{handleDelete(c._id)}}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
              <CategoryFrom
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
