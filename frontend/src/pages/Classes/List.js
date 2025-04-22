import React, { useEffect, useState, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import ClassesServices from "../../services/Classes";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/Auth";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
    const { user } = useAuth();
    const [classes, setClasses] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await ClassesServices.getClassByTeacherId();
                if (response) {
                    setClasses(response);
                }
            } catch (error) {
                setError("Lỗi tải dữ liệu thời khóa biểu");
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const filterClasses = useMemo(() => {
        let filtered = classes;

        if (selectedWeek) {
            const startOfWeek = moment(selectedWeek).startOf('week');
            const endOfWeek = moment(selectedWeek).endOf('week');
            filtered = filtered.filter(item =>
                moment(item.start_date).isBetween(startOfWeek, endOfWeek, null, '[]')
            );
        } else if (selectedDate) {
            filtered = filtered.filter(item =>
                moment(item.start_date).isSame(selectedDate, 'day')
            );
        } else {
            const startOfWeek = moment().startOf('week');
            const endOfWeek = moment().endOf('week');
            filtered = filtered.filter(item =>
                moment(item.start_date).isBetween(startOfWeek, endOfWeek, null, '[]')
            );
        }

        return filtered;
    }, [selectedDate, selectedWeek, classes]);

    return (
        <>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <h3 className="fs-5">Xem Thời Khóa Biểu</h3>
            </div>

            {/* Bộ lọc ngày */}
            <div className="border border-1 p-3 rounded d-flex gap-3">
                <div className="d-flex flex-column">
                    <label htmlFor="selectedWeek" className="form-label">Chọn tuần:</label>
                    <DatePicker
                        id="selectedWeek"
                        selected={selectedWeek}
                        onChange={(date) => {
                            setSelectedWeek(date);
                            setSelectedDate(null); // bỏ chọn ngày nếu đang chọn tuần
                        }}
                        showWeekNumbers
                        showPopperArrow={false}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="Chọn tuần"
                    />
                </div>
                <div className="d-flex flex-column">
                    <label htmlFor="selectedDate" className="form-label">Chọn ngày cụ thể:</label>
                    <DatePicker
                        id="selectedDate"
                        selected={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                            setSelectedWeek(null); // bỏ chọn tuần nếu đang chọn ngày
                        }}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="Chọn ngày"
                    />
                </div>

            </div>


            {/* Nội dung thời khóa biểu */}
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <div className="text-danger">{error}</div>
            ) : (
                <div>
                    <h5 className="mt-3">
                        {selectedWeek ? `Thời khóa biểu trong tuần: ${moment(selectedWeek).startOf('week').format('DD/MM')} - ${moment(selectedWeek).endOf('week').format('DD/MM')}` :
                            selectedDate ? `Thời khóa biểu ngày ${moment(selectedDate).format('DD/MM/YYYY')}` :
                                `Thời khóa biểu tuần này: ${moment().startOf('week').format('DD/MM')} - ${moment().endOf('week').format('DD/MM')}`}
                    </h5>
                    <Table striped bordered hover responsive className="table-custom mt-2">
                        <thead>
                            <tr className="table-header">
                                <th>Mã Lớp</th>
                                <th>Tên Lớp</th>
                                <th>Ngày học</th>
                                <th className="text-center">Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterClasses.length > 0 ? (
                                filterClasses.map((classItem, index) => (
                                    <tr key={index} className="table-row">
                                        <td>{classItem.class_code}</td>
                                        <td>{classItem.class_name}</td>
                                        <td>{moment(classItem.start_date).format('DD/MM/YYYY')}</td>
                                        <td className="text-center">
                                            <Button
                                                variant="outline-success"
                                                className="btn-sm"
                                                onClick={() => user?.role === "student" ? navigate(`unauthorized`) : navigate(`record/${classItem.class_id}`)}
                                            >
                                                <FaEye />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center">Không có lớp học</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    );
};

export default Home;
