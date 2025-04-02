import Navbar from 'react-bootstrap/Navbar';
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../../context/Auth";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
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
                else if (user.role === "student") return "Sinh Viên";
            })
        }
    }, [user]);


    return (
        <Navbar className="bg-dark px-4">
            <Navbar.Brand className='text-light fs-4'>{title}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {user ? (
                    <div>
                        <Navbar.Text className='text-light me-3'>
                            Đăng nhập với: <span> {user ? user.email : "Đăng nhập"}</span>
                        </Navbar.Text>
                        <Button variant='outline-danger' onClick={() => { logout(); navigate('/login') }}><FaSignOutAlt /> </Button>
                    </div>
                ) : (<Button ariant='outline-success' onClick={() => navigate('/login')}><FaSignInAlt /></Button>)
                }

            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavWeb;