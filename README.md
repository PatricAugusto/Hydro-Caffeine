# HYDRO+ZAP

Controle diário de água e cafeína, com identidade visual Pop Art.

---

## Sobre

HYDRO+ZAP ajuda a manter o consumo diário de água e cafeína equilibrado. Registre doses com um toque, acompanhe o progresso em tempo real e revise seu histórico em um calendário — tudo salvo localmente, sem servidor.

## Funcionalidades

- **Registro rápido** — presets reais de volume (água) e cafeína (espresso, coado, energético)
- **Metas configuráveis** — defina seus próprios limites diários
- **Desfazer / zerar** — corrija registros sem deixar dado inconsistente
- **Alertas visuais** — aviso quando o consumo de cafeína passa do limite
- **Histórico em calendário** — visão mensal com status por dia
- **Dark mode** — troca instantânea, sem flash, respeitando a preferência do sistema
- **Acessível** — navegação por teclado, contraste WCAG AA, suporte a leitor de tela

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js (App Router) |
| Linguagem | TypeScript |
| Estilo | styled-components |
| Persistência | localStorage |

## Rodando localmente

```bash
git clone https://github.com/PatricAugusto/Hydro-Caffeine.git
cd hydro-caffeine-tracker
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm run start
```

## Estrutura

```
src/
├── app/                  # rotas e layout raiz
├── components/           # componentes de UI
├── hooks/                # useTracker, useThemeMode, useLocalStorage...
├── styles/               # tema, estilos globais, tokens de cor
├── types/                # tipos compartilhados
└── utils/                # funções puras (data, calendário)
```

## Design

Paleta vibrante, contornos grossos, textura halftone e onomatopeias animadas — a interface usa a linguagem visual de HQ como parte funcional do produto, não como decoração.

---