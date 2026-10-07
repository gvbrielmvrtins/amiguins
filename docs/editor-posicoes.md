# Editor temporário de posições

Disponível apenas quando `NODE_ENV=development`. O botão **Editar posições** habilita a seleção e o arrasto de elementos do mapa. Pessoas, grupos de prédios, robôs, plantas e ilustrações cadastradas são movimentáveis. Dentro dos prédios, as peças de `CivicRenderedProp` também podem ser movidas separadamente. Os terrenos e texturas permanecem fixos.

As setas movem um pixel do SVG; Shift + seta move dez. **Desfazer** reverte o último gesto. **Restaurar elemento** remove o ajuste do elemento selecionado. **Concluir edição** retorna ao jogo, preservando a disposição local.

As posições são salvas automaticamente no localStorage deste navegador, chave `amiguins-map-layout-v1`. **Exportar posições** baixa `amiguins-posicoes.json`, com IDs e deslocamentos nas coordenadas locais de cada grupo SVG. O arquivo permite incorporar os ajustes ao código posteriormente. A exportação não modifica os arquivos do projeto nem publica as mudanças.

Em produção, o botão e as posições do armazenamento local não são usados. As 15 posições exportadas em `amiguins-posicoes.json` foram incorporadas em `lib/map-layout-offsets.json` e são aplicadas também em produção, sem duplicar os deslocamentos existentes no navegador. O editor local pode continuar sendo usado para novos ajustes; em produção permanece desabilitado.

TypeScript e `git diff --check` passaram. Arrasto no navegador ainda não verificado nesta rodada.
