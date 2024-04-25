import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, Select } from 'antd';
import FileUploadImage from '../../Profile/FileUploadImage';
import tourServices from '../../../services/tour.services';

const { Option } = Select;


const Step1Form = ({ formData, onNext }) => {
    const [form] = Form.useForm();
    const [uploadedImageUrl, setUploadedImageUrl] = useState(formData.coverImage);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const handleSubmit = (values) => {
        values.coverImage = uploadedImageUrl;
        onNext(values);
    };

    const handleImageUpload = (url) => {
        setUploadedImageUrl(url);
        form.setFieldsValue({ coverImage: url });
    };

    const [cities, setCities] = useState([]); 
    useEffect(() => {
        const fetchDataCity = async () => {
            try {
                const response = await tourServices.getAllCity();
                setCities(response.data.data); 
                setLoading(false); 
            } catch (err) {
                // Handle error and set error state
                setError("Error fetching city data");
                setLoading(false); 
            }
        };

        fetchDataCity();
    }, []);

    const handleCityChange = (selectedCityId) => {
        form.setFieldsValue({ city: selectedCityId });
    };

    const handleStartLocationChange = (selectedCityId) => {
        form.setFieldsValue({ starLocation: selectedCityId });
    };

    // Handle end location change
    const handleEndLocationChange = (selectedCityId) => {
        form.setFieldsValue({ endLocation: selectedCityId });
    };
    return (
        <Layout>
            <h2>Tạo Thông Tin Chính Của Chuyến Đi</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={formData}>
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Nơi bắt đầu"
                    name="starLocation"
                    rules={[{ required: true, message: 'Vui lòng chọn nơi bắt đầu!' }]}
                >
                    <Select
                        placeholder="Chọn nơi bắt đầu"
                        onChange={handleStartLocationChange} // Handle start location change
                    >
                        {cities?.map((city) => (
                            <Option key={city.id} value={city.name}>
                                {city.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Form item for end location */}
                <Form.Item
                    label="Điểm Đến"
                    name="endLocation"
                    rules={[{ required: true, message: 'Vui lòng chọn nơi kết thúc!' }]}
                >
                    <Select
                        placeholder="Chọn nơi kết thúc"
                        onChange={handleEndLocationChange} // Handle end location change
                    >
                        {cities?.map((city) => (
                            <Option key={city.id} value={city.name}>
                                {city.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Ảnh Chính"
                    name="coverImage"
                    rules={[{ required: true, message: 'Vui Lòng nhập ảnh chính!' }]}
                >
                    {/* Pass the function to set the uploaded image URL */}
                    <FileUploadImage setUploadedImageUrl={handleImageUpload} />
                </Form.Item>
                <Form.Item
                    label="Thành Phố"
                    name="city"
                    rules={[{ required: true, message: 'Vui lòng chọn thành phố!' }]}
                >
                    <Select
                        placeholder="Chọn nơi bắt đầu"
                        onChange={handleCityChange} // Handle city selection change
                    >
                        {cities?.map((city) => (
                            <Option key={city.id} value={city.name}>
                                {city.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Bước Tiếp Theo</Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default Step1Form;
