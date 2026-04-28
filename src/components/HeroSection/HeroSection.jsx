'use client';
import { useRef, useCallback, useLayoutEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import gsap from 'gsap';
import { FiGlobe, FiSmartphone, FiPenTool, FiArrowRight, FiServer } from 'react-icons/fi';
import HeroAnimation from '@/components/HeroAnimation/HeroAnimation';
import styles from './HeroSection.module.css';

const SERVICES = [
  { label: 'Web Development', icon: <FiGlobe size={18} />,      color: '#00d2ff' },
  { label: 'Mobile Solutions', icon: <FiSmartphone size={18} />, color: '#ff0080' },
  { label: 'UI/UX Design',    icon: <FiPenTool size={18} />,    color: '#ff7300' },
  { label: 'ERP Solutions',   icon: <FiServer size={18} />,     color: '#7c3aed' },
];

export default function HeroSection() {
  const sectionRef    = useRef(null);
  const svgRef        = useRef(null);
  const animWidgetRef = useRef(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const pathRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const dotRefs  = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [activeCard, setActiveCard] = useState(-1);

  const buildPaths = useCallback(() => {
    const section    = sectionRef.current;
    const animWidget = animWidgetRef.current;
    if (!section || !animWidget) return;

    const sr = section.getBoundingClientRect();
    const aw = animWidget.getBoundingClientRect();
    const ac = { x: aw.left - sr.left + aw.width / 2, y: aw.top - sr.top + aw.height / 2 };

    const r1 = 190;
    const r2 = 120;

    const rightPts = [
      { x: ac.x,           y: ac.y - r1 - 30 },
      { x: ac.x,           y: ac.y + r1 + 10 },
      { x: ac.x - r2 - 60, y: ac.y },
      { x: ac.x + r2 + 15, y: ac.y },
    ];

    pathRefs.forEach((pRef, i) => {
      const path = pRef.current;
      const card = cardRefs[i].current;
      if (!path || !card) return;

      const cr   = card.getBoundingClientRect();
      const left = { x: cr.right - sr.left, y: cr.top - sr.top + cr.height / 2 };
      const rp   = rightPts[i];
      const dx   = rp.x - left.x;
      const d    = `M ${left.x} ${left.y} C ${left.x + dx * 0.5} ${left.y}, ${rp.x - dx * 0.3} ${rp.y}, ${rp.x} ${rp.y}`;

      path.setAttribute('d', d);
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      const pt0 = path.getPointAtLength(len);
      gsap.set(dotRefs[i].current, { attr: { cx: pt0.x, cy: pt0.y }, opacity: 0 });
    });
  }, []);

  useLayoutEffect(() => {
    const t = setTimeout(buildPaths, 400);
    window.addEventListener('resize', buildPaths);
    return () => { clearTimeout(t); window.removeEventListener('resize', buildPaths); };
  }, [buildPaths]);

  const handleSequenceStart = useCallback(() => {
    buildPaths();
    setActiveCard(-1);
    pathRefs.forEach((pRef, i) => {
      const path = pRef.current;
      const dot  = dotRefs[i].current;
      if (!path || !dot) return;
      const len = path.getTotalLength();
      gsap.to(path, { opacity: 0.7, duration: 0.2, delay: i * 0.15 });
      gsap.to(path, { strokeDashoffset: 0, duration: 1.1, delay: i * 0.15, ease: 'power2.inOut' });
      const prog = { t: len };
      gsap.set(dot, { opacity: 1 });
      gsap.to(prog, {
        t: 0, duration: 1.3, delay: i * 0.15 + 0.3, ease: 'power2.inOut',
        onUpdate() { const pt = path.getPointAtLength(prog.t); gsap.set(dot, { attr: { cx: pt.x, cy: pt.y } }); },
        onComplete() {
          gsap.to(dot, { opacity: 0.5, duration: 0.2 });
          setActiveCard(i);
          setTimeout(() => setActiveCard(-1), 1200);
        },
      });
    });
  }, [buildPaths]);

  const handleSequenceEnd = useCallback(() => {
    setActiveCard(-1);
    pathRefs.forEach((pRef, i) => {
      const path = pRef.current;
      const dot  = dotRefs[i].current;
      if (!path || !dot) return;
      const len = path.getTotalLength();
      const prog = { t: 0 };
      gsap.set(dot, { opacity: 1 });
      gsap.to(prog, {
        t: len, duration: 1.0, delay: i * 0.12, ease: 'power2.in',
        onUpdate() { const pt = path.getPointAtLength(prog.t); gsap.set(dot, { attr: { cx: pt.x, cy: pt.y } }); },
        onComplete() { gsap.to(dot, { opacity: 0, duration: 0.3 }); },
      });
      gsap.to(path, {
        strokeDashoffset: -len, duration: 1.0, delay: i * 0.12 + 0.2, ease: 'power2.in',
        onComplete() { gsap.set(path, { strokeDashoffset: len, opacity: 0 }); },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection} id="hero">
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 65% 50%, rgba(255,115,0,0.07) 0%, transparent 60%)', zIndex: 0 }} />

      <svg ref={svgRef} className={styles.svgOverlay} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {SERVICES.map((s, i) => (
          <g key={i}>
            <path ref={pathRefs[i]} className={styles.connectorPath} stroke={s.color} />
            <circle ref={dotRefs[i]} r="5" fill={s.color} filter="url(#glow)" />
          </g>
        ))}
      </svg>

      <Container style={{ position: 'relative', zIndex: 10 }}>
        <Row className="align-items-center">
          <Col lg={7} className="hero-content text-center text-lg-start d-flex flex-column align-items-center align-items-lg-start">
            <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.2, marginBottom: '16px' }}>
              Building <span className="gradient-text">Future-Ready</span>
              <br />Digital Experiences
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '480px', marginBottom: '28px' }}>
              Premium digital agency for high-end web solutions and branding.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-lg-start mb-4">
              <Link href="/portfolio" className="btn-custom d-flex align-items-center">
                View Our Work <FiArrowRight className="ms-2" />
              </Link>
              <Link href="/contact" className="btn-custom" style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
                Get Started
              </Link>
            </div>

            <div className={styles.serviceCards}>
              {SERVICES.map((s, i) => (
                <div
                  key={i}
                  ref={cardRefs[i]}
                  className={`${styles.serviceCard} ${activeCard === i ? styles.cardActive : ''}`}
                  style={{ borderLeft: `3px solid ${s.color}` }}
                >
                  <div className={styles.cardIcon} style={{ background: `${s.color}18` }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                  </div>
                  <span className={styles.cardLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={5} className="d-none d-lg-flex align-items-center justify-content-center">
            <div ref={animWidgetRef}>
              <HeroAnimation onSequenceStart={handleSequenceStart} onSequenceEnd={handleSequenceEnd} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
