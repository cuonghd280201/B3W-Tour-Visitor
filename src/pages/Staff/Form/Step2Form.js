import React from 'react';
import { Form, Button, Input, Space, Layout } from 'antd';


const Step2Form = ({ formData, onNext }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        onNext(values);
    };

    return (
        <Layout>
        <h2>Lịch Trình</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={formData}>
            <Form.List name="listTourSchedule">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'day']}
                                    fieldKey={[fieldKey, 'day']}
                                    rules={[{ required: true, message: 'Vui lòng nhập ngày!' }]}
                                >
                                    <Input placeholder="Ngày" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'title']}
                                    fieldKey={[fieldKey, 'title']}
                                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                                >
                                    <Input placeholder="Tiêu đề" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'description']}
                                    fieldKey={[fieldKey, 'description']}
                                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                                >
                                    <Input placeholder="Mô tả" />
                                </Form.Item>
                                <Button type="link" onClick={() => remove(name)}>Xóa</Button>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon="+">
                                Thêm Lịch
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">Bước tiếp theo</Button>
            </Form.Item>
        </Form>
        </Layout>
    );
};

export default Step2Form;
