import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Select } from "antd";
import { Row, Col, TabContent, TabPane } from "reactstrap";
import {
  LeftOutlined,
  RightOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"; // Import arrow icons
import { Link } from "react-router-dom";

import NavBarWebStaff from "./Navbar/NavBarWebStaff";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
import tourServices from "../../services/tour.services";

const { Content } = Layout;
const { Option } = Select;

const ListTourStaff = () => {


  const [error, setError] = useState(null);


  //List Tour Staff
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage state
  const [pageSize, setPageSize] = useState(6); // Initialize pageSize state
  const [totalPages, setTotalPages] = useState(); // Add state for total pages
  const [loading, setLoading] = useState(true);

  const calculatePageRange = (currentPage, totalPages) => {
    const pageRangeSize = totalPages;
    let startPage = Math.max(1, currentPage - Math.floor(pageRangeSize / 2));
    let endPage = startPage + pageRangeSize - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pageRangeSize + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };
  const pageRange = calculatePageRange(currentPage, totalPages);


  useEffect(() => {
    fetchTourData();
  }, [currentPage, pageSize]);


  const fetchTourData = async (sortBy = 'title', sortOrder = 'desc') => {
    try {
      const response = await tourServices.getAllTourAndPaging(currentPage - 1, pageSize, sortBy, sortOrder);
      console.log("Response:", response); // Log the response object

      setTours(response.data.data);
      setTotalPages(response.data.pagination.totalPage)
      setLoading(false);

    } catch (error) {
      console.error("Error fetching tours:", error);
      setError(error);
      setLoading(false);
    }
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatPrice = (price) => {
    return (price).toLocaleString('vi-VN').replace(/,/g, '.');
  };

  //city

  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchDataCity = async () => {
      try {
        const response = await tourServices.getAllCity();
        setCities(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching city data");
        setLoading(false);
      }
    };

    fetchDataCity();
  }, []);


  //Searh 


  const [keyword, setKeyword] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [startDate, setStartDate] = useState(null);


  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    const formattedDate = formatDate(dateValue);
    setStartDate(formattedDate);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const fetchData = async () => {
    try {
      const sortBy = 'title';
      const sortOrder = 'desc';
      const decodedKeyword = decodeURIComponent(keyword);
      const response = await tourServices.searchAllTour(currentPage - 1, pageSize, sortBy, sortOrder, decodedKeyword, endLocation, minPrice, maxPrice, startDate);
      setTours(response.data.data);
      console.log('searchData:', response);

    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWebStaff choose={"menu-key/1"} />
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
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                <div className="page-header">
                  <h2 className="pageheader-title">Danh Sách Chuyến Đi </h2>
                </div>
              </div>
            </div>

            {/* Filter by price */}
            <div className="d-flex justify-content-between mb-4">
              <span style={{ display: "inline-block" }}>
                <a
                  href="/createToutStaff"
                  style={{
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
                >
                  <PlusCircleOutlined style={{ marginRight: "5px" }} />
                  Tạo chuyến đi mới
                </a>


              </span>
            </div>

              <div className="sidebar-wrap tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-nextgen-tab">
                <Row>
                  <Col>
                    <TabContent activeTab="v-pills-1">
                      <TabPane tabId="v-pills-1">
                        <form className="search-destination">
                          <Row>
                            <Col md={2} className="form-group">
                              <Input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Nhập từ khóa..."
                                className="form-control"
                              />
                            </Col>
                            <Col md={2} className="form-group">
                              <div className="select-wrap one-third">
                                <div className="icon">
                                  <span className="ion-ios-arrow-down" />
                                </div>
                                <select
                                  name="endLocation"
                                  id="endLocation"
                                  className="form-control"
                                  value={endLocation}
                                  onChange={(e) => setEndLocation(e.target.value)}
                                >
                                  <option value="">Điểm Kết Thúc</option>
                                  {cities.map((city, index) => (
                                    <option key={index} value={city.name}>
                                      {city.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col md={2} className="form-group">
                              <Input type="date" onChange={handleDateChange} className="form-control" />
                            </Col>
                            <Col md={4} className="form-group">
                                    <div className="range-slider">
                                        <span className="d-flex align-items-center">
                                            <Input
                                                type="number"
                                                value={minPrice}
                                                min={0}
                                                max={100000000}
                                                onChange={handleMinPriceChange}
                                                className="form-control mr-2"
                                            />
                                            -
                                            <Input
                                                type="number"
                                                value={maxPrice}
                                                min={0}
                                                max={100000000}
                                                onChange={handleMaxPriceChange}
                                                className="form-control ml-2"
                                            />
                                        </span>
                                        <Input
                                            type="range"
                                            value={minPrice}
                                            min={0}
                                            max={100000000}
                                            step={500000}
                                            onChange={handleMinPriceChange}
                                            className="form-control mt-2"
                                        />
                                        <Input
                                            type="range"
                                            value={maxPrice}
                                            min={0}
                                            max={100000000}
                                            step={500000}
                                            onChange={handleMaxPriceChange}
                                            className="form-control mt-2"
                                        />
                                    </div>
                                </Col>
                            <Col md={2} className="form-group">
                              <Button color="primary" onClick={fetchData} className="w-100">
                                Tìm kiếm
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
              </div>
            <div className="row">
              <div className="col-xl-12 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card border-5 border-top border-success-subtle">
                  <div className="card-body-dashboard">
                    <div className="destination">
                      {tours.map(tour => (
                        <div className="text p-3">
                          <div className="row">
                            < div className="col-4" >
                              <Link
                                to="/listTourStaffDetail"
                                className="text-dark"
                                state={{ tourId: tour.id }} // Pass tourId as state data
                              >
                                <a href="" className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${tour.coverImage})` }}>
                                  <div className="icon d-flex justify-content-center align-items-center">
                                    <span className="icon-link" />
                                  </div>
                                </a>
                              </Link>
                            </div>
                            <div className="col-5">
                              <h4 style={{ fontSize: 16, marginTop: 10 }}>
                                Mã Chuyến Đi:{" "}
                                <span style={{ color: "#666" }}>
                                  {tour.code}
                                </span>
                              </h4>
                              <p style={{ fontSize: 14, marginBottom: 5 }}>
                                <span style={{ color: "#666" }}>
                                  Tên Chuyến Đi: <b> {tour.title}</b>
                                </span>
                              </p>
                              <p
                                style={{ fontSize: 14, marginBottom: 5 }}
                              >
                                Nơi Khởi Hành: <b>{tour.starLocation}</b>
                              </p>
                              <p
                                style={{ fontSize: 14, marginBottom: 5 }}
                              >
                                Nơi Khởi Hành:<b> {tour.endLocation}</b>
                              </p>
                            </div>
                            <div className="col-3">
                              <p
                                className="text-right"
                                style={{
                                  fontSize: 18,
                                  fontWeight: "bold",
                                  color: "#F9BE37",
                                  marginBottom: 5,
                                }}
                              >
                                {formatPrice(tour.price)} VNĐ
                              </p>
                              <p className=" d-flex">
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
                                        transition:
                                          "background-color 0.3s, color 0.3s",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor =
                                          "#F9BE37";
                                        e.target.style.color = "#fff";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor =
                                          "transparent";
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

            <div className="row mt-5">
              <div className="col text-center">
                <div className="block-27">
                  <ul>
                    <li>
                      <a href="#" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &lt;
                      </a>
                    </li>
                    {pageRange.map((page) => (
                      <li key={page} className={currentPage === page ? 'active' : ''}>
                        <a href="#" onClick={() => handlePageChange(page)}>
                          {page}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href="#" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        &gt;
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pagination */}

          </Content>
        </div>
      </Layout >
    </Layout >
  );
};

export default ListTourStaff;
