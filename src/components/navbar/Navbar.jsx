import React from "react";
import {
    Container,
    Navbar
} from "react-bootstrap";
import "../../assets/css/style.css";

const NavbarGeneral = () => {


    return (
        <Navbar style={{ backgroundColor: "#4B56D2" }}>
            <Container>
                <Navbar.Brand style={{ fontSize: "30px", color: "#FFFFFF"}}>
                    <span style={{ fontWeight: "700"}}>Github</span> Jobs
                </Navbar.Brand>
            </Container>
        </Navbar>
    );

};

export default NavbarGeneral;