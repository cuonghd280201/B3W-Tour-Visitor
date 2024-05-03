import React, { useEffect, useState } from "react";
import { Layout, Table, Select, Button, Input } from "antd";
import NavBarWebAdmin from "./Navbar/NavBarWebAdmin";
import SiderBarWebAdmin from "./SlideBar/SiderBarWebAdmin";
import adminServices from "../../services/admin.services";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
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
  const [priceSortOrder, setPriceSortOrder] = useState("asc");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchOrderStatusData();
  }, [orderStatus, sortOrderMap[orderStatus]]);

  const fetchOrderStatusData = async () => {
    try {
      const response = await adminServices.getOrderStatus(
        orderStatus,
        sortOrderMap[orderStatus]
      );
      setOrderStatusData(response.data.data);
    } catch (error) {
      console.error("Error fetching order status data:", error);
    }
  };

  const handleOrderStatusChange = (value) => {
    setOrderStatus(value);
  };

  const getDetailOrder = async (orderId) => {
    try {
      navigate(`/orderDetail/${orderId}`);
    } catch (error) {
      console.error("Error navigate order detail page:", error);
    }
  };

  const navigate = useNavigate();

  const handlePriceSort = (value) => {
    setPriceSortOrder(value);

    const sortedData = [...orderStatusData];

    sortedData.sort((a, b) => {
      if (value === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setOrderStatusData(sortedData);
  };

  const handleSearch = () => {
    const filteredData = orderStatusData.filter((item) =>
      item.code.toLowerCase().includes(searchInput.toLowerCase())
    );
    setOrderStatusData(filteredData);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DONE":
        return "#32CD32";
      case "NOT_DONE":
        return "red";
      case "WAITING_CANCEL":
        return "#FEBE10";
      case "CANCEL":
        return "gray";
      default:
        return "black";
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWebAdmin choose={"menu-key/4"}></SiderBarWebAdmin>
      <Layout>
        <NavBarWebAdmin></NavBarWebAdmin>
        <Content
          style={{
            padding: "10px 5px 0px 5px",
            background: "white",
            margin: "30px",
            borderRadius: "12px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
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
          <Input.Search
              placeholder="Tìm kiếm theo mã đơn hàng"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onSearch={handleSearch}
              style={{ width: 240 ,marginLeft:360}}
              enterButton={<Button type="primary" icon={<SearchOutlined />} />}
            />
          <Select
            defaultValue="DONE"
            onChange={handleOrderStatusChange}
            style={{ marginLeft: 680, width: 200 }}
          >
            <Option value="DONE">ĐÃ HOÀN THÀNH</Option>
            <Option value="NOT_DONE">CHƯA HOÀN THÀNH</Option>
            <Option value="WAITING_CANCEL">CHỜ HỦY</Option>
            <Option value="CANCEL">HỦY</Option>
          </Select>

          <Select
            defaultValue={priceSortOrder}
            onChange={handlePriceSort}
            style={{ width: 180, marginBottom: 16, marginLeft: 10 }}
          >
            <Option value="asc">Giá tăng dần</Option>
            <Option value="desc">Giá giảm dần</Option>
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
                      background: "linear-gradient(to top, #7B68EE, #87CEFA)",
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
                <Button
                  style={{
                    fontSize: "13px",
                    color: "#BA55D3",
                    textDecoration: "none",
                    padding: "8px 10px",
                    border: "1px solid #BA55D3",
                    borderRadius: "4px",
                    transition: "background-color 0.1s, color 0.1s",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#BA55D3";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#BA55D3";
                  }}
                  onClick={() => getDetailOrder(record.id)}
                >
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
