'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { TextField, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
  },
});

export default function Contact() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="section-padding mt-5">
        <Container>
          <div className="text-center mb-5">
            <h1 className="gradient-text">Get In Touch</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Let's discuss your next big project.</p>
          </div>
          
          <Row className="gy-5">
            <Col lg={5}>
              <div className="glass-card">
                <h3>Contact Information</h3>
                <p className="mb-5" style={{ color: 'var(--text-secondary)' }}>Reach out to us through any of these channels.</p>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}><FiMail /></div>
                  <div>
                    <h6 className="mb-0">Email</h6>
                    <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>hello@tqoziys.com</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}><FiPhone /></div>
                  <div>
                    <h6 className="mb-0">Phone</h6>
                    <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>+1 234 567 890</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3" style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}><FiMapPin /></div>
                  <div>
                    <h6 className="mb-0">Location</h6>
                    <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>Silicon Valley, CA, USA</p>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={7}>
              <div className="glass-card">
                <h3>Send a Message</h3>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Row className="gy-4">
                    <Col md={6}>
                      <TextField fullWidth label="Your Name" variant="outlined" />
                    </Col>
                    <Col md={6}>
                      <TextField fullWidth label="Email Address" variant="outlined" />
                    </Col>
                    <Col md={12}>
                      <TextField fullWidth label="Subject" variant="outlined" />
                    </Col>
                    <Col md={12}>
                      <TextField fullWidth label="Message" multiline rows={4} variant="outlined" />
                    </Col>
                    <Col md={12}>
                      <button className="btn-custom w-100" type="button">Send Message</button>
                    </Col>
                  </Row>
                </Box>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
}
