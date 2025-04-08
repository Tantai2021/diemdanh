import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";

import { useAuth } from "../../context/Auth";
import StudentService from "../../services/Student";
const ProfileStudent = () => {
    const { user } = useAuth();
    const [student, setStudent] = useState(null);
    useEffect(() => {
        const getProfileStudent = async () => {
            try {
                const response = await StudentService.getProfile();
                if (response)
                    setStudent(response);
            } catch (error) {
                console.error("Error fetching student profile:", error);
            }
        };

        getProfileStudent();
    }, []);
    console.log(user);

    return <>
        <div className="profile-container mt-3">
            <h4 className="fs-5 mb-3 text-center">Thông tin cá nhân</h4>
            <div className="profile-info">
                <Form>
                    <Row>
                        <Col md={4}>
                            <div className="w-100 text-center">
                                {student?.image ?
                                    <img src={student?.image} /> :
                                    <FaRegUserCircle className="fs-1" />}
                            </div>
                        </Col>
                        <Col md={8}>
                            <Form.Group className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label >
                                    Họ và tên
                                </Form.Label>
                                <Form.Control readOnly value={student?.first_name + " " + student?.last_name} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formStudentCode">
                                <Form.Label >
                                    Mã Số Sinh Viên
                                </Form.Label>
                                <Form.Control readOnly value={student?.student_code} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formStudentEmail">
                                <Form.Label >
                                    Email
                                </Form.Label>
                                <Form.Control readOnly value={student?.email} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formStudentPhone">
                                <Form.Label >
                                    Số Điện Thoại
                                </Form.Label>
                                <Form.Control type="" value={student?.phone} />
                            </Form.Group >
                        </Col>
                    </Row>
                </Form >
            </div >
            <div className="profile-actions mb-3">
                <Button className="ms-auto d-block" variant="outline-primary" onClick={() => alert("Chức năng đang phát triển")}>
                    Cập nhật
                </Button>
            </div>
        </div >
    </>
};
export default ProfileStudent;