# Sauce Lab - Testes E2E com Playwright

Automacao de testes de interface para o SauceDemo usando Playwright + TypeScript.

Repositorio: https://github.com/williamk096/sauce-lab

## Objetivo

Validar o fluxo de login e praticar boas praticas de QA automatizado:

- estrutura com Page Object Model (POM)
- execucao em multiplos navegadores e dispositivos
- geracao de relatorio HTML e evidencias de falha

## Stack

- Node.js
- TypeScript
- Playwright Test

## Estrutura principal

- package.json: scripts de execucao
- playwright.config.ts: configuracao global
- tests/login.spec.ts: cenarios de login
- tests/tasks.spec.ts: atualmente replica os cenarios de login
- tests/support/pages/login.page.ts: Page Object de login
- playwright-report/: relatorio HTML
- test-results/: artefatos da execucao

## Cenarios implementados

1. Login com usuario valido (standard_user / secret_sauce)
2. Login com usuario bloqueado (locked_out_user / secret_sauce)

Validacoes:

- redirecionamento para inventory.html
- exibicao da mensagem de erro para usuario bloqueado

## Configuracao de execucao

Configuracoes principais:

- baseURL: https://www.saucedemo.com
- reporter: html
- trace: on-first-retry
- screenshot: on
- retries/workers ajustados para CI

Projetos configurados:

- Desktop: chromium, firefox, webkit
- Mobile: Pixel 5 (Mobile Chrome), iPhone 12 (Mobile Safari)

## Como rodar

Pre-requisitos: Node.js 18+ e Yarn.

Instalacao:

```bash
corepack enable
yarn install
npx playwright install
```

Execucao:

```bash
yarn test
yarn test:ui
yarn test:headed
yarn report
```

## Boas praticas aplicadas

- separacao entre cenarios (spec) e interacoes de tela (page object)
- uso de seletores mais robustos (getByRole, getByPlaceholder, getByText)
- assertions com auto-wait do Playwright

## Proximos passos

- transformar tests/tasks.spec.ts em testes reais de tarefas/carrinho/checkout
- adicionar pipeline CI para execucao automatica

## Autor

William
