"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

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

  const [matches, setMatches] = useState<boolean>(() => {
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

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const keywords = [
  "night",
  "city",
  "sky",
  "sunset",
  "sunrise",
  "winter",
  "skyscraper",
  "building",
  "cityscape",
  "architecture",
  "street",
  "lights",
  "downtown",
  "bridge",
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as any, filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as any }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
    showBefore,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: any
    cards: string[]
    isCarouselActive: boolean
    showBefore: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1500 : 2400
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center bg-background"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-card p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <div className="relative w-full h-full">
                <motion.img
                  src={imgUrl}
                  alt={`Staging example ${i + 1}`}
                  layoutId={`img-${imgUrl}`}
                  className="pointer-events-none w-full h-full rounded-xl object-cover aspect-square"
                  initial={{ filter: "blur(4px)" }}
                  layout="position"
                  animate={{ filter: "blur(0px)" }}
                  transition={transition}
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {showBefore ? "Before" : "After"}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`

const beforeImages = [
  "/images/before/IMG_0029.jpeg",
  "/images/before/IMG_0038.jpeg",
  "/images/before/IMG_0033.jpeg",
  "/images/before/IMG_2817.jpeg",
  "/images/before/IMG_2826.jpeg",
]

const afterImages = [
  "/images/after/Living-Room-With-Fireplace-Staged.jpeg",
  "/images/after/edited_IMG_0038.jpeg",
  "/images/after/edited_IMG_0033.jpeg",
  "/images/after/edited_IMG_2817.jpeg",
  "/images/after/edited_IMG_2826.jpeg",
]

const prompts = [
  "Remove decor from fireplace and replace with art nouveau decor. Enhance every wall visible with textures, accents, and stylish designs. Furnish with curved Vladimir Kagan-style serpentine sofa in charcoal, live-edge walnut media console, oversized Yayoi Kusama infinity dot canvas, ceramic sculptural table lamps, and mid-century modern area rug",
  "Add teakwood patio furniture and large potted plants",
  "Stage with upholstered wingback bed in heathered linen, cerused oak nightstands with brass lamps, Matisse Blue Nude cutout prints above bed, and plush wool area rug in cream",
  "Install live-edge acacia dining table with Prouvé chairs in navy, suspended Lindsey Adelman bubble chandelier, and Memphis Group-inspired credenza with vintage decanters and various small kitchen appliances on the countertops",
  "Add bohemian style art and decor, boho bed set with rattan nightstands and hanging plants",
]

function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const [showBefore, setShowBefore] = useState(true)
  const controls = useAnimation()
  const cards = useMemo(
    () => (showBefore ? beforeImages : afterImages),
    [showBefore]
  )

  useEffect(() => {
    console.log("Cards loaded:", cards)
  }, [cards])

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
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-full max-h-full rounded-lg shadow-lg"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                willChange: "transform",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowBefore(!showBefore)}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:bg-primary/90 transition-colors"
        >
          {showBefore ? "Show After" : "Show Before"}
        </button>
      </div>

      <div className="relative h-[700px] w-full overflow-visible flex items-center justify-center">
        <div className="scale-[1.4] origin-center">
          <Carousel
            handleClick={handleClick}
            controls={controls}
            cards={cards}
            isCarouselActive={isCarouselActive}
            showBefore={showBefore}
          />
        </div>
      </div>

      {/* Prompt Reference Section */}
      <section className="mt-16 w-full max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Prompt Reference</h2>
        <p className="text-muted-foreground text-center mb-8">
          See the exact prompts used to create these stunning transformations
        </p>
        <div className="space-y-4">
          {prompts.map((prompt, index) => (
            <div
              key={index}
              className="bg-muted/30 rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-foreground leading-relaxed flex-1">{prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel }
