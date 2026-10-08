# Mapa otimizado

O editor continua disponível em `/` durante o desenvolvimento. A prévia pública está em `/?map=optimized`; em produção, a página inicial mantém a versão normal, mesmo com esse parâmetro. O teste otimizado fica restrito ao desenvolvimento local.

A composição atual é renderizada em blocos WebP de 512 pixels, em três resoluções. O navegador carrega os blocos próximos da área visível e troca a resolução conforme o zoom. Os personagens mantêm áreas clicáveis, e os destinos do menu usam as posições capturadas dos prédios principais. As miniaturas do menu também são WebP menores.

## Atualizar a composição publicada

Com o servidor de desenvolvimento aberto e as posições exportadas incorporadas em `lib/map-layout-offsets.json`, execute:

```sh
node scripts/render-map-tiles.cjs
```

O script captura `/map-snapshot`, gera `public/images/map-tiles`, atualiza `lib/map-tiles-manifest.json` e gera as miniaturas em `public/images/menu-portraits`. A captura usa as posições salvas no projeto; alterações que existam apenas no armazenamento do navegador precisam ser exportadas e incorporadas antes. A rota de captura não fica disponível em produção.

O script usa Sharp e Playwright do runtime local do Codex e Google Chrome. Os caminhos podem ser configurados por `MAP_RUNTIME_MODULES`, `MAP_CHROME` e `MAP_BASE_URL`.

## Verificação desta versão

- TypeScript e comparação visual da composição.
- Zoom com rodinha, gesto de pinça no celular, navegação pelos 22 destinos e descoberta de personagem.
- Em contextos novos do navegador, na abertura em 1280 × 950: aproximadamente 165 MB de imagens no editor e 1,16 MB na versão otimizada. Essa comparação mede as imagens solicitadas nesse cenário, não o tempo de carregamento em todas as conexões.
- Os 385 blocos das três resoluções somam cerca de 13,78 MB; eles não são carregados todos na abertura.

Após alterações na arte ou nas posições, regenere os blocos antes de publicar.
