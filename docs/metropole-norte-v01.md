# Metrópole na borda superior

Composição decorativa que preenche a área superior e seu canto esquerdo, estendendo os quarteirões além do artboard. Implantação com alturas variadas, recuos reservados para o cantIN, o metrô e suas passagens. O terreno tem transição curva e máscara suave. A montanha e a floresta continuam visíveis.

Primeiro foram implantados volumes simples no navegador. Depois, cada novo prédio foi gerado individualmente e substituído no cenário antes de seguir para a próxima peça.

## Peças novas

- `metropole-escritorios-v01.png`, 1415 × 1111: prédio de escritórios com vidros azuis, estrutura marfim, coroamento escalonado, equipamentos e antena. Prompt: objeto único isolado, transparência, vista isométrica elevada, eixos ±30°, arquitetura retrô-pop, contornos escuros, sombreamento quente, sem texto/pessoas. Cinema e árvore originais usados como referências explícitas de estilo.
- `metropole-residencial-v01.png`, 1105 × 1424: torre residencial coral, varandas com plantas e roupas, caixa d'água e jardim no teto. Prompt: objeto único isolado, torre mais estreita e alta, transparência, vista isométrica elevada, mesmos contornos e acabamento. Referências: cinema, árvore e escritório já integrado.

As ilustrações se repetem com escalas uniformes distintas. Reutilizados sobrados, loja amarela, postes e floreiras do acervo. Elementos decorativos sem novos destinos ou personagens jogáveis.

Verificação: TypeScript e diff sem erros; conferência visual a 25% e 50%. Registro: `proofs/metropole-norte-v01.png`.

Transição com a vila: faixa de terreno com bordas suavizadas, textura de gramado e terra, passeio curvo e ligação com a rua. Reutilizadas árvores, bancos e floreiras, distribuídos em 32 pontos ao longo da faixa. A camada de chão fica abaixo das ruas e lotes para preservar suas bordas e acessos. Registro: `proofs/metropole-transicao-v02.png`.
