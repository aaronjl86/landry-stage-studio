import ThreeDCarousel from "@/components/ui/carousel-3d"

const carouselItems = [
  {
    beforeImage: "/images/before/before-cozy-guest-room.jpeg",
    afterImage: "/images/after/after-cozy-guest-room-modern.jpeg",
    title: "Cozy Bedroom"
  },
  {
    beforeImage: "/images/before/before-empty-bedroom.png",
    afterImage: "/images/after/after-traditional-bedroom.jpeg",
    title: "Guest Bedroom"
  },
  {
    beforeImage: "/images/before/before-modern-kitchen.jpeg",
    afterImage: "/images/after/after-modern-kitchen-dining.jpeg",
    title: "Modern Kitchen"
  },
  {
    beforeImage: "/images/before/before-outdoor-patio.jpeg",
    afterImage: "/images/after/after-outdoor-patio-staged.jpeg",
    title: "Outdoor Patio"
  },
  {
    beforeImage: "/images/before/before-living-room-fireplace.jpeg",
    afterImage: "/images/after/after-living-room-fireplace-staged.jpeg",
    title: "Living Room"
  },
  {
    beforeImage: "/images/before/before-dining-room.png",
    afterImage: "/images/after/after-dining-room.png",
    title: "Dining Room"
  }
];

export const GalleryCarousel = () => {
  return <ThreeDCarousel items={carouselItems} />
}
