// src/pages/Auth/Login.js
import React, { useEffect, useState } from "react";

import StudentService from "../../services/Student";
import { useAuth } from "../../context/Auth";
const Home = () => {
    const { user } = useAuth();
    const [student, setStudent] = useState(null);

    const fetchQrCode = async () => {
        try {
            const response = await StudentService.getQrcodeByUserId();
            console.log(response);

            if (response) {
                setStudent(response);
            }
        } catch (error) {
            console.error("Error fetching QR code:", error);
        }
    }

    useEffect(() => {
        if (user)
            fetchQrCode();
    }, []);;
    return <>
        <div >
            <img className="w-50" src={student?.qr_code} />
        </div>
    </>;
};

export default Home;
