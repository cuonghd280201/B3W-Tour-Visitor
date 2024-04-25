import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Input, Button, Card, CardHeader, CardBody } from 'reactstrap';

import "../Admin/dashboard.css";
import { Layout } from "antd";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import tourServices from "../../services/tour.services";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
import NavBarWebStaff from "./Navbar/NavBarWebStaff";
const { Content } = Layout;

const SlotTourStaffDetai = () => {

  const { state } = useLocation();

  const [timeDetail, setTimeDetail] =
    useState(null);
  const fetchTimeDetail = async () => {
    let response;
    try {
      response = await tourServices.getDetailSlotByStaff(state.timeId);
      console.log("Response:", response); // Log the response object
      setTimeDetail(response.data.data);

      return response;

    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }

  useEffect(() => {
    fetchTimeDetail();
  }, []);



  const currentDate = new Date().toISOString().split('T')[0];

  const renderTourSchedules = () => {
    const scheduleDate = timeDetail?.tourTimeDTO?.startDate;

    if (timeDetail && timeDetail.tourScheduleDTOSet && scheduleDate) {
      const [day, month, year] = scheduleDate.split('-');
      const initialDate = new Date(`${year}-${month}-${day}`);
      return timeDetail.tourScheduleDTOSet.map((schedule, index) => {
        initialDate.setDate(initialDate.getDate() + index);
        const adjustedDate = `${String(initialDate.getDate()).padStart(2, '0')}-${String(initialDate.getMonth() + 1).padStart(2, '0')}-${initialDate.getFullYear()}`;
        const isComing = adjustedDate === currentDate || adjustedDate < currentDate;
        return (
          <div
            key={schedule.id}
            className="box"
            style={{ backgroundColor: isComing ? 'lightgreen' : 'white' }}
          >
            <h4>Ngày {index + 1}</h4>
            <h3>{adjustedDate}</h3>
            {/* <p>{schedule.description}</p> */}
            {isComing && <div className="label-coming">Đã Đến</div>}
          </div>
        );
      });
    }
    return null;
  };

  const renderTourSchedulesDescription = () => {
    if (timeDetail && timeDetail.tourScheduleDTOSet) {
      return timeDetail.tourScheduleDTOSet.map((schedule, index) => {
        return (
          <div
          >
            <h4>Ngày {index + 1}: {schedule.title}</h4>
            <p>{schedule.description}</p>
          </div>
        );
      });
    }
    return null;
  };
  const navigate = useNavigate();


  const navigateToFindVisitor = () => {
    if (timeDetail) {
      navigate('/listVisitorTourByTour', { state: { tourTimeId: timeDetail.tourTimeDTO.id } });
    }
  };

  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <SiderBarWebStaff choose={"menu-key/1"}></SiderBarWebStaff>
        <Layout>
          <NavBarWebStaff></NavBarWebStaff>
          <div
            style={{
              padding: "10px 5px 0px 5px",
              background: "white",
              margin: "30px",
              borderRadius: "12px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >


            <div className="ecommerce-widget">
              <div className="row row-with-margin">
                <div className="col-xl-12 col-lg-3 col-md-12 col-sm-12 col-12">
                  <div className="destination">
                    <div className="text p-3">
                      <div className="row">
                        <div className="col-4">
                          <img
                            src={timeDetail?.tourDTO.coverImage}
                            className="img-fluid rounded"
                            alt="Tour Image"
                            style={{
                              width: "100%",
                              height: 200,
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="col-4">
                          <h4 style={{ fontSize: 16, marginTop: 10 }}>
                            Mã Chuyến Đi: {timeDetail?.tourDTO.code}
                            <span style={{ color: "#666" }}>

                            </span>
                          </h4>
                          <h4 style={{ fontSize: 16, marginTop: 10 }}>
                            Tên Chuyến Đi: {timeDetail?.tourDTO.title}
                            <span style={{ color: "#666" }}>

                            </span>
                          </h4>
                          <p
                            style={{
                              fontSize: 18,
                              color: "#ff5722",
                              marginBottom: 5,
                            }}
                          >
                            {timeDetail?.tourDTO.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </p>
                          <p
                            className="text-primary"
                            style={{ fontSize: 14, marginBottom: 5 }}
                          >
                            Nơi khởi hành: <b> {timeDetail?.tourDTO.starLocation} </b>
                            Nơi kết thúc:  <b>{timeDetail?.tourDTO.endLocation}</b>
                          </p>
                          <span className={timeDetail?.tourDTO.tourStatus === "ACTIVE" ? "badge bg-success" : "badge bg-danger"}>
                            {timeDetail?.tourDTO.tourStatus}
                          </span>


                        </div>

                      </div>
                      <hr />
                    </div>
                  </div>
                </div>

                <div className="flight-hotel-detail detail tour-detail  ">
                  <div className="entry-head">
                    <div className="overview active">
                      <section className="section-03 mb-5">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-md-24 left">
                              <p class="s-title-03 tour-des"> {timeDetail?.tourDTO.description} </p>
                              <div className="box-order">
                                <div className="time"><p>Khởi hành <b> </b>
                                </p>
                                  {/* <p>Tập trung <b>04:05 ngày 01/05/2024</b>
                                                </p> */}
                                  <p>Ngày đi:  <b>{timeDetail?.tourTimeDTO.startDate}</b>
                                  </p>
                                  <p>Ngày về:  <b> {timeDetail?.tourTimeDTO.endDate}</b>
                                  </p><p>Thời gian đi:   <b> {timeDetail?.tourTimeDTO.startTime}</b>
                                  </p><p>Số lượng người đi:   <b> {timeDetail?.tourTimeDTO.slotNumberActual}</b>
                                    <p>Số lượng chỗ:   <b> {timeDetail?.tourTimeDTO.slotNumber}</b></p>
                                    Trạng thái chuyến đi:   <b>  {timeDetail?.tourTimeDTO.timeStatus}</b>


                                  </p>
                                </div>

                              </div>
                            </div>

                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
                <section className="section-07-map mb-5">
                  <div class="container-fluid" style={{
                    fontSize: "15px",
                    padding: "8px 16px",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    transition: "background-color 0.3s, color 0.3s",
                    display: "flex",
                    alignItems: "center",
                  }}>
                    <div className="row">
                      <div className="col-md-5" style={{
                        transition: "background-color 0.3s, color 0.3s",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "10px",
                        backgroundColor: "#f0f0f0"
                      }}>
                        <div class="container-fluid">
                          <main class="row">
                            <section className="col">
                              <header className="title">
                                <h2>Lịch Trình</h2>
                                <p>Màu xanh: Đã Tới Điểm Hẹn</p>
                                <p>Màu trắng: Chưa Tới Điểm Hẹn</p>
                              </header>
                              <div className="contents" style={{ width: '400px' }}>
                                {renderTourSchedules()}
                              </div>
                            </section>
                          </main>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          {renderTourSchedulesDescription()}
                        </div>
                      </div>
                    </div>
                  </div>

                </section>
                {timeDetail && timeDetail?.groupVisitorDTOSet?.map((groupVisitorDTOSet, index) => (
                  <section>
                    <div className="flight-hotel-detail detail tour-detail  ">
                      <div className="entry-head">
                        <div className="overview active">
                          <section className="section-03 mb-5">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-md-24 left">
                                  <div className="box-order">
                                    <h2 className="tt mt-3">Thông tin người đặt</h2>
                                    <div className="table-price"><div className="more-info more-info-2">
                                      <div className="block">
                                        <div className="info">
                                          <h3>Tên Người Đặt: {groupVisitorDTOSet?.userDTO?.name}</h3><p>Địa chỉ e-mail: {timeDetail?.groupVisitorDTOSet?.[0]?.userDTO?.email}</p>
                                          <span>Số Điện Thoại: {groupVisitorDTOSet?.userDTO?.phone}</span>
                                        </div>
                                      </div>
                                    </div>
                                    </div>
                                  </div>
                                </div>
                                <h2
                                  style={{
                                    fontSize: "28px",
                                    color: "#333",
                                    marginBottom: "20px",
                                  }}
                                >
                                  Thông tin khách hàng tham gia chuyến đi
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
                                          Tên khách
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ padding: "15px", color: "#495057" }}
                                        >
                                          Số điện thoại
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ padding: "15px", color: "#495057" }}
                                        >
                                          CMND
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ padding: "15px", color: "#495057" }}
                                        >
                                          Ngày Sinh
                                        </th>
                                        <th
                                          scope="col"
                                          style={{ padding: "15px", color: "#495057" }}
                                        >
                                          Loại Khách
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {groupVisitorDTOSet && groupVisitorDTOSet?.tourVisitorDTOSet?.map((tourVisitor, index) => (

                                        <tr>
                                          <td style={{ padding: "15px" }}>
                                            {tourVisitor.name}
                                          </td>
                                          <td style={{ padding: "15px" }}> {tourVisitor.phone}</td>
                                          <td style={{ padding: "15px" }}> {tourVisitor.idCard}</td>
                                          <td style={{ padding: "15px" }}>  {tourVisitor.dateOfBirth}</td>
                                          <td style={{ padding: "15px" }}>  {tourVisitor.tourVisitorType}</td>

                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}


                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Link to="/listTourStaff" style={{ textDecoration: "none" }}>
                    <button
                      style={{
                        backgroundColor: "#ff4d4f",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        transition: "background-color 0.3s",
                      }}
                    >
                      Trở về
                    </button>
                  </Link>

                  {/* Add your new button here */}
                  <button onClick={navigateToFindVisitor}
                    style={{
                      backgroundColor: "#FFA500",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      cursor: "pointer",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      transition: "background-color 0.3s",
                    }}
                  >
                    Danh Sách Đi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Layout>

      </Layout>
    </React.Fragment>
  );
};

export default SlotTourStaffDetai;
