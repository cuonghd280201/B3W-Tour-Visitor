import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Select, Modal } from "antd";
import NavBarWebStaff from "./Navbar/NavBarWebAdmin";
import SiderBarWebStaff from "./SlideBar/SiderBarWebAdmin";
import { Row, Col, TabContent, TabPane, CardBody } from "reactstrap";
import "../Profile/profile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cancelServices from "../../services/cancel.services";

const { Content } = Layout;
const { Option } = Select;

const ListCancelTourAdmin = () => {
  const [orderStatus, setOrderStatus] = useState("WAITING_CANCEL");
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  const [error, setError] = useState(null);
  const fetchOrderStatusData = async () => {
    try {
      const response = await cancelServices.getStaffOrderStatus(orderStatus);
      setOrderStatusData(response.data.data);
    } catch (error) {
      console.error("Error fetching order status data:", error);
    }
  };

  useEffect(() => {
    fetchOrderStatusData();
  }, [orderStatus]);

  const handleOrderStatusChange = (value) => {
    setOrderStatus(value);
  };

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
    handleRejectCancelOrder(orderIdToDelete);
    setIsModalVisible(false);
    setOrderIdToDelete(null);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await cancelServices.staffCancelOrder(orderId, 1);
      console.log("Cancel", response);
      if (response.status === 200) {
        toast.success("Chấp nhận yều cầu hủy chuyến đi thành công!");
        fetchOrderStatusData();
      } else {
        toast.success("Chấp nhận yều cầu hủy chuyến đi thành công!");
        fetchOrderStatusData();
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("An error occurred while canceling the order.");
    }
  };

  const handleRejectCancelOrder = async (orderId) => {
    try {
      const response = await cancelServices.staffCancelOrder(orderId, 0);
      console.log("Reject Cancel", response);
      if (response.status === 200) {
        toast.success("Từ chối yều cầu hủy chuyến đi thành công!");
        fetchOrderStatusData();
      } else {
        toast.success("Từ chối yều cầu hủy chuyến đi thành công!");
        fetchOrderStatusData();
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("An error occurred while canceling the order.");
    }
  };

  const totalPages = Math.ceil(orderStatusData.length / ordersPerPage);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderStatusData.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWebStaff choose={"menu-key/6"} />
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
            <Select
              defaultValue="WAITING_CANCEL"
              onChange={handleOrderStatusChange}
              style={{ width: "200px" }}
            >
              <Option value="DONE">ĐÃ HOÀN THÀNH</Option>
              <Option value="NOT_DONE">CHƯA HOÀN THÀNH</Option>
              <Option value="WAITING_CANCEL">CHỜ HỦY</Option>
              <Option value="CANCEL">HỦY</Option>
            </Select>
            <TabContent
              style={{
                padding: "20px 0px 0px 20px",
                margin: "5px 20px 20px 20px",
              }}
              id="pills-tabContent"
            >
              {currentOrders.map((orderS) => (
                <TabPane key={orderS.id} id="pills-all" active role="tabpanel">
                  <div id="accordion">
                    <CardBody
                      style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                        overflowWrap: "break-word",
                        background: "rgb(255, 255, 255)",
                        border: "0.5px solid rgb(213, 213, 213)",
                        borderRadius: 10,
                        boxSizing: "border-box",
                        marginBottom: "1rem",
                        padding: "1rem",
                      }}
                    >
                      <Row className="align-items-center">
                        <Col md={8} xs={7}>
                          <div className="d-flex d-lg-block justify-content-between">
                            <div>
                              <div className="s-rate">
                                <span className="s-comment">
                                  <h6 className="fw-bold mb-0"></h6>
                                  <p className="mb-0">
                                    Mã Đơn Hủy: <b>{orderS.code}</b>
                                  </p>
                                </span>
                              </div>
                              <p className="mb-0">
                                <span className="text-muted">
                                  Mã Chuyến Đi: <b>{orderS.tourDTO.code}</b>
                                </span>
                              </p>
                              <p className="mb-0">
                                <span className="text-muted">
                                  Tên Chuyến Đi: <b>{orderS.tourDTO.title}</b>
                                </span>
                              </p>
                              <p className="mb-0">
                                <span className="text-muted">
                                  Mã thời gian đi:{" "}
                                  <b>{orderS.tourTimeDTO.code}</b>
                                </span>
                              </p>
                              <p className="mb-0">
                                <span className="text-muted">
                                  Giá Chuyến Đi:{" "}
                                  <b>
                                    {orderS.tourDTO.price.toLocaleString(
                                      "vi-VN",
                                      { style: "currency", currency: "VND" }
                                    )}
                                  </b>
                                </span>
                              </p>
                              <p className="mb-0">
                                <span className="text-muted">
                                  Tên Khách Hàng: <b>{orderS.userDTO.name}</b>
                                </span>
                              </p>
                              <p className="mb-0">
                                <span className="text-muted">
                                  Số Điện Thoại: <b>{orderS.userDTO.phone}</b>
                                </span>
                              </p>
                              <p className="mb-0">
                                <span className="text-muted">
                                  Ngày yêu cầu hoàn trả:{" "}
                                  <b>{orderS.createDate}</b>
                                </span>
                              </p>
                              <p className="mb-0">
                                <span className="text-muted">
                                  Số tiền khác hàng đã trả:{" "}
                                  <b>
                                    {orderS.paid.toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </b>
                                </span>
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col md={4} xs={5} className="text-end">
                          <h6 className="text-primary mb-2">
                            <span
                              className={
                                orderS.orderStatus === "NOT_DONE"
                                  ? "badge bg-info text-dark"
                                  : orderS.orderStatus === "DONE"
                                  ? "badge bg-success"
                                  : orderS.orderStatus === "WAITING_CANCEL"
                                  ? "badge bg-warning text-dark"
                                  : orderS.orderStatus === "CANCEL"
                                  ? "badge bg-danger"
                                  : ""
                              }
                            >
                              {orderS.orderStatus === "NOT_DONE"
                                ? "CHƯA HOÀN TẤT"
                                : orderS.orderStatus === "DONE"
                                ? "HOÀN TẤT"
                                : orderS.orderStatus === "WAITING_CANCEL"
                                ? "CHỜ HUỶ"
                                : orderS.orderStatus === "CANCEL"
                                ? "HUỶ BỎ"
                                : ""}
                            </span>
                          </h6>
                          <h5 className="text-primary fw-bold">
                            Số tiền hoàn trả:{" "}
                            {orderS.paid.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </h5>
                          <div className="destination">
                            <div className="text p-2">
                              <p className="bottom-area d-flex">
                                <span className="ml-auto">
                                  {orderS.orderStatus === "WAITING_CANCEL" && (
                                    <Button
                                      style={{
                                        fontSize: "15px",
                                        color: "#5cb85c",
                                        textDecoration: "none",
                                        padding: "8px 16px",
                                        border: "1px solid #5cb85c",
                                        borderRadius: "4px",
                                        transition:
                                          "background-color 0.3s, color 0.3s",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor =
                                          "#4cae4c";
                                        e.target.style.color = "#fff";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor =
                                          "transparent";
                                        e.target.style.color = "#5cb85c";
                                      }}
                                      onClick={() => showDeleteModal(orderS.id)}
                                    >
                                      Chấp Nhận
                                    </Button>
                                  )}
                                </span>
                                <Modal
                                  title="Xác nhận xóa"
                                  visible={isModalVisible}
                                  onOk={handleOk}
                                  onCancel={handleCancel}
                                  okText="Có"
                                  cancelText="Không"
                                >
                                  <p>
                                    Bạn có chắc chắn muốn chấp nhận yêu cầu hủy
                                    đơn hàng này không?
                                  </p>
                                </Modal>
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </div>
                </TabPane>
              ))}
            </TabContent>

            {/* Pagination buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  style={{
                    margin: "0 5px",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: currentPage === i + 1 ? "green" : "gray",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default ListCancelTourAdmin;
