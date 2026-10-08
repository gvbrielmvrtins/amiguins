# Editor temporário de posições

Disponível apenas quando `NODE_ENV=development`. O botão **Editar posições** habilita a seleção e o arrasto de elementos do mapa. Pessoas, grupos de prédios, robôs, plantas e ilustrações cadastradas são movimentáveis. Dentro dos prédios, as peças de `CivicRenderedProp` também podem ser movidas separadamente. Os terrenos e texturas permanecem fixos.

As setas movem um pixel do SVG; Shift + seta move dez. **Desfazer** reverte o último gesto. **Restaurar elemento** remove o ajuste do elemento selecionado. **Concluir edição** retorna ao jogo, preservando a disposição local.

As posições são salvas automaticamente no localStorage deste navegador, chave `amiguins-map-layout-v1`. **Exportar posições** baixa `amiguins-posicoes.json`, com IDs e deslocamentos nas coordenadas locais de cada grupo SVG. O arquivo permite incorporar os ajustes ao código posteriormente. A exportação não modifica os arquivos do projeto nem publica as mudanças.

Em produção, o botão e as posições do armazenamento local não são usados. Os 43 ajustes exportados em `amiguins-posicoes (1).json` foram incorporadas em `lib/map-layout-offsets.json` e são aplicadas também em produção, sem duplicar os deslocamentos existentes no navegador. O editor local pode continuar sendo usado para novos ajustes; em produção permanece desabilitado.

TypeScript e `git diff --check` passaram. Arrasto no navegador ainda não verificado nesta rodada.

## Duplicação, exclusão, tamanho e camadas

Após selecionar um elemento, **Duplicar** cria uma cópia deslocada 25 unidades, **Excluir** oculta o elemento e **Desfazer** recupera a alteração. Cópias de personagens são decorativas, sem gerar novos alvos. **Tamanho** aceita 10% a 400%, com escala uniforme ao redor do centro da ilustração.

**Camada** zero mantém a ordem original; números positivos renderizam acima dos elementos originais e negativos abaixo. **Para frente** e **Para trás** alteram o número em uma unidade. Números maiores aparecem sobre os menores. O terreno permanece na base. A seleção continua independente para peças internas de um prédio.

Exportação versão 2 mantém `x` e `y` e acrescenta os campos opcionais `scale`, `layer`, `hidden` e `sourceId`. As posições já importadas e o armazenamento anterior permanecem compatíveis. Ao incorporar futuras exclusões de personagens ao projeto, atualizar também o cadastro de alvos jogáveis.

Verificação desta expansão: TypeScript e `git diff --check` passaram. Interações e sobreposições no navegador ainda precisam de conferência visual.

**Rotação** ajusta o ângulo de −360° a 360° pelo centro da ilustração. Os botões giram em passos de 15°. O campo `rotation` é preservado no armazenamento, duplicação, desfazer e exportação.

Última importação: versão 2 com 43 ajustes, incluindo escala, rotação e camadas. Os dois modelos de multidão da festa e uma cópia permanecem ocultos, conforme o arquivo exportado. Nenhum personagem jogável foi excluído.

Importação de `amiguins-posicoes (2).json`: 48 ajustes. As novas instâncias dos foliões foram posicionadas e redimensionadas; uma cópia visível do segundo grupo foi preservada.

Importação de `amiguins-posicoes (5).json`: 126 ajustes. Metrópole e montanha permanecem com suas transformações aplicadas e bloqueadas para seleção no editor.
# Seleção individual dos elementos

Conjuntos com elementos editáveis internos preservam suas transformações importadas, mas deixam de oferecer uma seleção coletiva. Cada peça interna mantém seu próprio controle. Os patos da taverna, os vagões, o alçapão, o agente galinha, os peixes e seu balão, e os animais, vasos, árvores e labirinto do jardim secreto possuem controles independentes. Os recortes do atlas do jardim usam limites explícitos para evitar selecionar a imagem inteira.

Objetos desenhados juntos no mesmo PNG continuam sendo uma única ilustração; a separação desses desenhos exige novos arquivos de imagem. Os bloqueios da metrópole e da montanha permanecem conforme solicitado anteriormente.
