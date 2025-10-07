export default function AboutSection() {
  return (
    <section className="bg-white py-16 lg:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* About Label */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="text-[#C62828] bg-[#C1272D08]
]  lg:text-base font-medium px-4 py-2 rounded-lg text-lg">About</span>
        </div>

        {/* Mission Statement */}
        <h2 className="text-xl lg:text-4xl font-bold text-gray-900 text-center leading-tight text-balance max-w-6xl mx-auto">
          From renting or buying a home to investing in fractional ownership or accessing trusted property services, we
          bring everything into one connected ecosystem. Our mission is to make real estate affable, available,
          affordable, and secure for everyone.
        </h2>
      </div>
    </section>
  )
}
