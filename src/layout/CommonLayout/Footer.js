import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="ftco-footer ftco-bg-dark ftco-section">
      <Container>
        <Row className="mb-3">
          <Col md>
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Du lịch</h2>
              <p>
                Bạn muốn có một kỳ nghỉ cùng gia đình, bạn bè hay người yêu.Hãy
                sử dụng dịch vụ của chúng tôi.
              </p>
            </div>
          </Col>
          <Col md>
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Về chúng tôi</h2>
              <div>
                <a href="/contact" style={{ margin: "5px 0" , marginBottom : "10px"}}>
                  Liên hệ
                </a>
                <p style={{ margin: "5px 0", marginBottom : "10px" }}>
                <a href="/home">Trang chủ</a>
                </p>
                <p style={{ margin: "5px 0" }}>
                  <a href="/home">Chính sách bảo mật</a>
                </p>
              </div>
            </div>
          </Col>
          <Col md>
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Phương thức liên lạc</h2>
              <div>
                <p style={{ margin: "5px 0" , marginBottom : "10px"}}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{ marginRight: "5px" }}
                  />
                  273 Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương, Việt Nam
                </p>
                <p style={{ margin: "5px 0", marginBottom : "10px" }}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ marginRight: "5px" }}
                  />
                  Tel: (84) 898922059
                </p>
                <p style={{ margin: "5px 0" }}>
                  {" "}
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ marginRight: "5px" }}
                  />
                  Email: qklgithub@gmail.com
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="text-light" style={{fontSize : "20px", fontFamily : "inherit"}}>&copy; Bản quyền của du lịch SWP 2024 </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
