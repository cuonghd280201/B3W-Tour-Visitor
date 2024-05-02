import React, { useEffect, useState, useMemo } from "react";
import { Layout, Table, Space, Input, Switch, Select } from "antd";
import { message } from "antd";

import SiderBarWebAdmin from "./SlideBar/SiderBarWebAdmin";
import NavBarWebAdmin from "./Navbar/NavBarWebAdmin";
import adminServices from "../../services/admin.services";

const { Column } = Table;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const page = {
  pageSize: 5, // Number of items per page
};

const ListAccountCustomer = () => {
  const [switchStatusMap, setSwitchStatusMap] = useState({});
  const [allUser, setAllUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: null,
    order: null,
  });

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    const response = await adminServices.getAllUser();
    setAllUser(response.data.data);
    setFilteredUsers(response.data.data);
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase().trim();

    const filtered = allUser.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(searchValue);
      const emailMatch = user.email.toLowerCase().includes(searchValue);
      return nameMatch || emailMatch || searchValue === "";
    });
    setFilteredUsers(filtered);
  };

  const handleSortOptionChange = (value) => {
    if (value === "NAME_ASC") {
      handleSort("name", "ascend");
    } else if (value === "NAME_DESC") {
      handleSort("name", "descend");
    }
  };

  const handleSort = (columnKey, order) => {
    setSortedInfo({ columnKey, order });
  };

  const sortedDataSource = useMemo(() => {
    if (sortedInfo.columnKey && sortedInfo.order) {
      const sortedData = [...filteredUsers].sort((a, b) => {
        const result = a[sortedInfo.columnKey].localeCompare(
          b[sortedInfo.columnKey]
        );
        return sortedInfo.order === "ascend" ? result : -result;
      });
      return sortedData;
    }
    return filteredUsers;
  }, [sortedInfo, filteredUsers]);
  
  const banUserById = async (id) => {
    try {
      const response = await adminServices.banUserById(id);
      if (response.status === 500) {
        message.success("User banned successfully");
      } else {
        message.error("Hi");
      }
    } catch (error) {
      console.error("Error banning user:", error);
      message.success("User banned successfully");
      fetchAllUser();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWebAdmin choose={"menu-key/2"}></SiderBarWebAdmin>
      <Layout>
        <NavBarWebAdmin></NavBarWebAdmin>

        <div
          style={{
            margin: "20px",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <Content>
            <div>
              <h1
                style={{
                  padding: "15px 0px 0px 0px",
                  margin: "0px 0px 0px 20px",
                  color: "#4a4a4a",
                  fontSize: "24px",
                  fontWeight: "bold",
                  fontFamily: "Arial, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  borderBottom: "4px solid #6546D2",
                  display: "inline-block",
                }}
              >
                QUẢN LÝ KHÁCH HÀNG
              </h1>

              <Search
                placeholder="Tìm kiếm theo tên và email"
                allowClear
                onSearch={handleSearch}
                style={{
                  width: 250,
                  marginBottom: 16,
                  marginLeft: 490,
                  marginTop: 15,
                }}
              />
            </div>

            <Select
              defaultValue="Sắp xếp theo tên"
              onChange={handleSortOptionChange}
              style={{ marginLeft: "20px", width: "200px" }}
            >
              <Option value="NAME_ASC">Sắp xếp theo Tên (A - Z)</Option>
              <Option value="NAME_DESC">Sắp xếp theo Tên (Z - A)</Option>
            </Select>

            <div
              style={{
                padding: 25,
                minHeight: 400,
              }}
            >
              <div style={{ height: "600px", overflow: "auto" }}>
                <Table
                  className="custom-table"
                  dataSource={sortedDataSource}
                  pagination={page}
                  size="middle"
                  components={{
                    header: {
                      cell: (props) => (
                        <th
                          {...props}
                          style={{
                            background: "hsl(253deg 61% 85%)",
                            border: "none",
                          }}
                        />
                      ),
                    },
                  }}
                >
                  <Column
                    title="Avatar"
                    dataIndex="image"
                    key="image"
                    render={(img) => (
                      <img
                        src={img}
                        style={{ width: 45, height: 45, borderRadius: 5 }}
                      />
                    )}
                  />
                  <Column title="Tên" dataIndex="name" key="name" />
                  <Column title="Số điện thoại" dataIndex="phone" key="phone" />
                  <Column title="Email" dataIndex="email" key="email" />
                  <Column
                    title="Ngày sinh"
                    dataIndex="dateOfBirth"
                    key="dateOfBirth"
                  />
                  <Column title="Giới tính" dataIndex="gender" key="gender" />
                  <Column title="Vai trò" dataIndex="role" key="role" />
                  <Column
                    title="Trạng thái"
                    dataIndex="enable"
                    key="enable"
                    width={"150px"}
                    render={(text, record) => (
                      <span
                        style={{
                          backgroundColor: text ? "#32CD32" : "red",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                        }}
                      >
                        {text ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    )}
                  />
                  <Column
                    title="Vô hiệu hóa"
                    key="action"
                    render={(text, record) => (
                      <Space size="middle">
                        <Switch
                          checked={record.enable}
                          onChange={(checked, event) => {
                            event.stopPropagation();
                            const newRecord = {
                              ...record,
                              enable: !record.enable,
                            };
                            setSwitchStatusMap((prevMap) => ({
                              ...prevMap,
                              [record.id]: !record.enable,
                            }));
                            banUserById(record.id, !record.enable);
                          }}
                          size="small"
                          style={{
                            backgroundColor: record.enable ? "green" : "red",
                            borderColor: record.enable ? "green" : "red",
                          }}
                        />
                      </Space>
                    )}
                  />
                </Table>
              </div>
            </div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default ListAccountCustomer;
