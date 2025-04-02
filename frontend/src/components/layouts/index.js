// src/components/Layout.js
import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from "react-router-dom";

import { useAuth } from "../../context/Auth"; // Import useAuth để lấy thông tin người dùng
import NavWeb from "./partials/NavWeb";
import Sidebar from "./partials/Sidebar";

const Layout = ({ children }) => {
    const { loading } = useAuth();

    if (loading)
        return <div>Loading...</div>;

    return <>
        <Container>
            <NavWeb />
            <Row>
                <Col xl={3}><Sidebar /></Col>
                <Col xl={9}><Outlet /></Col>
            </Row>
        </Container>
    </>;
};

export default Layout;
