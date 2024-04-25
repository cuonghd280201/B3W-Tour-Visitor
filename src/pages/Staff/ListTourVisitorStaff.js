import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Pagination } from "antd";
import { Link } from "react-router-dom";
import NavBarWebStaff from "./Navbar/NavBarWebStaff";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
import orderServices from "../../services/order.services";

const { Content } = Layout;

const ListTourVitorStaff = () => {
  const [tours, setTours] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 4;

  // Fetch tours whenever the keyword, current page, or items per page changes
  useEffect(() => {
    fetchTourOrdered();
  }, [keyword]);

  const fetchTourOrdered = async () => {
    try {
      const decodedKeyword = decodeURIComponent(keyword);
      const response = await orderServices.getTourOrdered(decodedKeyword);
      setTours(response.data.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const totalPages = Math.ceil(tours.length / toursPerPage);

  const indexOfLastOrder = currentPage * toursPerPage;
  const indexOfFirstOrder = indexOfLastOrder - toursPerPage;
  const currentTours = tours.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWebStaff choose={"menu-key/2"} />
      <Layout>
        <NavBarWebStaff />
        <div style={{ padding: "30px", background: "white", margin: "30px", borderRadius: "12px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
          <Content>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="page-header">
                  <h2 className="pageheader-title">Danh Sách Chuyến Đi</h2>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mb-4">
              <div className="form-group">
                <Input
                  style={{
                    marginLeft: '3  00px',
                    marginBottom: '20px',
                    padding: '10px',
                    width: '300px',
                    border: "1px solid #5cb85c",
                    borderRadius: "4px",
                    transition: "background-color 0.3s, color 0.3s",
                    alignItems: "center",
                    fontSize: "15px",
                    color: "#5cb85c",
                    textDecoration: "none",
                  }}
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Nhập từ khóa..."
                />
              </div>
              <div className="form-group">
                <Button color="primary" style={{
                  fontSize: "15px",
                  color: "#5cb85c",
                  textDecoration: "none",
                  padding: "8px 16px",
                  border: "1px solid #5cb85c",
                  borderRadius: "4px",
                  transition: "background-color 0.3s, color 0.3s",
                  display: "flex",
                  alignItems: "center",
                }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#4cae4c";
                    e.target.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#5cb85c";
                  }}
                  onClick={fetchTourOrdered}>Tìm kiếm</Button>
              </div>
            </div>

            {/* Display tours */}
            <div className="row row-with-margin">
              <div className="col-xl-12 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card border-5 border-top border-success-subtle">
                  <div className="card-body-dashboard">
                    <div className="destination">
                      {currentTours.map((tour) => (
                        <div key={tour.id} className="text p-3">
                          <div className="row">
                            <div className="col-4">
                              <Link to="/listTourVisitorDetailStaff" className="text-dark" state={{ tourId: tour.id }}>
                                <div className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${tour.coverImage})` }}>
                                  <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="icon-link" />
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div className="col-5">
                              <h4 style={{ fontSize: 16, marginTop: 10 }}>
                                <b>Mã Chuyến Đi:{" "}</b>
                                <span style={{ color: "#666" }}>{tour.code}</span>
                              </h4>
                              <p style={{ fontSize: 14, marginBottom: 5 }}>
                                <span style={{ color: "#666" }}><b>Tên Chuyến Đi:</b> {tour.title}</span>
                              </p>
                              <p style={{ fontSize: 14, marginBottom: 5 }}>
                                <b>Nơi Khởi Hành:</b> {tour.starLocation}
                              </p>
                              <p style={{ fontSize: 14, marginBottom: 5 }}>
                                <b>Điểm Kết Thúc:</b> {tour.endLocation}
                              </p>
                            </div>
                            <div className="col-3">
                              <p className="text-right" style={{ fontSize: 18, fontWeight: "bold", color: "#F9BE37", marginBottom: 5 }}>
                                {tour.price} VNĐ
                              </p>
                              <p className="d-flex">
                                <span className="ml-auto">
                                  <Link
                                    to="/listTourStaffDetail"
                                    className="text-dark"
                                    state={{ tourId: tour.id }} // Pass tourId as state data
                                  >
                                    <a
                                      style={{
                                        fontSize: "15px",
                                        color: "#F9BE37",
                                        textDecoration: "none",
                                        padding: "8px 16px",
                                        border: "1px solid #F9BE37",
                                        borderRadius: "4px",
                                        transition: "background-color 0.3s, color 0.3s",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#F9BE37";
                                        e.target.style.color = "#fff";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "transparent";
                                        e.target.style.color = "#F9BE37";
                                      }}
                                    >
                                      Xem chi tiết
                                    </a>
                                  </Link>
                                </span>
                              </p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default ListTourVitorStaff;
