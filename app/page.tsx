"use client"

import { useState, useEffect } from "react"
import { Menu, X, Shield, Server, Clock } from "lucide-react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import ShuffleHero from "./hero/page"
import { InfiniteMovingCards } from "@/components/infinite-moving-cards"
import { testimonials } from "../data/testimonial-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShiftingDropDown } from "@/components/shifting-drop-down"

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Apply theme class to document
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    console.log("Theme applied to document:", theme)
  }, [theme])

  // Function to handle theme changes
  const handleThemeChange = (newTheme: "light" | "dark") => {
    console.log("Theme change requested:", newTheme)
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
            <ThemeToggle onThemeChange={handleThemeChange} />

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
              <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>Menu</h2>
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

            <div className={`flex flex-col space-y-6 p-6 ${theme === "dark" ? "text-white" : "text-zinc-900"}`}>
              <div className="border-b border-zinc-700 pb-6">
                <h3 className="text-lg font-medium mb-4">Products</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Startup</h4>
                    <a href="#" className="block text-sm text-zinc-400 mb-1">
                      Bookkeeping
                    </a>
                    <a href="#" className="block text-sm text-zinc-400">
                      Invoicing
                    </a>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Scaleup</h4>
                    <a href="#" className="block text-sm text-zinc-400 mb-1">
                      Live Coaching
                    </a>
                    <a href="#" className="block text-sm text-zinc-400 mb-1">
                      Reviews
                    </a>
                    <a href="#" className="block text-sm text-zinc-400">
                      Tax/VAT
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-b border-zinc-700 pb-6">
                <h3 className="text-lg font-medium mb-4">Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <a href="#" className="flex flex-col items-center text-zinc-400">
                    <Shield className="mb-2 text-rose-400" size={20} />
                    <span className="text-xs">Startup</span>
                  </a>
                  <a href="#" className="flex flex-col items-center text-zinc-400">
                    <Server className="mb-2 text-rose-400" size={20} />
                    <span className="text-xs">Scaleup</span>
                  </a>
                  <a href="#" className="flex flex-col items-center text-zinc-400">
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
                    <p className="text-xs text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </a>
                  <a href="#" className="block">
                    <div className="text-sm font-medium mb-1">Lorem ipsum dolor</div>
                    <p className="text-xs text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-16">
        <ShuffleHero theme={theme} onThemeChange={handleThemeChange} />

        <div
          style={{
            backgroundColor: theme === "dark" ? undefined : "#ffffff",
            background: theme === "dark" ? "linear-gradient(to bottom, #18181b, #18181b, #000000)" : "#ffffff",
          }}
          className="w-full py-24 relative overflow-hidden transition-colors duration-500"
        >
          {theme !== "dark" && (
            <>
              <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-white blur-3xl"></div>
              <div className="absolute -right-20 bottom-20 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-emerald-500/10 to-teal-500/10 blur-3xl"></div>
              <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                  backgroundImage: 'url("/grid-pattern.png")',
                  backgroundPosition: "center",
                  filter: "invert(1) brightness(1.75) contrast(0.5)",
                }}
              ></div>
            </>
          )}
          {theme === "dark" && (
            <>
              <div className="absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-rose-500/20 to-orange-500/20 blur-3xl"></div>
              <div className="absolute -right-20 bottom-20 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-emerald-500/20 to-teal-500/20 blur-3xl"></div>
              <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.png')] bg-center opacity-20"></div>
            </>
          )}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                Trusted by industry leaders worldwide
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                See what our customers are saying about our platform and how it's helping them achieve their business
                goals.
              </p>
            </div>

            <InfiniteMovingCards items={testimonials} theme={theme} />
          </div>
        </div>
      </div>
    </>
  )
}
