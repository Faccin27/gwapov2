import Image from "next/image"

export default function cardsection() {
  return (
    <div className="container py-20  mx-auto">
      <div className="mx-auto mb-16 flex max-w-5xl flex-col gap-8">
        <h2 className="text-[#F4F4F4] mx-auto max-w-[600px] text-4xl md:text-5xl text-center">
          Todas as funções que você precisa, em um só lugar
        </h2>
        <div className="hidden justify-between gap-8 lg:flex">
          <div className="bg-zinc-800 text-[#f4f4f4] relative flex h-12 items-center gap-4 rounded-full border border-[#ffffff0f] border-dashed p-1 text-sm">
            <span className="text-sm text-[#afafaf] font-semibold  ml-3 uppercase ">Build</span>
            <div className="flex h-full w-full justify-between gap-2">
              <a
                href="#"
                className="bg-zinc-700/40 hover:bg-zinc-700/50 flex h-full w-fit items-center justify-center gap-2 rounded-full px-3 py-2 backdrop-blur-lg transition-opacity"
              >
                <span className="text-[#f4f4f4] flex items-center justify-center gap-1 font-medium">
                  <Image src="/auth.png" alt="Auth" width={32} height={32} className="w-8 h-8" />
                  <h3 className="text-label text-[#f4f4f4]">Auth</h3>
                </span>
              </a>
              <a
                href="#"
                className="bg-zinc-700/40 hover:bg-zinc-700/50 flex h-full w-fit items-center justify-center gap-2 rounded-full px-3 py-2 backdrop-blur-lg transition-opacity"
              >
                <span className="text-[#f4f4f4] flex items-center justify-center gap-1 font-medium">
                  <Image src="/databases.png" alt="Databases" width={32} height={32} className="w-8 h-8" />
                  <h3 className="text-label text-[#f4f4f4]">Databases</h3>
                </span>
              </a>
              <a
                href="#"
                className="bg-zinc-700/40 hover:bg-zinc-700/50 flex h-full w-fit items-center justify-center gap-2 rounded-full px-3 py-2 backdrop-blur-lg transition-opacity"
              >
                <span className="text-[#f4f4f4] flex items-center justify-center gap-1 font-medium">
                  <Image src="/storage.png" alt="Storage" width={32} height={32} className="w-8 h-8" />
                  <h3 className="text-label text-[#f4f4f4]">Storage</h3>
                </span>
              </a>
              <a
                href="#"
                className="bg-zinc-700/40 hover:bg-zinc-700/50 flex h-full w-fit items-center justify-center gap-2 rounded-full px-3 py-2 backdrop-blur-lg transition-opacity"
              >
                <span className="text-[#f4f4f4] flex items-center justify-center gap-1 font-medium">
                  <Image src="/functions.png" alt="Functions" width={32} height={32} className="w-8 h-8" />
                  <h3 className="text-label text-[#f4f4f4]">Functions</h3>
                </span>
              </a>
              <a
                href="#"
                className="bg-zinc-700/40 hover:bg-zinc-700/50 flex h-full w-fit items-center justify-center gap-2 rounded-full px-3 py-2 backdrop-blur-lg transition-opacity"
              >
                <span className="text-[#f4f4f4] flex items-center justify-center gap-1 font-medium">
                  <Image src="/realtime.png" alt="Realtime" width={32} height={32} className="w-8 h-8" />
                  <h3 className="text-label text-[#f4f4f4]">Realtime</h3>
                </span>
              </a>
              <a
                href="#"
                className="bg-zinc-700/40 hover:bg-zinc-700/50 flex h-full w-fit items-center justify-center gap-2 rounded-full px-3 py-2 backdrop-blur-lg transition-opacity"
              >
                <span className="text-[#f4f4f4] flex items-center justify-center gap-1 font-medium">
                  <Image src="/messaging.png" alt="Messaging" width={32} height={32} className="w-8 h-8" />
                  <h3 className="text-label text-[#f4f4f4]">Messaging</h3>
                </span>
              </a>
            </div>
          </div>
          <div className="bg-zinc-800 text-[#f4f4f4] relative flex h-12 items-center gap-4 rounded-full border border-[#ffffff0f] border-dashed p-1 text-sm">
            {" "}
            <span className="text-sm font-semibold text-[#afafaf]  ml-3 uppercase">Deploy</span>
            <a
              href="#"
              className="bg-zinc-700/40 hover:bg-zinc-700/50 flex h-full w-fit items-center justify-center gap-2 rounded-full px-3 py-2 backdrop-blur-lg transition-opacity"
            >
              <span className="text-[#f4f4f4] flex items-center justify-center gap-1 font-medium">
                <Image src="/sites.png" alt="Sites" width={32} height={32} className="w-8 h-8" />
                <h3 className="text-xs text-[#f4f4f4]">Sites</h3>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
