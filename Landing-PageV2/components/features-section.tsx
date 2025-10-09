"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function FeaturesSection() {
  const [showPopup, setShowPopup] = useState(false);
    
    const handleClick = () => {
      setShowPopup(true);
      // Hide popup automatically after 2 seconds
      setTimeout(() => setShowPopup(false), 2000);
    };

  return (
    <section className="bg-white py-10 lg:py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Features Header */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="text-[#C62828]  bg-[#C1272D08] px-4 py-2 rounded-lg text-lg lg:text-base font-medium">Features</span>
        </div>

        <h2 className="text-xl lg:text-5xl font-bold text-gray-900 text-center mb-4 lg:mb-6 text-balance">
          Welcome to advanced real estate
        </h2>

        <p className="text-base lg:text-lg text-gray-600 text-center mb-16 lg:mb-20 max-w-3xl mx-auto text-pretty">
          Effortlessly transforming the real estate landscape with revolutionary features
        </p>

        {/* Marketplace for Rentals and Sales */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            <h3 className="text-xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-8 text-balance">
              Marketplace for Rentals and Sales
            </h3>

            <p className="text-base lg:text-lg text-gray-700 mb-6 lg:mb-8 leading-relaxed">
              Platform for property rentals and sales between landlords (sellers) and tenants (buyers). List, buy, sell,
              or rent with direct, secure blockchain transactions, no intermediaries.
            </p>

            <p className="text-base lg:text-lg text-[#C62828] font-medium mb-8 lg:mb-10 leading-relaxed">
              Search apartments, book inspections, sign offers on-chain. Stress-free and transparent.
            </p>

            
        <div className="relative inline-block">
      <button
        onClick={handleClick}
        className="bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-lg text-sm font-semibold"
      >
        Get the App
      </button>

      {showPopup && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap animate-fade">
          Coming soon
        </div>
      )}
    </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] lg:max-w-[500px]">
              <Image
                src="/market-place.svg"
                alt="Sheda Solutions App Features - Property Marketplace Interface"
                width={500}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Fractional Ownership and Yield Investment */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32">
          {/* Left Column - Property Card */}
          <div className="order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px]">
              <Image
                src="/fractional-ownership.svg"
                alt="Fractional Ownership Property Card"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="order-2">
            <h3 className="text-xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-8 text-balance">
              Fractional Ownership and Yield Investment
            </h3>

            <p className="text-base lg:text-lg text-gray-700 mb-6 lg:mb-8 leading-relaxed">
              Invest in reputable merchants offering fractional shares of properties. Receive NFTs as ownership
              receipts, claim physically if desired, or manage via the platform. Properties are transparently rented
              out, with income distributed after expenses.
            </p>

            <p className="text-base lg:text-lg text-[#C62828] font-medium mb-8 lg:mb-10 leading-relaxed">
              Pool investors vote on management transfers. Earn yields from rental income, democratizing access to
              premium real estate.
            </p>

            <Button
  onClick={() => window.open("https://t.me/+0freci5Se-pkMGVk", "_blank")}
  className="bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-6 rounded-lg text-base font-semibold w-[30%] lg:w-auto"
>
  Join Waitlist
</Button>
          </div>
        </div>

        {/* Real Estate Services */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            <h3 className="text-xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-8 text-balance">
              Real Estate Services
            </h3>

            <p className="text-base lg:text-lg text-gray-700 mb-6 lg:mb-8 leading-relaxed">
              Integrated section for services like property management, legal, insurance, and technical (e.g., labor
              works, plumbing). Providers offer services on the app, interconnected with marketplace and investments.
            </p>

            <p className="text-base lg:text-lg text-[#C62828] font-medium mb-8 lg:mb-10 leading-relaxed">
              All services blockchain-secured for transparency and efficiency.
            </p>

            <div className="relative inline-block">
      <button
        onClick={handleClick}
        className="bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-lg text-sm font-semibold"
      >
        Get the App
      </button>

      {showPopup && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap animate-fade">
          Coming soon
        </div>
      )}
    </div>
          </div>

          {/* Right Column - Property Card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] lg:max-w-[500px]">
              <Image
                src="/real-estate.svg"
                alt="Real Estate Services Property Card"
                width={500}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* On-Chain Property Importation */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Phone Mockup */}
          <div className="order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[400px] lg:max-w-[500px]">
              <Image
                src="/on-chain.svg"
                alt="On-Chain Property Activity Dashboard"
                width={500}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="order-2">
            <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-8 text-balance">
              On-Chain Property Importation
            </h3>

            <p className="text-base lg:text-lg text-gray-700 mb-6 lg:mb-8 leading-relaxed">
              Import your property's on-chain ownership powered by chain abstraction and chain signature to list on the
              platform, generate income, and access utilities for your investment.
            </p>

            <p className="text-base lg:text-lg text-[#C62828] font-medium mb-8 lg:mb-10 leading-relaxed">
              Securely tokenize and manage real-world assets.
            </p>

            <Button
  onClick={() => window.open("https://t.me/+0freci5Se-pkMGVk", "_blank")}
  className="bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-6 rounded-lg text-base font-semibold w-[30%] lg:w-auto"
>
  Join Waitlist
</Button>

          </div>
        </div>
      </div>
    </section>
  )
}
