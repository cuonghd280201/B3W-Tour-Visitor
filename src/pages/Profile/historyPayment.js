import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Select } from "antd";
import userServices from "../../services/user.services";
const { Header, Footer, Sider, Content } = Layout;



const HistoryPayment = () => {

  const [payments, setpayments] = useState([]);

  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage state
  const [pageSize, setPageSize] = useState(6); // Initialize pageSize state
  const [totalPages, setTotalPages] = useState(1); // Add state for total pages



  useEffect(() => {
    fetchPaymentData();
  }, [currentPage, pageSize]);


  const fetchPaymentData = async (sortBy = 'createDate', sortOrder = 'desc') => {
    try {
      const response = await userServices.getAllTransaction(currentPage - 1, pageSize, sortBy, sortOrder);
      console.log("Response:", response);
      setpayments(response.data.data);

    } catch (error) {
      console.error("Error fetching payments:", error);
      setError(error);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };


  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
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
                <div style={{ height: "400px", overflow: "auto" }}>
                    <h2
                      style={{
                        fontSize: "28px",
                        color: "#333",
                        marginBottom: "20px",
                      }}
                    >
                      Lịch Sử Chuyền Tiền Của Khách Hàng
                    </h2>
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
                              Mã Thanh Toán
                            </th>
                            <th
                              scope="col"
                              style={{ padding: "15px", color: "#495057" }}
                            >
                              Người Thanh Toán
                            </th>
                            <th
                              scope="col"
                              style={{ padding: "15px", color: "#495057" }}
                            >
                              Số Tiền
                            </th>
                            <th
                              scope="col"
                              style={{ padding: "15px", color: "#495057" }}
                            >
                              Ngày Thanh Toán
                            </th>
                            <th
                              scope="col"
                              style={{ padding: "15px", color: "#495057" }}
                            >
                              Mô Tả
                            </th>
                            <th
                              scope="col"
                              style={{ padding: "15px", color: "#495057" }}
                            >
                              Tình Trạng Thanh Toán
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.map(payment => (

                            <tr>
                              <td style={{ padding: "15px" }}>
                                {payment.id}
                              </td>
                              <td style={{ padding: "15px" }}>
  <a href={`mailto:${payment.userDTO.email}`} style={{ color: "blue", textDecoration: "underline" }}>
    {payment.userDTO.email}
  </a>
</td>

                              <td style={{ padding: "15px" }}> {payment.amount}</td>
                              <td style={{ padding: "15px" }}> {payment.createDate}</td>
                              <td style={{ padding: "15px" }}>  {payment.description}</td>
                              <td style={{ padding: "15px" }}>    <span className={payment.transactionStatus === "DONE" ? "badge bg-success" : "badge bg-danger"}>
                            {payment.transactionStatus}
                          </span></td>

                            

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col text-center">
                      <div className="block-27">
                        <ul>
                          <li><a href="#" onClick={handlePrevious}>&lt;</a></li>
                          {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                              <a href="#" onClick={() => setCurrentPage(index + 1)}>{index + 1}</a>
                            </li>
                          ))}
                          <li><a href="#" onClick={handleNext}>&gt;</a></li>
                        </ul>
                      </div>
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

export default HistoryPayment;
