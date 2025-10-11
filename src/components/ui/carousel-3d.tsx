import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface CarouselItem {
  beforeImage: string;
  afterImage: string;
  title: string;
}

interface ThreeDCarouselProps {
  items: CarouselItem[];
}

export default function ThreeDCarousel({ items }: ThreeDCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Flatten before/after into individual slides
  const slides = items.flatMap(item => [
    { image: item.beforeImage, title: `${item.title} (Before)` },
    { image: item.afterImage, title: `${item.title} (After)` }
  ]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const getItemStyle = (index: number) => {
    const diff = (index - currentIndex + slides.length) % slides.length;
    if (diff === 0) {
      return {
        transform: "translateX(-50%) translateZ(0px) rotateY(0deg) scale(1.1)",
        zIndex: 50,
        opacity: 1,
        left: "50%"
      };
    } else if (diff === 1 || diff === slides.length - 1) {
      const isRight = diff === 1;
      return {
        transform: `translateX(${isRight ? "50%" : "-150%"}) translateZ(-200px) rotateY(${isRight ? "-35deg" : "35deg"}) scale(0.85)`,
        zIndex: 30,
        opacity: 0.7,
        left: "50%"
      };
    } else if (diff === 2 || diff === slides.length - 2) {
      const isRight = diff === 2;
      return {
        transform: `translateX(${isRight ? "100%" : "-200%"}) translateZ(-400px) rotateY(${isRight ? "-55deg" : "55deg"}) scale(0.7)`,
        zIndex: 20,
        opacity: 0.5,
        left: "50%"
      };
    } else {
      return {
        transform: "translateX(-50%) translateZ(-600px) scale(0.5)",
        zIndex: 10,
        opacity: 0,
        left: "50%"
      };
    }
  };

  return (
    <div className="relative isolate w-full max-w-6xl mx-auto mb-16">
      <div className="relative h-[413px] overflow-visible">
        <div
          className="relative w-full h-full flex items-center pt-0"
          style={{ perspective: "1200px" }}
        >
          {slides.map((item, index) => {
            const style = getItemStyle(index);
            return (
              <div
                key={index}
                className="absolute top-0 transition-all duration-600 ease-out"
                style={{
                  ...style,
                  width: "550px",
                  height: "413px"
                }}
              >
                <div className="relative w-full h-full rounded-3xl overflow-visible shadow-2xl ring-1 ring-border bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-contain"
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

      <div className="flex justify-center gap-4 mt-4 px-0 py-[15px]">
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

      <div className="flex justify-center gap-2 mt-3">
        {slides.map((_, index) => (
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
