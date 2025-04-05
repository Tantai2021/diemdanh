// src/pages/Auth/Login.js
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import ClassesServices from "../../services/Classes";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/Auth";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Home = () => {
    const { user } = useAuth();
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
    return <>
        <div className="mt-3 mb-4">
            <h3 className="text-center fs-5">Thời Khóa Biểu</h3>
            <div className="border border-1"></div>
        </div>
        <Table striped bordered hover responsive className="table-custom">
            <thead>
                <tr className="table-header">
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
                            <tr key={index} className="table-row">
                                <td>{classItem.class_code}</td>
                                <td>{classItem.class_name}</td>
                                <td>{classItem.start_date}</td>
                                <td className="text-center">
                                    <Button
                                        variant="outline-success"
                                        className="btn-sm button-hover"
                                        onClick={() => user?.role === "student" ? navigate(`unauthorized`) : navigate(`attendance-record/${classItem.class_id}`)}
                                    >
                                        <FaEye />
                                    </Button>
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
