import React, { useState } from 'react';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { Container } from 'react-bootstrap';
import axios from 'axios';

function ApplyDoctor({ userId }) {
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    experience: '',
    fees: '',
    timings: '',
  });

  const handleTimingChange = (_, timings) => {
    setDoctor({ ...doctor, timings });
  };

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:8001/api/user/registerdoc',
        { doctor, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
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
    <Container>
      <h2 className="text-center p-3">Apply for Doctor</h2>
      <Form onFinish={handleSubmit} className="m-3" layout="vertical">
        <h4>Personal Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Full name is required' }]}
            >
              <Input
                name="fullName"
                value={doctor.fullName}
                onChange={handleChange}
                placeholder="Enter name"
                aria-label="Full Name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: 'Phone number is required' },
                { pattern: /^\d{10}$/, message: 'Enter a valid 10-digit phone number' },
              ]}
            >
              <Input
                name="phone"
                value={doctor.phone}
                onChange={handleChange}
                type="number"
                placeholder="Your phone"
                aria-label="Phone"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email address' },
              ]}
            >
              <Input
                name="email"
                value={doctor.email}
                onChange={handleChange}
                type="email"
                placeholder="Your email"
                aria-label="Email"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Address is required' }]}
            >
              <Input
                name="address"
                value={doctor.address}
                onChange={handleChange}
                placeholder="Your address"
                aria-label="Address"
              />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true, message: 'Specialization is required' }]}
            >
              <Input
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
                placeholder="Your specialization"
                aria-label="Specialization"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: 'Experience is required' }]}
            >
              <Input
                name="experience"
                value={doctor.experience}
                onChange={handleChange}
                type="number"
                placeholder="Your experience (in years)"
                aria-label="Experience"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Fees"
              name="fees"
              rules={[
                { required: true, message: 'Consultation fees are required' },
                { pattern: /^[0-9]+$/, message: 'Enter a valid amount' },
              ]}
            >
              <Input
                name="fees"
                value={doctor.fees}
                onChange={handleChange}
                type="number"
                placeholder="Your fees"
                aria-label="Fees"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              rules={[{ required: true, message: 'Please select timings' }]}
            >
              <TimePicker.RangePicker
                format="HH:mm"
                onChange={handleTimingChange}
                aria-label="Timings"
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default ApplyDoctor;
