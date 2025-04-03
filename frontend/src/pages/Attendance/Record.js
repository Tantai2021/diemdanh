// src/pages/Auth/Login.js
import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaCamera, FaQrcode } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import RecordServices from "../../services/AttendanceRecord";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CommonModal from "../../components/custom/CommonModal";

import StudentNotInSession from "../../pages/Student/NotInSesison";
import CameraPage from "../../pages/Attendance/Camera";
import QrcodePage from "../../pages/Attendance/Qrcode";

const Record = () => {
    const { class_id } = useParams();
    const [records, setRecords] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalProps, setModalProps] = useState(null);

    useEffect(() => {
        const getAttendanceRecordsByClassId = async () => {
            try {
                const response = await RecordServices.getAttendanceRecordsByClassId(class_id);
                if (response) {
                    setRecords(response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (class_id) {
            getAttendanceRecordsByClassId();
        }
    }, [class_id]);

    const handleAddStudent = () => {
        setModalShow(true);
        setModalProps({
            body: <StudentNotInSession session={records.session_id} />,
            title: "Thêm sinh viên vào lớp"
        });
    };

    const handleOpenCamera = () => {
        setModalShow(true);
        setModalProps({
            body: <CameraPage />,
            title: "Camera điểm danh"
        });
    };

    const handleOpenQrcode = () => {
        setModalShow(true);
        setModalProps({
            body: <QrcodePage />,
            title: "Qrcode điểm danh"
        });
    };
    return <>
        <div className="my-2">
            <Button variant="outline-success" className="me-2" onClick={handleAddStudent}> <FaPlusCircle /> </Button>
            <Button variant="outline-success" className="me-2" onClick={handleOpenCamera}> <FaCamera /> </Button>
            <Button variant="outline-success" className="me-2" onClick={handleOpenQrcode}> <FaQrcode /> </Button>
        </div>

        <div>
            <h3>{records?.session_code}</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Họ lót</th>
                        <th>Tên</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {records?.value.length > 0 ? (<>
                        {records?.value.map((item, index) => (
                            <tr key={index}>
                                <td>{item.student.first_name}</td>
                                <td>{item.student.last_name}</td>
                                <td>{item.status === "Absent" ? "Vắng mặt" : "Đã điểm danh"}</td>
                            </tr>
                        ))}
                    </>) :
                        (<tr>
                            <td colSpan="3">1</td>
                        </tr>)}


                </tbody >
            </Table >
        </div>

        <CommonModal show={modalShow} onHide={() => setModalShow(false)} {...modalProps} />
    </>;
};

export default Record;
