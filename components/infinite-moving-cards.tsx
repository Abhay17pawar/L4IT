"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  theme = "dark",
}: {
  items: {
    company: string
    logo: string
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
  theme?: "light" | "dark"
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])

  const [start, setStart] = useState(false)

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
        theme === "dark" ? "text-white" : "text-black", // Explicitly set text to black in light mode
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-12 py-12",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li className="group flex items-center justify-center" key={`${item.company}-${idx}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{
                scale: 1.05,
                boxShadow: theme === "dark" ? "0 0 20px rgba(56, 189, 248, 0.2)" : "0 0 20px rgba(79, 70, 229, 0.1)",
              }}
              className={`relative flex h-24 w-48 items-center justify-center overflow-hidden rounded-xl p-6 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-zinc-800/60 hover:bg-zinc-700/60 shadow-lg shadow-black/20 border border-zinc-700/50"
                  : "bg-white hover:bg-zinc-50 shadow-md shadow-black/5 border border-zinc-200"
              }`}
            >
              {/* AI-themed decorative elements */}
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  theme === "dark" ? "bg-blue-900/10" : "bg-indigo-50/50"
                }`}
              ></div>

              {/* Circuit pattern overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${theme === "dark" ? "3B82F6" : "4F46E5"}' fillOpacity='0.4' fillRule='evenodd'/%3E%3C/svg%3E")`,
                  backgroundSize: "24px 24px",
                }}
              ></div>

              {/* Glowing border effect on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(45deg, rgba(56,189,248,0.1) 0%, rgba(79,70,229,0.1) 100%)"
                      : "linear-gradient(45deg, rgba(56,189,248,0.05) 0%, rgba(79,70,229,0.05) 100%)",
                  boxShadow:
                    theme === "dark" ? "inset 0 0 20px rgba(56,189,248,0.15)" : "inset 0 0 20px rgba(79,70,229,0.05)",
                }}
              ></div>

              {/* Logo container with fixed dimensions and proper centering */}
              <div className="relative flex h-full w-full items-center justify-center">
                <Image
                  src={item.logo || "/placeholder.svg?height=60&width=120"}
                  alt={`${item.company} logo`}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain"
                  style={{
                    filter: theme === "dark" && item.company === "Apple" ? "invert(1)" : "none",
                  }}
                />
              </div>

              {/* Animated pulse dot */}
              <motion.div
                className={`absolute top-2 right-2 h-2 w-2 rounded-full ${
                  theme === "dark" ? "bg-blue-400" : "bg-indigo-500"
                }`}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              ></motion.div>

              {/* Company name tooltip with explicit black text in light mode */}
              <div
                className={`absolute -bottom-8 left-0 right-0 mx-auto w-max rounded-md px-2 py-1 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  theme === "dark" ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-black" // Explicitly black text for light mode
                }`}
              >
                {item.company}
              </div>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  )
}
