import { useState, ChangeEvent } from "react";
import beforeRoom from "@/assets/before-empty-room.jpg";
import afterRoom from "@/assets/after-staged-room.jpg";

export const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-4xl md:text-5xl font-bold">
            Spatial Intelligence in Motion
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to compare the empty room with our AI-staged version.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            {/* Before Image */}
            <img
              src={beforeRoom}
              alt="Empty living room before staging"
              className="absolute inset-0 w-full h-full object-cover"
              width={1200}
              height={900}
              loading="eager"
              decoding="async"
            />

            {/* After Image (masked to slider position) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <img
                src={afterRoom}
                alt="Staged living room after virtual staging"
                className="w-full h-full object-cover"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Slider Control */}
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

              {/* Slider Visual */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-0.5 h-4 bg-primary" />
                    <div className="w-0.5 h-4 bg-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-1 rounded text-sm font-semibold">
              Before
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-1 rounded text-sm font-semibold">
              After
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
