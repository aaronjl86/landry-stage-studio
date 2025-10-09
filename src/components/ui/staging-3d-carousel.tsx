import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeAfterPair {
  before: string;
  after: string;
  title: string;
}

interface Staging3DCarouselProps {
  pairs: BeforeAfterPair[];
}

export default function Staging3DCarousel({ pairs }: Staging3DCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [lastRotation, setLastRotation] = useState(0);
  const [selectedPair, setSelectedPair] = useState<number | null>(null);
  const [showAfter, setShowAfter] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(Date.now());

  // Smooth continuous auto-rotation
  useEffect(() => {
    if (isDragging || selectedPair !== null) return;

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      setRotation((prev) => prev + delta * 8); // 8 degrees per second
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, selectedPair]);

  // Mouse/Touch handlers
  const handleDragStart = (clientX: number) => {
    if (selectedPair !== null) return;
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
    const rotationChange = distance * 0.3;
    setRotation(lastRotation + rotationChange);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    lastTimeRef.current = Date.now();
  };

  const handlePairClick = (index: number) => {
    setSelectedPair(index);
    setShowAfter(false);
  };

  const handleClose = () => {
    setSelectedPair(null);
    setShowAfter(false);
    lastTimeRef.current = Date.now();
  };

  const toggleBeforeAfter = () => {
    setShowAfter(!showAfter);
  };

  const getItemStyle = (index: number) => {
    const anglePerItem = 360 / pairs.length;
    const itemAngle = (index * anglePerItem - rotation) % 360;
    const normalizedAngle = ((itemAngle + 360) % 360);

    const radians = (normalizedAngle * Math.PI) / 180;
    const radius = 320;
    const x = Math.sin(radians) * radius;
    const z = Math.cos(radians) * radius;

    const scale = 0.65 + (z / radius) * 0.45;
    const opacity = 0.3 + (z / radius) * 0.7;
    const zIndex = Math.round(50 + z / 10);

    return {
      transform: `translateX(-50%) translate3d(${x}px, 0, ${z}px) rotateY(${-normalizedAngle}deg) scale(${scale})`,
      zIndex,
      opacity,
      left: "50%",
    };
  };

  return (
    <div className="relative isolate w-full max-w-5xl mx-auto mb-16 px-4">
      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedPair !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image container with before/after toggle */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] w-full">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={showAfter ? "after" : "before"}
                      src={
                        showAfter
                          ? pairs[selectedPair].after
                          : pairs[selectedPair].before
                      }
                      alt={
                        showAfter
                          ? `${pairs[selectedPair].title} - After`
                          : `${pairs[selectedPair].title} - Before`
                      }
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Before/After Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-2 rounded-full font-bold text-sm ${
                        showAfter
                          ? "bg-green-500 text-white"
                          : "bg-gray-800 text-white"
                      }`}
                    >
                      {showAfter ? "AFTER" : "BEFORE"}
                    </span>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={toggleBeforeAfter}
                    className="absolute bottom-4 right-4 bg-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    {showAfter ? "Show Before" : "Show After"}
                  </button>
                </div>

                {/* Title */}
                <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {pairs[selectedPair].title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Click the button to compare before and after staging
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carousel container */}
      <div
        className={`relative h-[250px] sm:h-[280px] md:h-[320px] overflow-visible select-none ${
          selectedPair === null ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="relative w-full h-full flex items-center"
          style={{ perspective: "1200px" }}
        >
          {pairs.map((pair, index) => {
            const style = getItemStyle(index);
            return (
              <div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
                style={{
                  ...style,
                  width: "280px",
                  height: "210px",
                }}
              >
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200 bg-white cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  onClick={() => handlePairClick(index)}
                >
                  {/* Split view: Before (left) and After (right) */}
                  <div className="relative w-full h-full flex">
                    <div className="w-1/2 h-full relative overflow-hidden">
                      <img
                        src={pair.before}
                        alt={`${pair.title} - Before`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-gray-800 text-white text-xs font-bold rounded">
                          BEFORE
                        </span>
                      </div>
                    </div>
                    <div className="w-1/2 h-full relative overflow-hidden">
                      <img
                        src={pair.after}
                        alt={`${pair.title} - After`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                          AFTER
                        </span>
                      </div>
                    </div>
                    {/* Divider */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white transform -translate-x-1/2 z-10" />
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white font-semibold text-xs text-center">
                      {pair.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-8">
        {pairs.map((_, index) => {
          const anglePerItem = 360 / pairs.length;
          const targetAngle = index * anglePerItem;
          const currentNormalized = rotation % 360;
          const diff = Math.abs(
            ((targetAngle - currentNormalized + 540) % 360) - 180
          );
          const isActive = diff < anglePerItem / 2;

          return (
            <button
              key={index}
              onClick={() => {
                setRotation(targetAngle);
                setLastRotation(targetAngle);
              }}
              className={`h-2 rounded-full transition-all ${
                isActive
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
              }`}
            />
          );
        })}
      </div>

      {/* Instruction text */}
      <p className="text-center text-muted-foreground text-sm mt-6">
        Drag to rotate • Click any image to view full before/after comparison
      </p>
    </div>
  );
}
