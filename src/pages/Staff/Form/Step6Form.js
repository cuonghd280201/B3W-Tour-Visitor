import React from 'react';
import { Form, Button, Input } from 'antd';

const Step6Form = ({ formData, onNext }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        onNext(values);
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={formData}>
            <Form.Item
                label="Xác Nhận Đầy Đủ Thông Tin"
                name="submitHere"
                rules={[{ required: true, message: 'Vui lòng xác nhận trước khi tạo chuyến đi' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Tạo</Button>
            </Form.Item>
        </Form>
    );
};

export default Step6Form;
