import beforeLivingRoom1 from '@/assets/gallery/before-living-room-1.jpg';

export const ImageSizePreview = () => {
  const sizes = [
    { width: 200, height: 150, label: "200x150" },
    { width: 250, height: 188, label: "250x188" },
    { width: 300, height: 225, label: "300x225" },
    { width: 350, height: 263, label: "350x263" },
    { width: 400, height: 300, label: "400x300" },
    { width: 450, height: 338, label: "450x338" },
    { width: 500, height: 375, label: "500x375" },
    { width: 550, height: 413, label: "550x413" },
    { width: 600, height: 450, label: "600x450" },
    { width: 650, height: 488, label: "650x488" },
  ];

  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-center">Image Size Preview with Rounded Frames</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sizes.map((size, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border bg-transparent"
              style={{ width: size.width, height: size.height }}
            >
              <img
                src={beforeLivingRoom1}
                alt={`Preview ${size.label}`}
                className="absolute inset-0 w-full h-full object-cover transform scale-[1.22] translate-y-[-2%]"
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{size.label}px</span>
          </div>
        ))}
      </div>
    </div>
  );
};
