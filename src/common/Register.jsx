import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import p2 from '../../images/p2.png';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    type: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { fullName, email, password, phone, type } = user;
    if (!fullName || !email || !password || !phone || !type) {
      message.error('All fields are required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      message.error('Please enter a valid email');
      return false;
    }
    if (password.length < 6) {
      message.error('Password should be at least 6 characters');
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      message.error('Phone number should be 10 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8001/api/user/register', user);
      if (res.data.success) {
        message.success('Registered successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">MediCareBook</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll />
            <Nav>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MDBContainer className="my-5">
        <MDBCard style={{ border: 'none' }}>
          <MDBRow className="g-0 border-none p-3" style={{ background: 'rgb(190, 203, 203)' }}>
            <MDBCol md="6">
              <MDBCardBody className="d-flex mx-3 flex-column">
                <div className="d-flex flex-row mb-2">
                  <span className="h1 text-center fw-bold">Sign up to your account</span>
                </div>
                <div className="p-2">
                  <Form onSubmit={handleSubmit}>
                    <label className="my-1 form-label" htmlFor="fullName">
                      Full name
                    </label>
                    <MDBInput
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      id="fullName"
                      type="text"
                      size="sm"
                      style={{ height: '40px' }}
                      autoComplete="off"
                      aria-required="true"
                      aria-label="Full name"
                    />

                    <label className="my-1 form-label" htmlFor="email">
                      Email
                    </label>
                    <MDBInput
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      id="email"
                      type="email"
                      size="sm"
                      style={{ height: '40px' }}
                      autoComplete="off"
                      aria-required="true"
                      aria-label="Email"
                    />

                    <label className="my-1 form-label" htmlFor="password">
                      Password
                    </label>
                    <MDBInput
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      id="password"
                      type="password"
                      size="sm"
                      style={{ height: '40px' }}
                      autoComplete="off"
                      aria-required="true"
                      aria-label="Password"
                    />

                    <label className="my-1 form-label" htmlFor="phone">
                      Phone
                    </label>
                    <MDBInput
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      id="phone"
                      type="text"
                      size="sm"
                      style={{ height: '40px' }}
                      autoComplete="off"
                      aria-required="true"
                      aria-label="Phone"
                    />

                    <Container className="my-3">
                      <MDBRadio
                        name="type"
                        id="adminType"
                        checked={user.type === 'admin'}
                        value="admin"
                        onChange={handleChange}
                        label="Admin"
                        inline
                      />
                      <MDBRadio
                        name="type"
                        id="userType"
                        checked={user.type === 'user'}
                        value="user"
                        onChange={handleChange}
                        label="User"
                        inline
                      />
                    </Container>

                    <Button
                      className="mb-4 bg-dark"
                      variant="dark"
                      size="lg"
                      type="submit"
                      disabled={loading}
                      style={{ marginTop: '20px' }}
                    >
                      {loading ? 'Registering...' : 'Register'}
                    </Button>
                  </Form>
                  <p className="mb-5 pb-md-2" style={{ color: '#393f81' }}>
                    Have an account? <Link to="/login" style={{ color: '#393f81' }}>Login here</Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCol>

            <MDBCol md="6">
              <MDBCardImage
                src={p2}
                alt="Register form"
                className="rounded-start w-100"
                style={{ mixBlendMode: 'darken' }}
              />
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Register;
