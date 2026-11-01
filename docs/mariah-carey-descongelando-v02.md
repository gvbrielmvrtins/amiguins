# Mariah — animação com base imóvel

30/10/2026. Corrige a oscilação da primeira versão: os 16 quadros usam os mesmos pixels da ilustração base. Somente uma gota recortada da arte existente desce por fora do bloco. Mariah, gelo, rachaduras e poça ficam fixos. Loop de 1,6 segundo. A paleta é quantizada uma única vez para evitar oscilações de cor entre quadros.

Montagem reproduzível: `node scripts/assemble-mariah-thaw.cjs`. O script verifica que a região da personagem e do bloco é idêntica em todos os quadros, inclusive depois de decodificar o GIF final. Sem nova geração de imagem. Original congelado e primeira tentativa preservados. Alternativa estática mantida para movimento reduzido.

Enviar os dois arquivos v02 ao R2 antes de publicar.
