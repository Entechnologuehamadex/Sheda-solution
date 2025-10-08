"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  
  const handleClick = () => {
    setShowPopup(true);
    // Hide popup automatically after 2 seconds
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#ffffff] to-[#f4ceceff] overflow-hidden">
      {/* Desktop Navigation */}
     <nav className="hidden lg:flex items-center justify-between px-16 py-6 border-b border-gray-200">

        <div className="flex items-center gap-2">
          <Image
            src="/sheda-logo.svg"
            alt="Sheda Solutions Logo"
            width={185}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <div className="flex items-center gap-15">
          <Link href="#hero" className="text-lg font-medium text-gray-900 hover:text-gray-700">
            Home
          </Link>
          <Link href="#about" className="text-lg font-medium text-gray-900 hover:text-gray-700">
            About
          </Link>
          <Link href="#features" className="text-lg font-medium text-gray-900 hover:text-gray-700">
            Features
          </Link>
          <Link href="#roadmap" className="text-lg font-medium text-gray-900 hover:text-gray-700">
            Roadmap
          </Link>
          <Link href="#faq" className="text-lg font-medium text-gray-900 hover:text-gray-700">
            FAQs
          </Link>
          <Link href="https://sheda-solutions.gitbook.io/sheda-solutions" className="text-lg font-medium text-gray-900 hover:text-gray-700">
            Litepaper
          </Link>
        </div>

        <div className="relative inline-block">
      <button
        onClick={handleClick}
        className="bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-3 rounded-lg text-sm font-semibold"
      >
        Get the App
      </button>

      {showPopup && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap animate-fade">
          Coming soon
        </div>
      )}
    </div>

      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/sheda-logo.svg"
            alt="Sheda Solutions Logo"
            width={155}
            height={32}
            className="h-8 w-auto"
          />
        </div>

        <button
          className="p-2"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-50 px-6 py-8 animate-in slide-in-from-top">
          <div className="flex flex-col gap-6">
            <Link
              href="#hero"
              className="text-base font-medium text-gray-900 hover:text-gray-700 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-gray-900 hover:text-gray-700 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#features"
              className="text-base font-medium text-gray-900 hover:text-gray-700 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#roadmap"
              className="text-base font-medium text-gray-900 hover:text-gray-700 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Roadmap
            </Link>
            <Link
              href="#faq"
              className="text-base font-medium text-gray-900 hover:text-gray-700 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQs
            </Link>
            <Link
              href="#get-started"
              className="text-base font-medium text-gray-900 hover:text-gray-700 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Litepaper
            </Link>

            <div className="pt-4 border-t border-gray-200">
            <div className="relative inline-block">
      <Link href="#" onClick={handleClick} className="w-full lg:w-auto">
        <Image
          src="/get-app-button.svg"
          alt="Get the App"
          width={150}
          height={48}
          className="w-auto h-12 mx-auto lg:mx-0 cursor-pointer"
        />
      </Link>

      {showPopup && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap animate-fade">
          Coming soon
        </div>
      )}
    </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="container mx-auto px-6 lg:px-16 pt-8 lg:pt-20 pb-0">
        <div className="max-w-6xl mx-auto text-center relative">
          <h1 className="text-[32px] leading-tight lg:text-[64px] lg:leading-[1.1] font-bold text-gray-900 mb-6 text-balance">
            Revolutionizing Real Estate with Blockchain Technologies
          </h1>

          <p className="text-base lg:text-lg text-gray-700 mb-8 lg:mb-10 max-w-3xl mx-auto text-pretty">
            Making real estate operations affable, available, affordable, and secure through blockchain.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-12 lg:mb-16">
          <div className="relative inline-block">
      <Link href="#" onClick={handleClick} className="w-full lg:w-auto">
        <Image
          src="/get-app-button.svg"
          alt="Get the App"
          width={150}
          height={48}
          className="w-auto h-12 mx-auto lg:mx-0 cursor-pointer"
        />
      </Link>

      {showPopup && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap animate-fade">
          Coming soon
        </div>
      )}
    </div>

            <Link href="https://formspree.io/f/xqaelyne" className="w-full lg:w-auto">
              <Image
                src="/join-waitlist-button.svg"
                alt="Join Waitlist"
                width={150}
                height={48}
                className="w-auto h-12 mx-auto lg:mx-0"
              />
            </Link>
          </div>

          <div className="hidden lg:block absolute left-20 top-[420px] z-10">
            <Image
              src="/verified-listings-badge.svg"
              alt="100+ verified Listings"
              width={280}
              height={80}
              className="w-auto h-auto"
            />
          </div>

          <div className="relative flex justify-center items-end mt-8 lg:mt-0">
          <Image
  src="phone-mockups.svg"
  alt="Sheda Solutions Mobile App Interface"
  width={600}
  height={450}
  className="w-full max-w-[350px] lg:max-w-[600px] h-auto object-contain"
  priority
/>

          </div>

          <div className="hidden lg:block absolute right-20 bottom-[80px] z-10">
            <div className="bg-white rounded-2xl px-6 py-4 shadow-xl flex items-center gap-4 min-w-[280px]">
              <Image
                src="/property-owner.svg"
                alt="Property Owner"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Property Owner</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Active now</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <button className="p-2 bg-[#C62828] rounded-lg hover:bg-[#B71C1C]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" fill="white" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
