# Ruas de asfalto

Rede de ruas nos corredores entre os lotes, com asfalto cinza-esverdeado, grãos de textura, bordas de pavimentação, faixas de pedestres, linhas tracejadas, setas de circulação e tampas de bueiro. Camada SVG no plano isométrico, abaixo dos terrenos, praia, mar e continente. Textura procedural leve, sem filtros por pixel ou imagens novas; mantém a nitidez em todos os níveis de zoom.

Integração em `components/map-streets.tsx` e `components/modular-map.tsx`. Removido apenas o fundo opaco do estudo inicial rosa para permitir que as ruas apareçam entre seus quatro lotes.

Verificação: TypeScript, `git diff --check` e conferência no navegador em 50% e 100%. Captura: `docs/proofs/ruas-asfalto-v01.png`.
