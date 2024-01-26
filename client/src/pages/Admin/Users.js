import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
    return (
        <Layout>
            <div className="pagePadding container-fluid ">
                <div className="row w-100">
                    <div className="col-md-3 ">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Users</h1>
                        <div style={{ overflowY: "scroll", maxHeight: "60vh" }}>
                            <li>User 1</li>
                            <li>User 1</li>
                            <li>User 1</li>
                            <li>User 1</li>
                            <li>User 1</li>
                            <li>User 1</li>
                            <li>User 1</li>
                            <li>User 1</li>
                            <li>User 1</li>
                            <li>User 1</li>
                            <li>User 1</li>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users;
