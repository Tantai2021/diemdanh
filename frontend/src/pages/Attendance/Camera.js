import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { Slide, ToastContainer, toast } from 'react-toastify';


import AttendanceRecord from "../../services/AttendanceRecord";
const CameraPage = ({ session }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [qrData, setQrData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isUnmounted = false;

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

                if (!isUnmounted) {
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.onloadedmetadata = () => {
                            if (!isUnmounted) {
                                videoRef.current.play().catch((err) => {
                                    console.error("Không thể phát video: ", err);
                                    setError("Không thể phát video. Có thể trình duyệt đang chặn tự động phát.");
                                });
                                // Gọi hàm quét QR sau khi video bắt đầu phát
                                scanQRCode();
                            }
                        };
                    }
                }
            } catch (err) {
                if (!isUnmounted) {
                    console.error("Lỗi khi mở camera: ", err);
                    setError("Không thể mở camera, vui lòng kiểm tra quyền truy cập.");
                }
            }
        };

        const scanQRCode = () => {
            if (!videoRef.current || !canvasRef.current) return;
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d", { willReadFrequently: true });

            const scan = () => {
                if (!videoRef.current || !canvasRef.current) return;

                const video = videoRef.current;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);

                if (code) {
                    const qrCode = code.data.substring(0, 10); // Giới hạn độ dài dữ liệu QR
                    setQrData(qrCode);  // Lấy dữ liệu từ mã QR
                }
                requestAnimationFrame(scan);  // Quay lại quét tiếp

            };

            requestAnimationFrame(scan);
        };

        startCamera();

        return () => {
            isUnmounted = true;
            stopCamera();
        };
    }, []);  // Chỉ gọi một lần khi component mount

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
    };

    useEffect(() => {
        if (qrData) {
            const attendaneByCamera = async () => {
                const response = await AttendanceRecord.updateAttendanceRecordByStudentCode(qrData, session);
                if (response)
                    toast.success(response.message);
            }
            attendaneByCamera();
        };
    }, [qrData]); // Chỉ gọi khi qrData thay đổi
    return <>
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <video ref={videoRef} className="w-100" autoPlay muted playsInline></video>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        </div>
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

export default CameraPage;
