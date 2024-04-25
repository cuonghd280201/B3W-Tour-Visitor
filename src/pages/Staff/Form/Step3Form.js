import React from 'react';
import { Form, Input, Button, Layout } from 'antd';


const Step3Form = ({ formData, onNext }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        onNext(values);
    };

    return (
        <Layout>
        <h2>Thông Tin Chi Tiết</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={formData}>
            <Form.Item
                label="Thời Gian"
                name="time"
                rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Phương Tiện"
                name="vehicle"
                rules={[{ required: true, message: 'Vui lòng nhập phương tiện!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Vị trí"
                name="location"
                rules={[{ required: true, message: 'Vui lòng nhập vị trí!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Thức Ăn"
                name="food"
                rules={[{ required: true, message: 'Vui long nhập thức ăn!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Khách Sạn"
                name="hotel"
                rules={[{ required: true, message: 'Vui lòng nhập khách sạn!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Bước Tiếp Theo</Button>
            </Form.Item>
        </Form>
        </Layout>
    );
};

export default Step3Form;
