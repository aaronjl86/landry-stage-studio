import { useState, useEffect, useRef } from "react";
interface CarouselItem {
  image: string;
  title: string;
}
interface ThreeDCarouselProps {
  items: CarouselItem[];
}
export default function ThreeDCarousel({
  items
}: ThreeDCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [lastRotation, setLastRotation] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  // Smooth continuous auto-rotation
  useEffect(() => {
    if (isDragging) return;

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = now;

      setRotation(prev => prev + (delta * 10)); // 10 degrees per second - slow and steady
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging]);

  // Mouse/Touch handlers for smooth dragging
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setLastRotation(rotation);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const distance = clientX - startX;
    const rotationChange = distance * 0.3; // Sensitivity factor
    setRotation(lastRotation + rotationChange);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    lastTimeRef.current = Date.now(); // Reset time for smooth transition back to auto-rotate
  };
  const getItemStyle = (index: number) => {
    const anglePerItem = 360 / items.length;
    const itemAngle = (index * anglePerItem - rotation) % 360;
    const normalizedAngle = ((itemAngle + 360) % 360);
    
    // Convert angle to position
    const radians = (normalizedAngle * Math.PI) / 180;
    const radius = 300;
    const x = Math.sin(radians) * radius;
    const z = Math.cos(radians) * radius;
    
    // Calculate scale and opacity based on z position
    const scale = 0.7 + (z / radius) * 0.4; // 0.7 to 1.1
    const opacity = 0.4 + (z / radius) * 0.6; // 0.4 to 1.0
    const zIndex = Math.round(50 + z / 10);
    
    return {
      transform: `translateX(-50%) translate3d(${x}px, 0, ${z}px) rotateY(${-normalizedAngle}deg) scale(${scale})`,
      zIndex,
      opacity,
      left: "50%"
    };
  };
  return <div className="relative isolate w-full max-w-4xl mx-auto mb-16">
      {/* Carousel container */}
      <div 
        className="relative h-[225px] overflow-visible cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div className="relative w-full h-full flex items-center pt-0" style={{
        perspective: "1200px"
      }}>
          {items.map((item, index) => {
          const style = getItemStyle(index);
          return <div key={index} className="absolute top-0 transition-all duration-100 ease-linear" style={{
            ...style,
            width: "300px",
            height: "225px"
          }}>
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border bg-transparent">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover object-[center_35%] transform scale-[1.35]" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-semibold text-sm">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, index) => {
        const anglePerItem = 360 / items.length;
        const targetAngle = index * anglePerItem;
        const currentNormalized = rotation % 360;
        const diff = Math.abs(((targetAngle - currentNormalized + 540) % 360) - 180);
        const isActive = diff < anglePerItem / 2;
        
        return <button key={index} onClick={() => {
          setRotation(targetAngle);
          setLastRotation(targetAngle);
        }} className={`w-2 h-2 rounded-full transition-all ${isActive ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} />;
      })}
      </div>

    </div>;
}