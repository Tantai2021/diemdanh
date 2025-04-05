import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { FaSignOutAlt, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../../context/Auth";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavWeb() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("Xin chào");

    useEffect(() => {
        if (user) {
            setTitle(() => {
                if (user.role === "admin") return "Admin Panel";
                else if (user.role === "teacher") return "Giáo Viên";
                else if (user.role === "student") return " Sinh Viên";
            });
        }
    }, [user]);

    return (
        <Navbar expand="lg" className="bg-dark px-4 shadow-sm">
            <Container>
                <Navbar.Brand className='text-light fw-bold fs-4'>{title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {user ? (
                        <div className="d-flex align-items-center gap-3">
                            <Navbar.Text className='text-light d-flex align-items-center gap-2'>
                                <FaUserCircle size={20} /> {user.email}
                            </Navbar.Text>
                            <Button
                                variant='outline-light'
                                className="d-flex align-items-center gap-2"
                                onClick={() => { logout(); navigate('/login') }}
                            >
                                <FaSignOutAlt /> Đăng xuất
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant='outline-light'
                            className="d-flex align-items-center gap-2"
                            onClick={() => navigate('/login')}
                        >
                            <FaSignInAlt /> Đăng nhập
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavWeb;
