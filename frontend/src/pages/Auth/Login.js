import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../context/Auth';
import { Slide, ToastContainer, toast } from 'react-toastify';

import AuthServices from '../../services/Auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("DH52111700@student.stu.edu.vn");
    const [password, setPassword] = useState("DH52111700");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (user)
            if (user.role === "admin")
                navigate('/admin');
            else if (user.role === "teacher")
                navigate('/teacher');
            else if (user.role === "student")
                navigate('/');

    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Dừng việc gửi form
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        try {
            const response = await AuthServices.login(email, password);

            if (response.status === 200) {
                // const decodeUser = jwtDecode();
                login(response.data.token);
                toast.success(response.data.message);
            } else {
                toast.error(response.response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Container className='d-flex justify-content-center align-items-center vh-100'>
                <div className='rounded border-secondary border px-5 py-3'>
                    <h3 className='text-center fs-4'>Đăng Nhập</h3>
                    <div className='border-secondary border mt-2 mb-3'> </div>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder="VD: DH52111700@student.stu.edu.vn"
                                defaultValue={"DH52111700@student.stu.edu.vn"}
                                list='cookies-email'
                                onChange={(e) => setEmail(e.target.value)} />
                            <Form.Control.Feedback type='invalid'>Vui lòng nhập email!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                placeholder="Password"
                                defaultValue={"DH52111700"}
                                onChange={(e) => setPassword(e.target.value)} />
                            <Form.Control.Feedback type='invalid'>Vui lòng nhập mật khẩu!</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="success" type="submit" className='ms-auto d-block'>
                            Đăng nhập
                        </Button>
                    </Form>
                </div>
            </Container>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        </>
    );
}

export default Login;