import React, { useEffect, useRef, useState } from 'react';

const CameraPage = () => {
    const videoRef = useRef(null);
    const streamRef = useRef(null); // Lưu stream để dễ dàng dừng

    const [error, setError] = useState(null);

    useEffect(() => {
        let isUnmounted = false;

        const start = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                if (!isUnmounted) {
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.onloadedmetadata = () => {
                            if (!isUnmounted) {
                                videoRef.current.play().catch((err) => {
                                    console.error('Không thể phát video: ', err);
                                    setError('Không thể phát video. Có thể trình duyệt đang chặn tự động phát.');
                                });
                            }
                        };
                    }
                }
            } catch (err) {
                if (!isUnmounted) {
                    console.error('Lỗi khi mở camera: ', err);
                    setError('Không thể mở camera, vui lòng kiểm tra quyền truy cập.');
                }
            }
        };

        start();

        return () => {
            isUnmounted = true;
            console.log("Unmount camera");
            stopCamera();
        };
    }, []);


    const stopCamera = () => {
        if (streamRef.current) {

            // Dừng tất cả các track của stream
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;

        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <video ref={videoRef} className="w-100" autoPlay muted playsInline></video>
        </div>
    );
};

export default CameraPage;
