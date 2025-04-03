import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import StudentService from "../../services/Student";

const StudentNotInSession = (props) => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getStudentNotInSesion = async () => {
            try {
                const response = await StudentService.getStudentNotInSesion(props.session);
                if (response?.students)
                    setStudents(response.students);
            } catch (error) {
                console.error(error);
            }
        };
        if (props.session) {
            getStudentNotInSesion();
        }

    }, [props.session]);
    console.log(students);

    return <>
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>MSSV</th>
                        <th>Họ lót</th>
                        <th>Tên</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? <>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td></td>
                                <td>{student.student_code}</td>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                            </tr>
                        ))}
                    </> : <><tr>
                        <td>Chưa có sinh viên nào</td>
                    </tr></>}
                </tbody >
            </Table >
        </div>
    </>;
};

export default StudentNotInSession;
