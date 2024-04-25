import React, { useEffect, useState } from "react";
import { Layout, Select, Modal } from "antd";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Input, Button, Card, CardHeader, CardBody } from "reactstrap";
import "../Profile/profile.css";
import orderServices from "../../services/order.services";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cancelServices from "../../services/cancel.services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';

const { Content } = Layout;
const { Option } = Select;

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5; // Number of orders per page



    const [keyword, setKeyword] = useState('');
    const [orderStatus, setOrderStatus] = useState("NOT_DONE");
    const handleOrderStatusChange = (value) => {
        setOrderStatus(value);
    }
    const fetchOrderData = async () => {
        try {
            const decodedKeyword = decodeURIComponent(keyword);
            const response = await orderServices.getAllOrder(orderStatus, decodedKeyword);
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchOrderData();
    }, [orderStatus]);



    // Handle order cancellation
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState(null);

    const showDeleteModal = (id) => {
        setOrderIdToDelete(id);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        handleCancelOrder(orderIdToDelete);
        setIsModalVisible(false);
        setOrderIdToDelete(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setOrderIdToDelete(null);
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await cancelServices.customerCancel(orderId);
            if (response.status === 200) {
                toast.success("Gửi Yều Cầu Hủy Đơn Thành Công!");
                fetchOrderData();
            } else {
                toast.success("Gửi Yều Cầu Hủy Đơn Thành Công!");
                fetchOrderData();
            }
        } catch (error) {
            console.error("Error canceling order:", error);
            toast.error("An error occurred while canceling the order.");
        }
    };

    let totalPages = 0;

    if (orders && Array.isArray(orders)) {
        totalPages = Math.ceil(orders.length / ordersPerPage);
    }
    
    let currentOrders = [];
    
    if (orders && Array.isArray(orders)) {
        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    }

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <main role="main">
            <section className="ftco-section ftco-counter img" style={{ backgroundImage: 'url(images/bg_1.jpg)' }} data-stellar-background-ratio="0.5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="10">
                            {/* Your content here */}
                        </Col>
                    </Row>
                </Container>
            </section>
            <div style={{ padding: '20px 20px 20px 20px', margin: '10px 20px 20px 20px' }}>
                {/* <Nav tabs className="flex-sm-row mb-3" style={{ marginTop: 0, listStyle: 'none', display: 'flex', flexFlow: 'wrap', paddingLeft: 0, background: 'rgb(255, 255, 255)', border: '0.5px solid rgb(213, 213, 213)', borderRadius: 10, marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem', WebkitBoxOrient: 'horizontal', WebkitBoxDirection: 'normal' }}>
                    <NavItem className="flex-sm-fill text-sm-center">
                        <NavLink href="#" active>Tất cả</NavLink>
                    </NavItem>
                    <NavItem className="flex-sm-fill text-sm-center">
                        <NavLink href="#">Chưa Thanh Toán</NavLink>
                    </NavItem>
                    <NavItem className="flex-sm-fill text-sm-center">
                        <NavLink href="#">Đã Đặt</NavLink>
                    </NavItem>
                </Nav> */}

                <Select
                    defaultValue="NOT_DONE"
                    onChange={handleOrderStatusChange}
                    style={{ width: "200px" }}
                >
                    <Option value="DONE">ĐÃ HOÀN THÀNH</Option>
                    <Option value="NOT_DONE">CHƯA HOÀN THÀNH</Option>
                    <Option value="WAITING_CANCEL">CHỜ HỦY</Option>
                    <Option value="CANCEL">HỦY</Option>
                </Select>

                <div className="form-search mb-4"
                    style={{
                        marginTop: '10px',
                    }}>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Input
                            style={{
                                padding: '10px',
                                width: '300px',
                                border: "1px solid #5cb85c",
                                borderRadius: "4px",
                                fontSize: "15px",
                                color: "#5cb85c",
                            }}
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Nhập từ khóa..."
                        />
                        <Button color="primary" onClick={fetchOrderData}>Tìm kiếm</Button>
                    </div>
                </div>

                <TabContent id="pills-tabContent">
                    {/* Render current orders */}
                    {currentOrders.map(order => (
                        <TabPane id="pills-all" active role="tabpanel" key={order.id}>
                            <CardBody style={{ position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0, overflowWrap: 'break-word', background: 'rgb(255, 255, 255)', border: '0.5px solid rgb(213, 213, 213)', borderRadius: 10, boxSizing: 'border-box', marginBottom: '1rem', padding: '1rem' }}>
                                <Row className="align-items-center">
                                    <Col md={8} xs={7}>
                                        <div className="d-flex d-lg-block justify-content-between">
                                            <div>
                                                <div className="s-rate">
                                                    <span className="s-comment">
                                                        <h6 className="fw-bold mb-0"></h6>
                                                        <p className="mb-0">Số đặt lịch:<b> {order.code}</b></p>
                                                        <p className="mb-0">Tên Chuyến Đi:<b> {order.tourInfoDTO.title}</b></p>
                                                    </span>
                                                </div>
                                                <p className="mb-0">
                                                    <span>Tiền Trả:<b> {order.paid.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b> </span>
                                                </p>
                                                <p className="mb-0">
                                                    <span>Số tiền thanh còn lại:<b> {order.priceAfterPaid.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b> </span>
                                                </p>
                                                <p className="mb-0">
                                                    <small>Số tiền đã thanh toán:<b> {order.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b> </small>
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={4} xs={5} className="text-end">
                                        <span
                                            className={
                                                order.orderStatus === "NOT_DONE"
                                                    ? "badge bg-info text-dark"
                                                    : order.orderStatus === "DONE"
                                                        ? "badge bg-success"
                                                        : order.orderStatus === "WAITING_CANCEL"
                                                            ? "badge bg-warning text-dark"
                                                            : order.orderStatus === "CANCEL"
                                                                ? "badge bg-danger"
                                                                : ""
                                            }
                                        >
                                            {order.orderStatus === "NOT_DONE"
                                                ? "CHƯA HOÀN THÀNH"
                                                : order.orderStatus === "DONE"
                                                    ? "ĐÃ HOÀN THÀNH"
                                                    : order.orderStatus === "WAITING_CANCEL"
                                                        ? "CHỜ HUỶ"
                                                        : order.orderStatus === "CANCEL"
                                                            ? "HUỶ"
                                                            : ""}
                                        </span>

                                        <h5 className="text-primary fw-bold">{order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                        <div className="destination">
                                            <div className="text p-2">
                                                <p className="bottom-area d-flex">
                                                    <span className="ml-auto">
                                                        <Button
                                                            style={{
                                                                fontSize: "15px",
                                                                color: "red",
                                                                textDecoration: "none",
                                                                padding: "8px 16px",
                                                                border: "1px solid red",
                                                                borderRadius: "4px",
                                                                transition: "background-color 0.3s, color 0.3s",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => showDeleteModal(order.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrashCanArrowUp} />
                                                            &nbsp; Hủy Đơn
                                                        </Button>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="text p-2">
                                                <p className=" d-flex">
                                                    <span className="ml-auto">
                                                        <Link
                                                            to="/orderBookTouDetail"
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
                                        </div>

                                    </Col>
                                </Row>
                            </CardBody>
                        </TabPane>
                    ))}

                    {/* Pagination buttons */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                style={{
                                    margin: '0 5px',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '4px',
                                    backgroundColor: currentPage === i + 1 ? '#08C299' : 'gray',
                                    color: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </TabContent>
            </div>

            {/* Modal for confirmation */}
            <Modal
                title="Xác nhận hủy đơn"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Bạn có chắc chắn muốn hủy đơn này không?</p>
            </Modal>
        </main>
    );
};

export default OrderHistory;
