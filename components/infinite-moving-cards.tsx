"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import Image from "next/image"

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  theme = "dark",
}: {
  items: {
    quote: string
    name: string
    title: string
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
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className={`relative w-[350px] max-w-full shrink-0 rounded-2xl border px-8 py-6 shadow-sm transition-all duration-200 hover:shadow-md md:w-[450px] ${
              theme === "dark" ? "border-zinc-800 bg-zinc-900" : "border-zinc-100 bg-white"
            }`}
            key={item.name}
          >
            <blockquote className="relative">
              <div
                className={`absolute -top-4 -left-2 text-4xl ${theme === "dark" ? "text-zinc-700" : "text-zinc-200"}`}
              >
                "
              </div>
              <span
                className={`relative z-20 text-sm leading-[1.6] font-normal ${
                  theme === "dark" ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full mr-3 ${
                    theme === "dark" ? "bg-zinc-800" : "bg-zinc-50"
                  }`}
                >
                  <Image
                    src={item.logo || "/placeholder.svg?height=40&width=40"}
                    alt={`${item.company} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
                  {item.name}
                </span>
                <span className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                  {item.title}, {item.company}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}
