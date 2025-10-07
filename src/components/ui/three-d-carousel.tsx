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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!isDragging) {
      autoRotateRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length);
      }, 3500); // Slow auto-rotation every 3.5 seconds
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isDragging, items.length]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Mouse/Touch handlers for dragging
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setDragDistance(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const distance = clientX - startX;
    setDragDistance(distance);

    // Fast rotation while dragging
    if (Math.abs(distance) > 50) {
      const direction = distance > 0 ? -1 : 1;
      setCurrentIndex(prev => (prev + direction + items.length) % items.length);
      setStartX(clientX);
      setDragDistance(0);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragDistance(0);
  };
  const getItemStyle = (index: number) => {
    const diff = (index - currentIndex + items.length) % items.length;
    const itemsToShow = Math.min(5, items.length);
    if (diff === 0) {
      // Center item
      return {
        transform: "translateX(-50%) translateZ(0px) rotateY(0deg) scale(1.1)",
        zIndex: 50,
        opacity: 1,
        left: "50%"
      };
    } else if (diff === 1 || diff === items.length - 1) {
      // Adjacent items
      const isRight = diff === 1;
      return {
        transform: `translateX(${isRight ? "50%" : "-150%"}) translateZ(-200px) rotateY(${isRight ? "-35deg" : "35deg"}) scale(0.85)`,
        zIndex: 30,
        opacity: 0.7,
        left: isRight ? "50%" : "50%"
      };
    } else if (diff === 2 || diff === items.length - 2) {
      // Further items
      const isRight = diff === 2;
      return {
        transform: `translateX(${isRight ? "100%" : "-200%"}) translateZ(-400px) rotateY(${isRight ? "-55deg" : "55deg"}) scale(0.7)`,
        zIndex: 20,
        opacity: 0.5,
        left: isRight ? "50%" : "50%"
      };
    } else {
      // Hidden items
      return {
        transform: "translateX(-50%) translateZ(-600px) scale(0.5)",
        zIndex: 10,
        opacity: 0,
        left: "50%"
      };
    }
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
          return <div key={index} className="absolute top-0 transition-all duration-600 ease-out" style={{
            ...style,
            width: "300px",
            height: "225px"
          }}>
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border bg-transparent">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover object-[center_25%] transform scale-[1.14]" />
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
      <div className="flex justify-center gap-2 mt-3">
        {items.map((_, index) => <button key={index} onClick={() => {
        if (!isAnimating) {
          setIsAnimating(true);
          setCurrentIndex(index);
        }
      }} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} />)}
      </div>

    </div>;
}