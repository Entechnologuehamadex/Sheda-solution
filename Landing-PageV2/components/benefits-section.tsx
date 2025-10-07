import Image from "next/image"

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="text-[#C62828] bg-[#C1272D08]
]  lg:text-base font-medium px-4 py-2 rounded-lg text-lg">Benefits</span>
        </div>
        <div className="text-center mb-12 md:mb-16">
        
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Why Choose Sheda Solutions</h2>
        </div>

        {/* Main Benefits Grid */}
        <div className="mb-16 md:mb-20">
          {/* Desktop Layout - 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 items-center">
            {/* Left Column - Available and Affordable stacked */}
            <div className="flex flex-col gap-6">
              {/* Available Card */}
              <div className="bg-[#C1272D08]
 rounded-2xl p-6 lg:p-3 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Available</h3>
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                      Access your real estate tools and documents anytime, anywhere.
                    </p>
                  </div>
                </div>
              </div>

              {/* Affordable Card */}
              <div className="bg-[#C1272D08] rounded-2xl p-6 lg:p-3 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Affordable</h3>
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                      Lower costs through efficient, blockchain-powered processes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column - Phone Mockup */}
            <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[523px]">
  <Image
    src="/why-choose.svg"
    alt="Sheda Solutions App Interface"
    width={523}
    height={1045}
    className="w-full h-auto"
    priority
  />
</div>





            </div>

            {/* Right Column - Affable and Secure stacked */}
            <div className="flex flex-col gap-6">
              {/* Affable Card */}
              <div className="bg-[#C1272D08] rounded-2xl p-6 lg:p-3 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Affable</h3>
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                      Simple, user-friendly interactions for everyone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secure Card */}
              <div className="bg-[#C1272D08] rounded-2xl p-6 lg:p-3 border border-gray-100 h-[120px] flex flex-col justify-center">
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center flex-shrink-0">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    </div>
    <div className="overflow-hidden">
      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">Secure</h3>
      <p className="text-gray-600 text-sm lg:text-base leading-relaxed line-clamp-2">
        Every transaction protected with smart contracts and on-chain verification.
      </p>
    </div>
  </div>
</div>

            </div>
          </div>

          {/* Mobile Layout - Stacked vertically */}
          <div className="md:hidden flex flex-col gap-6">
            {/* Available Card */}
            <div className="bg-[#FFF5F5] rounded-2xl p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Available</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Access your real estate tools and documents anytime, anywhere.
                  </p>
                </div>
              </div>
            </div>

            {/* Affordable Card */}
            <div className="bg-[#FFF5F5] rounded-2xl p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Affordable</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Lower costs through efficient, blockchain-powered processes.
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex items-center justify-center py-8">
              <div className="relative w-full max-w-[280px] mx-auto">
                <Image
                  src="/why-choose.svg"
                  alt="Sheda Solutions App Interface"
                  width={280}
                  height={560}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Affable Card */}
            <div className="bg-[#FFF5F5] rounded-2xl p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Affable</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Simple, user-friendly interactions for everyone.
                  </p>
                </div>
              </div>
            </div>

            {/* Secure Card */}
            <div className="bg-[#FFF5F5] rounded-2xl p-6 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#C62828] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Every transaction protected with smart contracts and on-chain verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-10">Additional Benefits</h3>
          <div className="flex md:px-20 flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-x-20 md:gap-y-6">
            <p className="text-[#C62828] bg-[#C1272D08]
]  px-4 py-2 rounded-lg md:text-lg ">Frictionless Experience</p>
            <p className="text-[#C62828] bg-[#C1272D08]
]  px-4 py-2 rounded-lg md:text-lg ">Transparent Yields</p>
            <p className="text-[#C62828] bg-[#C1272D08]
]  px-4 py-2 rounded-lg md:text-lg ">Interconnected Ecosystem</p>
            <p className="text-[#C62828] bg-[#C1272D08]
]  px-4 py-2 rounded-lg md:text-lg ">Zero-Knowledge Privacy</p>
            <p className="text-[#C62828] bg-[#C1272D08]
]  px-4 py-2 rounded-lg md:text-lg ">Smart Contract Automation</p>
          </div>
        </div>
      </div>
    </section>
  )
}
