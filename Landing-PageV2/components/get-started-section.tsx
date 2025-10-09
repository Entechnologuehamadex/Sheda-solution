export default function GetStartedSection() {
  return (
    <section className="py-16 px-6 md:py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-[#C13A3A] rounded-3xl overflow-hidden relative">
          {/* Net pattern overlay */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] md:w-[800px] md:h-[60%] opacity-30 pointer-events-none"
            style={{
              backgroundImage: "url(/net-pattern.svg)",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between lg:px-16 lg:pt-16 relative z-10">
            {/* Left Content */}
            <div className="flex-1 max-w-xl">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Get started now</h2>
              <p className="text-white text-lg lg:text-xl mb-8">The solution to stress-free real estate operations</p>
              <div className="flex gap-4">
                <a href="#" className="inline-block transition-transform hover:scale-105">
                  <img
                    src="/google-play.svg"
                    alt="Get it on Google Play"
                    className="h-12 lg:h-14"
                  />
                </a>
                <a href="#" className="inline-block transition-transform hover:scale-105">
                  <img
                    src="/apple-store.svg"
                    alt="Download on the App Store"
                    className="h-12 lg:h-14"
                  />
                </a>
              </div>
            </div>

            {/* Right Phone Mockups */}
            <div className="flex-shrink-0">
              <img
                src="/get-started-phone.svg"
                alt="Sheda Solutions App"
                className="h-64 lg:h-80 w-auto"
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden px-8 pt-8 text-center relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Get started now</h2>
            <p className="text-white text-base mb-6">The solution to stress-free real estate operations</p>
            <div className="flex justify-center gap-3 mb-8">
              <a href="#" className="inline-block transition-transform hover:scale-105">
                <img
                  src="/google-play.svg"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
              <a href="#" className="inline-block transition-transform hover:scale-105">
                <img
                  src="/apple-store.svg"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
            </div>
            <div className="flex justify-center">
              <img
              src="/get-started-phone.svg"
                className="h-56 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
