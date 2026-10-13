# Pamonhal em três imagens

30 instâncias visíveis (incluindo cópias) consolidadas em três atlas WebP lossless, com resolução de quatro pixels por unidade do mapa. Reutiliza a ilustração original, sem geração de nova arte. Mantidos transforms e ordem original entre instâncias.

Bloco 1: camada 0. Bloco 2: camadas -1 e 0. Bloco 3: camadas 0 e 1. Partes de camadas diferentes ficam em recortes distintos do mesmo arquivo; cinco recortes usam apenas três imagens para preservar sobreposições externas. Chão permanece separado, na posição original. Blocos superiores fixos; bloco inferior editável no editor; offsets originais preservados para regeneração. Prévia HD não alterada.

Gerar composição: node scripts/compose-cornfield.cjs; depois node scripts/raster-cornfield.cjs. Manifesto: lib/cornfield-composite.json. Arquivos: public/images/modular/pamonhal-bloco-1-v02.webp, pamonhal-bloco-2-v02.webp e pamonhal-bloco-3-v02.webp.
