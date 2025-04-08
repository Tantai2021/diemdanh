// src/components/Layout.js
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from "react-router-dom";

import Sidebar from "./partials/Sidebar/Sidebar";

const Layout = () => {
    return <>
        <Container fluid>
            <Row>
                <Col xl={3} md={4}><Sidebar /></Col>
                <Col xl={9} md={8} className="py-1">
                    <div className="border border-2 px-4 rounded h-100" style={{ overflowY: 'auto' }}>
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    </>;
};

export default Layout;
