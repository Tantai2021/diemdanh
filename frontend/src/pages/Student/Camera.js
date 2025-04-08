import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { Slide, ToastContainer, toast } from 'react-toastify';
import { Button } from "react-bootstrap";

import AttendanceRecord from "../../services/AttendanceRecord";

const CameraStudent = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [qrData, setQrData] = useState(null);
    const [error, setError] = useState(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch((err) => {
                        console.error("Không thể phát video: ", err);
                        setError("Không thể phát video. Có thể trình duyệt đang chặn tự động phát.");
                    });
                    // Gọi hàm quét QR sau khi video bắt đầu phát
                    scanQRCode();
                };
            }
            setIsCameraOpen(true);
        } catch (err) {
            console.error("Lỗi khi mở camera: ", err);
            setError("Không thể mở camera, vui lòng kiểm tra quyền truy cập.");
        }
    };

    const scanQRCode = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d", { willReadFrequently: true });

        const scan = () => {
            if (!videoRef.current || !canvasRef.current) return;

            const video = videoRef.current;

            if (video.videoWidth === 0 || video.videoHeight === 0) {
                requestAnimationFrame(scan);  // Tiếp tục quét nếu video chưa có kích thước hợp lệ
                return;
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                setQrData(code.data);  // Lấy dữ liệu từ mã QR
            }
            requestAnimationFrame(scan);  // Quay lại quét tiếp

        };

        requestAnimationFrame(scan);
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);  // Chỉ gọi một lần khi component mount

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    };

    useEffect(() => {
        if (qrData) {
            console.log(qrData);
            const attendaneByCamera = async () => {
                const response = await AttendanceRecord.updateAttendanceRecordBySessionCode(qrData);
                if (response?.status === 404)
                    toast.error(response.data?.message);
                else
                    toast.success(response.message);
            }
            try {
                attendaneByCamera();
            } catch (error) {
                toast.error(error?.message);
            }
        };
    }, [qrData]); // Chỉ gọi khi qrData thay đổi\
    return <>
        <Button
            className="my-2"
            disabled={isCameraOpen}
            hidden={isCameraOpen}
            onClick={startCamera}>Bật camera
        </Button>
        <Button
            className="my-2"
            disabled={!isCameraOpen}
            hidden={!isCameraOpen}
            onClick={stopCamera}>Đóng camera
        </Button>
        <div className="w-50" >
            {error && <p style={{ color: "red" }}>{error}</p>}
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-100"
                style={{ display: isCameraOpen ? 'block' : 'none' }}  // Ẩn video khi camera chưa mở
            ></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div >
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

export default CameraStudent;
