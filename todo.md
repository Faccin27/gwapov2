# TODO — Gwapo (v2)

Levantamento ponta a ponta do estado atual do site. Organizado por prioridade.

## 🔴 Crítico (bloqueia lançamento) — resolvido

- [x] **Botão "Começar meu projeto" (CTA) e "Vamos começar" (hero)** — agora abrem WhatsApp (`wa.me/5549999215720`, número já exibido no footer). `Button` do CTA virou `asChild` com `<a target="_blank">`.
- [x] **Sem forma de contato real** — resolvido via WhatsApp direto (decisão do usuário, ao invés de form/página `/contato` dedicada). Se no futuro quiser form próprio, reavaliar.
- [x] **Metadata boilerplate do `create-next-app`** — `src/app/layout.tsx` agora tem título, descrição, Open Graph e Twitter Card reais em pt-BR.
- [x] **`<html lang="en">`** — corrigido pra `lang="pt-BR"`.
- [x] **Sem `sitemap.ts` / `robots.ts`** — criados `src/app/sitemap.ts` e `src/app/robots.ts`, build gera `/sitemap.xml` e `/robots.txt`. Domínio usado como placeholder: `https://gwapo.com.br` — confirmar se é o domínio real antes do deploy.

## 🟠 Importante (funcionalidade incompleta) — resolvido

- [x] **Menu mega "Portfolio" não filtrava nada** — as 6 subcategorias (Sites Corporativos, E-commerce, Landing Pages, Aplicativos, Identidade Visual, UI/UX) agora levam pra `/projetos?tipo=...` e a página lê o parâmetro (`useSearchParams`) pra pré-selecionar o filtro correto. Corrigido no desktop e no menu mobile.
- [x] **Alt text genérico `alt="a"`** em `card-section.tsx` — trocado por texto descritivo (Auth, Databases, Storage, Functions, Realtime, Messaging, Sites).
- [x] **`<img>` puro em vez de `next/image`** — convertido em `card-section.tsx`, `bento-card.tsx`, `header.tsx` (logo desktop/mobile + imagem do mega menu) e `hero.tsx` (ícones de tech + logos de marca). Build não emite mais nenhum warning de LCP/bandwidth.
- [x] **`src/app/projetos/[id]/page.tsx` client component async** — trocado `async function` + `await params` por `use(params)` (API correta do React 19 pra client components), warning de build sumiu.
- [x] **`/servicos` e `/producoes` não existiam como páginas próprias** — criadas as duas seguindo o padrão visual do site (mesmo Header/Footer, animação de luz do hero, cards `rounded-2xl` com blur, CTA com WhatsApp):
  - `/servicos`: 6 cards de serviço (mesmas categorias de `/projetos`, cada um linkando pro filtro correspondente), seção "Como trabalhamos" com processo em 4 etapas, CTA final.
  - `/producoes`: stats (+200 projetos, 4.9/5, etc. — reaproveitando números já usados no site), seção "Como produzimos", grid de produções em destaque (projetos reais já cadastrados), CTA final.
  - Header, footer e `sitemap.ts` atualizados pra apontar pras páginas de verdade em vez das âncoras `/#servicos` e `/#producoes`.
- [ ] **Dados dos projetos (`/projetos`, `/producoes`) são hardcoded no componente**, sem CMS/backend — decisão consciente de não mexer agora (mudança de arquitetura grande). Fica registrado pra quando fizer sentido investir nisso.

## 🟡 Qualidade / Polimento

- [x] **README.md** — reescrito com stack real, como rodar o projeto e estrutura de pastas.
- [x] **`bun.lock`** — investigado: a diferença é só o bump de patch do Next (15.4.6 → 15.4.10) já refletido no `package.json`, não é acidental.
- [ ] **Sem testes** — decisão consciente de não configurar agora (baixo valor pra uma landing page de marketing sem lógica de negócio complexa).
- [ ] **Sem analytics** — decisão consciente de não configurar agora (precisa de um ID de tracking real — GA4/Plausible — que não foi fornecido). Retomar quando tiver a conta pronta.
- [ ] **Seções Bento (`auth-bento-content`, `chat-bento-content`, etc.)** são mockups visuais com inputs `disabled` — confirmado que é intencional (showcase de produto estilo Supabase, não interação real). Nenhuma ação necessária.

## ✅ Já corrigido nesta sessão

- [x] Links `href="#"` sem destino (card-section, hero) — removidos ou apontados corretamente
- [x] Header/footer apontando pra rotas inexistentes (`/servicos`, `/producoes`, `/contato`, `/portfolio/*`) — redirecionados pra âncoras/páginas existentes
- [x] Social links do footer (Facebook/Twitter/LinkedIn) apontando pro site do dev em vez de rede social — removidos, mantido só Instagram real
- [x] Link "Next.js" no footer apontando pra `/` em vez do site oficial — corrigido
- [x] IDs de âncora (`servicos`, `producoes`, `depoimentos`, `contato`) adicionados nas sections correspondentes
