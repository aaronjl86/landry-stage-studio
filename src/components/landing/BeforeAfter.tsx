import spatialIntelligenceTitle from "@/assets/spatial-intelligence-in-motion.png";

const BeforeAfter = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <img 
            src="/cdn-cgi/image/width=800,quality=85,format=auto/assets/spatial-intelligence-in-motion.png"
            alt="Spatial Intelligence in Motion title"
            className="mx-auto h-auto max-h-24 w-auto object-contain"
            loading="lazy"
            decoding="async"
            width="800"
            height="200"
          />
        </div>

        <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative aspect-[16/10] bg-muted">
            <img 
              src="/cdn-cgi/image/width=1200,quality=85,format=auto/images/before/before-living-room-fireplace.jpeg"
              alt="Empty living room before staging"
              className="absolute inset-0 w-full h-full object-cover"
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1024px) 90vw, 800px"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/cdn-cgi/image/width=1200,quality=85,format=auto/images/after/after-living-room-fireplace-staged.jpeg"
                alt="Staged living room after virtual staging"
                className="w-full h-full object-cover"
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 90vw, 800px"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform empty spaces into beautifully staged rooms with The Landry Method's 
            AI-powered virtual staging technology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
