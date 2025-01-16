import React, { useRef, useEffect } from 'react';

export const FadeInSection = ({ children, className = '' }) => {
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });
    
    const { current } = domRef;
    observer.observe(current);
    
    return () => observer.unobserve(current);
  }, []);

  return (
    <div className={`fade-in-section ${className}`} ref={domRef}>
      {children}
    </div>
  );
};