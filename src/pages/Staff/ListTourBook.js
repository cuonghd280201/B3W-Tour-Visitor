import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Select } from "antd";
import {
    LeftOutlined,
    RightOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons"; // Import arrow icons
import { Link } from "react-router-dom";

import NavBarWebStaff from "./Navbar/NavBarWebStaff";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
import {
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Card,
    CardHeader,
    CardBody,
} from "reactstrap";
import "../Profile/profile.css";
import orderServices from "../../services/order.services";

const { Content } = Layout;
const { Option } = Select;

const ListTourBook = () => {
    

    const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage state
    const [pageSize, setPageSize] = useState(6); // Initialize pageSize state
    const [totalPages, setTotalPages] = useState(pageSize); // Add state for total pages
    const [loading, setLoading] = useState(true);

    const calculatePageRange = (currentPage, totalPages) => {
        const pageRangeSize = 6;
        let startPage = Math.max(1, currentPage - Math.floor(pageRangeSize / 2));
        let endPage = startPage + pageRangeSize - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - pageRangeSize + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };
    const pageRange = calculatePageRange(currentPage, totalPages);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    // Function to handle page navigation
    const goToPage = (page) => {
        setCurrentPage(page);
    };


    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchTourData();
    }, []);


    const fetchTourData = async () => {
        try {
            const response = await orderServices.getAllOrder();
            console.log("Response:", response);
            setOrders(response.data.data);

        } catch (error) {
            console.error("Error fetching tours:", error);
            setError(error);
        }
    };


    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SiderBarWebStaff choose={"menu-key/2"} />
            <Layout>
                <NavBarWebStaff />
                <div
                    style={{
                        padding: "30px",
                        background: "white",
                        margin: "30px",
                        borderRadius: "12px",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}
                >
                    <Content>


                        <TabContent id="pills-tabContent">
                            {orders.map(order => (
                                <TabPane id="pills-all" active role="tabpanel">
                                    <div id="accordion">
                                        {/* Booking item starts */}
                                        <Card>
                                            <CardHeader id="headingOne">
                                                {/* <Row className="align-items-center">
                                                        <Button color="link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            Đặt ngày 01/12/2022
                                                            <div className="status">
                                                                <span className="badge badge-warning">Quá Hạn Thanh Toán</span>
                                                            </div>
                                                        </Button>
                                                    </Row> */}
                                            </CardHeader>
                                            <CardBody style={{ position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0, overflowWrap: 'break-word', background: 'rgb(255, 255, 255)', border: '0.5px solid rgb(213, 213, 213)', borderRadius: 10, boxSizing: 'border-box', marginBottom: '1rem', padding: '1rem' }}>
                                                <Row className="align-items-center">
                                                    <Col md={8} xs={7}>
                                                        <div className="d-flex d-lg-block justify-content-between">
                                                            <div>
                                                                <div className="s-rate">
                                                                    <span className="s-comment">
                                                                        <h6 className="fw-bold mb-0"></h6>
                                                                        <p className="mb-0">Số đặt lịch: {order.id}</p>
                                                                    </span>
                                                                </div>
                                                                <p className="mb-0">
                                                                    <span className="text-muted">Tour code: 233434134MDFadf </span>
                                                                </p>
                                                                <p className="card-text">
                                                                    <small className="text-muted">Hoàn Trả : {order.refund} </small>
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={4} xs={5} className="text-end">
                                                        <h6 className="text-primary mb-2">{order.orderStatus}</h6>
                                                        <h5 className="text-primary fw-bold">{order.price}₫</h5>
                                                        <div className="destination">
                                                            <div className="text p-2">
                                                                <p className="bottom-area d-flex">
                                                                    <span className="ml-auto"><a href="/createToutStaff">Hủy Chuyến Đi</a></span>
                                                                </p>
                                                            </div>
                                                            <p className=" d-flex">
                                                                <span className="ml-auto">
                                                                    <Link
                                                                        to="/listTourBookDetail"
                                                                        className="text-dark"
                                                                        state={{ orderId: order.id }}
                                                                    >

                                                                        <a
                                                                            style={{
                                                                                fontSize: "15px",
                                                                                color: "blueviolet",
                                                                                textDecoration: "none",
                                                                                padding: "8px 16px",
                                                                                border: "1px solid blueviolet",
                                                                                borderRadius: "4px",
                                                                                transition:
                                                                                    "background-color 0.3s, color 0.3s",
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                            }}
                                                                            onMouseEnter={(e) => {
                                                                                e.target.style.backgroundColor =
                                                                                    "blueviolet";
                                                                                e.target.style.color = "#fff";
                                                                            }}
                                                                            onMouseLeave={(e) => {
                                                                                e.target.style.backgroundColor =
                                                                                    "transparent";
                                                                                e.target.style.color = "blueviolet";
                                                                            }}
                                                                        >
                                                                            Xem chi tiết
                                                                        </a>
                                                                    </Link>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                        {/* Additional booking cards go here */}
                                    </div>
                                </TabPane>
                            ))}


                            {/* Additional tab panes for "Chưa Thanh Toán" and "Đã Đặt" go here */}
                        </TabContent>

                        {/* Pagination */}
                       
                        <div className="row mt-5">
                                <div className="col text-center">
                                    <div className="block-27">
                                        <ul>
                                            <li>
                                                <a href="#" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                                    &lt;
                                                </a>
                                            </li>
                                            {pageRange.map((page) => (
                                                <li key={page} className={currentPage === page ? 'active' : ''}>
                                                    <a href="#" onClick={() => handlePageChange(page)}>
                                                        {page}
                                                    </a>
                                                </li>
                                            ))}
                                            <li>
                                                <a href="#" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                                    &gt;
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    </Content>
                </div>
            </Layout >
        </Layout >
    );
};

export default ListTourBook;




