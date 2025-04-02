// src/pages/Auth/Login.js
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import ClassesServices from "../../services/Classes";
import { useNavigate } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Home = () => {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();

    const getClasses = async () => {
        try {
            const response = await ClassesServices.getClasses();
            if (response?.classes)
                setClasses(response.classes);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getClasses();
    }, []);
    console.log(classes)
    return <>
        <h3 className="mt-3 mb-2">Thời Khóa Biểu</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Mã Lớp</th>
                    <th>Tên Lớp</th>
                    <th>Ngày học</th>
                    <th className="text-center">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                {classes.length > 0 ? (
                    <>
                        {classes.map((classItem, index) => (
                            <tr key={index}>
                                <td>{classItem.class_code}</td>
                                <td>{classItem.class_name}</td>
                                <td>{classItem.start_date}</td>
                                <td className="text-center">
                                    <Button variant="outline-success" className="btn-sm" onClick={() => navigate(`attendance-record/${classItem.class_id}`)}><FaEye /></Button>
                                </td>
                            </tr>
                        ))}
                    </>
                ) : (
                    <tr>
                        <td colSpan={4} className="text-center">Không có dữ liệu</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </>;
};

export default Home;
