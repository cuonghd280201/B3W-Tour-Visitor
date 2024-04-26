import React, { useEffect, useState } from "react";
import { Layout, Table, Space, Input, Switch } from "antd";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tourServices from "../../services/tour.services";



import NavBarWebStaff from "./Navbar/NavBarWebStaff";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
const page = {
    pageSize: 6, // Number of items per page
};

const { Column, ColumnGroup } = Table;

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const SlotTourStaff = () => {

    const { state } = useLocation();
    const navigate = useNavigate();


    const [tourDetailCustomer, setTourDetailCustomer] =
        useState(null);
    const fetchTourDetailCustomer = async () => {
        let response;
        try {
            const response = await tourServices.getDetailTourByCustomer(state.tourId);
            console.log("Response:", response); // Log the response object
            setTourDetailCustomer(response.data.data);

            return response;

        } catch (error) {
            console.error("Error fetching tour:", error);
        }
    }

    useEffect(() => {
        fetchTourDetailCustomer();
    }, []);


    const handleRowClick = (timeId) => {
        // Perform any additional logic here, if needed
        navigate('/slotTourStaffDetail', { state: { timeId } });
    };
    return (
        <React.Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <SiderBarWebStaff choose={"menu-key/2"}></SiderBarWebStaff>
                <Layout>
                    <NavBarWebStaff></NavBarWebStaff>

                    <div
                        style={{
                            padding: "10px 5px 0px 5px",
                            background: "white",
                            margin: "30px",
                            borderRadius: "12px",
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        }}
                    >
                        <Content>
                            <h1
                                style={{
                                    padding: "5px 0px 0px 0px",
                                    margin: "0px 0px 0px 20px",
                                    color: "#4a4a4a",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    fontFamily: "Arial, sans-serif",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    borderBottom: "4px solid #6546D2",
                                    display: "inline-block",
                                }}
                            >
                                Quản lý các chuyến đi
                            </h1>

                            <div
                                style={{
                                    padding: 25,
                                    minHeight: 400,
                                }}
                            >
                                <div style={{ height: "600px", overflow: "auto" }}>
                                    <div class="table-responsive">
                                        <table
                                            class="table table-striped"
                                            style={{ width: "100%", borderCollapse: "collapse" }}
                                        >
                                            <thead>
                                                <tr
                                                    style={{
                                                        backgroundColor: "#f8f9fa",
                                                        borderBottom: "2px solid #dee2e6",
                                                    }}
                                                >
                                                    <th
                                                        scope="col"
                                                        style={{ padding: "15px", color: "#495057" }}
                                                    >
                                                        Mã Chuyến Đi
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        style={{ padding: "15px", color: "#495057" }}
                                                    >
                                                        Tên Chuyến Đi
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        style={{ padding: "15px", color: "#495057" }}
                                                    >
                                                        Giờ đi
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        style={{ padding: "15px", color: "#495057" }}
                                                    >
                                                        Giá
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        style={{ padding: "15px", color: "#495057" }}
                                                    >
                                                        Số chỗ còn nhận
                                                    </th>
                                                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tourDetailCustomer && tourDetailCustomer.tourTimeSet.map((tourTime, index) => (
                                                    <tr
                                                    key={index}
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleRowClick(tourTime.id)}
                                                    >
                                                        <td style={{ padding: "15px" }}>
                                                            {tourTime.code}
                                                        </td>
                                                        <td style={{ padding: "15px" }}> {tourDetailCustomer.title}</td>
                                                        <td style={{ padding: "15px" }}> {tourTime.startTime}</td>
                                                        <td style={{ padding: "15px" }}> {tourDetailCustomer.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                        <td style={{ padding: "15px" }}> {tourTime.slotNumber}</td>
                                                    </tr>
                                                ))}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Content>
                    </div>
                </Layout>
            </Layout>
        </React.Fragment>
    );
};

export default SlotTourStaff;
