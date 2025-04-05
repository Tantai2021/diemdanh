// src/components/Layout.js
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from "react-router-dom";

import { useAuth } from "../../context/Auth"; // Import useAuth để lấy thông tin người dùng

import Sidebar from "./partials/Sidebar/Sidebar";

const Layout = () => {
    const { loading } = useAuth();

    if (loading)
        return <div>Loading...</div>;

    return <>
        <Container fluid="sm">
            <Row>
                <Col xl={3} md={4}><Sidebar /></Col>
                <Col xl={9} md={8} >
                    <Outlet />
                </Col>
            </Row>
        </Container>
    </>;
};

export default Layout;
