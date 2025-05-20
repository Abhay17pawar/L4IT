"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion"
import { Shield, Server, Clock, Brain, Laptop, Cloud, Lock, Users, Headphones } from "lucide-react"

interface BentoCardProps {
  icon: React.ElementType
  title: string
  description: string
  className?: string
  background?: React.ReactNode
  theme: "light" | "dark"
  index: number
}

const BentoCard = ({ icon: Icon, title, description, className, background, theme, index }: BentoCardProps) => {
  const isDark = theme === "dark"
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut",
          },
        },
      }}
      whileHover={{ y: -5 }}
      className={`group relative col-span-1 overflow-hidden rounded-xl border ${
        isDark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-white"
      } p-4 transition-all duration-200 ${className}`}
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${
              isDark ? "bg-zinc-800 text-blue-400" : "bg-blue-100 text-blue-600"
            }`}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className={`mb-2 text-lg font-medium ${isDark ? "text-white" : "text-zinc-900"}`}
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            className={`text-sm ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
          >
            {description}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          className="mt-4"
        >
          <motion.button
            whileHover={{ x: 5 }}
            className={`flex items-center text-sm font-medium ${
              isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
      {background && <div className="absolute inset-0 z-0">{background}</div>}
    </motion.div>
  )
}

interface BentoGridProps {
  theme: "light" | "dark"
}

export function BentoGrid({ theme }: BentoGridProps) {
  const isDark = theme === "dark"
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, -100])

  const features = [
    {
      icon: Shield,
      title: "Cybersecurity Solutions",
      description: "Enterprise-grade security protocols to protect your business from evolving threats.",
      className: "col-span-3 lg:col-span-1 min-h-[220px]",
      background: (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5, x: 20 }}
                animate={hoveredIndex === 0 ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`h-2 rounded-full ${isDark ? "bg-blue-500/30" : "bg-blue-500/20"}`}
                style={{ width: `${i * 20}px` }}
              ></motion.div>
            ))}
          </div>
          <Lock
            className={`absolute bottom-10 right-10 h-24 w-24 opacity-5 ${isDark ? "text-blue-400" : "text-blue-600"}`}
          />
        </div>
      ),
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable cloud solutions that grow with your business needs and optimize costs.",
      className: "col-span-3 lg:col-span-2 min-h-[220px]",
      background: (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-indigo-500/10 to-transparent"></div>
          <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3, scale: 0.8 }}
                animate={hoveredIndex === 1 ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.8 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`h-8 w-8 rounded-md ${isDark ? "bg-indigo-500/20" : "bg-indigo-500/10"}`}
              ></motion.div>
            ))}
          </div>
          <Cloud
            className={`absolute bottom-10 right-10 h-32 w-32 opacity-5 ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}
          />
        </div>
      ),
    },
    {
      icon: Laptop,
      title: "Managed IT Services",
      description: "Comprehensive IT management with 24/7 monitoring and proactive maintenance.",
      className: "col-span-3 lg:col-span-2 min-h-[220px]",
      background: (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
          <div className="absolute bottom-4 right-4">
            <div className="flex flex-col gap-1">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ width: "30%" }}
                  animate={hoveredIndex === 2 ? { width: `${20 + i * 20}%` } : { width: "30%" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`h-1.5 rounded-full ${isDark ? "bg-emerald-500/30" : "bg-emerald-500/20"}`}
                ></motion.div>
              ))}
            </div>
          </div>
          <Server
            className={`absolute bottom-10 right-10 h-32 w-32 opacity-5 ${
              isDark ? "text-emerald-400" : "text-emerald-600"
            }`}
          />
        </div>
      ),
    },
    {
      icon: Headphones,
      title: "24/7 IT Support",
      description: "Round-the-clock technical support with rapid response times for critical issues.",
      className: "col-span-3 lg:col-span-1 min-h-[220px]",
      background: (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-rose-500/10 to-transparent"></div>
          <div className="absolute bottom-4 right-4">
            <motion.div
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={hoveredIndex === 3 ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                isDark ? "bg-rose-500/20" : "bg-rose-500/10"
              }`}
            >
              <Clock className={`h-6 w-6 ${isDark ? "text-rose-400" : "text-rose-600"}`} />
            </motion.div>
          </div>
          <Headphones
            className={`absolute bottom-10 right-10 h-24 w-24 opacity-5 ${isDark ? "text-rose-400" : "text-rose-600"}`}
          />
        </div>
      ),
    },
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Harness the power of artificial intelligence to gain insights from your business data.",
      className: "col-span-3 lg:col-span-1 min-h-[220px]",
      background: (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
          <div className="absolute bottom-4 right-4">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.2 }}
                  animate={hoveredIndex === 4 ? { opacity: i % 3 === 0 ? 1 : 0.4 } : { opacity: 0.2 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`h-2 w-2 rounded-full ${isDark ? "bg-purple-500/40" : "bg-purple-500/30"}`}
                ></motion.div>
              ))}
            </div>
          </div>
          <Brain
            className={`absolute bottom-10 right-10 h-24 w-24 opacity-5 ${
              isDark ? "text-purple-400" : "text-purple-600"
            }`}
          />
        </div>
      ),
    },
    {
      icon: Users,
      title: "IT Consulting",
      description: "Strategic technology planning and consulting to align IT with your business goals.",
      className: "col-span-3 lg:col-span-2 min-h-[220px]",
      background: (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-amber-500/10 to-transparent"></div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 10, opacity: 0.3 }}
                animate={hoveredIndex === 5 ? { y: 0, opacity: 1 } : { y: 10, opacity: 0.3 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className={`h-6 w-6 rounded-full ${isDark ? "bg-amber-500/30" : "bg-amber-500/20"} mb-1`}></div>
                <div className={`h-1 w-10 rounded-full ${isDark ? "bg-amber-500/30" : "bg-amber-500/20"}`}></div>
              </motion.div>
            ))}
          </div>
          <Users
            className={`absolute bottom-10 right-10 h-24 w-24 opacity-5 ${
              isDark ? "text-amber-400" : "text-amber-600"
            }`}
          />
        </div>
      ),
    },
  ]

  return (
    <motion.div
      ref={gridRef}
      style={{ opacity, scale, y }}
      className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        className={`absolute -top-20 -left-20 h-64 w-64 rounded-full ${
          isDark ? "bg-blue-500/5" : "bg-indigo-500/5"
        } blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className={`absolute -bottom-20 -right-20 h-64 w-64 rounded-full ${
          isDark ? "bg-purple-500/5" : "bg-rose-500/5"
        } blur-3xl`}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23${isDark ? "4F46E5" : "6366F1"}' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex mx-auto"
        >
          <div className={`h-1 w-10 rounded-full ${isDark ? "bg-blue-500" : "bg-indigo-500"} mr-2`}></div>
          <div className={`h-1 w-20 rounded-full ${isDark ? "bg-blue-400" : "bg-indigo-400"}`}></div>
          <div className={`h-1 w-10 rounded-full ${isDark ? "bg-blue-500" : "bg-indigo-500"} ml-2`}></div>
        </motion.div>

        <motion.h2
          className={`text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"} sm:text-4xl`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span
            className={`bg-gradient-to-r ${
              isDark ? "from-blue-400 via-indigo-400 to-purple-400" : "from-blue-600 via-indigo-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            Comprehensive
          </span>{" "}
          IT Solutions
        </motion.h2>

        <motion.p
          className={`mt-4 text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"} max-w-2xl mx-auto`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Everything you need to manage, secure, and optimize your IT infrastructure
        </motion.p>

        <motion.div
          className="mt-6 flex justify-center space-x-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`h-2 w-2 rounded-full ${isDark ? "bg-blue-500" : "bg-indigo-500"}`}
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <div key={idx} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)}>
            <BentoCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={feature.className}
              background={feature.background}
              theme={theme}
              index={idx}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
