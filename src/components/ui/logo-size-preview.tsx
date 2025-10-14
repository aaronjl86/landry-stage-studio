import tlmLogoVideo from '@/assets/tlm-logo-animated.mp4';

export const LogoSizePreview = () => {
  const sizes = [
    { height: 60, label: "60px (Very Small)" },
    { height: 80, label: "80px (Small)" },
    { height: 100, label: "100px (Medium Small)" },
    { height: 120, label: "120px (Medium)" },
    { height: 140, label: "140px (Medium Large)" },
    { height: 160, label: "160px (Large)" },
    { height: 180, label: "180px (Very Large)" },
    { height: 200, label: "200px (Extra Large)" },
  ];

  return (
    <div className="min-h-screen p-8 bg-background">
      <h1 className="text-3xl font-bold mb-2 text-center">TLM Logo Size Preview</h1>
      <p className="text-muted-foreground text-center mb-8">Choose the size that's most readable for you</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {sizes.map((size, index) => (
          <div key={index} className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-card">
            <video
              src={tlmLogoVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{ height: `${size.height}px`, width: 'auto' }}
              className="object-contain"
            />
            <span className="text-sm font-medium text-foreground">{size.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
