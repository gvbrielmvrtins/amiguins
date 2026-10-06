import type { Target } from './game-data';

export const mapCharacters: (Target & { file: string })[] = [
  { id: 'gabriel-martins', name: 'Gabriel Martins', article: 'o', category: 'people', x: 415, y: 570, width: 30, height: 45, file: '/images/characters/gabriel-martins-v01.png', clue: 'Gabriel está com sua pipoca no canto direito do terreno do cinema.' },
  { id: 'nathan-machado', name: 'Nathan Machado', article: 'o', category: 'people', x: 1400, y: 1970, width: 30, height: 45, file: '/images/characters/nathan-machado-v01.png', clue: 'Nathan está fazendo exercício com halteres no gINásio dos marombINs. Procure o machado na camiseta dele.' },
  { id: 'kauana-moreira', name: 'Kauana Moreira', article: 'a', category: 'people', x: 2360, y: 2130, width: 30, height: 45, file: '/images/characters/kauana-moreira-v01.png', clue: 'Kauana está entre os animais da savana, de boné e óculos escuros, perto de uma ovelhinha branca com asas e auréola.' },
];
