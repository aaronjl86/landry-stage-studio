'use client'

import { memo, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion'

// ========== UTILITIES ==========
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === 'undefined'

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

// ========== IMAGE SETS ==========
const beforeImages: string[] = [
  '/images/before/before-cozy-guest-room.jpeg',
  '/images/before/before-empty-bedroom.png',
  '/images/before/before-living-room-fireplace.jpeg',
  '/images/before/before-modern-kitchen.jpeg',
  '/images/before/before-outdoor-patio.jpeg',
]

const afterImages: string[] = [
  '/images/after/after-cozy-guest-room-modern.jpeg',
  '/images/after/after-living-room-fireplace-staged.jpeg',
  '/images/after/after-modern-kitchen-dining.jpeg',
  '/images/after/after-outdoor-patio-staged.jpeg',
  '/images/after/after-traditional-bedroom.jpeg',
]

// ========== MAIN CAROUSEL ==========
const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: any
    cards: string[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery('(max-width: 640px)')
    const cylinderWidth = isScreenSizeSm ? 1500 : 2400
    const faceCount = cards.length
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => 'rotate3d(0, 1, 0, ' + value + 'deg)'
    )

    return (
      <motion.div
        className='relative flex h-full items-center justify-center bg-background'
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d',
          touchAction: 'pan-y',
        }}
        drag='x'
        dragElastic={0.02}
        dragMomentum={false}
        onDrag={(e, info) => {
          if (isCarouselActive)
            rotation.set(rotation.get() + info.offset.x * 0.05)
        }}
        onDragEnd={(e, info) => {
          if (isCarouselActive)
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
        }}
        animate={controls}
      >
        <motion.div
          style={{
            transform,
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
          className='h-full'
        >
          {cards.map((imgUrl, i) => {
            const angle = (360 / faceCount) * i
            return (
              <motion.div
                key={i}
                className='absolute h-full w-full cursor-pointer'
                style={{
                  transform: 'rotateY(' + angle + 'deg) translateZ(' + radius + 'px)',
                  transformOrigin: 'center center',
                }}
                onClick={() => handleClick(imgUrl, i)}
              >
                <motion.img
                  src={imgUrl}
                  alt={'carousel-image-' + i}
                  className='h-full w-full object-cover aspect-square rounded-xl shadow-2xl'
                />
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    )
  }
)

// ========== MAIN COMPONENT ==========
export function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const [showAfter, setShowAfter] = useState(false)
  const controls = useAnimation()

  const cards = useMemo(() => (showAfter ? afterImages : beforeImages), [showAfter])

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  return (
    <section className='flex flex-col items-center justify-center py-10'>
      <h2 className='text-3xl font-semibold text-center mb-4'>
        See The Transformation
      </h2>
      <button
        onClick={() => setShowAfter(!showAfter)}
        className='mb-8 px-6 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white shadow transition'
      >
        {showAfter ? 'Show Before' : 'Show After'}
      </button>
      <div className='w-full h-[500px] flex items-center justify-center'>
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
      {activeImg && (
        <motion.div
          className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.img
            src={activeImg}
            alt='Full size'
            className='max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl object-contain'
          />
        </motion.div>
      )}
    </section>
  )
}

export default ThreeDPhotoCarousel
