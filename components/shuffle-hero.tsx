"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionTemplate } from "framer-motion"
import { ArrowRight, ChevronRight, Shield, Server, Brain, HeartIcon } from 'lucide-react'

export interface ShuffleHeroProps {
  theme: "light" | "dark"
  onThemeChange?: (theme: "light" | "dark") => void
}

// Image data for the shuffle grid
const squareData = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/7659569/pexels-photo-7659569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/7088526/pexels-photo-7088526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/7988218/pexels-photo-7988218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/12899191/pexels-photo-12899191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/6804084/pexels-photo-6804084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/6803532/pexels-photo-6803532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/6755049/pexels-photo-6755049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/9241774/pexels-photo-9241774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 10,
    src: "https://images.pexels.com/photos/7988748/pexels-photo-7988748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 11,
    src: "https://images.pexels.com/photos/7988759/pexels-photo-7988759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 12,
    src: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 13,
    src: "https://images.pexels.com/photos/16323581/pexels-photo-16323581/free-photo-of-a-man-sitting-at-a-desk-with-two-monitors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 14,
    src: "https://images.pexels.com/photos/5439379/pexels-photo-5439379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 15,
    src: "https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 16,
    src: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
]

// Shuffle array function
const shuffle = (array: typeof squareData) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

// EnhancedShuffleGrid component
const EnhancedShuffleGrid = ({ isDark }: { isDark: boolean }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [squares, setSquares] = useState<React.ReactNode[]>([])
  const [isHovering, setIsHovering] = useState(false)

  // Generate squares with animations
  const generateSquares = () => {
    return shuffle([...squareData])
      .slice(0, 9)
      .map((sq) => (
        <motion.div
          key={sq.id}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.8,
              type: "spring",
              bounce: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.6 },
          }}
          whileHover={{
            scale: 1.05,
            zIndex: 20,
            boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.2)",
          }}
          className="relative w-full h-full overflow-hidden rounded-lg"
        >
          {/* Image with filter effect */}
          <motion.div
            className="absolute inset-0 h-full w-full"
            style={{
              backgroundImage: `url(${sq.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            whileHover={{
              scale: 1.1,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                : "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
            }`}
          >
            <div className="absolute bottom-0 left-0 w-full p-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-white"
              >
                <div className="text-sm font-medium">IT Solution {sq.id}</div>
                <div className="mt-1 text-xs text-zinc-300">Click to explore</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative corner accent */}
          <motion.div
            className="absolute right-0 top-0 h-12 w-12 origin-top-right"
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute right-0 top-0 h-px w-8 bg-gradient-to-l from-rose-500 to-transparent"></div>
            <div className="absolute right-0 top-0 h-8 w-px bg-gradient-to-b from-rose-500 to-transparent"></div>
          </motion.div>
        </motion.div>
      ))
  }

  // Initialize and handle shuffling
  useEffect(() => {
    setSquares(generateSquares())
    shuffleSquares()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isDark])

  const shuffleSquares = () => {
    if (isHovering) {
      timeoutRef.current = setTimeout(shuffleSquares, 3000)
      return
    }

    // Create a fade out/in effect
    const fadeOutTimeout = setTimeout(() => {
      setSquares([])

      const fadeInTimeout = setTimeout(() => {
        setSquares(generateSquares())
        timeoutRef.current = setTimeout(shuffleSquares, 3000)
      }, 300)

      return () => clearTimeout(fadeInTimeout)
    }, 3000)

    return () => clearTimeout(fadeOutTimeout)
  }

  return (
    <motion.div
      className="relative h-[600px] overflow-hidden rounded-2xl"
      style={{
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        rotateY: 5,
        rotateX: -5,
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 z-10 rounded-2xl"></div>

      {/* Grid with perspective effect */}
      <div
        className="grid h-full grid-cols-3 grid-rows-3 gap-3 p-3"
        style={{
          transform: "translateZ(0px)",
        }}
      >
        <AnimatePresence>{squares}</AnimatePresence>
      </div>
    </motion.div>
  )
}

export function ShuffleHero({ theme = "dark", onThemeChange }: ShuffleHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const textVariants = ["Secure", "Manage", "Support", "Optimize"]
  const isDark = theme === "dark"
  const containerRef = useRef<HTMLDivElement>(null)

  // Track mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animate text cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % textVariants.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [textVariants.length])

  const mouseX = useMotionTemplate`${mousePosition.x}px`
  const mouseY = useMotionTemplate`${mousePosition.y}px`

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen w-full overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-zinc-900 via-zinc-900 to-black"
          : "bg-gradient-to-b from-zinc-100 via-zinc-100 to-white"
      } transition-colors duration-500`}
    >
      {/* Spotlight effect that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mouseX} ${mouseY}, ${
            isDark ? "rgba(255,59,92,0.15)" : "rgba(255,59,92,0.1)"
          }, transparent 40%)`,
        }}
      />

      {/* Decorative elements */}
      <div
        className={`absolute -left-20 top-20 h-[500px] w-[500px] rounded-full ${
          isDark
            ? "bg-gradient-to-r from-rose-500/20 to-orange-500/20"
            : "bg-gradient-to-r from-rose-500/10 to-orange-500/10"
        } blur-3xl`}
      ></div>
      <div
        className={`absolute -right-20 bottom-20 h-[400px] w-[400px] rounded-full ${
          isDark
            ? "bg-gradient-to-l from-emerald-500/20 to-teal-500/20"
            : "bg-gradient-to-l from-emerald-500/10 to-teal-500/10"
        } blur-3xl`}
      ></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-0 bg-center opacity-20"></div>

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] w-full items-center justify-center px-8 py-24 pt-28">
        <div className="grid max-w-7xl gap-16 lg:grid-cols-2">
          <div className="relative max-w-xl">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                bounce: 0.4,
              }}
              className={`relative mb-8 inline-flex items-center gap-2 rounded-full ${
                isDark
                  ? "bg-gradient-to-r from-rose-500/10 to-orange-500/10"
                  : "bg-gradient-to-r from-rose-500/5 to-orange-500/5"
              } px-5 py-2.5 backdrop-blur-md`}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  isDark ? "bg-rose-500 text-white" : "bg-rose-600 text-white"
                }`}
              >
                <Brain size={12} />
              </motion.div>
              <span className={`text-sm font-medium tracking-wider ${isDark ? "text-rose-200" : "text-rose-700"}`}>
                AI Powered
              </span>
            </motion.div>

            {/* Main heading with animated text */}
            <div className="mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-5xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-zinc-900"
                } md:text-6xl lg:text-7xl`}
              >
                <span className="mr-4">We</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-block bg-gradient-to-r ${
                      isDark
                        ? "from-rose-400 to-orange-400 bg-clip-text text-transparent"
                        : "from-rose-600 to-orange-600 bg-clip-text text-transparent"
                    }`}
                  >
                    {textVariants[textIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`mt-2 text-5xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-zinc-900"
                } md:text-6xl lg:text-7xl`}
              >
                your IT infrastructure
              </motion.h2>
            </div>

            {/* Description with animated underline */}
            <div className="relative">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`text-lg leading-relaxed ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
              >
                As your dedicated Managed Service Provider, we deliver comprehensive IT solutions that keep your
                business running smoothly. From 24/7 monitoring and support to strategic technology planning, we handle
                your IT so you can focus on growth.
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                className={`absolute -bottom-3 left-0 h-px w-full origin-left ${
                  isDark
                    ? "bg-gradient-to-r from-rose-500 to-transparent"
                    : "bg-gradient-to-r from-rose-600 to-transparent"
                }`}
              />
            </div>

            {/* Buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(244, 63, 94, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 px-8 py-4 font-medium text-white"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get IT Assessment
                  <motion.div animate={isHovering ? { x: 5 } : { x: 0 }} transition={{ duration: 0.3 }}>
                    <ArrowRight size={18} />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 z-0 bg-gradient-to-r from-orange-500 to-rose-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center gap-1 rounded-lg border ${
                  isDark
                    ? "border-zinc-700 bg-zinc-800/50 text-white hover:border-rose-500/50 hover:bg-zinc-800/80"
                    : "border-zinc-300 bg-white/50 text-zinc-900 hover:border-rose-500/30 hover:bg-white/80"
                } px-8 py-4 font-medium backdrop-blur-sm transition-all`}
              >
                Our Services
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${isDark ? "text-rose-400" : "text-rose-600"}`}
                >
                  <ChevronRight size={18} />
                </motion.div>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              {[
                { icon: Shield, label: "Security" },
                { icon: Server, label: "Infrastructure" },
                { icon: HeartIcon, label: "HealthCare" },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.8 + index * 0.2,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${
                      isDark
                        ? "bg-gradient-to-br from-rose-500/20 to-orange-500/20 text-rose-400"
                        : "bg-gradient-to-br from-rose-500/10 to-orange-500/10 text-rose-600"
                    }`}
                  >
                    <feature.icon size={24} />
                  </motion.div>
                  <div className={`text-sm font-medium ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
                    {feature.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced grid with 3D effect */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
              className="relative z-10"
            >
              <EnhancedShuffleGrid isDark={isDark} />
            </motion.div>

            {/* Decorative elements */}
            <div
              className={`absolute -bottom-10 -right-10 z-0 h-80 w-80 rounded-full border ${
                isDark ? "border-rose-500/20" : "border-rose-500/10"
              }`}
            ></div>
            <div
              className={`absolute -top-10 -left-10 z-0 h-80 w-80 rounded-full border ${
                isDark ? "border-emerald-500/20" : "border-emerald-500/10"
              }`}
            ></div>

            {/* Glow effect */}
            <div
              className={`absolute -bottom-20 -right-20 z-0 h-60 w-60 rounded-full ${
                isDark ? "bg-rose-500/10" : "bg-rose-500/5"
              } blur-3xl`}
            ></div>
            <div
              className={`absolute -top-20 -left-20 z-0 h-60 w-60 rounded-full ${
                isDark ? "bg-emerald-500/10" : "bg-emerald-500/5"
              } blur-3xl`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}
