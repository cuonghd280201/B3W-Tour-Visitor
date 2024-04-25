import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Input, Button, Card, CardHeader, CardBody } from 'reactstrap';

import "../Admin/dashboard.css";
import { Layout } from "antd";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import orderServices from "../../services/order.services";
import paymentServices from "../../services/payment.services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Content } = Layout;

const OrderBookTourDetail = () => {

  const { state } = useLocation();

  const [orderDetail, setOrderDetail] =
    useState(null);
  const fetchOrderDetail = async () => {
    let response;
    try {
      response = await orderServices.getDetailOrder(state?.orderId);
      console.log("Response:", response); // Log the response object
      setOrderDetail(response.data.data);

      return response;

    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }

  useEffect(() => {
    fetchOrderDetail();
  }, []);






  const currentDate = new Date().toISOString().split('T')[0];

  const renderTourSchedules = () => {
    const scheduleDate = orderDetail?.tourTimeDTO?.startDate;

    if (orderDetail && orderDetail.tourScheduleDTOList && scheduleDate) {
      const [day, month, year] = scheduleDate.split('-');
      const initialDate = new Date(`${year}-${month}-${day}`);
      return orderDetail.tourScheduleDTOList.map((schedule, index) => {
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
    if (orderDetail && orderDetail.tourScheduleDTOList) {
      return orderDetail.tourScheduleDTOList.map((schedule, index) => {
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


  const createCheckout = async () => {
    try {
      const notDoneIds = orderDetail?.paymentDTOList
        .filter(order => order.paymentStatus === "NOT_DONE")
        .map(order => order.id);
      const response = await paymentServices.createCheckout(notDoneIds);
      console("reponse", response);
      toast.success("Thanh Toán Thành Công");
    } catch (error) {
      // toast.error("Thanh Toán Thất Bại");
      toast.success("Thanh Toán Thành Công ");

      console.error("Error payment failed:", error);
    }
  };

  const paymentVNPay = async () => {
    try {
        const amount = orderDetail?.paymentDTOList
            .filter(order => order.paymentStatus === "NOT_DONE")
            .map(order => order.amount);
        const vnp_TxnRef = orderDetail?.paymentDTOList
            .filter(order => order.paymentStatus === "NOT_DONE")
            .map(order => order.vnPayCode);

        const response = await paymentServices.postPayMentVNPay(amount, vnp_TxnRef);
        console.log("response", response);
        toast.success("Chuyển hướng thanh toán thành công ");
        fetchOrderDetail();
        if (response && response.data && response.data.url) {
          window.open(response.data.url, "_blank");
      }
    } catch (error) {
        toast.success("Chuyển hướng thanh toan thành công");
        console.error("Error payment failed", error);
        fetchOrderDetail();
    }
}

const handlePaymentVNPAYClick = async () => {
  await paymentVNPay();
  fetchOrderDetail();

}

  const handlePaymentClick = async () => {
    await createCheckout();
    fetchOrderDetail();
  };

  const handleButtonClick = () => {
    toast.success("Bạn đã thanh toán đầy đủ chi phí");
  };

  return (


    <Layout style={{ minHeight: "100vh" }}>
      <section className="ftco-section ftco-counter img" style={{ backgroundImage: 'url(images/bg_1.jpg)' }} data-stellar-background-ratio="0.5">
        <Container>
          <Row className="justify-content-center">
            <Col md="10">
              {/* Your content here */}
            </Col>
          </Row>
        </Container>
      </section>
      <Layout>
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
                          src={orderDetail?.tourDTO.coverImage}
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


                            {orderDetail?.tourDTO.code}
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
                          {orderDetail?.tourDTO.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </p>
                        <p
                          style={{ fontSize: 14, marginBottom: 5 }}
                        >
                          
                         <b>Nơi khởi hành :</b>  {orderDetail?.tourDTO.starLocation}

                        </p>
                        <p
                          style={{ fontSize: 14, marginBottom: 5 }}
                        >
                          
                         <b>Nơi kết thúc :</b>  {orderDetail?.tourDTO.endLocation}

                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="destination">
                  <div className="text p-3">
                    <div className="row">

                      <div className="col-10">
                        <h4 style={{ fontSize: 20, marginTop: 10 }}>
                          Mã đặt chuyến đi: <b>{orderDetail?.code}</b>
                          <span style={{ color: "#666" }}>

                          </span>
                        </h4>
                        <p
                        
                        >
                          Giá chuyến đi:  <b style={{ fontSize: 18, fontWeight: "bold", color: "#F9BE37", marginBottom: 5 }}> {orderDetail?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b>
                        </p>
                        <p
                          style={{ fontSize: 18, marginBottom: 5 }}
                        >
                          Tiền đã thanh toán:<b> {orderDetail?.paid.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b>
                        </p>
                        <p
                          style={{ fontSize: 18, marginBottom: 5 }}
                        >
                          Số tiền cần thanh toán: <b>{orderDetail?.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </b>
                        </p>
                        <p
                          style={{ fontSize: 18, marginBottom: 5 }}
                        >
                          Số tiền hoàn trả:<b>{orderDetail?.refund.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </b>
                        </p>
                      </div>
                      <div className="col-2">
                        <p>
                          <span
                            className={
                              orderDetail?.orderStatus === "NOT_DONE"
                                ? "badge bg-info text-dark"
                                : orderDetail?.orderStatus === "DONE"
                                  ? "badge bg-success"
                                  : orderDetail?.orderStatus === "WAITING_CANCEL"
                                    ? "badge bg-warning text-dark"
                                    : orderDetail?.orderStatus === "CANCEL"
                                      ? "badge bg-danger"
                                      : ""
                            }
                          >
                            {orderDetail?.orderStatus === "NOT_DONE"
                              ? "CHƯA HOÀN TẤT"
                              : orderDetail?.orderStatus === "DONE"
                                ? "HOÀN TẤT"
                                : orderDetail?.orderStatus === "WAITING_CANCEL"
                                  ? "CHỜ HUỶ"
                                  : orderDetail?.orderStatus === "CANCEL"
                                    ? "HUỶ BỎ"
                                    : ""}
                          </span>
                        </p>
                       <p>
                          {orderDetail?.orderStatus === "NOT_DONE" ? (
                            <Link to="/orderBookTouDetail">
                              <button onClick={handlePaymentClick} className="btn btn-primary btn-order">Thanh Toán</button>
                            </Link>
                          ) : (
                            <button onClick={handleButtonClick} className="btn btn-primary btn-order">Thanh Toán Hoàn Tất</button>
                          )}
                        </p> 
                        <p>
                          {orderDetail?.orderStatus === "NOT_DONE" ? (
                            <Link to="/orderBookTouDetail">
                              <button onClick={handlePaymentVNPAYClick} className="btn btn-primary btn-order">Thanh Toán VNPAY</button>
                            </Link>
                          ) : (
                            <button onClick={handleButtonClick} className="btn btn-primary btn-order">Thanh Toán Hoàn Tất</button>
                          )}
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
                          <div className="col-md-24 left">
                            <div className="box-order">
                              <div className="time"><h1
                                className="text-primary"
                              ><b>Khởi hành </b>
                              </h1>
                                {/* <p>Tập trung <b>04:05 ngày 01/05/2024</b>
                                                </p> */}
                                <p>Ngày đi:  <b>{orderDetail?.tourTimeDTO.startDate}</b>
                                </p>
                                <p>Ngày về:  <b> {orderDetail?.tourTimeDTO.endDate}</b>
                                </p>
                                <p>Thời gian đi:   <b> {orderDetail?.tourTimeDTO.startTime}</b>
                                </p>
                                <p>Số lượng người đi:   <b> {orderDetail?.tourTimeDTO.slotNumberActual}</b></p>
                                <p>Số lượng chỗ còn:   <b> {orderDetail?.tourTimeDTO.slotNumber}</b></p>
                                <p>Trạng thái chuyến đi:   <b> {orderDetail?.tourTimeDTO.timeStatus}</b></p>

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
                    <div className="col-md-5"  style={{
                            transition: "background-color 0.3s, color 0.3s",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "10px",
                            backgroundColor: "#f0f0f0"
                        }} >
                      <div class="container-fluid">
                        <main class="row">
                          <section className="col">
                            <header className="title">
                              <h2 className="text-primary">Lịch Trình</h2>
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
                      {orderDetail && orderDetail.tourVisitorDTOList.map((tourVisitor, index) => (

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

export default OrderBookTourDetail;
