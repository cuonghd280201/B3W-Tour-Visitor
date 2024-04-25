import React, { useEffect, useState } from "react";

import "../Admin/dashboard.css";
import { Layout } from "antd";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavBarWebStaff from "./Navbar/NavBarWebStaff";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
import tourServices from "../../services/tour.services";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
const { Content } = Layout;

const ListTourStaffDetail = () => {

  const { state } = useLocation();

  const [tourDetailCustomer, setTourDetailCustomer] =
    useState(null);
  const fetchTourDetailCustomer = async () => {
    let response;
    try {
      response = await tourServices.getDetailTourByCustomer(state?.tourId);
      console.log("Response:", response); // Log the response object
      setTourDetailCustomer(response.data.data);

      return response;

    } catch (error) {
      console.error("Error fetching tour:", error);
    }
  }

  const navigate = useNavigate();

  const navigateToFindTour = () => {
    if (tourDetailCustomer) {
      navigate('/slotTourStaff', { state: { tourId: tourDetailCustomer.id } });
    }
  };
  useEffect(() => {
    fetchTourDetailCustomer();
  }, []);

  const renderTourSchedules = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    if (tourDetailCustomer && tourDetailCustomer.tourSchedules) {
      return tourDetailCustomer.tourSchedules.map((schedule, index) => {
        const scheduleDate = schedule.createDate.split(' ')[0];
        return (
          <div key={schedule.id} className={`box`}>
            <h4>Ngày {index + 1}</h4>
            <h3>{scheduleDate}</h3>
            {/* <p>{schedule.description}</p> */}
          </div>
        );
      });
    }
    return null;
  };

  const renderTourSchedulesDescription = () => {
    if (tourDetailCustomer && tourDetailCustomer.tourSchedules) {
      return tourDetailCustomer.tourSchedules.map((schedule, index) => {
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


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWebStaff choose={"menu-key/1"}></SiderBarWebStaff>
      <Layout>
        <NavBarWebStaff></NavBarWebStaff>
        <div
          style={{
            padding: "30px",
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
                          src={tourDetailCustomer?.coverImage}
                          className="img-fluid rounded"
                          alt="Tour Image"
                          style={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="col-8">
                        <h4 style={{ fontSize: 16, marginTop: 10 }}>
                         <b>Mã Chuyến Đi:{" "}</b> 
                          <span style={{ color: "#666" }}>


                            {tourDetailCustomer?.code}
                          </span>
                        </h4>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: "#F9BE37",
                            marginBottom: 5,
                          }}
                        >
                          {tourDetailCustomer?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </p>
                        <p
                          style={{ fontSize: 14, marginBottom: 5 }}
                        >

                         <b>Giờ đi:</b>  {tourDetailCustomer?.starLocation}
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>

              <section className="ftco-about d-md-flex">
                <a href="" className="one-half img d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${tourDetailCustomer?.coverImage})` }}>
                  <div className="icon d-flex justify-content-center align-items-center">
                    <span className="icon-link" />
                  </div>
                </a>
                <div className="one-half e">
                  <div className="row">
                    {tourDetailCustomer && tourDetailCustomer.tourImagesSet.map((tourTime, index) => (
                      <div key={index} className="col-md-4">
                        <div className="destination-entry img" style={{ backgroundImage: `url(${tourTime?.image})` }}>
                          {/* Add the remove button */}
                          {/* <button className="remove-button" onClick={() => handleRemoveImage(index)}>X</button> */}
                          <button className="remove-button" onClick={() => (index)}>
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="col-md-4">
                      <button className="destination-entry img" onClick={""}>
                        <FontAwesomeIcon icon={faPlusCircle} size="lg"/>
                      </button>
                    </div>
                  </div>

                </div>
              </section>

              <div className="flight-hotel-detail detail tour-detail  ">
                <div className="entry-head">
                  <div className="overview active">
                    <section className="section-03 mb-5">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-6 left">
                            <div className="box-order">

                              <div className="time"><p>Khởi hành <b>{tourDetailCustomer?.tourTimeSet[0]?.startDate} - Giờ đi {tourDetailCustomer?.tourTimeSet[0]?.startTime} </b>
                              </p>
                                {/* <p>Tập trung <b>04:05 ngày 01/05/2024</b>
                                                </p> */}
                                <p>Thời gian <b>7 ngày</b>
                                </p><p>Nơi khởi hành <b>{tourDetailCustomer?.starLocation}</b>
                                </p><p>Nơi kết thúc <b>{tourDetailCustomer?.endLocation}</b>
                                </p><p>Số chỗ còn nhận <b>{tourDetailCustomer?.tourTimeSet[0]?.slotNumber}</b></p></div>
                              <div className="calendar">
                                <div className="calendar-box">
                                  <i className="icon icon--calendar" />


                                  <label>
                                    <a onClick={navigateToFindTour}>
                                      Ngày khác
                                    </a>
                                  </label>                          </div>
                              </div>

                            </div>
                          </div>
                          <div className="col-md-6  right">
                            <div className="group-services">
                              <div className="item">
                                <img src="/images/co1.jpg" className="icon-img" />
                                <label>Thời gian</label>
                                <p>{tourDetailCustomer?.tourTimeSet[0]?.startDate}:{tourDetailCustomer?.tourTimeSet[0]?.endDate} </p>
                              </div>
                              <div className="item">
                                <img src="/images/co2.jpg" className="icon-img" />
                                <label>Phương tiện di chuyển</label>
                                <p>{tourDetailCustomer?.tourDetail.vehicle}</p>
                              </div>
                              <div className="item">
                                <img src="/images/co3.jpg" className="icon-img" />
                                <label>Điểm tham quan</label>
                                <p>{tourDetailCustomer?.tourDetail.location}</p>
                              </div>
                              <div className="item">
                                <img src="/images/co4.jpg" className="icon-img" />
                                <label>Ẩm thực</label>
                                <p>{tourDetailCustomer?.tourDetail.food}</p>
                              </div>
                              <div className="item">
                                <img src="/images/co5.png" className="icon-img" />
                                <label>Khách sạn</label>
                                <p>{tourDetailCustomer?.tourDetail.hotel}</p>
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
                <div class="container-fluid">
                  <div className="row">
                    <div className="col-md-5">
                      <div class="container-fluid">
                        <main className="row">
                          <section className="col">
                            <header className="title">
                              <h2>Lịch Trình</h2>
                            </header>
                            <div className="contents">
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
                      {/* <div><h3 id="day-00">Ngày 1 - TP.HCM - BANGKOK – BẢO TÀNG LIGHTING ART – PATTAYA	                (Ăn trưa, tối)</h3>

                        <div className="excerpt"><span className="line" /><div>
                          <title />
                          <div style={{ textAlign: 'justify' }}>
                            <div>
                              <p>Trưởng đoàn Vietravel đón Quý khách tại Ga đi quốc tế sân bay Tân Sơn Nhất, đáp chuyến bay đi <strong>Bangkok, Thái Lan. </strong>Đến sân bay, đoàn làm thủ tục nhập cảnh và lấy hành lý.&nbsp;<br />
                                <br />
                                Xe đón Quý khách khởi hành đi thành phố biển sôi động<strong> Pattaya</strong> - tỉnh Chonburi, cách Bangkok 165km về hướng Đông Nam. Trên đường đi đoàn tham quan:<br />
                                <br />
                                <strong>- Bảo tàng Lighting Art và Vườn Khinh khí cầu </strong>– một khu phức hợp mới với những sự sáng tạo; kết hợp giữa sự cổ điển và công nghệ hiện đại. Đến đây, quý khách sẽ được chiêm ngưỡng những cảnh quan đặc sắc của Thái Lan như: lễ hội, đền đài, văn hoá... Tất cả đều được dựng lại bằng ánh đèn lung linh, kết hợp với thiết kế 3D hiện đại, độc đáo. Quý khách còn được ngắm nhìn và chụp những bức hình lưu niệm tuyệt vời với những chiếc khinh khí cầu đầy màu sắc và những chiếc xe hơi cổ xưa tại vườn Khinh khí cầu.&nbsp;<br />
                                <br />
                                <strong>- Trân Bảo Phật Sơn (Khao Chee Chan)</strong> là một ngọn núi với hình tượng Đức Phật được khắc bằng tia laser cao 109 mét, bề ngang 70 mét; phần khắc laser được dát lên 999kg vàng 24 kara với tổng trị giá lên tới 5,2 triệu đô. Rất nhiều du khách đến đây để chiêm ngưỡng và tìm thấy bình an trước hình ảnh Đức Phật.<br />
                                <br />
                                Quý khách dùng bữa tối tại nhà hàng địa phương, sau đó nhận phòng khách sạn nghỉ ngơi hoặc tự do khám phá thành phố Pattaya về đêm.</p>
                              <p><br />
                                <strong>Nghỉ đêm tại Pattaya.&nbsp;</strong></p>
                            </div>
                          </div>
                          <grammarly-desktop-integration data-grammarly-shadow-root="true" />
                        </div></div></div><div><h3 id="day-01">Ngày 2 - ĐỀN CHÂN LÝ – CAFÉ &amp; BÁNH PHỦ VÀNG	                                                   (Ăn sáng, trưa, tối)</h3><div className="excerpt"><span className="line" /><div>
                          <title />
                          <p style={{ textAlign: 'justify' }}>Quý khách dùng bữa sáng tại khách sạn, sau đó khởi hành tham quan thành phố biển Pattaya.<br />
                            <br />
                            <strong>- Đền Chân Lý Pattaya</strong> được xây dựng bằng gỗ, với tổng diện tích toàn bộ khu đền là 12,8 ha bao gồm đền, rừng cây, hồ nước và các công trình phụ trợ. Ngôi đền không những là một tác phẩm nghệ thuật kiến trúc độc đáo, mà còn là một minh chứng cho sự sáng tạo không ngừng nghỉ của nền nghệ thuật hiện đại Thái Lan.&nbsp;<br />
                            <br />
                            Sau khi dùng bữa trưa, đoàn tiếp tục chương trình tham quan, mua sắm:<br />
                            <br />
                            <strong>- Trung tâm triễn lãm Gems Gallery</strong> – nơi trưng bày các tác phẩm nghệ thuật bằng vàng và đá quý có 1 không 2, được bán đấu giá với giá trị rất cao và được tìm hiểu về công nghệ khai thác, chế tác vàng bạc, đá quý của các nghệ nhân.&nbsp;<br />
                            <br />
                            <strong>- Latex Pillow &amp; Mattress (Nhà máy sản xuất cao su thiên nhiên) </strong>tìm hiểu mô hình sản xuất, cũng như trải nghiệm sự êm ái, mềm mại của các sản phẩm được sản xuất từ cao su thiên nhiên. Tại đây, Quý khách có thể mua những sản phẩm được làm từ cao su thiên nhiên của đất nước Thái Lan&nbsp;<br />
                            <br />
                            - Quý khách thưởng thức <strong>Café &amp; bánh phủ vàng Vietravel&nbsp;</strong><br />
                            <br />
                            Đoàn dùng bữa tối tại nhà hàng địa phương, tự do tham quan và khám phá Pattaya về đêm.&nbsp;</p>
                          <p style={{ textAlign: 'justify' }}><br />
                            <strong>Nghỉ đêm tại Pattaya.&nbsp;</strong><br />
                            &nbsp;</p>
                        </div></div></div><div><h3 id="day-02">Ngày 3 - PATTAYA – BANGKOK – BAIYOKE SKY - ICON SIAM 	                          (Ăn sáng, trưa, tối)</h3><div className="excerpt"><span className="line" /><div>
                          <title />
                          <div style={{ textAlign: 'justify' }}>Sau khi dùng bữa sáng và làm thủ tục trả phòng khách sạn, xe đưa đoàn về lại <strong>Bangkok</strong>. Trên đường đi, đoàn dừng chân tham quan, mua sắm:<br />
                            <br />
                            <strong>- Viện nghiện cứu thảo dược và huyết thanh chiết xuất từ nọc rắn của Thái Lan</strong><br />
                            <br />
                            <strong>- Cửa hàng bánh kẹo địa phương.</strong><br />
                            <br />
                            Quý khách dùng bữa trưa buffet tại toà nhà <strong>Baiyoke Sky –</strong> nhà hàng với hàng trăm món buffet tự chọn. Đoàn còn có thể ngắm toàn cảnh thành phố Bangkok từ trên cao.<br />
                            <br />
                            Buổi chiều, đoàn tham quan:&nbsp;<br />
                            <br />
                            <strong>- Chùa Cẩm Thạch (Wat Benchamabophit)</strong> – Ngôi chùa được xây dựng theo ý nguyện của quốc vương Chulalongkom vào năm 1899 và sau 10 năm thì được hoàn thành, nằm nổi bật tại quận Dusit của Bangkok. Nơi đây có sự pha trộn của kiến trúc giáo hội châu Âu với những cửa sổ lắp kính màu. Mặc dù không phải là công trình đồ sộ nhưng điểm nhấn khiến người ta ấn tượng với Chùa Cẩm Thạch chính là kết cấu và chất liệu.<br />
                            <br />
                            - Quý khách <strong>tự do shopping</strong> tại trung tâm <strong>Icon Siam </strong>- khu phức hợp shopping và trưng bày của các thương hiệu nổi tiếng trên thế giới, các cửa hàng được thiết kế đặc trưng riêng của từng khu vực, nhiều hoạt động.&nbsp;<br />
                            Đoàn dùng bữa tối tại nhà hàng địa phương, sau đó đến khách sạn nhận phòng nghỉ ngơi. Tự do tham quan và khám phá Bangkok về đêm.<br />
                            &nbsp;<br />
                            <strong>Nghỉ đêm tại Bangkok.</strong><br />
                            &nbsp;</div>
                        </div></div></div> */}
                    </div>
                  </div>
                </div>

              </section>
              <Link to="/listTourStaff" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    marginLeft: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    transition: "background-color 0.3s",
                  }}
                >
                  Trở về
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default ListTourStaffDetail;
