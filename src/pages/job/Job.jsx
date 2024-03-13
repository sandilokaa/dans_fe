import React, { useState, useEffect, useRef } from "react";
import {
    Row,
    Col,
    Container,
    Form,
    Button
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/style.css";
import JobLayout from "../../layouts/job/JobLayout";

const Job = () => {

    const navigate = useNavigate();

    const [jobList, setJobList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const descriptionField = useRef();
    const locationField = useRef();

    const onSearch = async () => {

        const getDescription = descriptionField.current.value;
        const getLocation = locationField.current.value;

        const token = localStorage.getItem("token");

        const getJobListRequest = await axios.get(
            `http://localhost:8080/v1/api/jobs?description=${getDescription}&location=${getLocation}&page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );


        const getJobListResponse = await getJobListRequest.data;

        console.log(getJobListResponse);

        setJobList(getJobListResponse.data.handleGetJobList.jobs);
        setTotalPages(getJobListResponse.data.handleGetJobList.totalPages);

    };

    useEffect(() => {

        onSearch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (

        <JobLayout>
            <Container>
                <Row id="job-search">
                    <Col xs={12} lg={4} className="job-description">
                        <p style={{ fontWeight: "600" }}>Job Description</p>
                        <Form className="form-job-description">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control className="form-job-description" type="text" placeholder="Filter by title, benefits, companies, expertise" ref={descriptionField} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12} lg={4} className="job-location">
                        <p style={{ fontWeight: "600" }}>Location</p>
                        <Form className="form-job-location">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control className="form-job-location" type="text" placeholder="Filter by city, state, zip code or country" ref={locationField} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={12} lg={2} className="job-full-time">
                        <div className="w-100 d-flex justify-content-center">
                            <Form className="form-job-full-time">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Check className="form-full-time" type="checkbox" />
                                </Form.Group>
                            </Form>
                            <p>Full Time Only</p>
                        </div>
                    </Col>
                    <Col xs={12} lg={2} className="job-search-button">
                        <Button onClick={onSearch}> Search </Button>
                    </Col>
                </Row>

                <Row id="job-list-container">
                    <Col xs={12} lg={12}>
                        <h3>Job List</h3>
                    </Col>

                    {jobList.map(job =>
                        <Row key={job.id} id="job-list">
                            <hr />
                            <Col xs={12} lg={9}>
                                <div>
                                    <p onClick={() => navigate(`/jobs-detail/${job.id}`)} style={{ fontWeight: "700", color: "#4B56D2", cursor: "pointer" }}> {job.title} </p>
                                    <p>{job.company} - <span style={{ fontWeight: "700", color: "#007F73" }}>{job.type}</span></p>
                                </div>
                            </Col>
                            <Col xs={12} lg={3}>
                                <p>{job.location}</p>
                            </Col>
                        </Row>
                    )}
                    <Row>
                        <Col xs={12} lg={12}>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Button 
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)} 
                                    style={{ 
                                        backgroundColor: page === index + 1 ? "#4B56D2" : "transparent", 
                                        border: page === index + 1 ? "none" : "1px solid #000000", 
                                        color: page === index + 1 ? "#FFFFFF" : "#000000",
                                        marginRight: "1%", 
                                        marginTop: "2%" 
                                    }}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </Col>
                    </Row>
                </Row>
            </Container>
        </JobLayout>

    );

};

export default Job;