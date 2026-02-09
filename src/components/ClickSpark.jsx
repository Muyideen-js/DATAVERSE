import { useRef, useEffect } from 'react';
import './ClickSpark.css';

const ClickSpark = ({
  sparkColor = '#5227FF',
  sparkSize = 12,
  sparkRadius = 20,
  sparkCount = 10,
  duration = 500,
  easing = 'ease-out',
  children
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sparksRef = useRef([]);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const createSpark = (x, y) => {
      const angle = (Math.PI * 2) / sparkCount;
      for (let i = 0; i < sparkCount; i++) {
        const sparkAngle = angle * i;
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(sparkAngle) * sparkRadius,
          vy: Math.sin(sparkAngle) * sparkRadius,
          life: 1
        });
      }
      startTimeRef.current = performance.now();
      if (!rafRef.current) {
        animate();
      }
    };

    const animate = () => {
      if (!startTimeRef.current) return;
      
      const elapsed = performance.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      sparksRef.current = sparksRef.current.filter(spark => {
        spark.life = 1 - progress;
        if (spark.life <= 0) return false;
        
        const currentX = spark.x + spark.vx * progress;
        const currentY = spark.y + spark.vy * progress;
        
        ctx.fillStyle = sparkColor;
        ctx.globalAlpha = spark.life;
        ctx.beginPath();
        ctx.arc(currentX, currentY, sparkSize * spark.life, 0, Math.PI * 2);
        ctx.fill();
        
        return true;
      });
      
      ctx.globalAlpha = 1;
      
      if (sparksRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
        startTimeRef.current = null;
      }
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createSpark(x, y);
    };

    resize();
    window.addEventListener('resize', resize);
    container.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('click', handleClick);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <div ref={containerRef} className="click-spark-container">
      <canvas ref={canvasRef} className="click-spark-canvas" />
      {children}
    </div>
  );
};

export default ClickSpark;
