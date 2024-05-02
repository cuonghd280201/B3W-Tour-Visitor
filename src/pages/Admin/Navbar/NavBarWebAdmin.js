import React, { useState, useEffect } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from '@firebase/auth';
import { auth } from "../../../utils/firebase";

const NavBarWebAdmin = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    //-------------------------------------------------------------------------
    const userId = localStorage.getItem("userId");
    //-------------------------------------------------------------------------
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    //------------------------------------------------------------------------
    const [showPopupProfileUser, setShowPopupProfileUser] = useState(false);

    const openPopupProfileUser = () => {
        setShowPopupProfileUser(true);
    };

    const closePopupProfileUser = () => {
        setShowPopupProfileUser(false);
    };

    //-------------------------------------------------------------------------
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate("/login")
        } catch (error) {
            console.error(error);
        }
    }


    //------------------------------------------------------------------------
    return (
        <React.Fragment>
            <div>
                <div
                    style={{
                        backgroundColor: "#FFFF",
                        height: "70px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "7px",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        marginLeft: "30px",
                        marginRight: "30px",
                        marginBottom: "0px",
                    }}
                    className="mt-4 justify-content-end"
                >
                    <div
                        
                    >

                        <div
                            className="p-1  d-flex gap-3 align-items-center me-2"
                            style={{
                                height: "60px",
                                color: "white",
                                borderRadius: "7px",
                            }}
                        >
                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                <DropdownToggle
                                    className="p-1 d-flex gap-3 align-items-center"
                                    style={{
                                        height: "60px",
                                        backgroundColor: "#6546D2",
                                        color: "white",

                                        cursor: "pointer",
                                        border: "0px",
                                    }}
                                >
                                    <div>
                                        <img
                                            src={user.photoURL}
                                            className="ms-1 px-0"
                                            style={{
                                                borderRadius: "7px",
                                                height: "50px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <div className="me-1 d-flex flex-column align-items-center">
                                        <span className="fs-18">{user.email}</span>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu
                                    style={{
                                        marginLeft: "80px",
                                    }}
                                >
                                    <DropdownItem style={{ padding: "0px" }}>
                                    <div>
                                            <Link className="dropdown-item" onClick={handleLogout}>
                                                Đăng Xuất
                                            </Link>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NavBarWebAdmin;
