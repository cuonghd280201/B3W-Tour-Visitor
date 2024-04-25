import React from 'react';
import {Row, Col} from 'antd'
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom'; // Chỉ sử dụng nếu bạn dùng thư viện react-router

const Forbidden = () => {
    return (
        <>
         <section className="ftco-section ftco-counter img" style={{ backgroundImage: 'url(images/bg_1.jpg)' }} data-stellar-background-ratio="0.5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="10">
                            {/* Your content here */}
                        </Col>
                    </Row>
                </Container>
            </section>
            <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>403 - Forbidden</h1>
            <p>Sorry, you don't have permission to access this page.</p>
            <Link to="/">Go back to Home</Link>
        </div>
        </>
       
    );
};

export default Forbidden;
