# Gwapo

Site institucional da Gwapo — agência de criação de sites. Landing page com apresentação de serviços, portfólio de projetos e captação de leads via WhatsApp.

## Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [GSAP](https://gsap.com) (animações e ScrollSmoother)
- [Radix UI](https://www.radix-ui.com) (dropdown, dialog, navigation menu)
- TypeScript

## Rodando localmente

```bash
bun install
bun dev
```

Abre em [http://localhost:3000](http://localhost:3000).

Outros scripts:

```bash
bun run build   # build de produção
bun run start   # roda o build de produção
bun run lint    # eslint
```

## Estrutura

```
src/
  app/
    page.tsx              # home
    projetos/              # listagem de projetos (com filtro por tipo via ?tipo=)
    projetos/[id]/          # detalhe de um projeto
    layout.tsx             # metadata global, fonte
    sitemap.ts / robots.ts # SEO
  components/
    header.tsx, footer.tsx, hero.tsx, cta-section.tsx, ...  # seções da home
    bento/                 # showcase visual estilo "produto" (mockups, não interativo de verdade)
    ui/                    # componentes base (button, dropdown, input, etc.)
  lib/utils.ts
public/                    # imagens, ícones, fontes
```

## Notas

- Os projetos exibidos em `/projetos` estão hardcoded no componente (`allProjects` em `src/app/projetos/page.tsx`). Adicionar um projeto novo hoje exige editar o código e fazer redeploy — não há CMS.
- O CTA principal do site ("Começar meu projeto" / "Vamos começar") abre WhatsApp direto (`wa.me/5549999215720`).
- O domínio usado em `layout.tsx`, `sitemap.ts` e `robots.ts` é `https://gwapo.com.br` — confirmar se é o domínio real de produção antes do deploy.
