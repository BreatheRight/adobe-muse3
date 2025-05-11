import Image from "next/image"
import { Globe } from "lucide-react"
import { MuseLogo } from "@/components/muse-logo"

export default function AdobeMuse() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#1e1e1e] rounded-lg p-6">
              <div className="mb-6">
                <MuseLogo />
              </div>

              <p className="text-gray-300 mb-6">
                Create high-quality podcasts and voiceovers that sound professional, with AI-powered audio tools that
                elevate your voice.
              </p>

              <div className="flex items-center gap-2 text-gray-300 mb-6">
                <Globe className="w-5 h-5" />
                <span className="text-sm">English and 5 other languages</span>
              </div>

              <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-md transition-colors">
                Open in browser
              </button>
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
                <h3 className="text-lg font-medium mb-2">Enhance spoken audio with just one click</h3>
                <p className="text-gray-400">
                  Adobe Muse's AI makes voice recordings sound as if they were recorded in a professional studio.
                </p>
              </div>

              <div className="space-y-4">
                <div className="py-3 border-b border-gray-800">
                  <p className="text-gray-300">Edit audio like a doc</p>
                </div>
                <div className="py-3 border-b border-gray-800">
                  <p className="text-gray-300">Professional-grade recording</p>
                </div>
                <div className="py-3">
                  <p className="text-gray-300">Analyze your recording setup with AI</p>
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
