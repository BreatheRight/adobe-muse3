import Image from "next/image"

export function MuseLogo() {
  return (
    <div className="flex items-center gap-3">
      <Image src="/images/muse-logo.png" alt="Adobe Muse Logo" width={40} height={40} className="rounded-md" />
      <span className="text-2xl font-medium">Adobe Muse</span>
    </div>
  )
}
