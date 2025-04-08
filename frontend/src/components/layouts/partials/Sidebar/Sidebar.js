import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/Auth";
import { Button, Offcanvas } from 'react-bootstrap';
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaClipboardList, FaSignInAlt, FaSignOutAlt, FaList, FaCamera } from "react-icons/fa";

import styles from "./Sidebar.module.css";
const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const panel = user?.role === "admin" ? "Admin" : user?.role === "teacher" ? "Giáo Viên" : user?.role === "student" ? "Sinh Viên" : null;
    const menuItems = {
        admin: [
            { to: "/admin/students", label: "Quản lý sinh viên", icon: <FaUserGraduate /> },
            { to: "/admin/teachers", label: "Quản lý giảng viên", icon: <FaChalkboardTeacher /> },
            { to: "/admin/classes", label: "Quản lý lớp học", icon: <FaUsers /> },
            { to: "/admin/attendance", label: "Quản lý điểm danh", icon: <FaClipboardList /> }
        ],
        teacher: [
            { to: "/teacher/student-manager", label: "Tra cứu sinh viên", icon: <FaUsers /> },
            { to: "/teacher/timetable", label: "Thời khóa biểu", icon: <FaChalkboardTeacher /> },
            { to: "/teacher/attendance", label: "Điểm danh", icon: <FaClipboardList /> }
        ],
        student: [
            { to: "/qr-code", label: "Mã QR", icon: <FaClipboardList /> },
            { to: "/camera", label: "Quét mã", icon: <FaCamera /> },
            { to: "/profile", label: "Thông tin cá nhân", icon: <FaUserGraduate /> }
        ]
    };

    const userMenu = menuItems[user?.role] || [];

    return <>
        <div className="sidebar shadow vh-100 p-3 bg-dark d-none d-md-block">
            <div className="d-flex flex-column h-100">
                <h4 className="text-white fs-5">{panel}</h4>
                <div className="border border-1"></div>
                <ul className="list-unstyled mt-5" >
                    {userMenu.map((item, index) => (
                        <li key={index} className="mb-3">
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`${styles.sidebarLink} ${location.pathname === item.to ? styles.active : ''} text-decoration-none text-light`}
                            >
                                <span className="fs-5 me-2">{item.icon}</span>
                                <span className="fs-6 item-link">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto ms-auto">
                    {user ? (
                        <Button
                            variant='outline-danger'
                            className="d-flex align-items-center gap-2 btn-sm"
                            onClick={() => { logout(); navigate('/login') }}
                        >
                            Đăng xuất <FaSignOutAlt />
                        </Button>
                    ) : (
                        <Button
                            variant='outline-danger'
                            className="d-flex align-items-center gap-2 btn-sm"
                            onClick={() => navigate('/login')}
                        >
                            Đăng nhập <FaSignInAlt />
                        </Button>
                    )}
                </div>
            </div>
        </div>
        <div id="sub-nav" className="shadow-md d-block d-md-none bg-dark p-3">
            <div className="d-flex justify-content-between align-items-baseline">
                <h3 className="text-white fs-5 mb-0">{panel}</h3>
                <Button className="d-inline-block" variant="outline-secondary" onClick={handleShow}><FaList className="fs-6" /></Button>

                <Offcanvas show={show} onHide={handleClose} className="bg-dark" >
                    <Offcanvas.Header closeButton>
                        <h3 className="text-white fs-5 mb-0">{panel}</h3>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="d-flex flex-column h-100">
                            <ul className="list-unstyled mt-5" >
                                {userMenu.map((item, index) => (
                                    <li key={index} className="mb-3">
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            className={`${styles.sidebarLink} ${location.pathname === item.to ? styles.active : ''} text-decoration-none text-light`}
                                        >
                                            <span className="fs-5 me-2">{item.icon}</span>
                                            <span className="fs-6 item-link">{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto ms-auto">
                                {user ? (
                                    <Button
                                        variant='outline-danger'
                                        className="d-flex align-items-center gap-2 btn-sm"
                                        onClick={() => { logout(); navigate('/login') }}
                                    >
                                        Đăng xuất <FaSignOutAlt />
                                    </Button>
                                ) : (
                                    <Button
                                        variant='outline-danger'
                                        className="d-flex align-items-center gap-2 btn-sm"
                                        onClick={() => navigate('/login')}
                                    >
                                        Đăng nhập <FaSignInAlt />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    </>;
};

export default Sidebar;
