import React, { useEffect, useState } from "react";

import { Row, Col, TabContent, TabPane, Input, Button } from 'reactstrap';
import tourServices from "../../services/tour.services";
import { Link } from "react-router-dom";
import HomeSlider from "../HomeSlider/homeSlider";
import { useNavigate } from 'react-router-dom';



// Import Swiper styles






const Home = () => {
    const [tours, setTours] = useState([]);

    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage state
    const [pageSize, setPageSize] = useState(6); // Initialize pageSize state
    const [totalPages, setTotalPages] = useState(pageSize); // Add state for total pages
    const [loading, setLoading] = useState(true);

    const calculatePageRange = (currentPage, totalPages) => {
        const pageRangeSize = 6;
        let startPage = Math.max(1, currentPage - Math.floor(pageRangeSize / 2));
        let endPage = startPage + pageRangeSize - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - pageRangeSize + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const pageRange = calculatePageRange(currentPage, totalPages);

    // Lấy dữ liệu các thành phố
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





    useEffect(() => {
        fetchTourData();
    }, [currentPage, pageSize]);


    const fetchTourData = async (sortBy = 'title', sortOrder = 'asc') => {
        try {
            const response = await tourServices.getAllTourAndPaging(currentPage - 1, pageSize, sortBy, sortOrder);
            console.log("Response:", response);
            setTours(response.data.data);

        } catch (error) {
            console.error("Error fetching tours:", error);
            setError(error);
        }
    };


    const formatPrice = (price) => {
        return (price).toLocaleString('vi-VN').replace(/,/g, '.');
    };
    const tourImages = ["images/bg_1.jpg", "images/hotel-1.jpg", "images/hotel-4.jpg", "images/hotel-3.jpg"];


    const [keyword, setKeyword] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000000);
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

    //Giá trị lớn nhỏ 



    return (
        <>
            <div className="hero-wrap js-fullheight" style={{ backgroundImage: 'url("images/bg_1.jpg")' }}>
                <div className="overlay" />
                <div className="container">
                    <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
                        <div className="col-md-9 text-center" data-scrollax=" properties: { translateY: '70%' }">
                            <p className="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span className="mr-2"><a href="index.html">Trang Chủ</a></span> <span>Chuyến Đi</span></p>
                            <h1 className="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Chuyến Đi</h1>
                        </div>
                    </div>
                </div>
            </div>
            <HomeSlider></HomeSlider>


                    <div className="col-md-24" style={{
                        marginTop: '30px'
                    }}>
                        <div className="tab-content p-4 px-5" id="v-pills-tabContent">
                            <div className="sidebar-wrap tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-nextgen-tab">
                                <Row>
                                    <Col>
                                        <TabContent activeTab="v-pills-1">
                                            <TabPane tabId="v-pills-1">
                                                <form className="search-destination">
                                                    <Row>
                                                        <Col md={3}>
                                                            <div className="form-group">
                                                                <Input
                                                                    type="text"
                                                                    value={keyword}
                                                                    onChange={(e) => setKeyword(e.target.value)}
                                                                    placeholder="Nhập từ khóa..."
                                                                />                                        </div>
                                                        </Col>
                                                        <Col md={2}>
                                                            <div className="form-group">
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
                                                            </div>
                                                        </Col>
                                                        <Col md={2}>
                                                            <div className="form-group">
                                                                <Input type="date" onChange={handleDateChange} />
                                                            </div>
                                                        </Col>

                                                        <Col md={3}>
                                                            <div className="form-group">
                                                                <div className="range-slider">
                                                                    <span>
                                                                        {/* Number input for minPrice */}
                                                                        <input
                                                                            type="number"
                                                                            value={minPrice}
                                                                            min={0}
                                                                            max={100000000}
                                                                            onChange={handleMinPriceChange}
                                                                        />
                                                                        -
                                                                        {/* Number input for maxPrice */}
                                                                        <input
                                                                            type="number"
                                                                            value={maxPrice}
                                                                            min={0}
                                                                            max={100000000}
                                                                            onChange={handleMaxPriceChange}
                                                                        />
                                                                    </span>
                                                                    {/* Range input for minPrice */}
                                                                    <input
                                                                        type="range"
                                                                        value={minPrice}
                                                                        min={0}
                                                                        max={100000000}
                                                                        step={500000}
                                                                        onChange={handleMinPriceChange}
                                                                    />
                                                                    {/* Range input for maxPrice */}
                                                                    <input
                                                                        type="range"
                                                                        value={maxPrice}
                                                                        min={0}
                                                                        max={100000000}
                                                                        step={500000}
                                                                        onChange={handleMaxPriceChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>

                                                        <Col md={2}>
                                                            <div className="form-group">
                                                            <Button color="primary" onClick={fetchData}>Tìm kiếm</Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </TabPane>
                                        </TabContent>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
            
            <section className="">
                <div className="container-fluid">
                    <div className="row">
                        {/* <div className="col-lg-3 sidebar order-md-last">
                            <div className="sidebar-wrap">
                                <h3 className="heading mb-4">Tìm Chuyến Đi</h3>
                                <form action="#">
                                    <div className="fields">
                                        <div className="form-group">
                                            <Input
                                                type="text"
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                                placeholder="Nhập từ khóa..."
                                            />                                        </div>

                                        <div className="form-group">
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
                                        </div>
                                        <div className="form-group">
                                            <div className="select-wrap one-third">
                                                <div className="form-group">
                                                    <Input type="date" onChange={handleDateChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="range-slider">
                                                <span>
                                                    <input
                                                        type="number"
                                                        value={minPrice}
                                                        min={0}
                                                        max={100000000}
                                                        onChange={handleMinPriceChange}
                                                    />
                                                    
                                                    <input
                                                        type="number"
                                                        value={maxPrice}
                                                        min={0}
                                                        max={100000000}
                                                        onChange={handleMaxPriceChange}
                                                    />
                                                </span>
                                                <input
                                                    type="range"
                                                    value={minPrice}
                                                    min={0}
                                                    max={100000000}
                                                    step={500000}
                                                    onChange={handleMinPriceChange}
                                                />
                                                <input
                                                    type="range"
                                                    value={maxPrice}
                                                    min={0}
                                                    max={100000000}
                                                    step={500000}
                                                    onChange={handleMaxPriceChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <Button color="primary" onClick={fetchData}>Tìm kiếm</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div> */}


                        <div className="col-lg-12">
                            <div className="row" >
                                {tours.map(tour => (
                                    <div key={tour.id} className="col-md-4" style={{
                                        fontSize: "15px",
                                        padding: "10px 20px 20px 20px",
                                        border: "0.1px solid #D3D3D3",
                                        borderRadius: "10px",
                                        transition: "background-color 0.3s, color 0.3s",
                                        display: "flex",
                                        alignItems: "center",
                                        boxShadow: "2px 2px 5px rgba(0  , 0, 0, 0.2)"

                                    }} >
                                        <div className="destination" >
                                            <Link
                                                to="/detailTour"
                                                className="text-dark"
                                                state={{ tourId: tour.id }}
                                            >
                                                <a href="" className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${tour.coverImage})` }}>
                                                    <div className="icon d-flex justify-content-center align-items-center">
                                                        <span className="icon-link" />
                                                    </div>
                                                </a>
                                            </Link>

                                            <div className="text p-3">
                                                <p>{tour.createDate} - Giờ đi: {tour.startTime}</p>
                                                <div className="d-flex">
                                                    <div>
                                                        <h4>
                                                            <Link
                                                                to="/detailTour"
                                                                className="text-dark"
                                                                state={{ tourId: tour.id }}
                                                            >
                                                                <a href="#">{tour.title}</a>
                                                            </Link>
                                                        </h4>
                                                        <p className="rate">

                                                        </p>
                                                    </div>
                                                    {/* <div className="two">
                                                        <span className="price per-price">{tour.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}<br />
                                                        <small>/khách</small></span>
                                                    </div> */}
                                                </div>
                                                <span><img src="/images/tour.png" className="icon-img" />
                                                    {tour.code}</span>
                                                <p><b>Nơi Khởi Hành: </b>  {tour.starLocation}</p>
                                                <p><b>Nơi Kết Thúc:</b>  {tour.endLocation}</p>
                                                <h3 style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#F9BE37",
                                                    marginBottom: 5,
                                                }}><b>Giá : </b>{formatPrice(tour.price)} &nbsp;₫ / khách</h3>
                                                <hr />
                                                <p className="bottom-area d-flex">
                                                    <span className="ml-auto">
                                                        <Link
                                                            to="/detailTour"
                                                            className="text-dark"
                                                            state={{ tourId: tour.id }}
                                                        >
                                                            {/* <a href="#">Xem chi tiết</a> */}
                                                        </Link>
                                                    </span>
                                                    {/* <span className="ml-auto"><a href="#">Đặt Lịch</a></span> */}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

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
                        </div> {/* .col-md-8 */}
                    </div>
                </div>
            </section> {/* .section */}

            <HomeSlider></HomeSlider>

            {/* <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-3">
                        <div className="col-md-7 heading-section text-center ">
                            <h2 className="mb-4"><strong>Chuyến Đi</strong> Phổ Biến</h2>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm col-md-6 col-lg ">
                            <div className="destination">
                                <a href="#" className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(images/hotel-1.jpg)' }}>
                                    <div className="icon d-flex justify-content-center align-items-center">
                                        <span className="icon-link" />
                                    </div>
                                </a>
                                <div className="text p-3">
                                    <p>13/04/2024 - 5N4Đ - Giờ đi: 18:50</p>
                                    <div className="d-flex">
                                        <div className="one">
                                            <h3><a href="#">Hà Nội - Vịnh Hạ Long - KDL Tràng An - Tuyệt Tịnh Cốc - Chùa Tam Chúc</a></h3>
                                            <p className="rate">
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star-o" />
                                                <span>8 Rating</span>
                                            </p>
                                        </div>
                                        <div className="two">
                                            <span className="price per-price">7.450.000<br /><small>/chuyến đi</small></span>
                                        </div>
                                    </div>
                                    <h4>Mã Chuyến Đi</h4>
                                    <span><i className="icon-map-o" /> NDSGN1371-002-130424VU-H</span>

                                    <p>Nơi Khởi Hành:  TP. Hồ Chí Minh</p>
                                    <h4>Giá : 7.490.000</h4>
                                    <hr />
                                    <p className="bottom-area d-flex">
                                        <span className="ml-auto"><a href="#">Xem chi tiết</a></span>
                                        <span className="ml-auto"><a href="#">Đặt Lịch</a></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm col-md-6 col-lg ftco-animate">
                            <div className="destination d-md-flex flex-column-reverse">
                                <a href="#" className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(images/hotel-2.jpg)' }}>
                                    <div className="icon d-flex justify-content-center align-items-center">
                                        <span className="icon-link" />
                                    </div>
                                </a>
                                <div className="text p-3">
                                    <p>13/04/2024 - 5N4Đ - Giờ đi: 18:50</p>
                                    <div className="d-flex">
                                        <div className="one">
                                            <h3><a href="#">Hà Nội - Vịnh Hạ Long - KDL Tràng An - Tuyệt Tịnh Cốc - Chùa Tam Chúc</a></h3>
                                            <p className="rate">
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star-o" />
                                                <span>8 Rating</span>
                                            </p>
                                        </div>
                                        <div className="two">
                                            <span className="price per-price">7.450.000<br /><small>/chuyến đi</small></span>
                                        </div>
                                    </div>
                                    <h4>Mã Chuyến Đi</h4>
                                    <span><i className="icon-map-o" /> NDSGN1371-002-130424VU-H</span>

                                    <p>Nơi Khởi Hành:  TP. Hồ Chí Minh</p>
                                    <h4>Giá : 7.490.000</h4>
                                    <hr />
                                    <p className="bottom-area d-flex">
                                        <span className="ml-auto"><a href="#">Xem chi tiết</a></span>
                                        <span className="ml-auto"><a href="#">Đặt Lịch</a></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm col-md-6 col-lg ftco-animate">
                            <div className="destination">
                                <a href="#" className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(images/hotel-3.jpg)' }}>
                                    <div className="icon d-flex justify-content-center align-items-center">
                                        <span className="icon-link" />
                                    </div>
                                </a>
                                <div className="text p-3">
                                    <p>13/04/2024 - 5N4Đ - Giờ đi: 18:50</p>
                                    <div className="d-flex">
                                        <div className="one">
                                            <h3><a href="#">Hà Nội - Vịnh Hạ Long - KDL Tràng An - Tuyệt Tịnh Cốc - Chùa Tam Chúc</a></h3>
                                            <p className="rate">
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star-o" />
                                                <span>8 Rating</span>
                                            </p>
                                        </div>
                                        <div className="two">
                                            <span className="price per-price">7.450.000<br /><small>/chuyến đi</small></span>
                                        </div>
                                    </div>
                                    <h4>Mã Chuyến Đi</h4>
                                    <span><i className="icon-map-o" /> NDSGN1371-002-130424VU-H</span>

                                    <p>Nơi Khởi Hành:  TP. Hồ Chí Minh</p>
                                    <h4>Giá : 7.490.000</h4>
                                    <hr />
                                    <p className="bottom-area d-flex">
                                        <span className="ml-auto"><a href="#">Xem chi tiết</a></span>
                                        <span className="ml-auto"><a href="#">Đặt Lịch</a></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm col-md-6 col-lg ftco-animate">
                            <div className="destination d-md-flex flex-column-reverse">
                                <a href="#" className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(images/hotel-4.jpg)' }}>
                                    <div className="icon d-flex justify-content-center align-items-center">
                                        <span className="icon-link" />
                                    </div>
                                </a>
                                <div className="text p-3">
                                    <p>13/04/2024 - 5N4Đ - Giờ đi: 18:50</p>
                                    <div className="d-flex">
                                        <div className="one">
                                            <h3><a href="#">Hà Nội - Vịnh Hạ Long - KDL Tràng An - Tuyệt Tịnh Cốc - Chùa Tam Chúc</a></h3>
                                            <p className="rate">
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star-o" />
                                                <span>8 Rating</span>
                                            </p>
                                        </div>
                                        <div className="two">
                                            <span className="price per-price">7.450.000<br /><small>/chuyến đi</small></span>
                                        </div>
                                    </div>
                                    <h4>Mã Chuyến Đi</h4>
                                    <span><i className="icon-map-o" /> NDSGN1371-002-130424VU-H</span>

                                    <p>Nơi Khởi Hành:  TP. Hồ Chí Minh</p>
                                    <h4>Giá : 7.490.000</h4>
                                    <hr />
                                    <p className="bottom-area d-flex">
                                        <span className="ml-auto"><a href="#">Xem chi tiết</a></span>
                                        <span className="ml-auto"><a href="#">Đặt Lịch</a></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm col-md-6 col-lg ftco-animate">
                            <div className="destination">
                                <a href="#" className="img img-2 d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(images/hotel-5.jpg)' }}>
                                    <div className="icon d-flex justify-content-center align-items-center">
                                        <span className="icon-link" />
                                    </div>
                                </a>
                                <div className="text p-3">
                                    <p>13/04/2024 - 5N4Đ - Giờ đi: 18:50</p>
                                    <div className="d-flex">
                                        <div className="one">
                                            <h3><a href="#">Hà Nội - Vịnh Hạ Long - KDL Tràng An - Tuyệt Tịnh Cốc - Chùa Tam Chúc</a></h3>
                                            <p className="rate">
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star" />
                                                <i className="icon-star-o" />
                                                <span>8 Rating</span>
                                            </p>
                                        </div>
                                        <div className="two">
                                            <span className="price per-price">7.450.000<br /><small>/chuyến đi</small></span>
                                        </div>
                                    </div>
                                    <h4>Mã Chuyến Đi</h4>
                                    <span><i className="icon-map-o" /> NDSGN1371-002-130424VU-H</span>

                                    <p>Nơi Khởi Hành:  TP. Hồ Chí Minh</p>
                                    <h4>Giá : 7.490.000</h4>
                                    <hr />
                                    <p className="bottom-area d-flex">
                                        <span className="ml-auto"><a href="#">Xem chi tiết</a></span>
                                        <span className="ml-auto"><a href="#">Đặt Lịch</a></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}




        </>
    );
};

export default Home;
