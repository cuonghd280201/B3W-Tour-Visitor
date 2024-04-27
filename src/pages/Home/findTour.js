import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import tourServices from "../../services/tour.services";

const FindTour = () => {
  const { state } = useLocation();

  const [tourDetailCustomer, setTourDetailCustomer] = useState(null);
  const fetchTourDetailCustomer = async () => {
    let response;
    try {
      const response = await tourServices.getDetailTourByCustomer(state.tourId);
      console.log("Response:", response); // Log the response object
      setTourDetailCustomer(response.data.data);

      return response;
    } catch (error) {
      console.error("Error fetching tour:", error);
    }
  };

  useEffect(() => {
    fetchTourDetailCustomer();
  }, []);

  return (
    <>
      <section
        className="ftco-section ftco-counter img"
        id=""
        style={{ backgroundImage: "url(images/bg_1.jpg)" }}
        data-stellar-background-ratio="0.5"
      >
        <div className="container"></div>
      </section>
      <section className="ftco-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 sidebar ">
              <div className="sidebar-wrap">
                <h3 className="heading mb-4">Địa Điểm Đi</h3>
                <form action="#">
                  <div className="fields">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Destination, City"
                      />
                    </div>
                    <div className="form-group">
                      <div className="select-wrap one-third">
                        <div className="icon">
                          <span className="ion-ios-arrow-down" />
                        </div>
                        <select
                          name
                          id
                          className="form-control"
                          placeholder="Keyword search"
                        >
                          <option value>Tìm Chuyến Đi</option>
                          <option value>San Francisco USA</option>
                          <option value>Berlin Germany</option>
                          <option value>Lodon United Kingdom</option>
                          <option value>Paris Italy</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="checkin_date"
                        className="form-control checkin_date"
                        placeholder="Ngày Đi"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="checkout_date"
                        className="form-control checkout_date"
                        placeholder="Ngày Về"
                      />
                    </div>
                    <div className="form-group">
                      <div className="range-slider">
                        <span>
                          <input
                            type="number"
                            defaultValue={25000}
                            min={0}
                            max={120000}
                          />{" "}
                          -
                          <input
                            type="number"
                            defaultValue={50000}
                            min={0}
                            max={120000}
                          />
                        </span>
                        <input
                          defaultValue={1000}
                          min={0}
                          max={120000}
                          step={500}
                          type="range"
                        />
                        <input
                          defaultValue={50000}
                          min={0}
                          max={120000}
                          step={500}
                          type="range"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        defaultValue="Search"
                        className="btn btn-primary py-3 px-5"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* END*/}
            <div className="col-lg-9">
              <div className="row">
                <h1 class="py-4 h2 fw-bold heading text-center">
                  Những thời gian chuyến đi có lịch trình tương tự
                </h1>
                {tourDetailCustomer &&
                  tourDetailCustomer.tourTimeSet.map((tourTime, index) => (
                    <div className="col-sm col-md-6 col-lg-4 ">
                      <div key={tourTime.id} className="destination">
                        <Link
                          to="/detailTour"
                          className="text-dark"
                          state={{ tourId: tourDetailCustomer.id }}
                        >
                          <a
                            href=""
                            className="img img-2 d-flex justify-content-center align-items-center"
                            style={{
                              backgroundImage: `url(${tourDetailCustomer.coverImage})`,
                            }}
                          >
                            <div className="icon d-flex justify-content-center align-items-center">
                              <span className="icon-link" />
                            </div>
                          </a>
                        </Link>
                        <div className="text p-3">
                          {/* Hiển thị thông tin ngày tháng và giờ khởi hành */}
                          <h3>
                            {tourTime.startDate} đến {tourTime.endDate} - Giờ
                            đi: {tourTime.startTime}
                          </h3>

                          <div className="d-flex">
                            <div className="one">
                              <h4>
                                <a href="#">{tourDetailCustomer.title}</a>
                              </h4>
                              <p className="rate"></p>
                            </div>
                            <div className="two">
                              <span className="price per-price">
                                {tourDetailCustomer.price.toLocaleString(
                                  "vi-VN",
                                  { style: "currency", currency: "VND" }
                                )}
                                <br />
                                <small>/khách</small>
                              </span>
                            </div>
                          </div>
                          <span>
                            {" "}
                            <img src="/images/tour.png" className="icon-img" />
                            {tourTime.code}
                          </span>
                          <p>
                            Nơi Khởi Hành: {tourDetailCustomer.starLocation}
                          </p>
                          <p>Nơi Kết Thúc: {tourDetailCustomer.endLocation}</p>
                          <h3>
                            Giá :{" "}
                            {tourDetailCustomer.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </h3>
                          <p>
                            Số chỗ còn nhận <b>{tourTime.slotNumber}</b>
                          </p>

                          <hr />

                          {/* Hiển thị các thông tin khác về tour */}
                          {/* <p className="bottom-area d-flex">
                                                    <span className="ml-auto"><a href="#">Xem chi tiết</a></span>
                                                    <span className="ml-auto"><a href="#">Đặt Lịch</a></span>
                                                </p> */}
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
                        <a href="#">&lt;</a>
                      </li>
                      <li className="active">
                        <span>1</span>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">4</a>
                      </li>
                      <li>
                        <a href="#">5</a>
                      </li>
                      <li>
                        <a href="#">&gt;</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* .col-md-8 */}
          </div>
        </div>
      </section>{" "}
      {/* .section */}
    </>
  );
};

export default FindTour;
