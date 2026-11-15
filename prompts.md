# Prompts usados (IA como copiloto)

Ferramenta: **Claude Code** (Anthropic), usado como copiloto de desenvolvimento.
As decisões de ideia, nome, logo e layout foram do grupo; a IA propôs opções e escreveu o código, que revisamos e testamos.

| # | Prompt (resumido) | O que a IA fez | O que revisamos/decidimos |
|---|---|---|---|
| 1 | "Quero que você desenvolva o trabalho de mobile, apenas me dê a ideia [...] não desenvolva nada ainda" (com os PDFs da GS em anexo) | Leu o enunciado e a rubrica e propôs a ideia: app de alerta de calor e pontos de água/sombra na região da Av. Paulista | Aprovamos a ideia |
| 2 | "Pode começar a fazer o básico dessa ideia [...] sem fazer ligação com nenhuma outra matéria" | Criou o projeto Expo + TypeScript + Expo Router, as telas, a camada de serviços (Open-Meteo + mock), a camada SQLite e o README | Rodamos o app e conferimos as telas |
| 3 | Erro `ERESOLVE` no `npm install` (colado) | Identificou o conflito entre `react-dom` e `react` e fixou a versão compatível | Reinstalamos e confirmamos |
| 4 | "Quero uma melhoria completa no layout do app, seguir o estilo do [nosso outro projeto] [...] clean, moderno, minimalista, ícones mais arredondados, estilo Apple" | Criou o design system (cores, fonte Open Runde, ícones Solar, cards com gradiente, tab bar, skeletons) e refez todas as telas | Aprovamos o visual |
| 5 | "Quero que o app tenha um logo e um nome; para a logo use a skill ip-as-logo" | Sugeriu nomes e 3 direções de mascote e gerou 6 opções com IA de imagem (GPT Image, via Figma) | Escolhemos o nome **Fresquim** e o mascote A1 (gota azul) |
| 6 | "Sim, corrigir" (erros de lint) | Corrigiu os avisos de lint do React (`Skeleton`, `useAsync`, tela Avisar) | Rodamos lint e typecheck |
| 7 | Nomes dos integrantes e link do repositório | Preencheu o README, criou este arquivo e publicou o código no GitHub | Conferimos o repositório |
