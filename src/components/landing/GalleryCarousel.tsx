import ThreeDCarousel from "@/components/ui/three-d-carousel";
import beforeLivingRoom1 from '@/assets/gallery/before-living-room-1.jpg';
import afterLivingRoom1 from '@/assets/gallery/after-living-room-1.jpg';
import beforeLivingRoom2 from '@/assets/gallery/before-living-room-2.jpg';
import afterLivingRoom2 from '@/assets/gallery/after-living-room-2.jpg';
import beforeRoom1 from '@/assets/gallery/before-room-1.jpg';
import afterRoom1 from '@/assets/gallery/after-room-1.jpg';
import beforeBedroom from '@/assets/gallery/before-bedroom.jpg';
import afterBedroom from '@/assets/gallery/after-bedroom.jpg';
import bedroomStaged from '@/assets/gallery/bedroom-staged.jpg';
import beforeDiningRoom from '@/assets/gallery/before-dining-room.webp';
import afterDiningRoom from '@/assets/gallery/after-dining-room.webp';

export const GalleryCarousel = () => {
  const carouselItems = [
    { image: beforeLivingRoom1, title: 'Modern Living Room - Before' },
    { image: afterLivingRoom1, title: 'Modern Living Room - After' },
    { image: beforeLivingRoom2, title: 'Open Concept Living - Before' },
    { image: afterLivingRoom2, title: 'Open Concept Living - After' },
    { image: beforeRoom1, title: 'Cozy Room - Before' },
    { image: afterRoom1, title: 'Cozy Room - After' },
    { image: beforeBedroom, title: 'Master Bedroom - Before' },
    { image: afterBedroom, title: 'Master Bedroom - After' },
    { image: bedroomStaged, title: 'Styled Bedroom' },
    { image: beforeDiningRoom, title: 'Elegant Dining Room - Before' },
    { image: afterDiningRoom, title: 'Elegant Dining Room - After' },
  ];

  return <ThreeDCarousel items={carouselItems} />;
};
