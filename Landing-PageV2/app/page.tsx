import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import FeaturesSection from "@/components/features-section"
import BenefitsSection from "@/components/benefits-section"
import RoadmapSection from "@/components/roadmap-section"
import FAQSection from "@/components/faq-section"
import GetStartedSection from "@/components/get-started-section"
import FooterSection from "@/components/footer-section"

export default function Home() {
  return (
    <main>
      <div id="hero">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <BenefitsSection />
      <div id="roadmap">
        <RoadmapSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="get-started">
        <GetStartedSection />
      </div>
      <FooterSection />
    </main>
  )
}
