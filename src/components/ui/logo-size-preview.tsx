import kellerWilliamsLogo from '@/assets/logos/keller-williams.png';
import remaxLogo from '@/assets/logos/remax.png';
import century21Logo from '@/assets/logos/century21.png';
import coldwellBankerLogo from '@/assets/logos/coldwell-banker.png';

export const LogoSizePreview = () => {
  const sizes = [
    { class: "h-6", label: "h-6 (24px - Original)" },
    { class: "h-8", label: "h-8 (32px)" },
    { class: "h-10", label: "h-10 (40px)" },
    { class: "h-12", label: "h-12 (48px)" },
    { class: "h-16", label: "h-16 (64px)" },
    { class: "h-20", label: "h-20 (80px)" },
    { class: "h-21", label: "h-21 (84px - Current)" },
    { class: "h-24", label: "h-24 (96px)" },
    { class: "h-28", label: "h-28 (112px)" },
    { class: "h-32", label: "h-32 (128px)" },
  ];

  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-bold mb-6 text-center">Logo Size Preview</h2>
      <div className="space-y-8">
        {sizes.map((size, index) => (
          <div key={index} className="border rounded-lg p-6">
            <div className="text-sm font-medium mb-4 text-muted-foreground">{size.label}</div>
            <div className="flex items-center justify-center gap-6 flex-wrap bg-muted/30 rounded-lg p-4">
              <img src={kellerWilliamsLogo} alt="Keller Williams" className={`${size.class} object-contain`} />
              <img src={remaxLogo} alt="RE/MAX" className={`${size.class} object-contain`} />
              <img src={century21Logo} alt="Century 21" className={`${size.class} object-contain`} />
              <img src={coldwellBankerLogo} alt="Coldwell Banker" className={`${size.class} object-contain`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
