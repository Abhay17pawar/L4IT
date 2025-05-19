"use client"

import { Moon, Sun } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface ThemeToggleProps {
  onThemeChange: (theme: "light" | "dark") => void
}

export const ThemeToggle = ({ onThemeChange }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

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
      className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-200 transition-colors hover:bg-neutral-700 dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-neutral-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </motion.button>
  )
}
