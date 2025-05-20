"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  toggleOpen: () => void
  theme: "light" | "dark"
}

const FAQItem = ({ question, answer, isOpen, toggleOpen, theme }: FAQItemProps) => {
  const isDark = theme === "dark"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`mb-4 overflow-hidden rounded-xl border ${
        isDark
          ? isOpen
            ? "border-rose-500/30 bg-zinc-800/50"
            : "border-zinc-700 bg-zinc-800/30"
          : isOpen
            ? "border-rose-500/20 bg-white"
            : "border-zinc-200 bg-white"
      } transition-all duration-200`}
    >
      <button
        onClick={toggleOpen}
        className={`flex w-full items-center justify-between p-5 text-left font-medium ${
          isDark ? "text-white" : "text-zinc-900"
        }`}
      >
        <span className="text-lg md:text-xl">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isOpen
              ? isDark
                ? "bg-rose-500/20 text-rose-400"
                : "bg-rose-100 text-rose-600"
              : isDark
                ? "bg-zinc-700 text-zinc-300"
                : "bg-zinc-100 text-zinc-500"
          }`}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`px-5 pb-5 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
          >
            <p className="leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface FAQSectionProps {
  theme: "light" | "dark"
}

export function FAQSection({ theme }: FAQSectionProps) {
  const isDark = theme === "dark"
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Managed Services Provider – What does it mean?",
      answer:
        "A Managed Services Provider (MSP) like L4IT is a company that remotely manages a customer's IT infrastructure and end-user systems on a proactive basis under a subscription model. We handle everything from 24/7 monitoring and maintenance to security management and technical support, allowing businesses to focus on their core operations while we ensure their technology runs smoothly and securely.",
    },
    {
      question: "Benefits in partnering with an outsourced IT company",
      answer:
        "Partnering with an outsourced IT company like L4IT provides numerous benefits: cost savings compared to maintaining an in-house IT team, access to a broader range of specialized expertise, 24/7 support and monitoring, improved security posture, scalable solutions that grow with your business, predictable monthly costs, and the ability to focus on your core business while we handle all your technology needs.",
    },
    {
      question: "Why should my business in Chicago partner with L4IT?",
      answer:
        "Chicago businesses choose L4IT because we offer local, personalized service with deep understanding of the Chicago business landscape, combined with enterprise-grade IT solutions. We provide rapid on-site support when needed, customized IT strategies aligned with your business goals, proactive maintenance that prevents issues before they impact your operations, and comprehensive cybersecurity tailored to your industry's compliance requirements.",
    },
    {
      question: "What IT services does L4IT offer?",
      answer:
        "L4IT offers a comprehensive suite of IT services including managed IT support, cybersecurity solutions, cloud infrastructure management, business continuity and disaster recovery planning, IT consulting and strategy, network design and management, hardware and software procurement, VoIP and unified communications, and specialized compliance solutions for regulated industries.",
    },
    {
      question: "What industries does L4IT work with?",
      answer:
        "L4IT works with a diverse range of industries including healthcare (with HIPAA compliance expertise), financial services, legal firms, manufacturing, professional services, non-profit organizations, education, and retail. We tailor our IT solutions to meet the specific needs, compliance requirements, and technology challenges of each industry we serve.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={`relative w-full py-24 overflow-hidden transition-colors duration-500 ${isDark ? "" : "bg-white"}`}>
      {/* Decorative elements */}
      <motion.div
        className={`absolute -top-20 -left-20 h-64 w-64 rounded-full ${
          isDark ? "bg-rose-500/5" : "bg-rose-500/5"
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
          isDark ? "bg-blue-500/5" : "bg-indigo-500/5"
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

      {/* Neural Network Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-5 overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
          className={isDark ? "text-rose-500" : "text-rose-600"}
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

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                isDark
                  ? "bg-gradient-to-br from-rose-500/20 to-orange-500/20 text-rose-400"
                  : "bg-gradient-to-br from-rose-500/10 to-orange-500/10 text-rose-600"
              }`}
            >
              <MessageCircle size={24} />
            </motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex"
            >
              <div className={`h-1 w-10 rounded-full ${isDark ? "bg-rose-500" : "bg-rose-500"} mr-2`}></div>
              <div className={`h-1 w-20 rounded-full ${isDark ? "bg-rose-400" : "bg-rose-400"}`}></div>
              <div className={`h-1 w-10 rounded-full ${isDark ? "bg-rose-500" : "bg-rose-500"} ml-2`}></div>
            </motion.div>
          </div>

          <h2
            className={`text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"} sm:text-4xl mb-4`}
          >
            Frequently Asked{" "}
            <span
              className={`bg-gradient-to-r ${
                isDark
                  ? "from-rose-400 to-orange-400 bg-clip-text text-transparent"
                  : "from-rose-600 to-orange-600 bg-clip-text text-transparent"
              }`}
            >
              Questions
            </span>
          </h2>
          <p className={`text-lg ${isDark ? "text-zinc-400" : "text-zinc-600"} max-w-2xl mx-auto`}>
            Everything you need to know about our IT managed services
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
              theme={theme}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className={`mb-6 text-lg ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
            Still have questions? We are here to help.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium ${
              isDark
                ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white"
                : "bg-gradient-to-r from-rose-600 to-orange-600 text-white"
            }`}
          >
            <HelpCircle size={18} />
            Contact Our Support Team
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
