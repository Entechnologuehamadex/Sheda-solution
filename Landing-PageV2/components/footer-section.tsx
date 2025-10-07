import Image from "next/image"
import Link from "next/link"
import { Twitter, Send, Linkedin, Facebook } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="lg:max-w-md">
            <div className="mb-4">
              <Image src="/sheda-logo.svg" alt="Sheda Solutions" width={200} height={40} className="h-8 w-auto" />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed hidden lg:block">
              Making real estate operations affable, available, affordable, and secure through blockchain.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed lg:hidden">
              Securely link your wallet across blockchain networks using personalized domains.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-16">
            {/* Mobile: Company and Legal side by side */}
            <div className="grid grid-cols-2 gap-8 lg:contents">
              {/* Company Column */}
              <div>
                <h3 className="text-[#C53030] font-semibold mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                      About us
                    </Link>
                  </li>
                  <li className="hidden lg:block">
                    <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                      Litepaper
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                      <span className="lg:hidden">Blog</span>
                      <span className="hidden lg:inline">Contact</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                      <span className="lg:hidden">Contact</span>
                      <span className="hidden lg:inline">Blog</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <h3 className="text-[#C53030] font-semibold mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                      Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                      Licences
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Help Column */}
            <div className="mt-8 lg:mt-0">
              <h3 className="text-[#C53030] font-semibold mb-4">Help</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-900 hover:text-[#C53030] transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-600 order-2 lg:order-1">© 2025 Sheda solutions. All rights reserved.</p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 order-1 lg:order-2">
            <Link href="#" className="text-gray-600 hover:text-[#C53030] transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-[#C53030] transition-colors" aria-label="Telegram">
              <Send className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-[#C53030] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-[#C53030] transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
