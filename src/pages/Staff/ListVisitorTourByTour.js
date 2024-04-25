import React, { useState, useEffect } from "react";
import { Layout, Input, Table, Badge } from "antd";
import { Link, useLocation } from 'react-router-dom';
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
import NavBarWebStaff from "./Navbar/NavBarWebStaff";
import orderServices from "../../services/order.services";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const { Header, Footer, Sider, Content } = Layout;
const { Column } = Table;
const page = {
    pageSize: 5,
};

const ListVisitorTourByTour = () => {
    const { state } = useLocation();
    const [visitors, setVisitors] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [searchKeyword, setSearchKeyword] = useState(""); // State for search keyword


    const fetchTourDetailCustomer = async () => {
        try {
            const response = await orderServices.getAllTourVisitor(state.tourTimeId);
            setVisitors(response.data.data);
            return response;
        } catch (error) {
            console.error("Error fetching tour:", error);
        }
    };

    useEffect(() => {
        fetchTourDetailCustomer();
    }, []);

    const filteredVisitors = visitors?.tourVisitorDTOList.filter(visitor => {
        const nameMatch = visitor.name ? visitor.name.toLowerCase().includes(searchKeyword.toLowerCase()) : false;
        const phoneMatch = visitor.phone ? visitor.phone.includes(searchKeyword) : false;
        const idCardMatch = visitor.idCard ? visitor.idCard.includes(searchKeyword) : false;
        const emailMatch = visitor.userEmail ? visitor.userEmail.toLowerCase().includes(searchKeyword.toLowerCase()) : false;

        return nameMatch || phoneMatch || idCardMatch || emailMatch;
    });

    const filteredVisitorsCancel = visitors?.tourVisitorDTOCancelList.filter(visitor => {
        const nameMatch = visitor.name ? visitor.name.toLowerCase().includes(searchKeyword.toLowerCase()) : false;
        const phoneMatch = visitor.phone ? visitor.phone.includes(searchKeyword) : false;
        const idCardMatch = visitor.idCard ? visitor.idCard.includes(searchKeyword) : false;
        const emailMatch = visitor.userEmail ? visitor.userEmail.toLowerCase().includes(searchKeyword.toLowerCase()) : false;

        return nameMatch || phoneMatch || idCardMatch || emailMatch;
    });

    return (
        <React.Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <SiderBarWebStaff choose={"menu-key/5"}></SiderBarWebStaff>
                <Layout>
                    <NavBarWebStaff></NavBarWebStaff>

                    <div style={{
                        padding: "10px 5px 0px 5px",
                        background: "white",
                        margin: "30px",
                        borderRadius: "12px",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}
                    >
                        <Content>
                            <div style={{
                                padding: 25,
                                minHeight: 400,
                            }}
                            >
                                <h1
                                    style={{
                                        padding: "5px 0px 0px 0px",
                                        margin: "0px 0px 0px 20px",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        fontFamily: "Arial, sans-serif",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        borderBottom: "4px solid #5cb85c",
                                        display: "inline-block",
                                    }}
                                >
                                    Danh Sách Những Người Tham Gia
                                </h1>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm tên, điện thoại, cccd, email"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                        style={{
                                            marginLeft: '3  00px',
                                            marginBottom: '20px',
                                            padding: '10px',
                                            width: '300px',
                                            border: "1px solid #5cb85c",
                                            borderRadius: "4px",
                                            transition: "background-color 0.3s, color 0.3s",
                                            alignItems: "center",
                                            fontSize: "15px",
                                            color: "#5cb85c",
                                            textDecoration: "none",
                                        }}
                                    />

                                    {/* The search icon */}
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            color: 'gray',
                                        }}
                                    />
                                </div>

                                <Table dataSource={filteredVisitors} pagination={page}>
                                    <Column title="Tên" dataIndex="name" key="id" />
                                    <Column title="Số Điện Thoại" dataIndex="phone" key="phone" />
                                    <Column title="Thẻ căn cước" dataIndex="idCard" key="idCard" />
                                    <Column title="Ngày sinh" dataIndex="dateOfBirth" key="dateOfBirth" />
                                   
                                    <Column
                                        title="Địa chỉ e-mail"
                                        dataIndex="userEmail"
                                        key="userEmail"
                                    />
                                     <Column
                                        title="Loại Khách Hàng"
                                        dataIndex="tourVisitorType"
                                        key="tourVisitorType"
                                        render={(value) => {
                                            if (value === 'ADULT') {
                                                return <Badge color="green" text="Người lớn" />;
                                            } else if (value === 'BABY') {
                                                return <Badge color="yellow" text="Trẻ em" />;
                                            } else {
                                                return <span>{value}</span>;
                                            }
                                        }}
                                    />
                                </Table>

                                <h1
                                    style={{
                                        padding: "5px 0px 0px 0px",
                                        margin: "0px 0px 0px 20px",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        fontFamily: "Arial, sans-serif",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                        borderBottom: "4px solid #5cb85c",
                                        display: "inline-block",
                                    }}
                                >
                                    Danh Sách Những Người Đã Hủy Chuyến Đi
                                </h1>

                                <Table dataSource={filteredVisitorsCancel} pagination={page}>
                                    <Column title="Tên" dataIndex="name" key="id" />
                                    <Column title="Số Điện Thoại" dataIndex="phone" key="phone" />
                                    <Column title="Thẻ căn cước" dataIndex="idCard" key="idCard" />
                                    <Column title="Ngày sinh" dataIndex="dateOfBirth" key="dateOfBirth" />
                                    
                                    <Column
                                        title="Địa chỉ e-mail"
                                        dataIndex="userEmail"
                                        key="userEmail"
                                    />
                                    <Column
                                        title="Loại Khách Hàng"
                                        dataIndex="tourVisitorType"
                                        key="tourVisitorType"
                                        render={(value) => {
                                            if (value === 'ADULT') {
                                                return <Badge color="green" text="Người lớn" />;
                                            } else if (value === 'BABY') {
                                                return <Badge color="yellow" text="Trẻ em" />;
                                            } else {
                                                return <span>{value}</span>;
                                            }
                                        }}
                                    />
                                    {/* Add more columns as needed */}
                                </Table>


                            </div>
                        </Content>
                    </div>
                </Layout>
            </Layout>
        </React.Fragment>
    );
};

export default ListVisitorTourByTour;
