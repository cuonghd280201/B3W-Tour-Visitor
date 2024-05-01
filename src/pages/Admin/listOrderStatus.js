import React, { useEffect, useState } from "react";
import { Layout, Table, Select, Button, Modal } from "antd";
import NavBarWebAdmin from "./Navbar/NavBarWebAdmin";
import SiderBarWebAdmin from "./SlideBar/SiderBarWebAdmin";
import adminServices from "../../services/admin.services";
import orderServices from "../../services/order.services";

const { Content } = Layout;
const { Column } = Table;
const { Option } = Select;
const page = {
  pageSize: 5,
};

const ListOrderStatus = () => {
  const [orderStatus, setOrderStatus] = useState("DONE"); // State to store selected order status
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [sortOrderMap, setSortOrderMap] = useState({
    DONE: "asc",
    NOT_DONE: "asc",
    WAITING_CANCEL: "asc",
    CANCEL: "asc",
  });

  useEffect(() => {
    fetchOrderStatusData();
  }, [orderStatus, sortOrderMap[orderStatus]]);

  const fetchOrderStatusData = async () => {
    try {
      const response = await adminServices.getOrderStatus(
        orderStatus,
        sortOrderMap[orderStatus] // Use the sorting order for the current status
      );
      setOrderStatusData(response.data.data);
    } catch (error) {
      console.error("Error fetching order status data:", error);
    }
  };

  const handleOrderStatusChange = (value) => {
    setOrderStatus(value); // Update selected order status
  };

  const getDetailOrder = async (orderId) => {
    try {
      const response = await orderServices.getDetailOrder(orderId);

      Modal.info({
        title: `Thông tin đơn hàng`,
        width: "80%", // Set the width of the modal (adjust as needed)
        centered: true, // Center the modal on the screen
        content: (
          <div style={{ padding: "20px" }}>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Tiền đơn đặt: {formatCurrency(response.data.data.price)}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Đã thanh toán: {formatCurrency(response.data.data.paid)}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Số tiền thanh toán còn lại:{" "}
              {formatCurrency(response.data.data.amount)}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Tiền đã hoàn trả: {formatCurrency(response.data.data.refund)}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Trạng thái đơn hàng: {response.data.data.orderStatus}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Ngày tạo đơn: {response.data.data.createDate}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Ngày cập nhật đơn: {response.data.data.updateDate}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Nhân viên duyệt hoàn tiền:{" "}
              {response.data.data?.updateBy === null
                ? "Chưa có"
                : response.data.data.updateBy}
            </p>

            <h5
              style={{
                marginBottom: "12px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Thông tin ngày đi
            </h5>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Mã thời gian chuyến đi: {response.data.data.tourTimeDTO.id}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Ngày bắt đầu: {response.data.data.tourTimeDTO.startDate}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Ngày kết thúc: {response.data.data.tourTimeDTO.endDate}
            </p>

            <h5
              style={{
                marginBottom: "12px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Danh sách khách hàng
            </h5>
            {response.data.data &&
              response.data.data.tourVisitorDTOList.map((tourVist, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p style={{ marginBottom: "4px", fontSize: "14px" }}>
                    Tên: {tourVist.name}
                  </p>
                  <p style={{ marginBottom: "4px", fontSize: "14px" }}>
                    Số điện thoại: {tourVist.phone}
                  </p>
                  <p style={{ marginBottom: "4px", fontSize: "14px" }}>
                    Ngày sinh: {tourVist.dateOfBirth}
                  </p>
                </div>
              ))}

            <h5
              style={{
                marginBottom: "12px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Thông tin chuyến đi
            </h5>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Tên Chuyến đi: {response.data.data.tourDTO.title}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Giá chuyến đi: {formatCurrency(response.data.data.tourDTO.price)}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Nơi đến: {response.data.data.tourDTO.endLocation}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Mã chuyến đi: {response.data.data.tourDTO.code}
            </p>

            <h5
              style={{
                marginBottom: "12px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Thông tin người đặt
            </h5>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Tên người đặt: {response.data.data.userDTO.name}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Số điện thoại: {response.data.data.userDTO.phone}
            </p>
            <p style={{ marginBottom: "8px", fontSize: "16px" }}>
              Email: {response.data.data.userDTO.email}
            </p>
          </div>
        ),
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "DONE":
        return "#32CD32"; // Example color for "DONE" status
      case "NOT_DONE":
        return "red"; // Example color for "NOT_DONE" status
      case "WAITING_CANCEL":
        return "#FEBE10"; // Example color for "WAITING_CANCEL" status
      case "CANCEL":
        return "gray"; // Example color for "CANCEL" status
      default:
        return "black"; // Default color
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar and Navbar components */}
      <SiderBarWebAdmin choose={"menu-key/4"}></SiderBarWebAdmin>
      <Layout>
        <NavBarWebAdmin></NavBarWebAdmin>
        <Content
          style={{ margin: "20px", padding: "20px", backgroundColor: "#fff" }}
        >
          {/* Title and Select component */}
          <h1
            style={{
              padding: "0px 0px 0px 0px",
              margin: "0px 0px 30px 5px",
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
            Danh sách trạng thái đơn hàng
          </h1>
          <Select
            defaultValue="DONE"
            onChange={handleOrderStatusChange}
            style={{ marginLeft: "400px", width: "200px" }}
          >
            <Option value="DONE">ĐÃ HOÀN THÀNH</Option>
            <Option value="NOT_DONE">CHƯA HOÀN THÀNH</Option>
            <Option value="WAITING_CANCEL">CHỜ HỦY</Option>
            <Option value="CANCEL">HỦY</Option>
          </Select>
          {/* Table component */}
          <Table
            dataSource={orderStatusData}
            pagination={page}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      background: "hsl(253deg 61% 85%)",
                      border: "none",
                    }}
                  />
                ),
              },
            }}
          >
            <Column title="Mã đơn hàng" dataIndex="code" key="code" />
            <Column
              title="Giá"
              dataIndex="price"
              key="price"
              render={(text) => (
                <span style={{ padding: "8px 16px" }}>
                  {(text / 1).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              )}
            />
            <Column
              title="Đã thanh toán"
              dataIndex="paid"
              key="paid"
              render={(text) => (
                <span style={{ padding: "8px 16px" }}>
                  {(text / 1).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              )}
            />
            <Column
              title="Giá sau khi thanh toán"
              dataIndex="priceAfterPaid"
              key="priceAfterPaid"
              render={(text) => (
                <span style={{ padding: "8px 16px" }}>
                  {(text / 1).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              )}
            />
            <Column
              title="Tổng tiền thanh toán"
              dataIndex="amount"
              key="amount"
            />
            <Column
              title="Tiền hoàn trả"
              dataIndex="refund"
              key="refund"
              render={(text) => (
                <span style={{ padding: "8px 16px" }}>
                  {(text / 1).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              )}
            />
            <Column
              title="Trạng thái đơn hàng"
              dataIndex="orderStatus"
              key="orderStatus"
              render={(text) => (
                <span
                  style={{
                    backgroundColor: getStatusColor(text), // Function to determine background color
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {text}
                </span>
              )}
            />

            <Column
              title="Chi tiết đơn hàng"
              key="action"
              render={(text, record) => (
                <Button onClick={() => getDetailOrder(record.id)}>
                  Xem chi tiết
                </Button>
              )}
            />
          </Table>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ListOrderStatus;
