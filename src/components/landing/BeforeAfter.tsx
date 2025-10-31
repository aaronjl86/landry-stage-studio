import { useState } from "react";

export const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* ===== Header Section ===== */}
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-4xl md:text-5xl font-bold">
            <img
              src="/images/after/after-living-room-fireplace-staged.jpeg"
              alt="Spatial Intelligence in Motion title"
              className="mx-auto h-auto max-h-24 w-auto object-contain rounded-md"
              loading="lazy"
              decoding="async"
              width="800"
              height="200"
            />
            <span className="sr-only">Spatial Intelligence in Motion</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to compare the empty room with our AI-staged version
          </p>
        </div>

        {/* ===== Before/After Slider ===== */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            {/* Before Image (empty room) */}
            <img
              src="/images/before/before-living-room-fireplace.jpeg"
              alt="Empty living room before staging"
              className="absolute inset-0 w-full h-full object-cover"
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) 90vw, 800px"
              fetchpriority="high"
            />

            {/* After Image (staged room) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <img
                src="/images/after/after-living-room-fireplace-staged.jpeg"
                alt="Staged living room after virtual staging"
                className="w-full h-full object-cover"
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 90vw, 800px"
              />
            </div>

            {/* ===== Slider Control ===== */}
            <div className="absolute inset-0 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute w-full h-full opacity-0 cursor-ew-resize z-10"
                aria-label="Slide to compare before and after staging"
              />

              {/* Slider line + handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-0.5 h-4 bg-primary" />
                    <div className="w-0.5 h-4 bg-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Labels ===== */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Before
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              After
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
