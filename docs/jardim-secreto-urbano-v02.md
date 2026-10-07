# jardIN secreto urbano

O labirinto existente foi preservado e reduzido em 20%, com implantação em (2100, -500), dentro da floresta. O destino do menu acompanha a nova posição. Uma clareira impede que copas encubram o jardim.

O atlas `jardim-animais-vasos-v01.png` contém 12 peças independentes sobre transparência, reutilizadas como 16 animais decorativos e 14 vasos. Inclui corgi, poodle, dachshund, gatos calico, siamês e tigrado, galinhas brancas e marrons, gerânios, lavanda, costela-de-adão e antúrios. Nenhum novo elemento é jogável.

Geração: grade de 4 colunas e 3 linhas, objetos isolados; contornos pretos, sombreamento quente e acabamento do cinema e da árvore originais, usados como referências explícitas. Integração via recortes SVG do atlas, mantendo as ilustrações independentes.

Validação: TypeScript sem erros, diff sem problemas de whitespace e inspeção no navegador a 50% e 100%. Registro visual: `proofs/jardim-secreto-urbano-v02.png`.

Ajuste posterior: cinturão contínuo de 28 árvores reutilizadas em todos os lados da clareira, incluindo a frente voltada à rua. Registro: `proofs/jardim-cercado-arvores-v03.png`.

Aproximação das árvores: substituído o cerco oval por duas fileiras escalonadas acompanhando o losango do labirinto. A fileira interna usa árvores menores próximas às bordas; a externa conecta o jardim à floresta existente. Reutilizadas 72 árvores, sem gerar novos assets. Conferência visual sem cobrir caminhos e residentes; TypeScript e console sem erros. Registro: `proofs/jardim-arvores-proximas-v05.png`.
