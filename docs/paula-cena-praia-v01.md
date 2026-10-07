# Cena de busca da Paula na praia

Composição local ao redor da personagem, mantendo corpo e pá visíveis. Buraco vetorial junto da lâmina, castelo de areia, baleia encalhada e quatro banhistas decorativos (duas ilustrações reutilizadas). Toalhas, bolas e conchas existentes reaproveitadas. Banhistas não entram no cadastro de pessoas jogáveis.

Implantação provisória conferida antes das renderizações. Cada ilustração nova foi gerada, inspecionada e integrada individualmente. Cadastro em `lib/paula-beach-layout.ts` e `lib/civic-rendered-assets.ts`.

Referências explícitas: cinema e árvore originais; Nathan também para proporções e acabamento dos banhistas. Arquivos novos em `public/images/modular/`: `praia-castelo-areia-v01.png`, `praia-baleia-encalhada-v01.png`, `praia-banhista-1-v01.png` e `praia-banhista-2-v01.png`.

## Prompts

Base comum: One isolated modular game illustration, elevated isometric three-quarter view, ground axes at 30 degrees. Attached cinema and tree are explicit STYLE references: polished retro-pop cartoon, bold black contours, layered warm cel shading and detailed materials. Transparent background, no text, no scenery, no glow. 

Castelo: An elaborate sandcastle made of golden beach sand, three small crenellated towers, arched entrance, carved moat and tiny seashell decorations. Whole castle visible, compact footprint, no people.

Baleia: One friendly blue-gray humpback whale stranded resting on beach sand, alive, calm expressive eye, rounded massive body, cream ventral pleats, broad flippers resting alongside, tail extending diagonally toward upper right while head is lower left. Entire whale visible, long axis follows ascending-right isometric ground diagonal so fits narrow beach. Small sandy contact mound only, no ocean, no injury, no people. Detailed cartoon consistent with game.

Banhista 1: One adult male beachgoer, dark brown skin, short curly hair, expressive oversized cartoon eyes and head matching attached Nathan character reference. Coral swimming trunks, bare feet, turquoise towel over shoulder, holding a small yellow beach bucket in one hand, relaxed standing three-quarter pose. Entire body visible. Person only, not Nathan, no beach floor.

Banhista 2: One adult female beachgoer with light skin and dark straight bob hair, oversized expressive cartoon eyes, large head and compact limbs matching attached Nathan game character. Turquoise one-piece swimsuit, coral sunhat and round sunglasses, barefoot, standing holding a rolled cream towel and small beach bag, cheerful relaxed pose. Entire body visible, no scenery or beach floor.

TypeScript e diff sem erros. Conferência: `docs/proofs/paula-cena-praia-v01.png`.
