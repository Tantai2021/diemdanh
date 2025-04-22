import { useEffect, useState } from 'react';
import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../../context/Auth';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AuthServices from '../../services/Auth';
import './Login.css'; // Đường dẫn CSS custom (tạo thêm file nếu muốn thêm hiệu ứng đẹp)

function Login() {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [typePassword, setTypePassword] = useState("password");

    useEffect(() => {
        if (user) {
            const timeout = setTimeout(() => {
                switch (user.role) {
                    case "teacher":
                        navigate('/teacher');
                        break;
                    case "student":
                        navigate('/');
                        break;
                    default:
                        break;
                }
            }, 3000); // delay 3 giây

            return () => clearTimeout(timeout); // clear nếu component unmount
        }
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        try {
            const response = await AuthServices.login(email, password);
            if (response.status === 200) {
                login(response.data.token);
                toast.success(response.data.message);
            } else {
                toast.error(response.response.data.message);
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại!");
            console.error(error);
        }
    };

    const togglePasswordType = () => {
        setTypePassword(prev => prev === "password" ? "text" : "password");
    };

    return (
        <>
            <Container fluid className="login-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <Card className="shadow-lg p-4 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="text-center mb-3">
                        <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="logo" style={{ width: 50, height: 50 }} />
                        <h4 className='mt-2 fw-bold'>Chào mừng trở lại!</h4>
                        <p className="text-muted">Đăng nhập để tiếp tục</p>
                    </div>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                placeholder="VD: example@student.stu.edu.vn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <div className={`password-input ${validated && !password ? 'invalid' : ''} ${validated && password ? 'valid' : ''}`}>
                                <Form.Control
                                    type={typePassword}
                                    required
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isInvalid={validated && !password}
                                />
                                <span
                                    className="eye-icon"
                                    onClick={togglePasswordType}
                                >
                                    {typePassword === "password" ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>

                        </Form.Group>



                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Đăng nhập
                        </Button>
                    </Form>
                </Card>
            </Container>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                transition={Slide}

            />
        </>
    );
}

export default Login;
