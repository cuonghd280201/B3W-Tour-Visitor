import React, { useEffect, useState } from "react";

import "../Admin/dashboard.css";
import { Layout, Table, Select } from "antd";

import NavBarWebAdmin from "./Navbar/NavBarWebAdmin";
import SiderBarWebAdmin from "./SlideBar/SiderBarWebAdmin";
import adminServices from "../../services/admin.services";
import Chart from "react-apexcharts";
import { BiUser, BiGroup, BiMoney, BiDollar } from "react-icons/bi";

const { Content } = Layout;
const { Column } = Table;
const { Option } = Select;

const Dashboard = () => {
  const [orderSumary, setOrderSumary] = useState(); // Initialize users as an object
  const [roleNumber, setRoleNumber] = useState(); //
  const [revenues, setRevenues] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetchOrderSumary();
    fetchRoleNumber();
  }, []);

  const fetchOrderSumary = async () => {
    const response = await adminServices.getOrderSumary();
    setOrderSumary(response.data.data);
  };

  const fetchRoleNumber = async () => {
    const response = await adminServices.getRoleNumber();
    setRoleNumber(response.data.data);
  };

  const getRevenueData = async (days) => {
    const response = await adminServices.getRevenue(days);
    const { data } = response.data;

    const formattedData = data.map((item) => ({
      date: item.date,
      money: parseFloat(item.money),
    }));
    formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const dates = formattedData.map((item) => item.date);
    const formattedRevenues = formattedData.map((item) => ({
      x: item.date,
      y: item.money,
    }));

    setDates(dates);
    setRevenues(formattedRevenues);
  };

  const handleRevenueDatesChange = async (value) => {
    const selectedDays = parseInt(value);
    await getRevenueData(selectedDays);
  };

  useEffect(() => {
    getRevenueData(0);
  }, []);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWebAdmin choose={"menu-key/1"}></SiderBarWebAdmin>
      <Layout>
        <NavBarWebAdmin></NavBarWebAdmin>
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
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="page-header">
                  <h2
                    
                    style={{
                      padding: "15px 0px 0px 0px",
                      margin: "0px 0px 0px 2px",
                      color: "#4a4a4a",
                      fontSize: "24px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      borderBottom: "4px solid #6546D2",
                      display: "inline-block",
                    }}
                  >
                    Thống kê{" "}
                  </h2>
                </div>
              </div>
            </div>

            <div className="ecommerce-widget">
              <div className="row row-with-margin">
                <div className="col-md-3">
                  <div>
                    <div
                      className="card-body"
                      style={{
                        backgroundImage:
                          "linear-gradient( 135deg, #FCCF31 10%, #F55555 100%)",
                          borderRadius: "5px"
                      }}
                    >
                      <h3 className=" mb-3" style={{ color: "#FFFAFA" }}>
                        <BiMoney className="mr-2 " />
                        Tổng doanh thu
                      </h3>
                      <div className="metric-value ">
                        <h4 className=" mb-3" style={{ color: "#FFFAFA" }}>
                          {(orderSumary?.completedCount / 1).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div >
                    <div
                      className="card-body"
                      style={{
                        backgroundImage:
                          "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)",
                          borderRadius: "5px"
                      }}
                    >
                      <h3 className=" mb-3" style={{ color: "#FFFAFA" }}>
                        <BiDollar className="mr-2" />
                        Tổng tiền hoàn trả
                      </h3>
                      <div className="metric-value">
                        <h4 className=" mb-3" style={{ color: "#FFFAFA" }}>
                          {(orderSumary?.refundedCount / 1).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div >
                    <div
                      className="card-body"
                      style={{
                        backgroundImage:
                          "linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%)",
                          borderRadius: "5px"
                      }}
                    >
                      <h3 className="mb-3" style={{ color: "#FFFAFA" }}>
                        <BiGroup className="mr-2" /> Tổng khách hàng
                      </h3>
                      <div className="metric-value">
                        <h4 className="mb-3" style={{ color: "#FFFAFA" }}>
                          {roleNumber?.countUser}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div >
                    <div
                      className="card-body"
                      style={{
                        backgroundImage:
                          "linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)",
                          borderRadius: "5px"
                      }}
                    >
                      <h3 className=" mb-3" style={{ color: "#FFFAFA" }}>
                        <BiUser className="mr-2" /> Tổng nhân viên
                      </h3>
                      <div className="metric-value">
                        <h4 className=" mb-3" style={{ color: "#FFFAFA" }}>
                          {roleNumber?.countStaff}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Select
              defaultValue="Hiển thị doanh thu trong vòng"
              onChange={handleRevenueDatesChange}
              style={{ marginLeft: "400px", width: "250px" }}
            >
              <Option value="7">7 ngày</Option>
              <Option value="14">14 ngày</Option>
              <Option value="21">21 ngày</Option>
            </Select>

            <Chart
              options={{
                chart: {
                  id: "basic-bar",
                },
                xaxis: {
                  categories: dates,
                },
                yaxis: {
                  labels: {
                    formatter: function (value) {
                      return new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(value);
                    },
                  },
                },
                plotOptions: {
                  bar: {
                    columnWidth: "25%",
                  },
                },
              }}
              series={[
                {
                  name: "Doanh thu",
                  data: revenues,
                },
              ]}
              type="bar"
              width="100%"
            />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
