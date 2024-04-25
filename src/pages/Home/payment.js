import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Input, Button, Card, CardHeader, CardBody } from 'reactstrap';

import "../Admin/dashboard.css";
import { Layout } from "antd";
import { Link, useLocation, useNavigate } from 'react-router-dom';

import orderServices from "../../services/order.services";
import paymentServices from "../../services/payment.services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Home/payment.css'
const Payment = () => {


    const { state } = useLocation();

    const [orderDetail, setOrderDetail] =
        useState(null);
    const fetchOrderDetail = async () => {
        try {
            const orderResponseString = localStorage.getItem('orderResponse');
            const response = await orderServices.getDetailOrder(orderResponseString);
            console.log("Response:", response);
            setOrderDetail(response.data.data);

            return response;

        } catch (error) {
            console.error("Error fetching order:", error);
        }
    }

    useEffect(() => {
        fetchOrderDetail();
    }, []);


    // Thanh Toan
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
            if (response && response.data && response.data.url) {
                window.open(response.data.url, "_blank");
            }
        } catch (error) {
            toast.success("Chuyển hướng thanh toan thành công");
            console.error("Error payment failed", error);
        }
    }

    const handlePaymentClick = async () => {
        await createCheckout();
    };

    const handlePaymentVNPAYClick = async () => {
        await paymentVNPay();
    }

    return (
        <div>
            <section className="ftco-section ftco-counter img" id="" style={{ backgroundImage: 'url(images/bg_1.jpg)' }} data-stellar-background-ratio="0.5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                        </div>
                    </div>
                </div>
            </section>
            <section className="checkout-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8"><h2>Thanh toán</h2><div className="payments-warp">
                            <div className="container">
                                <div className="title">
                                    <h4>Chọn hình thức <span style={{ color: '#6064b6' }}>Thanh Toán</span> cho chuyến đi</h4>
                                </div>
                                <form action="#">
                                    <input type="radio" name="payment" id="visa" />
                                    {/* <input type="radio" name="payment" id="mastercard" />
                                    <input type="radio" name="payment" id="paypal" /> */}
                                    {/* <input type="radio" name="payment" id="AMEX" /> */}
                                    <div className="category">
                                        <label htmlFor="VNPAY" className="visaMethod">
                                            <div className="imgName">
                                                <div className="imgContainer visa">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQULr3Ust3Yw-IS1KvGuHQFys81W1ava9Ohd8gduuRPXA&s" alt />
                                                </div>
                                                <span className="name">VNPAY</span>
                                            </div>
                                            <span className="check"><i className="fa-solid fa-circle-check" style={{ color: '#6064b6' }} /></span>
                                        </label>
                                        {/* <label htmlFor="mastercard" className="mastercardMethod">
                                            <div className="imgName">
                                                <div className="imgContainer mastercard">
                                                    <img src="https://i.ibb.co/vdbBkgT/mastercard.jpg" alt />
                                                </div>
                                                <span className="name">Mastercard</span>
                                            </div>
                                            <span className="check"><i className="fa-solid fa-circle-check" style={{ color: '#6064b6' }} /></span>
                                        </label>
                                        <label htmlFor="paypal" className="paypalMethod">
                                            <div className="imgName">
                                                <div className="imgContainer paypal">
                                                    <img src="https://i.ibb.co/KVF3mr1/paypal.png" alt />
                                                </div>
                                                <span className="name">Paypal</span>
                                            </div>
                                            <span className="check"><i className="fa-solid fa-circle-check" style={{ color: '#6064b6' }} /></span>
                                        </label>
                                        <label htmlFor="AMEX" className="amexMethod">
                                            <div className="imgName">
                                                <div className="imgContainer AMEX">
                                                    <img src="https://i.ibb.co/wQnrX86/American-Express.jpg" alt />
                                                </div>
                                                <span className="name">AMEX</span>
                                            </div>
                                            <span className="check"><i className="fa-solid fa-circle-check" style={{ color: '#6064b6' }} /></span>
                                        </label> */}
                                    </div>
                                </form>
                            </div>
                        </div>




                            <div className="terms"><h3>Điều khoản bắt buộc khi đăng ký online</h3><div className="term-content"><p>
                                <title />
                            </p><p style={{ textAlign: 'center' }}><span style={{ color: '#444444' }}><strong>NỘI DUNG ĐỌC, HIỂU VÀ ĐỒNG Ý TRƯỚC KHI ĐĂNG KÝ ONLINE&nbsp;CHƯƠNG TRÌNH DU LỊCH TRONG NƯỚC</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>Tôi đã hiểu rõ và đồng ý với các nội dung như sau:</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>I. GIÁ VÉ DU LỊCH</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Giá vé du lịch được tính theo tiền Đồng (Việt Nam - VNĐ). Trường hợp khách thanh toán bằng USD sẽ được quy đổi ra VNĐ theo tỉ giá của ngân hàng Đầu Tư và Phát Triển Việt Nam - Chi nhánh TP.HCM tại thời điểm thanh toán.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Giá vé chỉ bao gồm những khoản được liệt kê một cách rõ ràng trong phần “Bao gồm” trong các chương trình du lịch. Vietravel không có nghĩa vụ thanh toán bất cứ chi phí nào không nằm trong phần “Bao gồm”.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>II. GIÁ DÀNH CHO TRẺ EM</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>- Trẻ em dưới 5 tuổi:&nbsp; không thu phí dịch vụ, bố mẹ tự lo cho bé và thanh toán các chi phí phát sinh (đối với các dịch vụ tính phí theo chiều cao…). Hai người lớn chỉ được kèm 1 trẻ em dưới 5 tuổi, trẻ em thứ 2 sẽ đóng phí theo qui định dành cho độ tuổi từ 5 đến dưới 12 tuổi và phụ thu phòng đơn. Vé máy bay, tàu hỏa, phương tiện vận chuyển công cộng mua vé theo qui định của các đơn vị vận chuyển (nếu có)</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>- Trẻ em từ 5 tuổi đến dưới 12 tuổi:&nbsp; 50% giá tour người lớn đối với tuyến xe, 75% giá tour người lớn đối với tuyến có vé máy bay (không có chế độ giường riêng). Hai người lớn chỉ được kèm 1 trẻ em từ 5 - dưới 12 tuổi, em thứ hai trở lên phải mua 1 suất giường đơn.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>- Trẻ em từ 12 tuổi trở lên: mua một vé như người lớn.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>III. THANH TOÁN</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Khi thanh toán, Quý khách vui lòng cung cấp đầy đủ thông tin và đặt cọc ít nhất 50% tổng số tiền tour để giữ chỗ</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Thanh toán bằng tiền mặt hoặc chuyển khoản tới tài khoản ngân hàng của Vietravel.</span></p>
                                <div style={{ textAlign: 'justify' }}>
                                    <div style={{ background: '#eeeeee', border: '1px solid #cccccc', padding: '5px 10px' }}>Tên Tài Khoản : Công ty CP Du lịch và Tiếp thị GTVT Việt Nam – Vietravel</div>
                                    <div style={{ background: '#eeeeee', border: '1px solid #cccccc', padding: '5px 10px' }}>Tên tài khoản viết tắt : VIETRAVEL</div>
                                    <div style={{ background: '#eeeeee', border: '1px solid #cccccc', padding: '5px 10px' }}>Số Tài khoản : <strong>111 6977 27979</strong></div>
                                    <div style={{ background: '#eeeeee', border: '1px solid #cccccc', padding: '5px 10px' }}>Ngân hàng : Vietinbank - Chi nhánh 7</div>
                                </div>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Việc thanh toán được xem là hoàn tất khi Vietravel nhận được đủ tiền vé du lịch trước lúc khởi hành hoặc theo hợp đồng thỏa thuận giữa hai bên. Bất kỳ sự thanh toán chậm trễ dẫn đến việc hủy dịch vụ không thuộc trách nhiệm của Vietravel.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Khách hàng có nhu cầu xuất hóa đơn, vui lòng cung cấp thông tin xuất hóa đơn ngay tại thời điểm đăng ký. Vietravel có trách nhiệm xuất hóa đơn cho khách hàng trong vòng 07 ngày sau khi tour kết thúc.&nbsp;&nbsp;</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Khi thực hiện việc chuyển khoản, Quý khách vui lòng ghi rõ tên họ, số điện thoại và nội dung chuyển khoản cho chương trình du lịch cụ thể đã được Quý khách chọn đăng ký.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Sau khi thực hiện việc chuyển khoản, Quý khách vui lòng gửi ủy nhiệm chi về Công ty Vietravel theo địa chỉ email sales@vietravel.com và liên hệ với nhân viên phụ trách tuyến để nhận được Vé du lịch chính thức từ Công ty Vietravel.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>*<u>Lưu ý</u>: Quý khách vui lòng điền đầy đủ thông tin theo yêu cầu khi đăng ký tour qua mạng bán travel.com.vn và chịu trách nhiệm về tính chính xác của những thông tin đã cung cấp. Vietravel sẽ sử dụng những thông tin này để cung cấp cho các đối tác dịch vụ và tiến hành các thủ tục cần thiết cho chuyến đi. Nếu có sự khác biệt giữa thông tin mà Quý khách cung cấp so với thực tế dẫn đến việc phải điều chỉnh thì Quý khách vui lòng thanh toán các khoản chi phí phát sinh (nếu có).</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>IV. HỦY VÉ VÀ PHÍ HỦY VÉ DU LỊCH</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>1. Trường hợp bị hủy bỏ do Vietravel:</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Nếu Vietravel không thực hiện được chuyến du lịch, Vietravel phải báo ngay cho khách hàng biết và thanh toán lại cho khách hàng toàn bộ số tiền khách hàng đã đóng trong vòng 3 ngày kể từ lúc việc thông báo hủy chuyến du lịch bằng tiền mặt hoặc chuyển khoản.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>2. Trường hợp bị hủy bỏ do khách hàng:</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Sau khi đóng tiền, nếu Quý khách muốn chuyển/hủy tour xin vui lòng mang Vé Du Lịch đến văn phòng đăng ký tour để làm thủ tục chuyển/hủy tour và chịu mất phí theo quy định của Vietravel. Không giải quyết các trường hợp liên hệ chuyển/hủy tour qua điện thoại.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>• Đối với ngày thường:</strong></span></p>
                                <div style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>- Được chuyển sang các tuyến du lịch khác trước ngày khởi&nbsp; hành 20 ngày : Không mất chi phí.&nbsp;</span></div>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>- Hủy hoặc chuyển sang các chuyến du lịch khác ngay sau khi đăng ký đến từ 15 - 19 ngày trước ngày khởi hành: Chi phí chuyển/hủy tour: 50% tiền cọc tour.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>• Đối với ngày lễ, Tết:&nbsp; </strong></span></p>
                                <div style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>- Được chuyển sang các tuyến du lịch khác trước ngày khởi &nbsp;hành 30 ngày : Không mất chi phí.</span></div>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>- Hủy hoặc chuyển sang các chuyến du lịch khác ngay sau khi đăng ký đến từ 25 - 29 ngày trước ngày khởi hành: Chi phí chuyển/hủy tour: 50% tiền cọc tour.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>* Các tour ngày lễ, Tết là các tour có thời gian diễn ra rơi vào một trong các ngày lễ, Tết theo quy định.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>* Thời gian hủy tour được tính cho ngày làm việc, không tính Thứ 7, Chủ Nhật và các ngày lễ, Tết.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>* Khách hàng hủy Vé du lịch trong thời điểm ngày thường và lễ Tết theo đúng những quy định trên, trong trường hợp khách thanh toán trực tuyến, nếu hủy Vé du lịch khách hàng sẽ chịu toàn bộ phí ngân hàng cho việc thanh toán tiền Vé du lịch. Việc hoàn trả tiền cho khách sẽ được Vietravel thực hiện ngay sau khi ngân hàng thông báo tiền đã vào tài khoản của Vietravel.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>3. Trường hợp bất khả kháng:</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Nếu chương trình du lịch bị hủy bỏ hoặc thay đổi bởi một trong hai bên vì một lý do bất khả kháng (hỏa hoạn, thời tiết, tai nạn, thiên tai, chiến tranh, dịch bệnh, hoãn, dời, hủy chuyến hoặc thay đổi khác của các phương tiện vận chuyển công cộng hoặc các sự kiến bất khả kháng khác theo quy định pháp luật…), thì hai bên sẽ không chịu bất kỳ nghĩa vụ bồi hoàn các tổn thất đã xảy ra và không chịu bất kỳ trách nhiệm pháp lý nào. Tuy nhiên mỗi bên có trách nhiệm cố gắng tối đa để giúp đỡ bên bị thiệt hại nhằm giảm thiểu các tổn thất gây ra vì lý do bất khả kháng. Thời gian hoàn tiền dịch vụ do hủy tour vì trường hợp bất khả kháng sẽ được hoàn tất trong vòng 60 – 90 ngày phụ thuộc điều kiện các đối tác cung ứng dịch vụ.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>4. Thay đổi lộ trình:&nbsp; </strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Tùy theo tình hình thực tế, Vietravel giữ quyền thay đổi lộ trình, sắp xếp lại thứ tự các điểm tham quan hoặc hủy bỏ chuyến đi du lịch bất cứ lúc nào mà Vietravel thấy cần thiết vì sự thuận tiện hoặc an toàn cho khách hàng.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>V. NHỮNG YÊU CẦU ĐẶC BIỆT TRONG CHUYẾN DU LỊCH</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Các yêu cầu đặc biệt của Quý khách phải được báo trước cho Vietravel ngay tại thời điểm đăng ký. Vietravel sẽ cố gắng đáp ứng những yêu cầu này trong khả năng của mình song sẽ không chịu trách nhiệm về bất kỳ sự từ chối cung cấp dịch vụ từ phía các nhà vận chuyển, khách sạn, nhà hàng và các nhà cung cấp dịch vụ độc lập khác.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>VI. KHÁCH SẠN</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Khách sạn được cung cấp trên cơ sở những phòng có hai giường đơn (TWN) hoặc một giường đôi (DBL) tùy theo cơ cấu phòng của các khách sạn. Khách sạn do Vietravel đặt cho các chương trình tham quan có tiêu chuẩn tương ứng với các mức giá vé mà khách chọn khi đăng ký đi du lịch. Nếu cần thiết thay đổi về bất kỳ lý do nào, khách sạn thay thế sẽ tương đương với tiêu chuẩn của khách sạn ban đầu và sẽ được báo cho du khách trước khi khởi hành. Những yêu cầu đặc biệt của khách hàng nếu thông báo trước cho Vietravel sẽ được đáp ứng tùy theo khả năng cung cấp của khách sạn và khách hàng phải trả thêm tiền đối với các yêu cầu này (nếu có). Vietravel có quyền không đáp ứng những yêu cầu này nếu khách sạn từ chối cung cấp dịch vụ. Thời gian nhận phòng theo qui định tại các khách sạn là sau 14:00 và phải trả phòng trước 12:00. Đối với các trường hợp khách lưu trú tại hệ thống khách sạn/Resort 5 sao (Vinpearl, FLC, Grand Ho Tram Strip…) tuân thủ theo điều kiện hủy phạt của khách sạn/Resort cho từng thời điểm.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>VII. VẬN CHUYỂN</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Phương tiện vận chuyển tùy thuộc theo từng chương trình du lịch.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Với chương trình đi bằng xe: xe máy lạnh (4, 7, 15, 25, 35, 45 chỗ) sẽ được Vietravel sắp xếp tùy theo số lượng khách từng đoàn, phục vụ suốt chương trình tham quan.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Với chương trình đi bằng xe lửa - máy bay - tàu cánh ngầm (phương tiện vận chuyển công cộng), trong một số chương trình các nhà cung cấp dịch vụ có thể thay đổi giờ khởi hành mà không báo trước, việc thay đổi này sẽ được Vietravel thông báo cho khách hàng nếu thời gian cho phép.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Vietravel không chịu trách nhiệm bồi hoàn và trách nhiệm pháp lý với những thiệt hại về vật chất lẫn tinh thần do việc chậm trễ, thay đổi giờ giấc khởi hành của các phương tiện vận chuyển công cộng hoặc sự chậm trễ do chính hành khách gây ra. Vietravel chỉ thực hiện hành vi giúp đỡ để giảm bớt tổn thất cho hành khách.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>VIII. HÀNH LÝ</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Hành lý gọn nhẹ, với các chương trình sử dụng dịch vụ hàng không, hành lý miễn cước sẽ do các hãng hàng không qui định. Vietravel không chịu trách nhiệm về sự thất lạc, hư hỏng hành lý hoặc bất kỳ vật dụng gì của du khách trong suốt chuyến đi, du khách tự bảo quản hành lý của mình. Nếu khách hàng bị mất hay thất lạc hành lý thì Vietravel sẽ giúp hành khách liên lạc và khai báo với các bộ phận liên quan truy tìm hành lý bị mất hay thất lạc. Việc bồi thường hành lý bị mất hay thất lạc sẽ theo qui định của các đơn vị cung cấp dịch vụ hoặc các đơn vị bảo hiểm (nếu có).</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>IX. BẢO HIỂM DU LỊCH</strong></span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Giá dịch vụ du lịch trọn gói đã bao gồm bảo hiểm du lịch trong nước với mức đền bù cao nhất là 120.000.000 VNĐ/khách Việt Nam/vụ cho nhân mạng và 12.000.000 VNĐ/khách Việt Nam/vụ cho hành lý.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Điều kiện, điều khoản bảo hiểm: Theo quy tắc bảo hiểm khách du lịch trong nước QĐ số: 001321/2006 – BM/BHCN.</span></p>
                                <p style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}><strong>Lưu ý: </strong>Vé du lịch cùng các văn bản kèm theo (biên nhận tour, chương trình tour) được xem như là bộ Hợp đồng lữ hành có giá trị ràng buộc với các bên và được lập thành 2 bản, mỗi bên giữ một bản, có giá trị pháp lý như nhau. Do tính chất tour dành cho khách lẻ (cá nhân / nhóm gia đình) nên khách hàng (người đăng ký và người đi cùng nhóm) được coi là chấp thuận toàn bộ nội dung trong Vé du lịch và các văn bản kèm theo kể từ thời điểm đặt cọc, không phụ thuộc vào việc khách hàng có ký tên trên Vé du lịch, biên nhận tour hay chương trình tour hay không.</span></p>
                                <div style={{ textAlign: 'justify' }}><span style={{ color: '#444444' }}>Trong quá trình thực hiện, nếu xảy ra tranh chấp sẽ được giải quyết trên cơ sở thương lượng trong thời hạn 30 ngày kể từ ngày một trong hai bên đưa tranh chấp ra thương lượng. Hết thời hạn này nếu tranh chấp không được giải quyết hoặc một trong hai bên không đồng ý với kết quả thương lượng thì có quyền đưa tranh chấp ra giải quyết tại Tòa án thẩm quyền.</span></div>
                                <p /></div>

                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="group-checkout">
                                <h3>Tóm tắt chuyến đi</h3>
                                <div className="product">
                                    <div className="product-image"><img src={orderDetail?.tourDTO?.coverImage} className="img-fluid" alt="image" style={{ width: '200px', height: '100px' }}
                                    /></div>
                                    <div className="product-content">
                                        <p className="title">{orderDetail?.tourDTO?.title} </p>
                                    </div>
                                </div>
                                <div className="go-tour">
                                    <div className="start"><i className="fal fa-calendar-minus" />
                                        <div className="start-content">
                                            <h3>Bắt đầu chuyến đi</h3>
                                            <p className="time">{orderDetail?.tourTimeDTO?.startDate}</p>
                                            <p className="from" /></div>
                                    </div>
                                    <div className="end">
                                        <i className="fal fa-calendar-minus" />
                                        <div className="start-content">
                                            <h3>Kết thúc chuyến đi</h3>
                                            <p className="time">{orderDetail?.tourTimeDTO?.endDate}</p>
                                            <p className="from" /></div>
                                    </div>
                                </div>
                                <div className="go-tour">
                                    <div className="end">
                                        <i className="fal fa-calendar-minus" />
                                        <div className="start-content">
                                            <h3>Hành Khách</h3>
                                            {orderDetail && orderDetail.tourVisitorDTOList.map((order, index) => (

                                                <p className="time"><b>{order.name}</b> : {order.phone} : {order.tourVisitorType}</p>
                                            ))}
                                            <p className="from" /></div>
                                    </div>
                                </div>
                                <div className="detail">
                                    <table>
                                        <thead>
                                            {/* <tr>
                                                <th className="l1">
                                                    <i className="fal fa-users me-1" id="AmoutPerson" />Hành khách</th>
                                                {orderDetail && orderDetail.tourVisitorDTOList.map((order, index) => (
                                                    <div>
                                                         <td className="t-price text-right">
                                                        : 
                                                    </td>
                                                    <td className="t-price text-right">
                                                        {order.phone}
                                                    </td>
                                                    </div>       
                                              
                                            </tr> */}
                                        </thead>
                                        <tbody>
                                            <tr className="total">
                                                <td>Tổng tiền </td>
                                                <td className="t-price text-right">
                                                    {orderDetail?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                </td>

                                            </tr>
                                            {/* <Link to="/orderHistory">
                                                <button
                                                    onClick={handlePaymentClick}
                                                    className="btn btn-primary btn-order">Thanh Toán</button>
                                            </Link> */}
                                            <tr className="cuppon promotion-broder">
                                                <tr className="total">
                                                    <td>Tiền Thanh Toán </td>
                                                    <td className="t-price text-right">
                                                        {orderDetail?.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </td>

                                                </tr>


                                                <Link to="/orderHistory">
                                                    <button
                                                        onClick={handlePaymentClick}
                                                        className="btn btn-primary btn-order">Thanh Toán</button>
                                                </Link>

                                                <Link to="/orderHistory">
                                                    <button
                                                        onClick={handlePaymentVNPAYClick}
                                                        className="btn btn-primary btn-order">Thanh Toán VNPAY</button>
                                                </Link>
                                            </tr>

                                        </tbody></table>
                                    {/* <Link to="/payment">
                                        <button

                                            className="btn btn-primary btn-order">Đặt ngay</button>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Payment;