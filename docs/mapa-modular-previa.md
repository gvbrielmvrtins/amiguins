# Prévia de composição modular

Na página inicial, use **Prévia modular** para visualizar o estudo em SVG e **Mapa atual** para comparar com a vila existente. O modo original continua sendo o inicial; alternar os modos preserva as descobertas da rodada atual.

A prévia usa a paleta e os 20 nomes do [guia de produção](mapa-modular-guia-producao.md). CinemINha e LivrINhoteca agora usam peças piloto geradas por IA, com cartaz, banco e livros em arquivos separados. Os outros 18 blocos são posições provisórias para futuras ilustrações. Veja os arquivos, limitações e prompts em [Peças piloto](mapa-pilotos-geracao.md).

- Prancheta 3000 × 2000, terreno e água vetoriais, caminhos conectados, praças e padrões de ondas, listras e quadriculado.
- PracINha central, PrefeINtura acima dela e Torre MÍNstica à direita e acima. A ilha de Países africanos fica a sudeste, sem ponte.
- Caminhos, pátios e grandes superfícies abertas ficam disponíveis para futuros personagens; ainda não há distribuição de figuras.
- A lista lateral localiza destinos; os blocos podem ser selecionados por clique, Enter ou Espaço. Zoom e arraste usam os controles da interface existente. Em telas pequenas, o mapa mantém uma largura mínima para permitir leitura e exploração lateral.
- Os alvos e as dicas do jogo original pertencem apenas ao modo original. A prévia serve para revisar composição.

## Onde editar

- `lib/modular-map.ts`: nomes, IDs, posições dos pontos de apoio, larguras e cores dos 20 destinos.
- `components/modular-map.tsx`: terreno, caminhos, praças, padrões e renderização dos blocos.
- `components/exploration-game.tsx`: alternância das versões e seleção pela lista.
- `app/globals.css`: apresentação da prévia na interface e comportamento responsivo.

O próximo passo é revisar as peças piloto no conjunto antes de produzir os demais destinos.
