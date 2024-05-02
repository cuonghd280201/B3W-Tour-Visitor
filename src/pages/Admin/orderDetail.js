import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import NavBarWebAdmin from "./Navbar/NavBarWebAdmin";
import SiderBarWebAdmin from "./SlideBar/SiderBarWebAdmin";
import orderServices from "../../services/order.services";
import { useParams } from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const OrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderId } = useParams();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await orderServices.getDetailOrder(orderId);
        setOrderDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching order detail:", error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);
  const getStatusText = (status) => {
    switch (status) {
      case "DONE":
        return { text: "Đã hoàn thành", color: "green" };
      case "NOT_DONE":
        return { text: "Chưa hoàn thành", color: "red" };
      case "WAITING_CANCEL":
        return { text: "Đang đợi hủy", color: "#FEBE10" };
      case "CANCEL":
        return { text: "Đã hủy", color: "gray" };
      default:
        return { text: "Unknown", color: "black" };
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWebAdmin />
      <Layout>
        <NavBarWebAdmin />
        <div
          style={{
            padding: "10px 5px 0px 5px",
            background: "white",
            margin: "30px",
            borderRadius: "12px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Content style={{ padding: "24px" }}>
            <Title
              level={1}
              style={{
                textAlign: "center",
                fontSize: "2.5rem",
                marginBottom: "24px",
                color: "#662d91",
              }}
            >
              Chi tiết đơn hàng
            </Title>
            {orderDetails && (
              <div style={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
                <Title
                  level={3}
                  style={{
                    fontSize: "1.6rem",
                    marginTop: "24px",
                    color: "#003399",
                  }}
                >
                  Thông tin đơn hàng
                </Title>

                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Tiền đơn đặt:{" "}
                  <strong>{formatCurrency(orderDetails.price)}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Đã thanh toán:{" "}
                  <strong>{formatCurrency(orderDetails.paid)}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Số tiền thanh toán còn lại:{" "}
                  <strong>{formatCurrency(orderDetails.amount)}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Tiền đã hoàn trả:{" "}
                  <strong>{formatCurrency(orderDetails.refund)}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Trạng thái đơn hàng:{" "}
                  <strong
                    style={{
                      color: getStatusText(orderDetails.orderStatus).color,
                    }}
                  >
                    {getStatusText(orderDetails.orderStatus).text}
                  </strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Ngày tạo đơn: <strong>{orderDetails.createDate}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Ngày cập nhật đơn: <strong>{orderDetails.updateDate}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Nhân viên duyệt hoàn tiền:{" "}
                  <strong style={{ color: orderDetails.updateBy ? "red" : "black" }}>
                    {orderDetails.updateBy || "Không có"}
                  </strong>
                </Paragraph>

                <Title
                  level={3}
                  style={{
                    fontSize: "1.6rem",
                    marginTop: "24px",
                    color: "#003399",
                  }}
                >
                  Thông tin ngày đi
                </Title>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Mã thời gian chuyến đi:{" "}
                  <strong>{orderDetails.tourTimeDTO.id}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Ngày bắt đầu:{" "}
                  <strong>{orderDetails.tourTimeDTO.startDate}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Ngày kết thúc:{" "}
                  <strong>{orderDetails.tourTimeDTO.endDate}</strong>
                </Paragraph>

                <Title
                  level={3}
                  style={{
                    fontSize: "1.6rem",
                    marginTop: "24px",
                    color: "#003399",
                  }}
                >
                  Danh sách khách hàng
                </Title>
                {orderDetails.tourVisitorDTOList.map((tourVisit, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: "12px", fontSize: "1rem" }}
                  >
                    <Paragraph
                      style={{ marginBottom: "8px", fontSize: "1rem" }}
                    >
                      Tên: <strong>{tourVisit.name}</strong>
                    </Paragraph>
                    <Paragraph
                      style={{ marginBottom: "8px", fontSize: "1rem" }}
                    >
                      Số điện thoại: <strong>{tourVisit.phone}</strong>
                    </Paragraph>
                    <Paragraph
                      style={{ marginBottom: "8px", fontSize: "1rem" }}
                    >
                      Ngày sinh: <strong>{tourVisit.dateOfBirth}</strong>
                    </Paragraph>
                  </div>
                ))}

                <Title
                  level={3}
                  style={{
                    fontSize: "1.6rem",
                    marginTop: "24px",
                    color: "#003399",
                  }}
                >
                  Thông tin chuyến đi
                </Title>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Tên Chuyến đi: <strong>{orderDetails.tourDTO.title}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Giá chuyến đi:{" "}
                  <strong>{formatCurrency(orderDetails.tourDTO.price)}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Nơi đến: <strong>{orderDetails.tourDTO.endLocation}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Mã chuyến đi: <strong>{orderDetails.tourDTO.code}</strong>
                </Paragraph>

                <Title
                  level={3}
                  style={{
                    fontSize: "1.6rem",
                    marginTop: "24px",
                    color: "#003399",
                  }}
                >
                  Thông tin người đặt
                </Title>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Tên người đặt: <strong>{orderDetails.userDTO.name}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Số điện thoại: <strong>{orderDetails.userDTO.phone}</strong>
                </Paragraph>
                <Paragraph style={{ marginBottom: "12px", fontSize: "1rem" }}>
                  Email: <strong>{orderDetails.userDTO.email}</strong>
                </Paragraph>
              </div>
            )}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default OrderDetail;
