import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

import p3 from '../../images/p3.webp';

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary shadow">
        <Container fluid>
          <Navbar.Brand className="fw-bold">
            <Link to="/" className="text-decoration-none text-primary">
              MediCareBook
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" navbarScroll></Nav>
            <Nav>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="home-container d-flex align-items-center justify-content-between flex-wrap py-5 bg-light">
        <div className="left-side text-center">
          <img
            alt="Doctor consultation illustration"
            src={p3}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="right-side text-center p-4">
          <p>
            <span className="f-letter fw-bold display-5">
              Effortlessly schedule your doctor
            </span>
            <br />
            <span className="s-letter lead">
              appointments with just a few clicks,
            </span>
            <br />
            <span className="t-letter lead">
              putting your health in your hands.
            </span>
          </p>
          <Button
            variant="info"
            className="mt-3 text-white"
            as={Link}
            to="/login"
          >
            Book Your Doctor
          </Button>
        </div>
      </div>

      {/* About Us Section */}
      <Container className="my-5">
        <h1 className="text-center mb-4 text-primary">About Us</h1>
        <div className="about-content p-3 bg-light rounded shadow">
          <p className="lead">
            Booking a doctor appointment has never been easier. With our
            convenient online platform, you can quickly and effortlessly
            schedule your appointments from the comfort of your own home. No
            more waiting on hold or playing phone tag with busy receptionists.
            <br />
            <br />
            Our user-friendly interface allows you to browse through a wide
            range of doctors and healthcare providers, making it simple to find
            the perfect match for your needs. Whether you require a routine
            check-up, specialist consultation, or urgent care, we have a
            diverse network of medical professionals ready to serve you.
            <br />
            <br />
            Gone are the days of flipping through phone directories or relying
            on word-of-mouth recommendations. Our comprehensive database
            provides detailed profiles of each doctor, including their
            specialties, qualifications, and availability. You can read reviews
            from other patients to gain insights into their experiences and
            make an informed decision.
            <br />
            <br />
            Take control of your health and experience the convenience of
            online doctor appointment booking. Say goodbye to long waits and
            hello to seamless scheduling. Join our platform today and prioritize
            your well-being with ease and efficiency.
            <br />
            <br />
            Experience the future of healthcare scheduling today!
          </p>
        </div>
      </Container>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-5">
        <p className="mb-0">
          © {new Date().getFullYear()} MediCareBook. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Home;
