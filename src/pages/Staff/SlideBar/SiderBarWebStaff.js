import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faUserTie,
  faIdCardClip,
  faChalkboardUser,
  faBuildingUser,
  faUserGear,
  faSignal,
  faCodeMerge
} from "@fortawesome/free-solid-svg-icons";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  HomeOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  CodeOutlined,
  AuditOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";


const { Sider } = Layout;

const SiderBarWebStaff = ({ choose }) => {
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
      label: "Danh Sách Chuyến Đi",
      key: "menu-key/1",
      icon: <HomeOutlined />,
      className: "listTourStaff",
      link: "/listTourStaff",
    },

    // {
    //   label: "User",
    //   key: "menu-key/sub-menu-key",
    //   icon: <UserOutlined />,
    //   children: [
    //     { label: "Manager", key: "menu-key/sub-menu-key/3" },
    //     { label: "Staff", key: "menu-key/sub-menu-key/4" },
    //     { label: "Human Resource", key: "menu-key/sub-menu-key/5" },
    //     { label: "Developer", key: "menu-key/sub-menu-key/6" },
    //   ],
    //   className: "option-2",
    // },

    {
      label: "Danh Sách Chuyển Đi Đã Đặt",
      key: "menu-key/2",
      icon: <FontAwesomeIcon icon={faUserTie} size="xl" />,
      className: "listTourVisitorStaff",
      link: "/listTourVisitorStaff",
    },
   
     {
       label: "Chuyến Đi Bị Hủy",
       key: "menu-key/3",
       icon: <FontAwesomeIcon icon={faBuildingUser} size="xl" />,
       className: "listCancelTourStaff",
       link: "/listCancelTourStaff", // Add the link property
     },
     {
      label: "Tạo banner",
      key: "menu-key/4",
      icon: <FontAwesomeIcon icon={faUserGear} size="xl" />,
      className: "manageBanner",
      link: "/manageBanner", // Add the link property
    },
    // {
    //   label: "Developer",
    //   key: "menu-key/5",
    //   icon: <FontAwesomeIcon icon={faChalkboardUser} size="xl" />,
    //   className: "listAccountDeveloper",
    //   link: "/listAccountDeveloper", // Add the link property
    // },
    // {
    //   label: "Manage Skill",
    //   key: "menu-key/6",
    //   icon: <FontAwesomeIcon icon={faUserGear} size="xl" />,
    //   className: "manageSKill",
    //   link: "/manageSkill", // Add the link property
    // },
    // {
    //   label: "Manage Level",
    //   key: "menu-key/7",
    //   icon: <FontAwesomeIcon icon={faSignal} size="xl" />,
    //   className: "manageLevel",
    //   link: "/manageLevel", // Add the link property
    // },
    // {
    //   label: "Manage Type",
    //   key: "menu-key/8",
    //   icon: <FontAwesomeIcon icon={faCodeMerge} size="xl" />,
    //   className: "manageType",
    //   link: "/manageType", // Add the link property
    // },
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
            />
          </div>
        )}
      </div>
      <Menu
        className="mt-4"
        style={{ border: "0px" }}
        //"menu-key/10"
        defaultSelectedKeys={[choose]}
        selectedKeys={selectedKeys}
        mode="inline"
        onClick={handleMenuClick}
      >
        {items.map((item) => (
          //   item.children ? (
          //     <Menu.SubMenu
          //       key={item.key}
          //       icon={item.icon}
          //       title={item.label}
          //       onClick={() => handleSubMenuClick(item)}
          //     >
          //       {item.children.map((child) => (
          //         <Menu.Item key={child.key}>
          //           {child.label === "Manager" && (
          //             <Link to="/listAccountManager">{child.label}</Link>
          //           )}
          //           {child.label === "Staff" && (
          //             <Link to="/listAccountStaff">{child.label}</Link>
          //           )}
          //           {child.label === "Human Resource" && (
          //             <Link to="/listAccountHR">{child.label}</Link>
          //           )}
          //           {child.label === "Developer" && (
          //             <Link to="/listAccountDeveloper">{child.label}</Link>
          //           )}
          //         </Menu.Item>
          //       ))}
          //     </Menu.SubMenu>
          //   ) :
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SiderBarWebStaff;
