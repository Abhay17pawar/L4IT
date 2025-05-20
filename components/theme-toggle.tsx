"use client"

import { Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ThemeToggleProps {
  onThemeChange: (theme: "light" | "dark") => void
  initialTheme?: "light" | "dark"
}

export const ThemeToggle = ({ onThemeChange, initialTheme = "dark" }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme)

  // Update internal state when initialTheme prop changes
  useEffect(() => {
    setTheme(initialTheme)
  }, [initialTheme])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    onThemeChange(newTheme)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        theme === "dark"
          ? "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
          : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  )
}
