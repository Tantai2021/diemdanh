import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa";
import { Slide, ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../../context/Auth";
import StudentService from "../../services/Student";
const ProfileStudent = () => {
    const { user } = useAuth();
    const [student, setStudent] = useState({});
    const [studentUpdate, setStudentUpdate] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const phoneRegex = /^[0-9]{10}$/;

    const isEmptyValue = (obj) => {
        return Object.keys(obj).some(key => {
            const value = obj[key];
            return value === "" || value === null || value === undefined;
        });
    };
    const compareObjects = (obj1, obj2) => {
        const differences = [];
        const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
        allKeys.forEach(key => {
            if (obj1[key] !== obj2[key]) {
                differences.push(key);
            }
        });

        return differences;
    };


    const handleSetStudentUpdate = (e) => {
        const { name, value } = e.target;
        if (isUpdate) {
            setStudentUpdate(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }
    const handleUpdateProfile = () => {
        setIsUpdate(true);
        setStudentUpdate(student);
    }
    const handleSaveUpdate = () => {
        if (isUpdate) {
            if (isEmptyValue(studentUpdate)) {
                toast.error('Vui lòng nhập đầy đủ và chính xác thông tin');
                return;
            }
            // Validate số điện thoại
            if (!phoneRegex.test(studentUpdate.phone)) {
                toast.error('Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng');
                return;
            }
            if (compareObjects(student, studentUpdate).length == 0) {
                toast.info('Không có sự thay đổi');
                setIsUpdate(false);
                return;
            }
            StudentService.updateProfile(studentUpdate)
                .then(response => {
                    console.log(response);
                    toast.success(response?.message)
                })
                .catch(error => console.error(error));
        }
    }
    const handleCancelUpdate = () => {
        setIsUpdate(false);
    }
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
    console.log(student)
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
                                    <FaUserGraduate className="fs-1" />}
                            </div>
                        </Col>
                        <Col md={8}>
                            <div>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ và lót</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        value={(student?.first_name ?? '')}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        value={student?.last_name ?? ''}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label > Mã Số Sinh Viên </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="student_code"
                                        value={student?.student_code ?? ''}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label > Email </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={student?.email ?? ''}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label > Số Điện Thoại </Form.Label>
                                    <Form.Control
                                        type="phone"
                                        name="phone"
                                        value={!isUpdate ? (student?.phone ?? '') : (studentUpdate?.phone ?? '')}
                                        onChange={(e) => handleSetStudentUpdate(e)}
                                        readOnly={!isUpdate}
                                    />
                                </Form.Group >
                            </div>

                            <div className="profile-actions mb-3 d-flex justify-content-end gap-2">
                                {!isUpdate
                                    ? <Button variant="outline-primary" onClick={handleUpdateProfile}>
                                        Cập nhật
                                    </Button>
                                    : <>
                                        <Button onClick={handleSaveUpdate}>
                                            Lưu
                                        </Button>
                                        <Button variant="outline-primary" onClick={handleCancelUpdate}>
                                            Hủy
                                        </Button>
                                    </>}
                            </div>
                        </Col>
                    </Row>
                </Form >
            </div >
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                transition={Slide}
                stacked
            />
        </div >
    </>
};
export default ProfileStudent;