import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CommonModal({ title, show, onHide, body, onSubmit }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        if (show && !hasMounted) {
            setHasMounted(true); // Chỉ set lần đầu khi modal mở
        } else if (!show && hasMounted) {
            setHasMounted(false); // Nếu modal đóng, sẽ unmount CameraPage
        }
    }, [show, hasMounted]);

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit();
        } else {
            onHide();
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Only render body if it has been mounted */}
                {hasMounted && body}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                {onSubmit ?
                    <Button onClick={handleSubmit}>Lưu</Button> : null}
            </Modal.Footer>
        </Modal>
    );
};

export default CommonModal;
