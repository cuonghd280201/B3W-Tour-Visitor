import React, { useState, useEffect } from 'react';
import { Form, Button, Space, Layout, Input, Modal } from 'antd';
import FileUploadImage from '../Profile/FileUploadImage';
import SiderBarWebStaff from './SlideBar/SiderBarWebStaff';
import NavBarWebStaff from './Navbar/NavBarWebStaff';
import bannerServices from '../../services/banner.services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';

const ManageBanner = () => {

    //
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bannerIdToDelete, setBannerIdToDelete] = useState(null);

    const showDeleteModal = (id) => {
        setBannerIdToDelete(id);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        handleDeleteBanner(bannerIdToDelete);
        setIsModalVisible(false);
        setBannerIdToDelete(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setBannerIdToDelete(null);
    };

    const [uploadedImages, setUploadedImages] = useState([]);
    const [formData, setFormData] = useState({
        bannerCreateFormSet: [],
    });

    const navigate = useNavigate();

    const handleImageUpload = (url, index) => {
        const updatedImages = [...formData.bannerCreateFormSet];
        updatedImages[index] = { image: url };
        setFormData(prevFormData => ({
            ...prevFormData,
            bannerCreateFormSet: updatedImages,
        }));
    };

    const handleCreateBanner = async () => {
        try {
            if (formData.bannerCreateFormSet.length === 0) {
                toast.error("No banner data to create.");
                return;
            }

            const response = await bannerServices.createBanner(formData);

            if (response.status === 200) {
                toast.success("Banner created successfully!");
                fetchBannerData();

            } else {
                toast.success("Banner created successfully!");
                fetchBannerData();

            }
        } catch (error) {
            console.error("Error creating banner:", error);
            toast.error("An error occurred while creating the banner.");
        }
    };

    const [banners, setBanners] = useState();


    useEffect(() => {
        fetchBannerData();

    }, []);

    const fetchBannerData = async () => {
        const response = await bannerServices.getListBanner();
        setBanners(response.data.data);

    }

    // Xoa banner

    const handleDeleteBanner = async (id) => {
        try {
            const response = await bannerServices.deleteBanner(id);

            if (response.status === 200) {
                toast.success("Banner deleted successfully!");
                fetchBannerData();

            } else {
                toast.success("Banner deleted successfully!");
                fetchBannerData();

            }
        } catch (error) {
            console.error("Error deleting banner:", error);
            toast.error("An error occurred while deleting the banner.");
        }
    };


    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SiderBarWebStaff choose={"menu-key/5"} />
            <Layout>
                <NavBarWebStaff />
                <div
                    style={{
                        padding: "30px",
                        background: "white",
                        margin: "30px",
                        borderRadius: "12px",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}
                >
                    <h2>Thêm Ảnh Minh Họa</h2>

                    <Form layout="vertical" onFinish={handleCreateBanner}>
                        {/* Danh sách hình ảnh */}
                        <Form.List name="images">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'image']}
                                                fieldKey={[fieldKey, 'image']}
                                                rules={[{ required: true, message: 'Vui lòng nhập ảnh!' }]}
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

                        {/* Nút tạo banner */}
                        <Button type="primary"  onClick={handleCreateBanner} htmlType="submit">
                            Tạo Banner
                        </Button>
                    </Form>
                    <h2>Danh Sách</h2>

                    <div class="table-responsive">
                        <table
                            class="table table-striped"
                            style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        backgroundColor: "#f8f9fa",
                                        borderBottom: "2px solid #dee2e6",
                                    }}
                                >
                                    <th
                                        scope="col"
                                        style={{ padding: "15px", color: "#495057" }}
                                    >
                                        Tên khách
                                    </th>


                                    <th
                                        scope="col"
                                        style={{ padding: "15px", color: "#495057" }}
                                    >
                                        Hành Động
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                            {banners?.map((banner) => (
                    <tr key={banner.id}>
                        <td style={{ padding: '15px' }}>
                            <img src={banner?.image} alt="Banner" style={{ width: '30%', height: '30%' }} />
                        </td>
                        <td>
                            <Button onClick={() => showDeleteModal(banner.id)}>
                                <FontAwesomeIcon icon={faTrashCanArrowUp} size="lg" />
                            </Button>
                        </td>
                    </tr>
                ))}
                 <Modal
            title="Xác nhận xóa"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Có"
            cancelText="Không"
        >
            <p>Bạn có chắc chắn muốn xóa banner này không?</p>
        </Modal>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </Layout>
    );
};

export default ManageBanner;
