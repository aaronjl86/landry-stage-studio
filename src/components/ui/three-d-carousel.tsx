import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface CarouselItem {
  image: string;
  title: string;
}

interface ThreeDCarouselProps {
  items: CarouselItem[];
}

export default function ThreeDCarousel({ items }: ThreeDCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const getItemStyle = (index: number) => {
    const diff = (index - currentIndex + items.length) % items.length;
    const itemsToShow = Math.min(5, items.length);
    
    if (diff === 0) {
      // Center item
      return {
        transform: "translateX(-50%) translateZ(0px) rotateY(0deg) scale(1.1)",
        zIndex: 50,
        opacity: 1,
        left: "50%",
      };
    } else if (diff === 1 || diff === items.length - 1) {
      // Adjacent items
      const isRight = diff === 1;
      return {
        transform: `translateX(${isRight ? "50%" : "-150%"}) translateZ(-200px) rotateY(${isRight ? "-35deg" : "35deg"}) scale(0.85)`,
        zIndex: 30,
        opacity: 0.7,
        left: isRight ? "50%" : "50%",
      };
    } else if (diff === 2 || diff === items.length - 2) {
      // Further items
      const isRight = diff === 2;
      return {
        transform: `translateX(${isRight ? "100%" : "-200%"}) translateZ(-400px) rotateY(${isRight ? "-55deg" : "55deg"}) scale(0.7)`,
        zIndex: 20,
        opacity: 0.5,
        left: isRight ? "50%" : "50%",
      };
    } else {
      // Hidden items
      return {
        transform: "translateX(-50%) translateZ(-600px) scale(0.5)",
        zIndex: 10,
        opacity: 0,
        left: "50%",
      };
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Carousel container */}
      <div className="relative h-[460px] overflow-visible py-4">
        <div
          className="relative w-full h-full flex items-center pt-0"
          style={{ perspective: "1200px" }}
        >
          {items.map((item, index) => {
            const style = getItemStyle(index);
            return (
              <div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-600 ease-out"
                style={{
                  ...style,
                  width: "550px",
                  height: "413px",
                }}
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border bg-transparent">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-[center_40%]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white font-semibold text-sm">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={isAnimating}
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={isAnimating}
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
