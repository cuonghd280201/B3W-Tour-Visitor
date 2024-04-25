import React, { useEffect, useState } from "react";
import "../Admin/dashboard.css";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import NavBarWebStaff from "./Navbar/NavBarWebStaff";
import SiderBarWebStaff from "./SlideBar/SiderBarWebStaff";
const { Content } = Layout;

const ListTourBookDetail = () => {
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
            borderRadius: "15px",
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
                          src="https://media.travel.com.vn/Tour/tfd__230515102210_853167.jpg"
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
                          Mã Chuyến Đi:{" "}
                          <span style={{ color: "#666" }}>
                            NDSGN1371-002-130424VU-H
                          </span>
                        </h4>
                        <p style={{ fontSize: 14, marginBottom: 5 }}>
                          13/04/2024
                        </p>
                        <p
                          className="text-primary"
                          style={{ fontSize: 14, marginBottom: 5 }}
                        >
                          Giờ đi: 18:50
                        </p>
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
                          <div className="col-md-5 left">
                            <div className="box-order">
                              <div className="time">
                                <p>
                                  Khởi hành <b> 01/05/2024 - Giờ đi: 07:05</b>
                                </p>
                                <p>
                                  Tập trung <b>04:05 ngày 01/05/2024</b>
                                </p>
                                <p>
                                  Thời gian <b>7 ngày</b>
                                </p>
                                <p>
                                  Nơi khởi hành <b>TP. Hồ Chí Minh</b>
                                </p>
                                <p>
                                  Số chỗ còn nhận <b>9</b>
                                </p>
                              </div>
                              <div className="calendar">
                                <div className="calendar-box">
                                  <i className="icon icon--calendar" />
                                  <label>
                                    <a href="/slotTourStaff"> Ngày khác</a>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-7  right">
                            <div className="group-services">
                              <div className="item">
                                <img
                                  src="/images/icons/utility/thoi gian.png"
                                  className="icon-img"
                                />
                                <label>Thời gian</label>
                                <p>7 ngày 6 đêm</p>
                              </div>
                              <div className="item">
                                <img
                                  src="/images/icons/utility/phuong tien di chuyen.png"
                                  className="icon-img"
                                />
                                <label>Phương tiện di chuyển</label>
                                <p>Máy bay, Xe du lịch</p>
                              </div>
                              <div className="item">
                                <img
                                  src="/images/icons/utility/diem tham quan.png"
                                  className="icon-img"
                                />
                                <label>Điểm tham quan</label>
                                <p>
                                  Thượng Hải, Hàng Châu, Vô Tích, Tô Châu, Bắc
                                  Kinh, Trung Quốc
                                </p>
                              </div>
                              <div className="item">
                                <img
                                  src="/images/icons/utility/am thuc.png"
                                  className="icon-img"
                                />
                                <label>Ẩm thực</label>
                                <p>Buffet sáng</p>
                              </div>
                              <div className="item">
                                <img
                                  src="/images/icons/utility/khach san.png"
                                  className="icon-img"
                                />
                                <label>Khách sạn</label>
                                <p>Khách sạn 4 sao</p>
                              </div>

                              <div className="item">
                                <img
                                  src="/images/icons/utility/thoi gian ly tuong.png"
                                  className="icon-img"
                                />
                                <label>Thời gian lý tưởng</label>
                                <p>Quanh năm</p>
                              </div>
                              <div className="item">
                                <img
                                  src="/images/icons/utility/doi tuong thich hop.png"
                                  className="icon-img"
                                />
                                <label>Đối tượng thích hợp</label>
                                <p>
                                  Cặp đôi, Gia đình nhiều thế hệ, Thanh niên
                                </p>
                              </div>
                              <div className="item">
                                <img
                                  src="/images/icons/utility/uu dai.png"
                                  className="icon-img"
                                />
                                <label>Ưu đãi</label>
                                <p>Ưu đãi trực tiếp vào giá tour</p>
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
                        <main class="row">
                          <section class="col">
                            <header class="title">
                              <h2>Lịch Trình</h2>
                            </header>
                            <div class="contents">
                              <div class="box">
                                <h4>Ngày 1</h4>
                                <h3>16/04/2024</h3>
                                <p>
                                  TP.HCM - BANGKOK – BẢO TÀNG LIGHTING ART –
                                  PATTAYA(Ăn trưa, tối)
                                </p>
                              </div>
                              <div class="box">
                                <h4>Ngày 2</h4>
                                <h3>17/04/2024</h3>
                                <p>
                                  ĐỀN CHÂN LÝ – CAFÉ & BÁNH PHỦ VÀNG(Ăn sáng,
                                  trưa, tối)
                                </p>
                              </div>
                              <div class="box">
                                <h4>Ngày 3</h4>
                                <h3>18/04/2024</h3>
                                <p>
                                  ĐỀN CHÂN LÝ – CAFÉ & BÁNH PHỦ VÀNG(Ăn sáng,
                                  trưa, tối)
                                </p>
                              </div>
                            </div>
                          </section>
                        </main>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <h3 id="day-00">
                          Ngày 1 - TP.HCM - BANGKOK – BẢO TÀNG LIGHTING ART –
                          PATTAYA (Ăn trưa, tối)
                        </h3>

                        <div className="excerpt">
                          <span className="line" />
                          <div>
                            <title />
                            <div style={{ textAlign: "justify" }}>
                              <div>
                                <p>
                                  Trưởng đoàn Vietravel đón Quý khách tại Ga đi
                                  quốc tế sân bay Tân Sơn Nhất, đáp chuyến bay
                                  đi <strong>Bangkok, Thái Lan. </strong>Đến sân
                                  bay, đoàn làm thủ tục nhập cảnh và lấy hành
                                  lý.&nbsp;
                                  <br />
                                  <br />
                                  Xe đón Quý khách khởi hành đi thành phố biển
                                  sôi động<strong> Pattaya</strong> - tỉnh
                                  Chonburi, cách Bangkok 165km về hướng Đông
                                  Nam. Trên đường đi đoàn tham quan:
                                  <br />
                                  <br />
                                  <strong>
                                    - Bảo tàng Lighting Art và Vườn Khinh khí
                                    cầu{" "}
                                  </strong>
                                  – một khu phức hợp mới với những sự sáng tạo;
                                  kết hợp giữa sự cổ điển và công nghệ hiện đại.
                                  Đến đây, quý khách sẽ được chiêm ngưỡng những
                                  cảnh quan đặc sắc của Thái Lan như: lễ hội,
                                  đền đài, văn hoá... Tất cả đều được dựng lại
                                  bằng ánh đèn lung linh, kết hợp với thiết kế
                                  3D hiện đại, độc đáo. Quý khách còn được ngắm
                                  nhìn và chụp những bức hình lưu niệm tuyệt vời
                                  với những chiếc khinh khí cầu đầy màu sắc và
                                  những chiếc xe hơi cổ xưa tại vườn Khinh khí
                                  cầu.&nbsp;
                                  <br />
                                  <br />
                                  <strong>
                                    - Trân Bảo Phật Sơn (Khao Chee Chan)
                                  </strong>{" "}
                                  là một ngọn núi với hình tượng Đức Phật được
                                  khắc bằng tia laser cao 109 mét, bề ngang 70
                                  mét; phần khắc laser được dát lên 999kg vàng
                                  24 kara với tổng trị giá lên tới 5,2 triệu đô.
                                  Rất nhiều du khách đến đây để chiêm ngưỡng và
                                  tìm thấy bình an trước hình ảnh Đức Phật.
                                  <br />
                                  <br />
                                  Quý khách dùng bữa tối tại nhà hàng địa
                                  phương, sau đó nhận phòng khách sạn nghỉ ngơi
                                  hoặc tự do khám phá thành phố Pattaya về đêm.
                                </p>
                                <p>
                                  <br />
                                  <strong>Nghỉ đêm tại Pattaya.&nbsp;</strong>
                                </p>
                              </div>
                            </div>
                            <grammarly-desktop-integration data-grammarly-shadow-root="true" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 id="day-01">
                          Ngày 2 - ĐỀN CHÂN LÝ – CAFÉ &amp; BÁNH PHỦ VÀNG (Ăn
                          sáng, trưa, tối)
                        </h3>
                        <div className="excerpt">
                          <span className="line" />
                          <div>
                            <title />
                            <p style={{ textAlign: "justify" }}>
                              Quý khách dùng bữa sáng tại khách sạn, sau đó khởi
                              hành tham quan thành phố biển Pattaya.
                              <br />
                              <br />
                              <strong>- Đền Chân Lý Pattaya</strong> được xây
                              dựng bằng gỗ, với tổng diện tích toàn bộ khu đền
                              là 12,8 ha bao gồm đền, rừng cây, hồ nước và các
                              công trình phụ trợ. Ngôi đền không những là một
                              tác phẩm nghệ thuật kiến trúc độc đáo, mà còn là
                              một minh chứng cho sự sáng tạo không ngừng nghỉ
                              của nền nghệ thuật hiện đại Thái Lan.&nbsp;
                              <br />
                              <br />
                              Sau khi dùng bữa trưa, đoàn tiếp tục chương trình
                              tham quan, mua sắm:
                              <br />
                              <br />
                              <strong>
                                - Trung tâm triễn lãm Gems Gallery
                              </strong>{" "}
                              – nơi trưng bày các tác phẩm nghệ thuật bằng vàng
                              và đá quý có 1 không 2, được bán đấu giá với giá
                              trị rất cao và được tìm hiểu về công nghệ khai
                              thác, chế tác vàng bạc, đá quý của các nghệ
                              nhân.&nbsp;
                              <br />
                              <br />
                              <strong>
                                - Latex Pillow &amp; Mattress (Nhà máy sản xuất
                                cao su thiên nhiên){" "}
                              </strong>
                              tìm hiểu mô hình sản xuất, cũng như trải nghiệm sự
                              êm ái, mềm mại của các sản phẩm được sản xuất từ
                              cao su thiên nhiên. Tại đây, Quý khách có thể mua
                              những sản phẩm được làm từ cao su thiên nhiên của
                              đất nước Thái Lan&nbsp;
                              <br />
                              <br />- Quý khách thưởng thức{" "}
                              <strong>
                                Café &amp; bánh phủ vàng Vietravel&nbsp;
                              </strong>
                              <br />
                              <br />
                              Đoàn dùng bữa tối tại nhà hàng địa phương, tự do
                              tham quan và khám phá Pattaya về đêm.&nbsp;
                            </p>
                            <p style={{ textAlign: "justify" }}>
                              <br />
                              <strong>Nghỉ đêm tại Pattaya.&nbsp;</strong>
                              <br />
                              &nbsp;
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 id="day-02">
                          Ngày 3 - PATTAYA – BANGKOK – BAIYOKE SKY - ICON SIAM
                          (Ăn sáng, trưa, tối)
                        </h3>
                        <div className="excerpt">
                          <span className="line" />
                          <div>
                            <title />
                            <div style={{ textAlign: "justify" }}>
                              Sau khi dùng bữa sáng và làm thủ tục trả phòng
                              khách sạn, xe đưa đoàn về lại{" "}
                              <strong>Bangkok</strong>. Trên đường đi, đoàn dừng
                              chân tham quan, mua sắm:
                              <br />
                              <br />
                              <strong>
                                - Viện nghiện cứu thảo dược và huyết thanh chiết
                                xuất từ nọc rắn của Thái Lan
                              </strong>
                              <br />
                              <br />
                              <strong>- Cửa hàng bánh kẹo địa phương.</strong>
                              <br />
                              <br />
                              Quý khách dùng bữa trưa buffet tại toà nhà{" "}
                              <strong>Baiyoke Sky –</strong> nhà hàng với hàng
                              trăm món buffet tự chọn. Đoàn còn có thể ngắm toàn
                              cảnh thành phố Bangkok từ trên cao.
                              <br />
                              <br />
                              Buổi chiều, đoàn tham quan:&nbsp;
                              <br />
                              <br />
                              <strong>
                                - Chùa Cẩm Thạch (Wat Benchamabophit)
                              </strong>{" "}
                              – Ngôi chùa được xây dựng theo ý nguyện của quốc
                              vương Chulalongkom vào năm 1899 và sau 10 năm thì
                              được hoàn thành, nằm nổi bật tại quận Dusit của
                              Bangkok. Nơi đây có sự pha trộn của kiến trúc giáo
                              hội châu Âu với những cửa sổ lắp kính màu. Mặc dù
                              không phải là công trình đồ sộ nhưng điểm nhấn
                              khiến người ta ấn tượng với Chùa Cẩm Thạch chính
                              là kết cấu và chất liệu.
                              <br />
                              <br />- Quý khách <strong>
                                tự do shopping
                              </strong>{" "}
                              tại trung tâm <strong>Icon Siam </strong>- khu
                              phức hợp shopping và trưng bày của các thương hiệu
                              nổi tiếng trên thế giới, các cửa hàng được thiết
                              kế đặc trưng riêng của từng khu vực, nhiều hoạt
                              động.&nbsp;
                              <br />
                              Đoàn dùng bữa tối tại nhà hàng địa phương, sau đó
                              đến khách sạn nhận phòng nghỉ ngơi. Tự do tham
                              quan và khám phá Bangkok về đêm.
                              <br />
                              &nbsp;
                              <br />
                              <strong>Nghỉ đêm tại Bangkok.</strong>
                              <br />
                              &nbsp;
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div class="col-md-6 col-12">
                <h2
                  style={{
                    fontSize: "28px",
                    color: "#333",
                    marginBottom: "20px",
                  }}
                >
                  Thông tin khách hàng đã đặt
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
                          Mail
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
                          Chứng minh nhân dân
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: "15px" }}>
                          Người lớn (Từ 12 tuổi trở lên)
                        </td>
                        <td style={{ padding: "15px" }}>8.490.000 ₫</td>
                        <td style={{ padding: "15px" }}>5.990.000 ₫</td>
                        <td style={{ padding: "15px" }}></td>
                      </tr>
                      <tr>
                        <td style={{ padding: "15px" }}>
                          Trẻ em (Từ 2 tuổi đến dưới 12 tuổi)
                        </td>
                        <td style={{ padding: "15px" }}>7.492.500 ₫</td>
                        <td style={{ padding: "15px" }}>4.493.000 ₫</td>
                        <td style={{ padding: "15px" }}></td>
                      </tr>
                      <tr>
                        <td style={{ padding: "15px" }}>Em bé (Dưới 2 tuổi)</td>
                        <td style={{ padding: "15px" }}>2.997.000 ₫</td>
                        <td style={{ padding: "15px" }}>1.797.000 ₫</td>
                        <td style={{ padding: "15px" }}></td>
                      </tr>
                      <tr style={{ fontWeight: "bold" }}>
                        <td style={{ padding: "15px" }}>Phụ thu phòng đơn</td>
                        <td style={{ padding: "15px" }}>3.500.000 ₫</td>
                        <td style={{ padding: "15px" }}>3.500.000 ₫</td>
                        <td style={{ padding: "15px" }}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <Link to="/listTourBook" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    fontSize: "15px",
                    color: "brown",
                    textDecoration: "none",
                    padding: "10px 16px",
                    border: "1px solid brown",
                    borderRadius: "4px",
                    transition: "background-color 0.3s, color 0.3s",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "brown";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "brown";
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

export default ListTourBookDetail;
