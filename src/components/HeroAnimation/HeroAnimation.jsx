'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './HeroAnimation.module.css';
import { FiCode, FiSmartphone, FiFigma, FiGlobe, FiLayers, FiPenTool } from 'react-icons/fi';

export default function HeroAnimation() {
  const [isBusy, setIsBusy] = useState(false);
  const [hideCircles, setHideCircles] = useState(false);
  const [btn3Index, setBtn3Index] = useState(0);
  const [touched, setTouched] = useState({ web: false, mobile: false, ux: false });
  const [visibleSlices, setVisibleSlices] = useState([false, false, false]);
  const [hidingSlices, setHidingSlices] = useState([false, false, false]);
  const [sliceMargins, setSliceMargins] = useState([0, 0, 0]);

  const ball1Ref = useRef(null);
  const ball2Ref = useRef(null);
  const tbWebRef = useRef(null);
  const tbMobileRef = useRef(null);
  const tbUxRef = useRef(null);
  const tbErpRef = useRef(null);
  const isBusyRef = useRef(false);

  const btn3Texts = ["Innovation", "Excellence", "Precision"];
  const services = [
    { txt: "Web Development", icon: <FiGlobe color="#00d2ff" />, color: "#00d2ff" },
    { txt: "Mobile Solutions", icon: <FiSmartphone color="#ff0080" />, color: "#ff0080" },
    { txt: "UI/UX Design", icon: <FiPenTool color="#ff7300" />, color: "#ff7300" }
  ];

  useEffect(() => {
    // Collision Detection
    const checkCollisions = () => {
      const getCenter = (el) => {
        if (!el) return { x: 0, y: 0, w: 0, h: 0 };
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
      };
      const dist = (a, b) => Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);

      const b1c = getCenter(ball1Ref.current);
      const b2c = getCenter(ball2Ref.current);

      // Outer ball (ball1) → Web Dev & Mobile App
      const outerTbs = [
        { ref: tbWebRef.current, key: 'web' },
        { ref: tbMobileRef.current, key: 'mobile' },
      ];
      // Inner ball (ball2) → UI/UX & ERP
      const innerTbs = [
        { ref: tbUxRef.current, key: 'ux' },
        { ref: tbErpRef.current, key: 'erp' },
      ];

      const newTouched = { web: false, mobile: false, ux: false, erp: false };

      outerTbs.forEach(({ ref, key }) => {
        if (!ref) return;
        const tbc = getCenter(ref);
        const diag = Math.sqrt(tbc.w ** 2 + tbc.h ** 2) / 2;
        if (dist(b1c, tbc) < diag + 14) newTouched[key] = true;
      });

      innerTbs.forEach(({ ref, key }) => {
        if (!ref) return;
        const tbc = getCenter(ref);
        const diag = Math.sqrt(tbc.w ** 2 + tbc.h ** 2) / 2;
        if (dist(b2c, tbc) < diag + 14) newTouched[key] = true;
      });

      setTouched(newTouched);
    };

    const collisionInterval = setInterval(checkCollisions, 70);
    const textInterval = setInterval(() => {
      setBtn3Index((prev) => (prev + 1) % btn3Texts.length);
    }, 2000);

    return () => {
      clearInterval(collisionInterval);
      clearInterval(textInterval);
    };
  }, []);

  const runSequence = async () => {
    if (isBusy) return;
    setIsBusy(true);

    // Initial scale down
    await new Promise(r => setTimeout(r, 700));
    setHideCircles(true);

    // Show slices
    for (let i = 0; i < 3; i++) {
      await new Promise(r => setTimeout(r, 300));
      setVisibleSlices(prev => {
        const n = [...prev];
        n[i] = true;
        return n;
      });
    }

    // Animate margins
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / 5000, 1);
      setSliceMargins([20 * progress, 20 * (1 - progress), 20 * progress]);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    await new Promise(r => setTimeout(r, 5000));

    // Hide slices
    for (let i = 2; i >= 0; i--) {
      setHidingSlices(prev => {
        const n = [...prev];
        n[i] = true;
        return n;
      });
      await new Promise(r => setTimeout(r, 180));
    }

    await new Promise(r => setTimeout(r, 500));
    setHideCircles(false);
    setVisibleSlices([false, false, false]);
    setHidingSlices([false, false, false]);
    setSliceMargins([0, 0, 0]);
    setIsBusy(false);
  };

  useEffect(() => {
    const mainInterval = setInterval(runSequence, 12000);
    return () => clearInterval(mainInterval);
  }, [isBusy]);

  return (
    <div className={`${styles.widget} ${hideCircles ? styles.hideCircles : ''}`}>
      {/* Background Particles */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className={styles.particle} 
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }} 
        />
      ))}

      <div ref={tbWebRef} className={`${styles.textBlock} ${styles.tbWeb} ${touched.web ? styles.touched : ''}`}>Web Dev</div>
      <div ref={tbMobileRef} className={`${styles.textBlock} ${styles.tbMobile} ${touched.mobile ? styles.touched : ''}`}>Mobile App</div>
      <div ref={tbUxRef} className={`${styles.textBlock} ${styles.tbUx} ${touched.ux ? styles.touched : ''}`}>UI/UX</div>
      <div ref={tbErpRef} className={`${styles.textBlock} ${styles.tbErp} ${touched.erp ? styles.touched : ''}`}>ERP</div>

      <div className={styles.center}>
        <div className={`${styles.btn} ${styles.btn1} ${hideCircles ? styles.scaledZero : styles.scaledFull}`}>
          <div className={styles.orbit}>
            <div className={`${styles.orbitCircle} ${styles.orbitCircleB1}`} />
            <div className={`${styles.rotator} ${styles.rotatorSlow}`} style={{ animationDirection: 'normal' }}>
              <div ref={ball1Ref} className={styles.ball} />
            </div>
          </div>
          <div className={styles.center}>
            <div className={`${styles.btn} ${styles.btn2} ${hideCircles ? styles.scaledZero : styles.scaledFull}`}>
              <div className={styles.orbit}>
                <div className={`${styles.orbitCircle} ${styles.orbitCircleB2}`} />
                <div className={`${styles.rotator} ${styles.rotatorFast}`} style={{ animationDirection: 'reverse' }}>
                  <div ref={ball2Ref} className={`${styles.ball} ${styles.ballB2}`} />
                </div>
              </div>
              <div className={styles.center}>
                <div 
                  className={`${styles.btn} ${styles.btn3}`} 
                  onClick={runSequence}
                  style={{ transform: isBusy ? 'scale(2.6)' : 'scale(1)' }}
                >
                  <span className={styles.icon}>★</span>
                  <span>{btn3Texts[btn3Index]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.slices} ${!hideCircles && !isBusy ? styles.hidden : ''}`}>
        {services.map((s, i) => (
          <div 
            key={i} 
            className={`${styles.slice} ${visibleSlices[i] ? styles.sliceVisible : ''} ${hidingSlices[i] ? styles.sliceHiding : ''}`}
            style={{ 
              marginLeft: `${sliceMargins[i]}px`,
              borderLeft: `4px solid ${s.color}`
            }}
          >
            <span className={styles.sliceIcon}>{s.icon}</span>
            <span>{s.txt}</span>
            <div className={styles.progressBar} style={{ background: s.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}
