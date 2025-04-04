// src/pages/Auth/Login.js
import React, { useEffect, useState, useRef } from "react";
import { FaPlusCircle, FaCamera, FaQrcode, FaTrashAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import RecordServices from "../../services/AttendanceRecord";

// REACT BOOTSTRAP
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CommonModal from "../../components/custom/CommonModal";

// PAGES
import StudentNotInSession from "../../pages/Student/NotInSesison";
import CameraPage from "../../pages/Attendance/Camera";
import QrcodePage from "../../pages/Attendance/Qrcode";

const Record = () => {
    const { class_id } = useParams();
    const [records, setRecords] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalProps, setModalProps] = useState(null);
    const [returnValue, setReturnValue] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
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
    const handleAddStudent = () => {
        setModalShow(true);
        setModalProps({
            body: <StudentNotInSession session={records.session_id} returnValue={(value) => setReturnValue(value)} />,
            title: "Thêm sinh viên vào lớp",
        });
    };
    const handleOpenCamera = () => {
        setModalShow(true);
        setModalProps({
            body: <CameraPage />,  // Truyền modalShow để camera biết khi nào cần mở
            title: "Camera điểm danh",
        });
    };

    const handleOpenQrcode = () => {
        setModalShow(true);
        setModalProps({
            body: <QrcodePage />,
            title: "Qrcode điểm danh"
        });
    };
    const handleDeleteStudent = async () => {
        if (selectedIds.length > 0) {
            setModalShow(true);
            setModalProps({
                body: <span>Bạn chắc chắc muốn xóa những sinh viên này khỏi lớp</span>,
                title: "Xóa sinh viên",
                onSubmit: async () => {
                    try {
                        const response = await RecordServices.bulkDeleteAttendanceRecords(selectedIds);
                        if (response) {
                            setModalShow(false);
                            getAttendanceRecordsByClassId();
                            toast.error(response.message);
                            setSelectedIds([]);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            });

        }
    };
    const handleCheckboxChange = (e) => {
        const value = parseInt(e.target.value);

        if (e.target.checked) {
            setSelectedIds((prev) => [...prev, value]);
        } else {
            setSelectedIds((prev) => prev.filter((id) => id !== value));
        }
    };
    const handleCheckboxAll = (e) => {
        const checked = e.target.checked;
        if (checked) {
            const allIds = records?.value.map((record) => record.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    }

    useEffect(() => {
        if (class_id) {
            getAttendanceRecordsByClassId();
        }
    }, [class_id]);

    useEffect(() => {
        if (returnValue !== null) {
            setModalProps(prevProps => ({
                ...prevProps,
                onSubmit: async () => {
                    try {
                        const response = await RecordServices.bulkCreateAttendanceRecords({
                            session_id: records.session_id,
                            student_ids: returnValue
                        });
                        if (response) {
                            setModalShow(false);
                            getAttendanceRecordsByClassId();
                            toast.success(response.message);
                        }

                    } catch (error) {
                        console.log(error);
                    }
                }
            }));
        } else {
            setModalProps(prevProps => ({
                ...prevProps,
                onSubmit: undefined
            }));
        }
    }, [returnValue]);
    return <>
        <div className="my-2">
            <Button variant="outline-success" className="me-2" onClick={handleAddStudent}> <FaPlusCircle /> </Button>
            <Button variant="outline-success" className="me-2" onClick={handleOpenCamera}> <FaCamera /> </Button>
            <Button variant="outline-success" className="me-2" onClick={handleOpenQrcode}> <FaQrcode /> </Button>
            <Button variant="outline-danger" className="me-2" disabled={selectedIds.length === 0} onClick={handleDeleteStudent}> <FaTrashAlt /> </Button>
        </div>

        <div>
            <h3>{records?.session_code}</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> <input type="checkbox" checked={selectedIds.length === records?.value?.length} onChange={handleCheckboxAll} /> </th>
                        <th>Họ lót</th>
                        <th>Tên</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {records?.value?.length > 0 ? (<>
                        {records?.value?.map((item, index) => (
                            <tr key={index}>
                                <td> <input type="checkbox" value={item.id} checked={selectedIds.includes(item.id)} onChange={handleCheckboxChange} /></td>
                                <td>{item.student.first_name}</td>
                                <td>{item.student.last_name}</td>
                                <td>{item.status === "Absent" ? "Vắng mặt" : item.status === "None" ? "Chưa điểm danh" : "Đã điểm danh"}</td>
                            </tr>
                        ))}
                    </>) :
                        (<tr>
                            <td colSpan="4" className="text-center">Chưa có sinh viên nào trong lớp</td>
                        </tr>)}


                </tbody >
            </Table >
        </div>

        <CommonModal show={modalShow} onHide={() => setModalShow(false)} {...modalProps} />
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
            stacked
        />
    </>;
};

export default Record;
