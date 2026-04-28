'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import gsap from 'gsap';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
];

/* ── Magnetic Nav Link ── */
function MagLink({ href, label, onClick, active }) {
  const ref = useRef(null);
  const linkRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: 'power2.out' });
    gsap.to(linkRef.current, { color: 'var(--primary-color)', duration: 0.25 });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    gsap.to(linkRef.current, { color: active ? 'var(--primary-color)' : 'var(--text-secondary)', duration: 0.3 });
  };

  return (
    <div
      ref={ref}
      style={{ position: 'relative', display: 'inline-block', margin: '0 4px', cursor: 'pointer' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        ref={linkRef}
        href={href}
        onClick={onClick}
        style={{
          color: active ? 'var(--primary-color)' : 'var(--text-secondary)',
          fontFamily: 'var(--font-poppins)',
          fontWeight: 500,
          fontSize: '0.95rem',
          padding: '8px 14px',
          display: 'block',
          textDecoration: 'none',
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </Link>
    </div>
  );
}

/* ── Ripple CTA Button ── */
function RippleBtn({ href, label, onClick }) {
  const btnRef = useRef(null);

  const handleMouseEnter = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;width:6px;height:6px;border-radius:50%;
      background:rgba(255,255,255,0.45);pointer-events:none;
      left:${x}px;top:${y}px;transform:translate(-50%,-50%) scale(0);
      transition:transform 0.55s ease,opacity 0.55s ease;
    `;
    btn.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%,-50%) scale(25)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 600);

    gsap.to(btn, { scale: 1.06, duration: 0.25, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.6)' });
  };

  return (
    <Link
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
        color: 'white',
        padding: '0.6rem 1.6rem',
        borderRadius: '50px',
        fontFamily: 'var(--font-poppins)',
        fontWeight: 600,
        fontSize: '0.9rem',
        textDecoration: 'none',
        display: 'inline-block',
        marginLeft: '12px',
        boxShadow: '0 4px 20px rgba(255,115,0,0.3)',
        transition: 'box-shadow 0.3s ease',
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </Link>
  );
}

/* ── Navbar ── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BootstrapNavbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      style={{
        margin: scrolled ? '10px 20px' : '0',
        borderRadius: scrolled ? '16px' : '0',
        border: scrolled ? '1px solid var(--glass-border)' : 'none',
        padding: '0.75rem 0',
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 1000,
      }}
    >
      <Container>
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="me-2"
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className="border-0 shadow-none"
        >
          {expanded ? <FiX size={24} color="#371419" /> : <FiMenu size={24} color="#371419" />}
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <nav className="ms-auto d-flex align-items-center flex-wrap">
            {navLinks.map((lnk) => (
              <MagLink
                key={lnk.href}
                href={lnk.href}
                label={lnk.label}
                active={pathname === lnk.href}
                onClick={() => setExpanded(false)}
              />
            ))}
            <RippleBtn
              href="/contact"
              label="Contact Us"
              onClick={() => setExpanded(false)}
            />
          </nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
