import { BentoCard } from "./bento-card"
import AuthBentoContent from "./bento/auth-bento-content"
import DatabaseBentoContent from "./bento/database-bento-content"
import StorageBentoContent from "./bento/storage-bento-content"
import FunctionsBentoContent from "./bento/functions-bento-content"
import IntegrationsBentoContent from "./bento/integrations-bento-content" // New import for Integrations
import ChatBentoContent from "./bento/chat-bento-content"

export function BentoSection() {
  const cards = [
    {
      title: "Auth",
      description: "Gerencie o acesso de usuários com segurança e facilidade.",
      Component: AuthBentoContent,
      icon: '/auth.png'
    },
    {
      title: "Databases",
      description: "Conecte e gerencie seus bancos de dados sem esforço.",
      Component: DatabaseBentoContent,
      icon: '/databases.png'

    },
    {
      title: "Storage",
      description: "Armazene e gerencie seus arquivos de forma segura e escalável.",
      Component: StorageBentoContent,
      icon: '/storage.png'

    },
    {
      title: "Functions",
      description: "Execute lógica de backend sem gerenciar servidores.",
      Component: FunctionsBentoContent,
      icon: '/functions.png'

    },
    {
      title: "Messaging", // New title for the third card in the second row
      description: "Conecte-se facilmente com pessoas ou com nossa IA nos chats.",
      Component: ChatBentoContent, // Assign the new IntegrationsBentoContent
      icon: '/messaging.png'
    },
  ]

  return (
    <section className="w-full max-w-7xl mx-auto px-5 flex flex-col justify-center items-center overflow-visible bg-transparent pb-52">
      <div className="w-full relative flex flex-col justify-start items-start gap-6">
        <div className="w-[547px] h-[938px] absolute top-[214px] left-[320px] origin-top-left rotate-[-33.39deg] bg-rose-500/10 blur-[130px] z-0" />
        <div className="self-stretch flex flex-col gap-6 z-10">
          {/* First row: 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BentoCard {...cards[0]} />
            <BentoCard {...cards[1]} />
          </div>
          {/* Second row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard {...cards[2]} />
            <BentoCard {...cards[3]} />
            <BentoCard {...cards[4]} /> {/* This is the new Integrations card */}
          </div>
        </div>
      </div>
    </section>
  )
}
