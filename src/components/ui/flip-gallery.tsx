import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const images = [
  { title: 'Modern Living Room - Before', url: beforeLivingRoom1 },
  { title: 'Modern Living Room - After', url: afterLivingRoom1 },
  { title: 'Open Concept Living - Before', url: beforeLivingRoom2 },
  { title: 'Open Concept Living - After', url: afterLivingRoom2 },
  { title: 'Cozy Room - Before', url: beforeRoom1 },
  { title: 'Cozy Room - After', url: afterRoom1 },
  { title: 'Master Bedroom - Before', url: beforeBedroom },
  { title: 'Master Bedroom - After', url: afterBedroom },
  { title: 'Styled Bedroom', url: bedroomStaged },
  { title: 'Elegant Dining Room - Before', url: beforeDiningRoom },
  { title: 'Elegant Dining Room - After', url: afterDiningRoom }
];

const FLIP_SPEED = 750;
const flipTiming = { duration: FLIP_SPEED, iterations: 1 };

// flip down
const flipAnimationTop = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' }
];
const flipAnimationBottom = [
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(0)' }
];

// flip up
const flipAnimationTopReverse = [
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(-90deg)' },
  { transform: 'rotateX(0)' }
];
const flipAnimationBottomReverse = [
  { transform: 'rotateX(0)' },
  { transform: 'rotateX(90deg)' },
  { transform: 'rotateX(90deg)' }
];

export default function FlipGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniteRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // initialise first image once
  useEffect(() => {
    if (!containerRef.current) return;
    uniteRef.current = containerRef.current.querySelectorAll('.unite');
    defineFirstImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defineFirstImg = () => {
    if (!uniteRef.current) return;
    uniteRef.current.forEach(setActiveImage);
    setImageTitle();
  };

  const setActiveImage = (el: HTMLElement) => {
    el.style.backgroundImage = `url('${images[currentIndex].url}')`;
  };

  const setImageTitle = () => {
    const gallery = containerRef.current;
    if (!gallery) return;
    gallery.setAttribute('data-title', images[currentIndex].title);
    gallery.style.setProperty('--title-y', '0');
    gallery.style.setProperty('--title-opacity', '1');
  };

  const updateGallery = (nextIndex: number, isReverse = false) => {
    const gallery = containerRef.current;
    if (!gallery) return;

    // determine direction animation arrays
    const topAnim = isReverse ? flipAnimationTopReverse : flipAnimationTop;
    const bottomAnim = isReverse
      ? flipAnimationBottomReverse
      : flipAnimationBottom;

    gallery.querySelector('.overlay-top')?.animate(topAnim, flipTiming);
    gallery.querySelector('.overlay-bottom')?.animate(bottomAnim, flipTiming);

    // hide title
    gallery.style.setProperty('--title-y', '-1rem');
    gallery.style.setProperty('--title-opacity', '0');
    gallery.setAttribute('data-title', '');

    // update images with slight delay so animation looks continuous
    if (!uniteRef.current) return;
    uniteRef.current.forEach((el, idx) => {
      const delay =
        (isReverse && (idx !== 1 && idx !== 2)) ||
        (!isReverse && (idx === 1 || idx === 2))
          ? FLIP_SPEED - 200
          : 0;

      setTimeout(() => setActiveImage(el), delay);
    });

    // reveal new title roughly half‑way through animation
    setTimeout(setImageTitle, FLIP_SPEED * 0.5);
  };

  const updateIndex = (increment: number) => {
    const inc = Number(increment);
    const newIndex = (currentIndex + inc + images.length) % images.length;
    const isReverse = inc < 0;
    setCurrentIndex(newIndex);
    updateGallery(newIndex, isReverse);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative bg-white/10 border border-white/25 p-2"
        style={{ '--gallery-bg-color': 'rgba(255 255 255 / 0.075)' } as React.CSSProperties}
      >
        {/* flip gallery */}
        <div
          id="flip-gallery"
          ref={containerRef}
          className="relative w-[240px] h-[400px] md:w-[300px] md:h-[500px] text-center"
          style={{ perspective: '800px' } as React.CSSProperties}
        >
          <div className="top unite bg-cover bg-no-repeat"></div>
          <div className="bottom unite bg-cover bg-no-repeat"></div>
          <div className="overlay-top unite bg-cover bg-no-repeat"></div>
          <div className="overlay-bottom unite bg-cover bg-no-repeat"></div>
        </div>

        {/* navigation */}
        <div className="absolute top-full right-0 mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => updateIndex(-1)}
            title='Previous'
            aria-label="View previous image"
            className='text-foreground opacity-75 hover:opacity-100 hover:scale-125 transition'
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => updateIndex(1)}
            title='Next'
            aria-label="View next image"
            className='text-foreground opacity-75 hover:opacity-100 hover:scale-125 transition'
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* component-scoped styles that Tailwind cannot express */}
      <style>{`
        #flip-gallery {
          --title-y: -1rem;
          --title-opacity: 0;
        }

        #flip-gallery::after {
          content: attr(data-title);
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 0.5rem;
          background: var(--gallery-bg-color);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-size: 0.875rem;
          text-align: center;
          color: white;
          transform: translateY(var(--title-y));
          opacity: var(--title-opacity);
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .unite {
          position: absolute;
          width: 100%;
          height: 50%;
          left: 0;
          overflow: hidden;
          background-position: center;
        }

        .top {
          top: 0;
          transform-origin: center bottom;
        }

        .bottom {
          bottom: 0;
          transform-origin: center top;
          background-position: center bottom;
        }

        .overlay-top {
          top: 0;
          transform-origin: center bottom;
          z-index: 1;
        }

        .overlay-bottom {
          bottom: 0;
          transform-origin: center top;
          background-position: center bottom;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
