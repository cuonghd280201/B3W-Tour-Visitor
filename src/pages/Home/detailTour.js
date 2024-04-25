import React, { useState, useEffect } from "react";
import '../Home/Timeline.css'

import '../Home/detailTour.css'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tourServices from "../../services/tour.services";




const DetailTour = () => {
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

    useEffect(() => {
        fetchTourDetailCustomer();
    }, []);


    const navigate = useNavigate();

    const navigateToFindTour = () => {
        if (tourDetailCustomer) {
            navigate('/findTour', { state: { tourId: tourDetailCustomer.id } });
        }
    };
    const navigateInfomationTour = () => {
        if (tourDetailCustomer) {
            navigate('/infomationTour', { state: { tourId: tourDetailCustomer.id } });
        }
    }




    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    //Schedule

    // Hàm chuyển đổi ngày từ DD-MM-YYYY sang YYYY-MM-DD

    // const renderTourSchedules = () => {
    //     if (tourDetailCustomer && tourDetailCustomer.tourSchedules) {
    //         return tourDetailCustomer.tourSchedules.map((schedule, index) => {
    //             const scheduleDate = convertDateFormat(tourDetailCustomer?.tourTimeSet[0]?.startDate);

    //             // So sánh createDate với currentDate
    //             const isComing = scheduleDate < currentDate;

    //             return (
    //                 <div
    //                     key={schedule.id}
    //                     className={`box`}
    //                     style={{ backgroundColor: isComing ? 'lightgreen' : 'white' }}
    //                 >
    //                     <h4>Ngày {index + 1}</h4>
    //                     <h3>{tourDetailCustomer?.tourTimeSet[0]?.startDate}</h3>
    //                     <p>{schedule.description}</p>
    //                     {isComing && <div className="label-coming">Coming</div>}
    //                 </div>
    //             );
    //         });
    //     }
    //     return null;
    // };
    // Function to add days to a date and return the date in dd-mm-yyyy format
    const convertDateFormat = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    const currentDate = new Date().toISOString().split('T')[0];
    const addDaysToDate = (dateString, days) => {
        const [day, month, year] = dateString.split('-');
        const date = new Date(`${year}-${month}-${day}`);
        date.setDate(date.getDate() + days);
        const newDay = date.getDate().toString().padStart(2, '0');
        const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
        const newYear = date.getFullYear();
        return `${newDay}-${newMonth}-${newYear}`;
    };

    // Modified renderTourSchedules function
    const renderTourSchedules = () => {
        if (tourDetailCustomer && tourDetailCustomer.tourSchedules) {
            return tourDetailCustomer.tourSchedules.map((schedule, index) => {
                const startDate = tourDetailCustomer?.tourTimeSet[0]?.startDate;
                const scheduleDate = addDaysToDate(startDate, index);
                const isComing = scheduleDate <= currentDate;
                return (
                    <div
                        key={schedule.id}
                        className={`box`}
                        style={{ backgroundColor: isComing ? 'lightgreen' : 'white' }}
                    >
                        <h4>Ngày {index + 1}</h4>
                        <h3>{scheduleDate}</h3>
                        <p>{schedule.title}</p>
                        {isComing && <div className="label-coming">Coming</div>}
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

    const formatPrice = (price) => {
        return (price).toLocaleString('vi-VN').replace(/,/g, '.');
    };
    return (
        <div>
            <section className="ftco-section ftco-counter img" id="" style={{ backgroundImage: 'url(images/bg_1.jpg)' }} data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            {/* <div className="row">
                                <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <strong className="number" data-number={100000}>0</strong>
                                            <span>Happy Customers</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <strong className="number" data-number={40000}>0</strong>
                                            <span>Destination Places</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <strong className="number" data-number={87000}>0</strong>
                                            <span>Hotels</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <strong className="number" data-number={56400}>0</strong>
                                            <span>Restaurant</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <div className="flight-hotel-detail detail tour-detail  ">
                <div className="entry-head">
                    <section className="section-01-title section-01">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 left">
                                    <div className="warp-mark">
                                        <i className="fal fa-ticket" />
                                        <img src="/images/tour.png" className="icon-img" />
                                        <label>{tourDetailCustomer?.tourTimeSet[0]?.code}</label>
                                    </div>
                                    <h1 className="title">🔥 {tourDetailCustomer?.title}</h1>

                                </div>
                                <div className="col-md-6 right">
                                    <div className="group-price">
                                        <div className="sale-price">
                                            <p>
                                                <span className="price">{tourDetailCustomer?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>/ khách
                                            </p>
                                        </div>
                                    </div>
                                    <div className="group-add-cart">
                                        <a title="Đặt ngay" className="add-to-cart" onClick={navigateInfomationTour}>
                                            <i className="fal fa-shopping-cart"></i> Đặt ngay
                                        </a>
                                        <a href="#" className="add-to-group">Liên hệ tư vấn</a></div>
                                </div>
                                <Modal isOpen={isOpen} toggle={toggle} centered>
                                    <ModalHeader toggle={toggle}>Nhập thông tin</ModalHeader>
                                    <ModalBody>
                                        <section className="wrap-info-customer-number-person-details mt-4 wrapper-new-input">
                                            <div className="title-section mb-3 title-hotel-flight-infor">Số lượng hành khách</div>
                                            <div className="group-fields-input-contact-adult group-fields-input-contact-wrapper mb-3">

                                                <div className="row">
                                                    <div className="col-lg-3 col-12">
                                                        <div className="form-group">
                                                            <label className="pb-1 font-700">Người lớn (trên 12 tuổi) <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control fullName hotel-flight-input" placeholder="Nhập số lượng" name="fullName" />
                                                            <div className="errorform error-notes">Vui lòng nhập thông tin</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-12">
                                                        <div className="form-group">
                                                            <label className="pb-1 font-700">Trẻ em (dưới 12 tuổi) <span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control fullName hotel-flight-input" placeholder="Nhập số lượng" name="fullName" />
                                                            <div className="errorform error-notes">Vui lòng nhập thông tin</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>                                </ModalBody>
                                    <ModalFooter>
                                        <Link to="/infomationTour">
                                            <Button color="secondary" onClick={toggle}>Gửi</Button>
                                        </Link>
                                        <Button color="secondary" onClick={toggle}>Đóng</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </section>

                </div>

            </div>


            <section className="ftco-about d-md-flex">
                <div className="one-half img" style={{ backgroundImage: `url(${tourDetailCustomer?.coverImage})` }} />
                <div className="one-half e">
                    <div className="row">
                        {tourDetailCustomer && tourDetailCustomer.tourImagesSet.map((tourTime, index) => (

                            <div className="col-md-4 ">
                                <a href="#" className="destination-entry img" style={{ backgroundImage: `url(${tourTime?.image})` }}>
                                </a>
                            </div>
                        ))}
                        {/* <div className="col-md-4 ">
                            <a href="#" className="destination-entry img" style={{ backgroundImage: 'url(images/destination-2-1.jpg)' }}>
                            </a>
                        </div>
                        <div className="col-md-4">
                            <a href="#" className="destination-entry img" style={{ backgroundImage: 'url(images/destination-3.jpg)' }}>
                            </a>
                        </div> */}
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
                                        <p class="s-title-03 tour-des"> {tourDetailCustomer?.description} </p>
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
                                                    </label>                                                  </div>
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
                                                <p>{tourDetailCustomer?.tourDetail.food}</p>
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
                        }} >
                            <div class="container-fluid">
                                <main class="row">
                                    <section class="col">
                                        <header class="title">
                                            <h2>Lịch Trình</h2>
                                        </header>
                                        <div className="contents" style={{ width: '400px' }}>
                                            {renderTourSchedules()}
                                        </div>
                                    </section>
                                </main>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{
                                padding: "8px 16px",
                                margin: "60px 10px 10px 10px"

                            }}>
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


            <section className="section-08 mb-5">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-md-6 col-12 left">
                            <h2 className="mb-4">Chi tiết tour</h2>
                            <div className="tour"><div className="detail-tour">
                                <h3 className="tt">Thông tin chuyến bay</h3>
                                <div className="detail-tour-inner">
                                    <div className="date"><span>Ngày đi - </span><b>16/04/2024</b></div>
                                    <div className="time"><h4>11:35</h4><span>Bay thẳng</span><h4>13:10</h4></div>
                                    <div className="from d-flex justify-content-between align-items-center col-12">
                                        <span className="col-md-4 small text-center">TP. HỒ CHÍ MINH</span>
                                        <div className="row col-md-4"><img src="https://media.travel.com.vn/ImageAirlines/logo_VietNamAir.jpg" className="flight-logo" alt="prop" /></div>
                                        <span className="col-md-4 small text-center">SÂN BAY QUỐC TẾ SUVARNABHUMI, BANGKOK, THÁI LAN</span></div>
                                    <div className="from d-flex justify-content-between align-items-center col-12"><div className="col-md-4 small text-center">SGN</div>
                                        <div className="row col-md-4" /><div className="col-md-4 small text-center">BKK</div></div><div className="p-line">
                                        <span><img src="/images/icons/go.png" alt="prop" /></span>
                                        <span><img src="/images/icons/airport.png" alt="prop" /></span>
                                        <span><img src="/images/icons/to.png" alt="prop" /></span></div>
                                    <div className="cb">Ký hiệu chuyến bay<p> VN605</p></div></div>
                                <div className="detail-tour-inner comeback ">
                                    <div className="date"><span>Ngày về - </span><b>20/04/2024</b></div>
                                    <div className="time"><h4>14:25</h4><span>Bay thẳng</span><h4>16:10</h4></div>
                                    <div className="from d-flex justify-content-between align-items-center col-12">
                                        <span className="col-md-4 small text-center">SÂN BAY QUỐC TẾ SUVARNABHUMI, BANGKOK, THÁI LAN</span>
                                        <div className="row col-md-4"><img src="https://media.travel.com.vn/ImageAirlines/logo_VietNamAir.jpg" className="flight-logo" alt="prop" /></div>
                                        <span className="col-md-4 small text-center">TP. HỒ CHÍ MINH</span></div>
                                    <div className="from d-flex justify-content-between align-items-center col-12">
                                        <div className="col-md-4 small text-center">BKK</div><div className="row col-md-4" />
                                        <div className="col-md-4 small text-center">SGN</div></div><div className="p-line">
                                        <span><img src="/images/icons/go.png" alt="prop" /></span><span><img src="/images/icons/airport.png" alt="prop" /></span>
                                        <span><img src="/images/icons/to.png" alt="prop" /></span></div><div className="cb">Ký hiệu chuyến bay<p> VN604</p></div></div></div>
                                <div className="more-info more-info-1 mt-5"><h3 className="tt">Thông tin tập trung</h3>
                                    <div className="block"><span>Ngày giờ tập trung</span>
                                        <div className="info">08:35<p>16/04/2024</p>
                                        </div>
                                    </div>
                                    <div className="block"><span>Nơi tập trung</span>
                                        <div className="info">Sân bay</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="col-md-6 col-12 right">
                            <h2>Giá tour &amp; phụ thu phòng đơn</h2>
                            <div className="table-price"><table>
                                <tbody>
                                    <tr><th className="l1">Loại khách</th><th className="l2">Giá tour</th><th className="l3">Land tour</th></tr><tr><td>Người lớn (Từ 12 tuổi trở lên)</td><td className="t-price">8.490.000&nbsp;₫</td><td className="l-price">5.990.000&nbsp;₫</td></tr><tr><td>Trẻ em (Từ 2 tuổi đến dưới 12 tuổi)</td><td className="t-price">7.492.500&nbsp;₫</td><td className="l-price">4.493.000&nbsp;₫</td></tr><tr><td>Em bé (Dưới 2 tuổi)</td><td className="t-price">2.997.000&nbsp;₫</td><td className="l-price">1.797.000&nbsp;₫</td></tr><tr className="total"><td>Phụ thu phòng đơn</td><td className="t-price">3.500.000&nbsp;₫</td><td className="l-price">3.500.000&nbsp;₫</td></tr>
                                </tbody></table></div>
                             <h2 className="tt mt-3">Thông tin hướng dẫn viên</h2>
                            <div className="table-price"><div className="more-info more-info-2">
                                <div className="block"><span>HDV dẫn đoàn</span><div className="info">
                                    <h3>TRẦN DŨNG CẢM</h3><p>190 Pasteur, Phường Võ Thị Sáu, Quận 3, TP.HCM, Viet Nam</p>
                                </div>
                                </div>
                                <div className="block"><span>HDV tiễn</span><div>Đang cập nhật</div>
                                </div>
                            </div>
                            </div> *
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    );
}
export default DetailTour;