'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { FiMonitor, FiSmartphone, FiSearch, FiFigma, FiTrendingUp, FiCloud } from 'react-icons/fi';

const services = [
  { icon: <FiMonitor />, title: 'Web Development', desc: 'Enterprise-grade websites built with React and Next.js.' },
  { icon: <FiSmartphone />, title: 'Mobile Apps', desc: 'Cross-platform mobile solutions for iOS and Android.' },
  { icon: <FiFigma />, title: 'UI/UX Design', desc: 'User-centric designs that convert and delight.' },
  { icon: <FiSearch />, title: 'SEO Optimization', desc: 'Boost your visibility and rank higher on search engines.' },
  { icon: <FiTrendingUp />, title: 'Digital Marketing', desc: 'Strategic campaigns to grow your online presence.' },
  { icon: <FiCloud />, title: 'Cloud Solutions', desc: 'Secure and scalable cloud infrastructure management.' }
];

export default function Services() {
  return (
    <div className="section-padding mt-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="gradient-text">Our Comprehensive Services</h1>
          <p style={{ color: 'var(--text-secondary)' }}>End-to-end solutions for your digital success.</p>
        </div>
        
        <Row className="gy-4">
          {services.map((s, i) => (
            <Col key={i} lg={4} md={6}>
              <div className="glass-card h-100">
                <div className="mb-3" style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>{s.icon}</div>
                <h4>{s.title}</h4>
                <p style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
