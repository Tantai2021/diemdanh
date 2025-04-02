// src/pages/Auth/Login.js
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import RecordServices from "../../services/AttendanceRecord";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Record = () => {
    const { class_id } = useParams();
    const [records, setRecords] = useState(null);

    useEffect(() => {
        const getAttendanceRecordsByClassId = async () => {
            try {
                const response = await RecordServices.getAttendanceRecordsByClassId(class_id);
                if (response) {
                    setRecords(response);
                    console.log(response);

                }
            } catch (error) {
                console.error(error);
            }
        };
        if (class_id) {
            getAttendanceRecordsByClassId();
        }
    }, [class_id]);

    console.log(records?.value)

    return <>
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
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </>) :
                    (<tr>
                        <td colSpan="3">1</td>
                    </tr>)}


            </tbody >
        </Table >
    </>;
};

export default Record;
