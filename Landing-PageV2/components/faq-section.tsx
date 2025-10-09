"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(3)

  const faqs = [
    {
      question: "Is my property ownership secure on the blockchain?",
      answer: "",
    },
    {
      question: "How do I generate income from my property once it's listed?",
      answer: "",
    },
    {
      question: "What kind of utilities can I access after importing my property?",
      answer: "",
    },
    {
      question: "Do I need technical knowledge of blockchain to use this platform?",
      answer:
        "Not at all. The platform handles chain abstraction, signatures, and blockchain complexity in the background.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="text-[#C62828] bg-[#C1272D08]
]  lg:text-base font-medium px-4 py-2 rounded-lg text-lg">FAQS</span>
        </div>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Frequently asked questions</h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <span className="text-base md:text-lg font-medium text-gray-900 pr-8">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-900 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-900 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && faq.answer && (
                <div className="py-4 pb-6">
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
