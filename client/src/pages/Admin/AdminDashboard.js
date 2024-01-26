import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="pagesPadding pnf container-fluid ">
        <div className="row m-3 w-100 p-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <div className="card w-75 p-3">
              <h3>
                Admin Name :
                <span className="text-primary">{auth?.user?.name}</span>{" "}
              </h3>
              <h3>
                Admin Email :{" "}
                <span className="text-primary">{auth?.user?.email}</span>
              </h3>
              <h3>
                Admin Contact :
                <span className="text-primary"> {auth?.user?.phone}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
