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
                <div className="bg-[#6366f1] w-12 h-12 rounded-xl flex items-center justify-center p-0 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-sweep" />
                  <Image src="/images/lilmuse.png" alt="Adobe Muse icon" width={48} height={48} className="w-12 h-12" />
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
                src="/images/TopRightHero.png"
                alt="Purple microphone with acoustic foam background"
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Uses Section */}
        <div className="mt-12">
          <h2 className="text-xl font-medium mb-4">Main uses</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 bg-[#1e1e1e] rounded-lg p-4 max-h-[280px] overflow-y-auto">
              <div className="border-l-2 border-[#6366f1] pl-4 mb-4">
                <h3 className="text-lg font-medium mb-1">Turn any creative idea into broadcast-ready sound in seconds</h3>
                <p className="text-gray-400 text-sm">
                The only prompt‑to‑production audio engine that gives beginners a one‑click path to pro sound, professionals an all-in-one media workflow, and enterprises leverage in scaled content supply chain delivery.
                </p>
              </div>

              <div className="space-y-2">
                <div className="py-2 border-b border-gray-800">
                  <p className="text-gray-300">Instant studio-clean up</p>
                </div>
                <div className="py-2 border-b border-gray-800">
                  <p className="text-gray-300">Scale brands aggressively; sell more</p>
                </div>
                <div className="py-2">
                  <p className="text-gray-300">Scene-aware auto-scoring</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-lg flex items-center justify-center overflow-hidden bg-transparent -mt-8">
              <Image 
                src="/images/newrectangle.png" 
                alt="Audio interface visualization"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
