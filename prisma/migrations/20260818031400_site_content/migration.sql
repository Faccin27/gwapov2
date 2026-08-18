-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "heroBadge" TEXT NOT NULL DEFAULT 'Mais de 200 projetos entregues com sucesso',
    "heroTitle" TEXT NOT NULL DEFAULT 'Nós criamos sites que geram resultados',
    "heroDescription" TEXT NOT NULL DEFAULT 'Desenvolvemos sites modernos, rápidos e responsivos, pensados para impulsionar sua presença online e atrair mais clientes para o seu negócio.',
    "heroPrimaryButtonText" TEXT NOT NULL DEFAULT 'Vamos começar',
    "heroPrimaryButtonLink" TEXT NOT NULL DEFAULT 'https://wa.me/5549999215720',
    "heroSecondaryButtonText" TEXT NOT NULL DEFAULT 'Ver Portfólio',
    "projectsBadge" TEXT NOT NULL DEFAULT 'Nosso trabalho',
    "projectsTitle" TEXT NOT NULL DEFAULT 'Todos os Projetos',
    "projectsDescription" TEXT NOT NULL DEFAULT 'Conheça os projetos que já desenvolvemos para nossos clientes.',
    "footerEmail" TEXT NOT NULL DEFAULT 'contact@gwapo.com.br',
    "footerPhone" TEXT NOT NULL DEFAULT '(49) 99921-5720',
    "footerTeamText" TEXT NOT NULL DEFAULT 'Guilherme && Willian',
    "footerSocialText" TEXT NOT NULL DEFAULT 'Siga-nos nas redes sociais para acompanhar bastidores e novidades.',
    "footerInstagramUrl" TEXT NOT NULL DEFAULT 'https://instagram.com/gui.faccin',
    "footerCopyright" TEXT NOT NULL DEFAULT '© 2026 Gwapo. Todos os direitos reservados.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);
