import React, { useEffect, useState } from "react";

import "../Admin/dashboard.css";
import { Layout, Table, Select } from "antd";

import NavBarWebAdmin from "./Navbar/NavBarWebAdmin";
import SiderBarWebAdmin from "./SlideBar/SiderBarWebAdmin";
import adminServices from "../../services/admin.services";
import Chart from "react-apexcharts";
import { BiUser, BiGroup, BiMoney,BiDollar  } from "react-icons/bi";

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

    const dates = data.map((element) => element.date);
    setDates(dates);

    const revenues = data.map((element) => element.money);
    setRevenues(revenues);
  };

  const handleRevenueDatesChange = async (value) => {
    const selectedDays = parseInt(value); // Convert the selected value to a number
    // Fetch revenue data based on the selected number of days
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
                  <h2 className="pageheader-title">Thống kê </h2>
                </div>
              </div>
            </div>

            <div className="ecommerce-widget">
              <div className="row row-with-margin">
                <div className="col-xl-2 col-lg-3 col-md-6">
                  <div className="card border-5 border-top border-info-subtle">
                    <div className="card-body">
                      <h3 className="text-muted mb-3">
                        <BiMoney className="mr-2" />
                        Tổng tiền
                      </h3>
                      <div className="metric-value">
                        <h4 className="text-success">
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
                <div className="col-xl-2 col-lg-3 col-md-6">
                  <div className="card border-5 border-top border-success-subtle">
                    <div className="card-body">
                      <h3 className="text-muted mb-3">
                        <BiDollar className="mr-2" />
                        Tổng số tiền hoàn trả
                      </h3>
                      <div className="metric-value">
                        <h4 className="text-danger">
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
                <div className="col-xl-2 col-lg-3 col-md-6">
                  <div className="card border-5 border-top border-warning-subtle">
                    <div className="card-body">
                      <h3 className="text-muted mb-3">
                        <BiGroup className="mr-2" /> Số lượng khách hàng
                      </h3>
                      <div className="metric-value">
                        <h4>{roleNumber?.countUser}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-6">
                  <div className="card border-5 border-top border-primary-subtle">
                    <div className="card-body">
                      <h3 className="text-muted mb-3">
                        <BiUser className="mr-2" /> Số lượng nhân viên
                      </h3>
                      <div className="metric-value">
                        <h4>{roleNumber?.countStaff}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Select
              defaultValue="Doanh thu trong vòng"
              onChange={handleRevenueDatesChange}
              style={{ marginLeft: "400px", width: "200px" }}
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
                plotOptions: {
                  bar: {
                    horizontal: false, // Ensure bars are vertical
                    columnWidth: "25%", // Adjust the width of the bars
                  },
                },
              }}
              series={[
                {
                  name: "series-1",
                  data: revenues,
                  color: "#6050DC",
                },
              ]}
              type="bar"
              width="1000"
            />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
