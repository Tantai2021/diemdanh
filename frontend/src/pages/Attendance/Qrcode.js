import React from "react";
import { QRCodeSVG } from "qrcode.react";

const Qrcode = ({ session }) => {

    return (
        <div style={{ textAlign: "center", marginTop: 20 }}>
            <QRCodeSVG value={session.toString()} size={200} />
        </div>
    );
};

export default Qrcode;
