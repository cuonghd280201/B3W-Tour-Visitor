import React, { useState } from 'react';
import { Form, Button, Space, Layout } from 'antd';
import FileUploadImage from '../../Profile/FileUploadImage';

const Step5Form = ({ formData, onNext }) => {
    const [form] = Form.useForm();

    // Initialize the uploaded images state with the initial values from formData
    const [uploadedImages, setUploadedImages] = useState(formData.tourImageCreateForms || []);

    // Function to handle image upload and update the form field
    const handleImageUpload = (url, index) => {
        // Create a copy of the uploaded images array
        const updatedImages = [...uploadedImages];
        // Update the image at the given index
        updatedImages[index] = { image: url };
        // Update the state
        setUploadedImages(updatedImages);
        // Update the form fields value
        form.setFieldsValue({ tourImageCreateForms: updatedImages });
    };

    // Function to handle form submission
    const handleSubmit = (values) => {
        // Include the updated images in the form values
        values.tourImageCreateForms = uploadedImages;
        onNext(values);
    };

    return (
        <Layout>
        <h2>Thêm Ảnh Minh Họa</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={formData}>
            <Form.List name="tourImageCreateForms">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'image']}
                                    fieldKey={[fieldKey, 'image']}
                                    rules={[{ required: true, message: 'Vui Lòng Nhập Ảnh Phụ!' }]}
                                >
                                    <FileUploadImage
                                        setUploadedImageUrl={(url) => handleImageUpload(url, index)}
                                    />
                                </Form.Item>
                                <Button type="link" onClick={() => remove(name)}>Xóa</Button>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                Thêm Ảnh Khác
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            {/* Submit button */}
            <Form.Item>
                <Button type="primary" htmlType="submit">Bước Tiếp Theo</Button>
            </Form.Item>
        </Form>
        </Layout>
    );
};

export default Step5Form;
