'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const projects = [
  { id: 1, title: 'EcoTech Website', category: 'Web' },
  { id: 2, title: 'Finance App', category: 'Mobile' },
  { id: 3, title: 'Brand Revamp', category: 'Design' },
  { id: 4, title: 'E-commerce Platform', category: 'Web' },
  { id: 5, title: 'Health Tracker', category: 'Mobile' },
  { id: 6, title: 'Music Studio Logo', category: 'Design' }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="section-padding mt-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="gradient-text">Our Portfolio</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Showcasing our best work across various domains.</p>
        </div>

        <div className="d-flex justify-content-center gap-3 mb-5">
          {['All', 'Web', 'Mobile', 'Design'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className="btn-custom"
              style={{ 
                background: filter === cat ? 'var(--primary-color)' : 'transparent',
                border: '1px solid var(--glass-border)',
                color: filter === cat ? 'white' : 'var(--text-primary)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <Row className="gy-4">
          {filteredProjects.map((p) => (
            <Col key={p.id} lg={4} md={6}>
              <div className="glass-card p-0 overflow-hidden">
                <div style={{ height: '200px', background: '#e2e8f0' }}></div>
                <div className="p-4">
                  <h5>{p.title}</h5>
                  <p className="small mb-0" style={{ color: 'var(--text-secondary)' }}>{p.category}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
