import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Container,
    Image
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import JobLayout from "../../layouts/job/JobLayout";
import "../../assets/css/style.css";

const JobDetail = () => {

    const navigate = useNavigate();

    const [jobDetail, setJobDetail] = useState();

    const params = useLocation();

    const id = (params.pathname).split('/')[2];

    useEffect(() => {

        const onSearch = async () => {

            try {

                const token = localStorage.getItem("token");

                const getJobDetailRequest = await axios.get(
                    `http://localhost:8080/v1/api/jobs/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const getJobDetailResponse = getJobDetailRequest.data;

                setJobDetail(getJobDetailResponse.data.handleGetJobById[0]);

            } catch (err) {
                alert(err.message);
            }

        };

        onSearch();

    }, [id]);

    return (

        <JobLayout>
            <Container>
                <Row id="button-back">
                    <Col xs={12} lg={6} onClick={() => navigate(`/jobs`)}>
                        <p style={{ fontWeight: "700", color: "#4B56D2", cursor: "pointer" }}> <i className="bi bi-caret-left"></i> Back</p>
                    </Col>
                </Row>
                <Row id="job-detail-header">
                    <Col xs={12} lg={12}>
                        <p>{jobDetail ? jobDetail.type : null} / {jobDetail ? jobDetail.location : null}</p>
                    </Col>
                    <Col xs={12} lg={12}>
                        <p style={{ fontSize: "30px", fontWeight: "700", color: "#000000" }}>{jobDetail ? jobDetail.title : null}</p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs={12} lg={7}>
                        <div dangerouslySetInnerHTML={{__html: jobDetail ? jobDetail.description : null}}/>
                    </Col>
                    <Col xs={12} lg={5}>
                        <div className="job-detail-company">
                            <div className="company-name">
                                <p>{jobDetail ? jobDetail.company : null}</p>
                            </div>
                            <div className="company-logo">
                                <Image src={jobDetail ? jobDetail.company_logo : null} alt={jobDetail ? jobDetail.company : null}/>
                                <br />
                                <a href={jobDetail ? jobDetail.company_url : null}>{jobDetail ? jobDetail.company_url : null}</a>
                            </div>
                        </div>
                        <div className="job-detail-apply">
                            <div className="job-apply">
                                <p style={{ fontWeight: "600", color: "#000000" }}>How to Apply</p>
                            </div>
                            <div className="job-apply-description">
                                <div dangerouslySetInnerHTML={{__html: jobDetail ? jobDetail.how_to_apply : null}}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr />
            </Container>
        </JobLayout>

    );

};

export default JobDetail;