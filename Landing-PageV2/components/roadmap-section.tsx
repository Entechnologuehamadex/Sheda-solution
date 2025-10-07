export default function RoadmapSection() {
  const roadmapItems = [
    {
      number: 1,
      title: "Marketplace Launch",
      description:
        "Property rentals and sales directly between landlords/sellers and tenants/buyers, secured with blockchain smart contracts.",
    },
    {
      number: 2,
      title: "Fractional Ownership & Yield Investments",
      description:
        "Affordable entry into premium properties, NFT-backed ownership receipts, and transparent yield distribution.",
    },
    {
      number: 3,
      title: "Real Estate Services Integration",
      description:
        "Property management, legal, insurance, and technical services fully embedded into the platform ecosystem.",
    },
    {
      number: 4,
      title: "On-Chain Property Importation",
      description: "Tokenize and manage existing property ownership on-chain for income generation and utility access.",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="text-[#C62828] bg-[#C1272D08]
]  lg:text-base font-medium px-4 py-2 rounded-lg text-lg">Roadmap</span>
        </div>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">What is coming</h2>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Horizontal line spanning full width */}
            <div className="absolute -top-12 left-0 right-0 h-1 bg-gray-200" />
            {/* Red portion of horizontal line (first 25%) */}
            <div className="absolute -top-12 left-0 w-[25%] h-1 bg-[#C62828]" />
            {/* Vertical connector line from horizontal line to first card */}
            <div className="absolute -top-12 left-[12.5%] w-1 h-12 bg-[#C62828]" />

            {/* Roadmap Cards Grid */}
            <div className="grid grid-cols-4 gap-6">
              {roadmapItems.map((item, index) => (
                <div
                  key={item.number}
                  className={`bg-white rounded-2xl border-2 p-6 ${index === 0 ? "border-[#C62828]" : "border-gray-200"}`}
                >
                  {/* Number Badge */}
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#C62828] flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{item.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 text-center leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line on the left side */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C62828]" />

            {/* Roadmap Cards */}
            <div className="space-y-8">
              {roadmapItems.map((item, index) => (
                <div key={item.number} className="relative pl-4">
                  {/* Horizontal connector line from vertical line to card */}
                  <div className="absolute left-0 top-6 w-12 h-1 bg-[#C62828]" />

                  {/* Card */}
                  <div
                    className={`ml-8 bg-white rounded-2xl border-2 p-6 ${
                      index === 0 ? "border-[#C62828]" : "border-gray-200"
                    }`}
                  >
                    {/* Number Badge */}
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#C62828] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{item.number}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 text-center mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
