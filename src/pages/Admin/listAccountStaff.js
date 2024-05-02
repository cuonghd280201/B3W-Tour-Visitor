import React, { useEffect, useState,useMemo } from "react";
import { Layout, Table, Space, Input, Switch, Select } from "antd";

import SiderBarWebAdmin from "./SlideBar/SiderBarWebAdmin";
import NavBarWebAdmin from "./Navbar/NavBarWebAdmin";
import adminServices from "../../services/admin.services";
const page = {
  pageSize: 5, // Number of items per page
};

const { Column } = Table;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const ListAccountStaff = () => {
  // State for switch status
  const [switchStatusMap, setSwitchStatusMap] = useState({});
  const [allStaff, setAllStaff] = useState();
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: null,
    order: null,
  });

  useEffect(() => {
    fetchAllStaff();
  }, []);

  const fetchAllStaff = async () => {
    const response = await adminServices.getAllStaff();
    setAllStaff(response.data.data);
    setFilteredStaff(response.data.data); // Initialize filtered staff with all staff
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase().trim();
    const filtered = allStaff.filter((staff) => {
      const name = staff.name.toLowerCase().includes(searchValue);
      const email = staff.email.toLowerCase().includes(searchValue);
      return name || email || searchValue === "";
    });
    setFilteredStaff(filtered);
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
      const sortedData = [...filteredStaff].sort((a, b) => {
        const result = a[sortedInfo.columnKey].localeCompare(
          b[sortedInfo.columnKey]
        );
        return sortedInfo.order === "ascend" ? result : -result;
      });
      return sortedData;
    }
    return filteredStaff;
  }, [sortedInfo, filteredStaff]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderBarWebAdmin choose={"menu-key/3"}></SiderBarWebAdmin>
      <Layout>
        <NavBarWebAdmin></NavBarWebAdmin>

        <div
          style={{
            padding: "10px 5px 0px 5px",
            background: "white",
            margin: "30px",
            borderRadius: "12px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
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
                QUẢN LÝ NHÂN VIÊN
              </h1>

              <Search
                placeholder="Tìm kiếm theo tên và email"
                allowClear
                onSearch={handleSearch}
                style={{
                  width: 250,
                  marginBottom: 16,
                  marginLeft: 525,
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
                            background: "linear-gradient(to top, #7B68EE, #87CEFA)",
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
                          backgroundColor: text ? "green" : "red",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                        }}
                      >
                        {text ? "Hoạt động" : "Inactive"}
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

                            // Toggle the 'enable' property of the record
                            const newRecord = {
                              ...record,
                              enable: !record.enable,
                            };

                            // Update the switch status map
                            setSwitchStatusMap((prevMap) => ({
                              ...prevMap,
                              [record.userId]: !record.enable,
                            }));

                            // Update the record in the data source
                            // Replace this line with your actual update logic
                            // updateRecord(newRecord);
                          }}
                          size="small" // Set size to "small" for iOS-like appearance
                          style={{
                            backgroundColor: record.enable ? "green" : "red", // Determine color based on the 'enable' property
                            borderColor: record.enable ? "green" : "red", // Determine border color accordingly
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

export default ListAccountStaff;
