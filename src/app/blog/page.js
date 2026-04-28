'use client';

import { Container, Row, Col } from 'react-bootstrap';

const posts = [
  { id: 1, title: 'Why Next.js is the best for SEO', date: 'April 20, 2026' },
  { id: 2, title: 'UI Trends in 2026', date: 'April 15, 2026' },
  { id: 3, title: 'How to Scale Your Business', date: 'April 10, 2026' },
  { id: 4, title: 'Understanding Redux Toolkit', date: 'April 05, 2026' }
];

export default function Blog() {
  return (
    <div className="section-padding mt-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="gradient-text">Latest Insights</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Articles from our experts.</p>
        </div>
        
        <Row className="gy-4">
          {posts.map((post) => (
            <Col key={post.id} lg={6}>
              <div className="glass-card">
                <span className="small gradient-text fw-bold">TECH</span>
                <h3 className="mt-2">{post.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Discover the latest trends and best practices in modern web development and digital strategies.
                </p>
                <div className="d-flex justify-content-between align-items-center mt-4">
                   <span className="small" style={{ color: 'var(--text-secondary)' }}>{post.date}</span>
                   <button className="btn-custom" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Read More</button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
