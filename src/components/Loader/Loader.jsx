'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/features/uiSlice';
import Image from 'next/image';

export default function Loader() {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1.2,
      duration: 1,
      ease: 'power3.out',
    })
    .to(logoRef.current, {
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    })
    .to(loaderRef.current, {
      y: '-100%',
      duration: 1,
      ease: 'power4.inOut',
      delay: 0.5,
      onComplete: () => {
        dispatch(setLoading(false));
      },
    });
  }, [dispatch]);

  if (!isLoading) return null;

  return (
    <div id="loader-container" ref={loaderRef} style={{ background: '#ffffff' }}>
      <div className="loader-logo" ref={logoRef}>
        <Image 
          src="/logo.png" 
          alt="Loading..." 
          width={200} 
          height={80} 
          priority
          style={{ 
            objectFit: 'contain', 
          }}
        />
      </div>
    </div>
  );
}
