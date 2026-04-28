'use client';

import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{ background: '#f1f5f9', borderTop: '1px solid var(--glass-border)', padding: '80px 0 30px' }}>
      <Container>
        <Row className="gy-4">
          <Col lg={4}>
            <div className="d-flex align-items-center mb-4">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={120} 
                height={40} 
                className="me-2" 
                style={{ 
                  objectFit: 'contain', 
                }} 
              />
            </div>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '350px' }}>
              Empowering businesses through cutting-edge digital solutions and creative excellence.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="social-icon"><FaFacebook size={20} /></a>
              <a href="#" className="social-icon"><FaTwitter size={20} /></a>
              <a href="#" className="social-icon"><FaLinkedin size={20} /></a>
              <a href="#" className="social-icon"><FaInstagram size={20} /></a>
            </div>
          </Col>
          <Col lg={2} md={4}>
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
            </ul>
          </Col>
          <Col lg={2} md={4}>
            <h5 className="mb-4">Services</h5>
            <ul className="list-unstyled footer-links">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Digital Marketing</li>
              <li>Brand Identity</li>
            </ul>
          </Col>
          <Col lg={4} md={4}>
            <h5 className="mb-4">Newsletter</h5>
            <p style={{ color: 'var(--text-secondary)' }}>Subscribe to get latest updates and news.</p>
            <div className="d-flex mt-3">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="form-control" 
                style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'white' }}
              />
              <button className="btn-custom ms-2" style={{ padding: '0.5rem 1.5rem' }}>Join</button>
            </div>
          </Col>
        </Row>
        <hr style={{ borderTop: '1px solid var(--glass-border)', margin: '50px 0 30px' }} />
        <div className="text-center" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} TQOZIYS. All rights reserved.
        </div>
      </Container>
      
      <style jsx>{`
        .social-icon {
          color: var(--text-secondary);
          transition: 0.3s;
        }
        .social-icon:hover {
          color: var(--primary-color);
        }
        .footer-links li {
          margin-bottom: 12px;
        }
        .footer-links a {
          color: var(--text-secondary);
        }
        .footer-links a:hover {
          color: var(--primary-color);
        }
      `}</style>
    </footer>
  );
}
