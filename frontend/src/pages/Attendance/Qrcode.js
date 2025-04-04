import React from "react";
import { QRCodeSVG } from "qrcode.react";

const Qrcode = ({ text = "https://example.com" }) => {
    return (
        <div style={{ textAlign: "center", marginTop: 20 }}>
            <QRCodeSVG value={text} size={200} />
        </div>
    );
};

export default Qrcode;
