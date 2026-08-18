import { BentoCard } from "./bento-card"
import AuthBentoContent from "./bento/auth-bento-content"
import DatabaseBentoContent from "./bento/database-bento-content"
import StorageBentoContent from "./bento/storage-bento-content"
import FunctionsBentoContent from "./bento/functions-bento-content"
import ChatBentoContent from "./bento/chat-bento-content"
import { BENTO_FEATURES } from "@/lib/bento-features"

const componentByKey = {
  auth: AuthBentoContent,
  storage: StorageBentoContent,
  functions: FunctionsBentoContent,
  messaging: ChatBentoContent,
  databases: DatabaseBentoContent,
} as const

export function BentoSection() {
  const cards = BENTO_FEATURES.map(({ key, ...feature }) => ({
    ...feature,
    Component: componentByKey[key as keyof typeof componentByKey],
  }))

  return (
    <section className="w-full max-w-7xl mx-auto px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full relative flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col gap-4 md:gap-5 lg:gap-6 z-10">
          <div className="flex flex-col gap-4 md:hidden">
            <BentoCard {...cards[0]} />
            <BentoCard {...cards[1]} />
            <BentoCard {...cards[2]} />
            <BentoCard {...cards[3]} />
            <BentoCard {...cards[4]} />
          </div>

          <div className="hidden md:flex lg:hidden flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <BentoCard {...cards[0]} />
              <BentoCard {...cards[1]} />
              <BentoCard {...cards[2]} />
              <BentoCard {...cards[3]} />
            </div>
            <BentoCard {...cards[4]} />
          </div>

          <div className="hidden lg:flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <BentoCard {...cards[0]} />
              <BentoCard {...cards[4]} />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <BentoCard {...cards[1]} />
              <BentoCard {...cards[2]} />
              <BentoCard {...cards[3]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
