import React from 'react';
import { Container } from 'reactstrap';
import { Row, Col } from 'antd';
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
    return (
        <>
            <section className="ftco-section ftco-counter img" style={{ backgroundImage: 'url(images/bg_1.jpg)' }} data-stellar-background-ratio="0.5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="10">
                        </Col>
                    </Row>
                </Container>
            </section>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '50px', color: 'green' }}>✔️</div>
                <h2 style={{ color: 'green' }}>Payment Successful!</h2>
                <p style={{ fontSize: '16px' }}>
                    {/* Amount: $100<br />
                    Recipient: John Doe<br />
                    Date: April 26, 2024<br /> */}
                </p>

                <Link
                    to="/orderHistory"

                >
                    <button style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Back to Home
                    </button>
                </Link>
            </div>
        </>

    );
};

export default PaymentSuccess;
