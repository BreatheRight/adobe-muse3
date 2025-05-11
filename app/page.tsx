import Image from "next/image"
import { Globe } from "lucide-react"
import Link from "next/link"

export default function AdobeMuse() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#1e1e1e] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#6366f1] w-12 h-12 rounded-xl flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                      fill="white"
                    />
                    <path
                      d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                      fill="white"
                    />
                    <path
                      d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path d="M12 18V20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 18C15.3137 18 18 15.3137 18 12" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
                <h1 className="text-2xl font-medium">Adobe Muse</h1>
              </div>

              <p className="text-gray-300 mb-6">
                Your generative AI audio companion. Create high-quality audio assets through simple prompts, auto-context generation, or voice-to-audio mimicry.
              </p>

              <div className="flex items-center gap-2 text-gray-300 mb-6">
                <Globe className="w-5 h-5" />
                <span className="text-sm">English and 5 other languages</span>
              </div>

              <Link href="/editor" className="block w-full">
                <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-md transition-colors">
                  Open Recent Project
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-8">
            <div className="rounded-lg overflow-hidden h-full">
              <Image
                src="/images/hero.png"
                alt="Purple microphone with acoustic foam background"
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Uses Section */}
        <div className="mt-8">
          <h2 className="text-xl font-medium mb-6">Main uses</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#1e1e1e] rounded-lg p-6">
              <div className="border-l-2 border-[#6366f1] pl-4 mb-6">
                <h3 className="text-lg font-medium mb-2">Turn any creative idea into broadcast-ready sound in seconds</h3>
                <p className="text-gray-400">
                The only prompt‑to‑production audio engine that gives beginners a one‑click path to pro sound, professionals an all-in-one media workflow, and enterprises leverage in scaled content supply chain delivery.
                </p>
              </div>

              <div className="space-y-4">
                <div className="py-3 border-b border-gray-800">
                  <p className="text-gray-300">Instant studio-clean up</p>
                </div>
                <div className="py-3 border-b border-gray-800">
                  <p className="text-gray-300">Scale brands aggressively; sell more</p>
                </div>
                <div className="py-3">
                  <p className="text-gray-300">Scene-aware auto-scoring</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#f87171] rounded-lg p-6 flex items-center justify-center">
              <div className="w-24 h-12 bg-[#4f46e5] rounded-full flex items-center p-1">
                <div className="bg-white w-10 h-10 rounded-full ml-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
