'use client';

import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { FiArrowRight, FiCode, FiLayers, FiPenTool } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import HeroAnimation from '@/components/HeroAnimation/HeroAnimation';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Hero Animation
    gsap.from('.hero-content > *', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Reveal Animations
    gsap.utils.toArray('.reveal').forEach((elem) => {
      gsap.fromTo(elem, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, []);

  return (
    <div>
      {/* SECTION 1: HERO */}
      <section id="hero" className="d-flex align-items-center" style={{ minHeight: '100vh', paddingTop: '120px', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-bg-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(255,115,0,0.1) 0%, transparent 70%)', zIndex: -1 }}></div>
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="hero-content text-center text-lg-start d-flex flex-column align-items-center align-items-lg-start">
              <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.2, marginBottom: '20px' }}>
                Building <span className="gradient-text">Future-Ready</span> <br /> Digital Experiences
              </h1>
              <p className="mb-5" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px' }}>
                Premium digital agency for high-end web solutions and branding.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Link href="/portfolio" className="btn-custom d-flex align-items-center">
                  View Our Work <FiArrowRight className="ms-2" />
                </Link>
                <Link href="/contact" className="btn-custom" style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
                  Get Started
                </Link>
              </div>
            </Col>
            <Col lg={5} className="d-none d-lg-block">
               <HeroAnimation />
            </Col>
          </Row>
        </Container>
      </section>

      {/* SECTION 2: ABOUT SUMMARY */}
      <section className="section-padding reveal">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="glass-card mb-4 mb-lg-0">
                <h2 className="mb-4">Crafting <span className="gradient-text">Excellence</span> Since 2020</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Our mission is to bridge the gap between technology and human experience. We don't just write code; we create stories that resonate with your audience.
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  With a team of expert designers and developers, we bring your vision to life with precision and passion.
                </p>
                <Link href="/about" className="btn-custom mt-4 d-inline-block">Learn More</Link>
              </div>
            </Col>
            <Col lg={6} className="ps-lg-5">
              <div className="d-flex flex-column gap-4">
                 <div className="reveal">
                    <h4 className="gradient-text">99% Client Satisfaction</h4>
                    <p className="small">We prioritize quality over quantity.</p>
                 </div>
                 <div className="reveal">
                    <h4 className="gradient-text">150+ Projects Completed</h4>
                    <p className="small">Delivered across various industries worldwide.</p>
                 </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SECTION 3: SERVICES */}
      <section className="section-padding" style={{ background: 'var(--surface-color)' }}>
        <Container>
          <div className="text-center mb-5 reveal">
            <h2 className="mb-3">Our Specialized <span className="gradient-text">Services</span></h2>
            <p style={{ color: 'var(--text-secondary)' }}>Solutions tailored to your business needs.</p>
          </div>
          <Row className="gy-4">
            {[
              { icon: <FiCode />, title: 'Web Development', desc: 'Custom, scalable, and high-performance websites.' },
              { icon: <FiLayers />, title: 'UI/UX Design', desc: 'Intuitive and engaging user interfaces.' },
              { icon: <FiPenTool />, title: 'Brand Identity', desc: 'Crafting unique and memorable brand stories.' }
            ].map((s, i) => (
              <Col key={i} lg={4} md={6}>
                <div className="glass-card h-100 text-center reveal">
                  <div className="mb-4" style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>{s.icon}</div>
                  <h4>{s.title}</h4>
                  <p className="mt-3" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* SECTION 4: PORTFOLIO */}
      <section className="section-padding">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-5 reveal">
            <div>
              <h2 className="mb-3">Featured <span className="gradient-text">Projects</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>A glimpse of our recent work.</p>
            </div>
            <Link href="/portfolio" className="btn-custom" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>View All</Link>
          </div>
          <Row className="gy-4">
            {[1, 2, 3].map((p) => (
              <Col key={p} lg={4}>
                <div className="glass-card p-0 overflow-hidden reveal">
                  <div style={{ height: '250px', background: '#e2e8f0', position: 'relative' }}>
                    <div className="p-4 d-flex align-items-center justify-content-center h-100">
                       <span style={{ color: 'var(--text-secondary)' }}>Project {p} Mockup</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5>Modern SaaS Dashboard</h5>
                    <p className="small mb-0" style={{ color: 'var(--text-secondary)' }}>Web Application / UI Design</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* SECTION 5: BLOG/NEWS */}
      <section className="section-padding" style={{ background: 'var(--surface-color)' }}>
        <Container>
           <div className="text-center mb-5 reveal">
            <h2 className="mb-3">Latest From <span className="gradient-text">Blog</span></h2>
            <p style={{ color: 'var(--text-secondary)' }}>Insights and trends in the digital world.</p>
          </div>
          <Row className="gy-4">
            {[1, 2].map((b) => (
              <Col key={b} lg={6}>
                <div className="glass-card reveal">
                  <Row className="align-items-center">
                    <Col sm={4}>
                       <div style={{ height: '120px', background: '#e2e8f0', borderRadius: '8px' }}></div>
                    </Col>
                    <Col sm={8}>
                       <span className="small gradient-text fw-bold">TECHNOLOGY</span>
                       <h5 className="mt-2">The Future of AI in Web Development</h5>
                       <p className="small" style={{ color: 'var(--text-secondary)' }}>April 28, 2026 • 5 min read</p>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}
