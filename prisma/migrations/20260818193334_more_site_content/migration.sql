-- AlterTable
ALTER TABLE "SiteContent" ADD COLUMN     "ctaButtonText" TEXT NOT NULL DEFAULT 'Começar meu projeto',
ADD COLUMN     "ctaTitleHighlight" TEXT NOT NULL DEFAULT 'ideia em realidade',
ADD COLUMN     "ctaTitleLine1" TEXT NOT NULL DEFAULT 'Transforme sua',
ADD COLUMN     "functionsHeading" TEXT NOT NULL DEFAULT 'Todas as funções que você precisa, em um só lugar',
ADD COLUMN     "seoDescription" TEXT NOT NULL DEFAULT 'Criação de sites profissionais, rápidos e responsivos para gerar mais clientes. +200 projetos entregues com a Gwapo. Peça seu orçamento sem compromisso.',
ADD COLUMN     "seoTitle" TEXT NOT NULL DEFAULT 'Gwapo | Criação de sites que geram resultados';
