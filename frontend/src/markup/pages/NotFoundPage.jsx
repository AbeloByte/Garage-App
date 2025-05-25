import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <Container className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <div className="error-code">
              4<span className="text-primary">0</span>4
            </div>
            <h1 className="error-title mb-4">Page Not Found</h1>
            <p className="error-message mb-5">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="outline-primary"
                size="lg"
                className="px-4 py-2"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
              <Button
                variant="danger"
                size="lg"
                className="px-4 py-2"
                onClick={() => navigate("/")}
              >
                Return Home
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Decorative elements */}
      <div className="circle-decor circle-1"></div>
      <div className="circle-decor circle-2"></div>
      <div className="circle-decor circle-3"></div>
    </div>
  );
};

export default NotFoundPage;
