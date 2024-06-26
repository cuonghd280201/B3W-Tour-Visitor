import React, { useState, useEffect } from "react";
import { Layout, Table, Input, Select } from "antd";

import paymentServices from "../../services/payment.services";
import SiderBarWebAdmin from "../Admin/SlideBar/SiderBarWebAdmin";
import NavBarWebAdmin from "../Admin/Navbar/NavBarWebAdmin";

const { Column } = Table;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const ListTransaction = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // State for sorting order

  useEffect(() => {
    fetchPaymentData();
  }, [currentPage, pageSize, sortOrder]);

  const fetchPaymentData = async (
    sortBy = "createDate",
    sortOrder = "desc"
  ) => {
    try {
      const response = await paymentServices.getAllTransaction(
        currentPage - 1,
        pageSize,
        sortBy,
        sortOrder
      );
      setPayments(response.data.data);
      setFilteredPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setError(error);
    }
  };

  const page = {
    pageSize: 5, // Number of items per page
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase().trim();

    const filtered = payments.filter((payment) => {
      const idMatch = payment.code.toString().toLowerCase().includes(searchValue);
      const amountMatch = payment.amount.toString().includes(searchValue);
      return idMatch || amountMatch || searchValue === "";
    });

    setFilteredPayments(filtered);
  };

  const handleSort = (value) => {
    const sortedPayments = [...filteredPayments]; 
    sortedPayments.sort((a, b) => {
      if (value === "asc") {
        return a.amount - b.amount; 
      } else {
        return b.amount - a.amount; 
      }
    });

    setFilteredPayments(sortedPayments);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DONE":
        return "#32CD32"; // Example color for "DONE" status
      case "REFUND":
        return "#696969"; // Example color for "NOT_DONE" status
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
      <SiderBarWebAdmin choose={"menu-key/6"}></SiderBarWebAdmin>
      <Layout>
        <NavBarWebAdmin></NavBarWebAdmin>

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
              BÁO CÁO GIAO DỊCH
            </h1>

            <div
              style={{
                padding: 25,
                minHeight: 400,
              }}
            >
              <div style={{ height: "600px", overflow: "auto" }}>
                <Search
                  placeholder="Tìm theo mã đơn hàng"
                  allowClear
                  onSearch={handleSearch}
                  style={{ width: 250, marginBottom: 16 }}
                />
                <Select
                  defaultValue={sortOrder}
                  onChange={handleSort} // Handle sorting order change
                  style={{ width: 180, marginBottom: 16, marginLeft: 600 }}
                >
                  <Option value="asc">Tổng tiền tăng dần</Option>
                  <Option value="desc">Tổng tiền giảm dần</Option>
                </Select>
                <Table
                  className="custom-table"
                  dataSource={filteredPayments}
                  pagination={page}
                  size="middle"
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
                    title="Mail người thực hiện"
                    dataIndex={["userDTO", "email"]}
                    key="email"
                  />
                  <Column
                    title="Thời gian giao dịch"
                    dataIndex="createDate"
                    key="createDate"
                  />
                  <Column
                    title="Tổng tiền"
                    dataIndex="amount"
                    key="amount"
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
                    title="Mô tả"
                    dataIndex="description"
                    key="description"
                  />

                  <Column
                    title="Tình trạng giao dịch"
                    dataIndex="transactionStatus"
                    key="transactionStatus"
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
                </Table>
              </div>
            </div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default ListTransaction;
