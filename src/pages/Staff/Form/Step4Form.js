import React from 'react';
import { Form, Button, Input, Space, DatePicker, Layout } from 'antd';
import moment from 'moment';

const Step4Form = ({ formData, onNext }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const formattedValues = values.tourTimeCreateFormSet.map((item) => {
            return {
                ...item,
                startDate: item.startDate.format('DD-MM-YYYY'),
                endDate: item.endDate.format('DD-MM-YYYY'),
            };
        });

        onNext({ tourTimeCreateFormSet: formattedValues });
    };

    return (
        <Layout>
        <h2>Thông Tin Thời Gian Chuyến Đi</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={formData}>
            <Form.List name="tourTimeCreateFormSet">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'startDate']}
                                    fieldKey={[fieldKey, 'startDate']}
                                    rules={[{ required: true, message: 'Vui lòng nhập ngày đi!' }]}
                                >
                                    <DatePicker placeholder="Ngày Đi" format="DD-MM-YYYY" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'endDate']}
                                    fieldKey={[fieldKey, 'endDate']}
                                    rules={[{ required: true, message: 'Vui lòng nhập ngày kết thúc!' }]}
                                >
                                    <DatePicker placeholder="Ngày Kết Thúc" format="DD-MM-YYYY" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'startTime']}
                                    fieldKey={[fieldKey, 'startTime']}
                                    rules={[{ required: true, message: 'Vùi lòng nhập giờ đi!' }]}
                                >
                                    <Input placeholder="Giờ đi (HH:MM)" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'slotNumber']}
                                    fieldKey={[fieldKey, 'slotNumber']}
                                    rules={[{ required: true, message: 'Vui lòng nhập số lượng người đi!' }]}
                                >
                                    <Input placeholder="Số Lượng Người Đi" type="number" />
                                </Form.Item>
                                <Button type="link" onClick={() => remove(name)}>Xóa</Button>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon="+">
                                Thêm Thời Gian
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">Bước Tiếp Theo</Button>
            </Form.Item>
        </Form>
        </Layout>
    );
};

export default Step4Form;
