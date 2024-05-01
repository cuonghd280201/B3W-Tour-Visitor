import {React, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faUserTie,
  faIdCardClip,
  faBuildingUser,
} from "@fortawesome/free-solid-svg-icons";
import {HomeOutlined,} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";


const { Sider } = Layout;

const SiderBarWebAdmin = ({ choose }) => {
  const [collapsed, setCollapsed] = useState(false);
  //"menu-key/10"
  const [selectedKeys, setSelectedKeys] = useState([choose]);
  const [isLeftIcon, setIsLeftIcon] = useState(true);
  const [showWeHire, setShowWeHire] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setIsLeftIcon(!isLeftIcon);
    setShowWeHire(!showWeHire);
  };

  const handleMenuClick = (item) => {
    setSelectedKeys([item.key]);
  };

  const handleSubMenuClick = (item) => {
    setSelectedKeys([item.key]);
  };

  const items = [
    {
      label: "Thống Kê",
      key: "menu-key/1",
      icon: <HomeOutlined />,
      className: "dashboard",
      link: "/dashboard",
    },

    {
      label: "Quản Lý Khách Hàng",
      key: "menu-key/2",
      icon: <FontAwesomeIcon icon={faUserTie} size="xl" />,
      className: "listAccountManager",
      link: "/listAccountCustomer",
    },
    {
      label: "Quản Lý Nhân Viên",
      key: "menu-key/3",
      icon: <FontAwesomeIcon icon={faIdCardClip} size="xl" />,
      className: "listAccountStaff",
      link: "/listAccountStaff", // Add the link property
    },
     {
       label: "Quản Lý Đơn hàng",
       key: "menu-key/4",
       icon: <FontAwesomeIcon icon={faBuildingUser} size="xl" />,
       className: "listAccountHR",
       link: "/listOrderStatus", // Add the link property
     },
     {
      label: "Báo Cáo Giao Dịch",
      key: "menu-key/5",
      icon: <FontAwesomeIcon icon={faBuildingUser} size="xl" />,
      className: "listTransaction",
      link: "/listTransaction", // Add the link property
    },
    {
      label: "Chuyến đi bị hủy",
      key: "menu-key/6",
      icon: <FontAwesomeIcon icon={faBuildingUser} size="xl" />,
      className: "listCancelTourAdmin",
      link: "/listCancelTourAdmin", // Add the link property
    }
   
  ];

  const navigate = useNavigate();

  return (
    <Sider
      collapsed={collapsed}
      width={250}
      style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
    >
      <div className="d-flex mt-3 justify-content-between ms-3 me-3 align-items-center">
        {showWeHire && (
          <div className="mb-0" id="wehire">
            <img
            src=""
              alt=""
              className="logo-light"
              style={{ objectFit: "cover", width: "170px" }}
            />
          </div>
        )}
        {isLeftIcon ? (
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f8f7fd",
              borderRadius: "10px",
            }}
          >
             <FontAwesomeIcon
              icon={faAngleLeft}
              size="xl"
              color="#6546D2"
              onClick={toggleSidebar}
              style={{ cursor: 'pointer'
            }}
            />
          </div>
        ) : (
          <div
            className="ms-2"
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f8f7fd",
              borderRadius: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              size="xl"
              color="#6546D2"
              onClick={toggleSidebar}
              style={{ cursor: 'pointer'}}
            />
          </div>
        )}
      </div>
      <Menu
        className="mt-4"
        style={{ border: "0px" }}
        defaultSelectedKeys={[choose]}
        selectedKeys={selectedKeys}
        mode="inline"
        onClick={handleMenuClick}
      >
        {items.map((item) => (
         
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SiderBarWebAdmin;
