# Prévia local em alta definição

Abra `/map-hd-preview` no servidor de desenvolvimento. A rota retorna 404 em produção.

O teste usa um único nível de resolução, seis pixels por unidade do mapa (13.920 × 10.800), dividido em blocos WebP sem perdas. Não troca resolução no zoom. Todos os blocos são carregados, sem remover áreas durante a navegação. A imagem preserva a ordem de camadas da composição; áreas transparentes mantêm os cliques dos 19 personagens e os destinos.

Para regenerar após mudar posições: abra `/map-snapshot`, clique em **Exportar mapa HD local** e execute `node scripts/render-map-hd.cjs /caminho/amiguins-map-hd.svg`. O exportador usa posições salvas no repositório; importe antes qualquer alteração do editor. As imagens geradas em `public/images/map-hd-preview` estão ignoradas pelo Git.

Esta é uma experiência para comparar nitidez e fluidez, não uma promessa de funcionar em todos os aparelhos. O conjunto completo em 6x representa até cerca de 573 MiB de pixels RGBA descomprimidos; a memória do navegador também inclui superfícies de renderização. Testar celulares reais antes de publicar. A resolução dos detalhes também depende da qualidade dos originais.
