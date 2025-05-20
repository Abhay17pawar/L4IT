"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Shield, Server, Clock, Brain, Cpu, Zap } from "lucide-react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ShuffleHero } from "@/components/shuffle-hero"
import { InfiniteMovingCards } from "@/components/infinite-moving-cards"
import { testimonials } from "../data/testimonial-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShiftingDropDown } from "@/components/shifting-drop-down"
import { BentoGrid } from "@/components/bento-grid"
import { FAQSection } from "@/components/faq-section"

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      // Get saved theme from localStorage or use default
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
      const initialTheme = savedTheme || "light"
      setTheme(initialTheme)
      console.log("Initial theme loaded from localStorage:", initialTheme)
    }
  }, [])

  // Apply theme class to document and save to localStorage when theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement

      if (theme === "dark") {
        root.classList.add("dark")
        root.classList.remove("light")
      } else {
        root.classList.remove("dark")
        root.classList.add("light")
      }

      // Save theme preference to localStorage
      localStorage.setItem("theme", theme)
      console.log("Theme saved to localStorage:", theme)
    }
  }, [theme])

  // Track mouse position for AI spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Function to handle theme changes
  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
  }

  return (
    <>
      {/* Fixed Navbar */}
      <div
        className={`fixed top-0 z-50 w-full transition-all duration-200 ${
          theme === "dark" ? "bg-zinc-900 border-b border-zinc-800" : "bg-zinc-100 border-b border-zinc-200"
        }`}
      >
        <div className="flex w-full items-center px-8 py-2">
          <div className="flex w-1/4 items-center gap-2">
            <Image
              className="rounded-md"
              src="https://l4it.net/wp-content/uploads/2022/05/cropped-Logo-3-1024x330.jpg"
              alt="Logo"
              height={40}
              width={140}
            />
          </div>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="sticky hidden md:flex md:w-2/4 md:justify-center">
            <ShiftingDropDown />
          </div>
          <div className="flex w-3/4 md:w-1/4 justify-end items-center gap-4">
            <ThemeToggle onThemeChange={handleThemeChange} initialTheme={theme} />

            {/* Hamburger Menu Button - visible only on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex md:hidden items-center justify-center h-10 w-10 rounded-full ${
                theme === "dark"
                  ? "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                  : "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 right-0 bottom-0 z-40 w-full max-w-sm overflow-y-auto ${
              theme === "dark" ? "bg-zinc-900/95" : "bg-zinc-100/95"
            } backdrop-blur-sm md:hidden shadow-xl border-l ${theme === "dark" ? "border-zinc-800" : "border-zinc-300"}`}
          >
            <div className="flex justify-between items-center p-6 border-b border-zinc-700">
              <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-center h-10 w-10 rounded-full ${
                  theme === "dark"
                    ? "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                    : "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
                }`}
                aria-label="Close mobile menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className={`flex flex-col space-y-6 p-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
              <div className="border-b border-zinc-700 pb-6">
                <h3 className="text-lg font-medium mb-4">Products</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Startup</h4>
                    <a
                      href="#"
                      className={`block text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-1`}
                    >
                      Bookkeeping
                    </a>
                    <a href="#" className={`block text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                      Invoicing
                    </a>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Scaleup</h4>
                    <a
                      href="#"
                      className={`block text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-1`}
                    >
                      Live Coaching
                    </a>
                    <a
                      href="#"
                      className={`block text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"} mb-1`}
                    >
                      Reviews
                    </a>
                    <a href="#" className={`block text-sm ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                      Tax/VAT
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-b border-zinc-700 pb-6">
                <h3 className="text-lg font-medium mb-4">Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <a
                    href="#"
                    className={`flex flex-col items-center ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    <Shield className="mb-2 text-rose-400" size={20} />
                    <span className="text-xs">Startup</span>
                  </a>
                  <a
                    href="#"
                    className={`flex flex-col items-center ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    <Server className="mb-2 text-rose-400" size={20} />
                    <span className="text-xs">Scaleup</span>
                  </a>
                  <a
                    href="#"
                    className={`flex flex-col items-center ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}
                  >
                    <Clock className="mb-2 text-rose-400" size={20} />
                    <span className="text-xs">Enterprise</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Blog</h3>
                <div className="space-y-4">
                  <a href="#" className="block">
                    <div className="text-sm font-medium mb-1">Lorem ipsum dolor</div>
                    <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </a>
                  <a href="#" className="block">
                    <div className="text-sm font-medium mb-1">Lorem ipsum dolor</div>
                    <p className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-16" ref={containerRef}>
        <ShuffleHero theme={theme} onThemeChange={handleThemeChange} />
        {/* Bento Grid Section */}
        <div
          style={{
            backgroundColor: theme === "dark" ? undefined : "#ffffff",
            background: theme === "dark" ? "linear-gradient(to bottom, #18181b, #18181b, #000000)" : "#ffffff",
          }}
          className="w-full py-24 relative overflow-hidden transition-colors duration-500"
        >
          {/* Left gradient blob - consistent across themes */}
          <div
            className={`absolute -left-20 top-20 h-[500px] w-[500px] rounded-full blur-3xl ${
              theme === "dark"
                ? "bg-gradient-to-r from-rose-500/20 to-orange-500/20"
                : "bg-gradient-to-r from-rose-500/10 to-orange-500/10"
            }`}
          ></div>

          {/* Right gradient blob - consistent across themes */}
          <div
            className={`absolute -right-20 bottom-20 h-[400px] w-[400px] rounded-full blur-3xl ${
              theme === "dark"
                ? "bg-gradient-to-l from-emerald-500/20 to-teal-500/20"
                : "bg-gradient-to-l from-emerald-500/10 to-teal-500/10"
            }`}
          ></div>

          {/* Dotted pattern background without any + symbols */}
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(${
                theme === "dark" ? "rgba(161, 161, 170, 0.3)" : "rgba(161, 161, 170, 0.15)"
              } 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          ></div>

          {/* AI Neural Network Pattern Overlay */}
          <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
              className={theme === "dark" ? "text-blue-500" : "text-indigo-700"}
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
                <path d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764" />
                <path d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880" />
                <path d="M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382" />
                <path d="M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269" />
              </g>
              <g fill="currentColor">
                <circle cx="769" cy="229" r="5" />
                <circle cx="539" cy="269" r="5" />
                <circle cx="603" cy="493" r="5" />
                <circle cx="731" cy="737" r="5" />
                <circle cx="520" cy="660" r="5" />
                <circle cx="309" cy="538" r="5" />
                <circle cx="295" cy="764" r="5" />
                <circle cx="40" cy="599" r="5" />
                <circle cx="102" cy="382" r="5" />
                <circle cx="127" cy="80" r="5" />
                <circle cx="370" cy="105" r="5" />
                <circle cx="578" cy="42" r="5" />
                <circle cx="237" cy="261" r="5" />
                <circle cx="390" cy="382" r="5" />
              </g>
            </svg>
          </div>

          <div className="relative z-10">
            <BentoGrid theme={theme} />
          </div>
        </div>

        <div
          style={{
            backgroundColor: theme === "dark" ? undefined : "#ffffff",
            background: theme === "dark" ? "linear-gradient(to bottom, #18181b, #18181b, #000000)" : "#ffffff",
          }}
          className="w-full py-24 relative overflow-hidden transition-colors duration-500"
        >
          <>
            {/* Left gradient blob - consistent across themes */}
            <div
              className={`absolute -left-20 top-20 h-[500px] w-[500px] rounded-full blur-3xl ${
                theme === "dark"
                  ? "bg-gradient-to-r from-rose-500/20 to-orange-500/20"
                  : "bg-gradient-to-r from-rose-500/10 to-orange-500/10"
              }`}
            ></div>

            {/* Right gradient blob - consistent across themes */}
            <div
              className={`absolute -right-20 bottom-20 h-[400px] w-[400px] rounded-full blur-3xl ${
                theme === "dark"
                  ? "bg-gradient-to-l from-emerald-500/20 to-teal-500/20"
                  : "bg-gradient-to-l from-emerald-500/10 to-teal-500/10"
              }`}
            ></div>

            {/* Dotted pattern background without any + symbols */}
            <div
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(${
                  theme === "dark" ? "rgba(161, 161, 170, 0.3)" : "rgba(161, 161, 170, 0.15)"
                } 1px, transparent 1px)`,
                backgroundSize: "30px 30px",
              }}
            ></div>

            {/* AI Neural Network Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 800 800"
                xmlns="http://www.w3.org/2000/svg"
                className={theme === "dark" ? "text-blue-500" : "text-indigo-700"}
              >
                <g fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
                  <path d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764" />
                  <path d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880" />
                  <path d="M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382" />
                  <path d="M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269" />
                </g>
                <g fill="currentColor">
                  <circle cx="769" cy="229" r="5" />
                  <circle cx="539" cy="269" r="5" />
                  <circle cx="603" cy="493" r="5" />
                  <circle cx="731" cy="737" r="5" />
                  <circle cx="520" cy="660" r="5" />
                  <circle cx="309" cy="538" r="5" />
                  <circle cx="295" cy="764" r="5" />
                  <circle cx="40" cy="599" r="5" />
                  <circle cx="102" cy="382" r="5" />
                  <circle cx="127" cy="80" r="5" />
                  <circle cx="370" cy="105" r="5" />
                  <circle cx="578" cy="42" r="5" />
                  <circle cx="237" cy="261" r="5" />
                  <circle cx="390" cy="382" r="5" />
                </g>
              </svg>
            </div>

            {/* AI Spotlight effect */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-30"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
                  theme === "dark" ? "rgba(56, 189, 248, 0.1)" : "rgba(79, 70, 229, 0.08)"
                }, transparent 40%)`,
              }}
            />
          </>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-black"} sm:text-4xl`}
              >
                Trusted by industry leaders worldwide
              </h2>
              <p className={`mt-4 text-lg ${theme === "dark" ? "text-zinc-400" : "text-zinc-800"} max-w-2xl mx-auto`}>
                Our solutions power the infrastructure of the world&apos;s most innovative companies
              </p>
            </div>

            <InfiniteMovingCards items={testimonials} theme={theme} />

            {/* AI Features Section */}
            <div className="mt-32 text-center">
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1,
                  }}
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-blue-600/20 to-indigo-600/20 text-blue-400"
                      : "bg-gradient-to-br from-blue-100 to-indigo-100 text-indigo-600"
                  }`}
                >
                  <Brain size={32} />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2
                  className={`text-3xl font-bold tracking-tight ${
                    theme === "dark" ? "text-white" : "text-black"
                  } sm:text-4xl`}
                >
                  Powered by Advanced{" "}
                  <span
                    className={`bg-gradient-to-r ${
                      theme === "dark"
                        ? "from-blue-400 to-indigo-400 bg-clip-text text-transparent"
                        : "from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    }`}
                  >
                    AI Technology
                  </span>
                </h2>
                <p className={`mt-4 text-lg ${theme === "dark" ? "text-zinc-400" : "text-zinc-800"} max-w-2xl mx-auto`}>
                  Our intelligent solutions are trusted by industry leaders worldwide
                </p>
              </motion.div>

              {/* AI Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-16">
                {[
                  {
                    icon: Brain,
                    title: "AI-Powered Analysis",
                    description: "Advanced algorithms that learn and adapt to your business needs",
                  },
                  {
                    icon: Cpu,
                    title: "Intelligent Automation",
                    description: "Streamline operations with smart, automated workflows",
                  },
                  {
                    icon: Zap,
                    title: "Predictive Insights",
                    description: "Anticipate trends and make data-driven decisions",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={`rounded-xl p-6 ${
                      theme === "dark" ? "bg-zinc-800/50 border border-zinc-700/50" : "bg-white border border-zinc-200"
                    }`}
                  >
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                        theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100/80 text-blue-600"
                      }`}
                    >
                      <feature.icon size={24} />
                    </div>
                    <h3 className={`mb-2 text-xl font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                      {feature.title}
                    </h3>
                    <p className={theme === "dark" ? "text-zinc-400" : "text-zinc-600"}>{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection theme={theme} />
      </div>
    </>
  )
}
