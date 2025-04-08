import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import StudentService from "../../services/Student";

const StudentNotInSession = (props) => {
    const [students, setStudents] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    console.log(props.session);
    
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
    useEffect(() => {
        if (props.returnValue && selectedIds.length > 0) {
            props.returnValue(selectedIds);
        } else
            props.returnValue(null);

    }, [selectedIds, props.returnValue]);

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
            const allIds = students.map((student) => student.student_id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    }


    return <>
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> <input type="checkbox" checked={selectedIds.length === students.length} onChange={handleCheckboxAll} /> </th>
                        <th>MSSV</th>
                        <th>Họ lót</th>
                        <th>Tên</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? <>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td> <input type="checkbox" value={student.student_id} checked={selectedIds.includes(student.student_id)} onChange={handleCheckboxChange} /></td>
                                <td>{student.student_code}</td>
                                <td>{student.first_name}</td>
                                <td>{student.last_name}</td>
                            </tr>
                        ))}
                    </> : <><tr>
                        <td colSpan={4} className="text-center">Chưa có sinh viên nào</td>
                    </tr></>}
                </tbody >
            </Table >
        </div>
    </>;
};

export default StudentNotInSession;
