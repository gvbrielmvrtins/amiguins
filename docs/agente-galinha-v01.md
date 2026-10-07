# Agente galinha

Personagem decorativo e não jogável no teto do vagão feminino, à direita do alçapão, voltado para Henrique. Não integra `mapCharacters`, a lista de pessoas ou a contagem de alvos. Herda `pointerEvents="none"` do metrô e não apresenta tooltip.

Arte criada com a ferramenta integrada imagegen e salva em `public/images/modular/agente-galinha-v01.png`, com transparência preservada. Referências: foto do agente fornecida pelo usuário, Nathan Machado e árvore original do mapa.

Prompt final: criar um único sprite isolado de uma galinha agente secreta creme/dourada, com crista vermelha, óculos pretos, mochila e arnês táticos pretos e dispositivo verde no pulso; corpo inteiro levemente agachado, olhando à esquerda, com uma asa estendida segurando um pequeno dispositivo para ajudar a abrir um alçapão; seguir a ilustração cartoon 2D das referências, com contornos escuros e sombras limpas; fundo transparente, sem cenário, pessoas, trem ou textos.

Integração: `MetroTrain`, posição relativa ao vagão `(34, -43)`, imagem de 28 × 27 unidades. Verificações: TypeScript e `git diff --check` passaram. A arte foi inspecionada; a composição no navegador não foi verificada nesta rodada.
