'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function About() {
  useEffect(() => {
    gsap.from('.about-hero', { opacity: 0, y: 30, duration: 1 });
  }, []);

  return (
    <div className="section-padding mt-5">
      <Container>
        <div className="text-center mb-5 about-hero">
          <h1 className="gradient-text" style={{ fontSize: '3.5rem' }}>About TQOZIYS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Innovating the digital landscape since 2020.</p>
        </div>
        
        <Row className="gy-5 align-items-center">
          <Col lg={6}>
             <div className="glass-card">
                <h3>Our Vision</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  To be the world's leading creative force in the digital space, setting benchmarks for quality and innovation.
                </p>
             </div>
          </Col>
          <Col lg={6}>
             <div className="glass-card">
                <h3>Our Mission</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  To empower brands with robust digital tools and stunning visual identities that drive growth and engagement.
                </p>
             </div>
          </Col>
        </Row>

        <div className="mt-5 glass-card">
           <h2 className="text-center mb-4">The TQOZIYS Journey</h2>
           <p className="text-center" style={{ color: 'var(--text-secondary)' }}>
              Starting as a small team of three visionaries, we have grown into a multi-disciplinary agency serving clients across 20+ countries. Our expertise spans from high-end web applications to immersive brand experiences.
           </p>
        </div>
      </Container>
    </div>
  );
}
