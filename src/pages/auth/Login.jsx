import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    Container,
    Form,
    Button,
    Image
} from "react-bootstrap";
import axios from "axios";
import { useSnackbar } from 'notistack';

import LoginImage from "../../assets/images/LoginImage.png";
import "../../assets/css/style.css";


const Login = () => {

    /* -------------------- Global Variable -------------------- */

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    /* -------------------- End Global Variable -------------------- */

    /* -------------------- Login Function -------------------- */

    const usernameField = useRef();
    const passwordField = useRef();

    const onLogin = async (e) => {

        e.preventDefault();

        try {

            const userToLoginPayload = {
                username: usernameField.current.value,
                password: passwordField.current.value,
            };


            const userLoginRequest = await axios.post(
                `http://localhost:8080/v1/api/login`,
                userToLoginPayload
            );

            const userLoginResponse = userLoginRequest.data;

            enqueueSnackbar(userLoginResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

            if (userLoginResponse.status) {

                localStorage.setItem("token", userLoginResponse.data.token);

                navigate("/jobs");

            }
        } catch (err) {

            enqueueSnackbar('Email atau password anda salah ):', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 2000 });

        }

    };

    /* -------------------- End Login Function -------------------- */

    return (

        <div>
            <Container>
                <Row className="row-login">
                    <Col className="col-login" xs={12} lg={5}>
                        <h2>Login <Image src="https://img.icons8.com/external-flat-juicy-fish/60/null/external-peace-hands-and-gestures-flat-flat-juicy-fish.png" /></h2>
                        <p>Login untuk informasi lebih lanjut</p>
                        <Form className="form-login">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control className="form-username" type="text" placeholder="Masukkan username mu" ref={usernameField}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className="form-password" type="text" placeholder="Masukkan password mu" ref={passwordField} autoComplete="off"/>
                            </Form.Group>
                        </Form>
                        <Row>
                            <Col className="content-loggedin d-flex justify-content-center" xs={12} lg={12}>
                                <Button onClick={onLogin}>
                                    <p>Login</p>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <p className="reserved-login">@2024 SandiLoka. All Rights Reserved.</p>
            <Image className="col-login-image" src={LoginImage} />
        </div>

    );
};

export default Login;