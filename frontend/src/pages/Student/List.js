import React, { useEffect, useState } from "react";

import StudentService from "../../services/Student";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ListStudent = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await StudentService.getAllStudents();
                if (response) {
                    setStudents(response);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    const handleCreateAllQrcode = async () => {
        try {
            const response = await StudentService.createBulkQrcode();
            if (response) {
                console.log("QR codes created successfully:", response);
            }
        } catch (error) {
            console.error("Error creating QR_CODE:", error);
        }
    }

    return <>
        <div className="mt-3 mb-2">
            <Button variant="outline-primary" onClick={handleCreateAllQrcode}>Tạo QR_CODE</Button>
        </div>
        <div >
            <h4>Danh sách sinh viên</h4>
            {/* Add your student list rendering logic here */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center text-nowrap">STT</th>
                        <th className="text-center text-nowrap">Mã số sinh viên</th>
                        <th className="text-center text-nowrap">Họ lót</th>
                        <th className="text-center text-nowrap">Tên sinh viên</th>
                        <th className="text-center text-nowrap">Số điện thoại</th>
                        <th className="text-center text-nowrap">Email sinh viên</th>
                    </tr>
                </thead>
                <tbody>
                    {students && students.length > 0 ? students.map((student, index) => <>
                        <tr key={index}>
                            <td className="text-nowrap">{index + 1}</td>
                            <td className="text-nowrap">{student.student_code}</td>
                            <td className="text-nowrap">{student.first_name}</td>
                            <td className="text-nowrap">{student.last_name}</td>
                            <td className="text-nowrap">{student.phone}</td>
                            <td className="text-nowrap">{student.email}</td>
                        </tr>
                    </>) : <>
                        <tr>
                            <td colSpan={5} className="text-center">Chưa có sinh viên nào.</td>
                        </tr>
                    </>}

                </tbody>
            </Table>
        </div>
    </>;
};
export default ListStudent;
