import type { Target } from './game-data';

export const mapCharacters: (Target & { file: string })[] = [
  { id: 'gabriel-martins', name: 'Gabriel Martins', article: 'o', category: 'people', x: 415, y: 570, width: 30, height: 45, file: '/images/characters/gabriel-martins-v01.png', clue: 'Gabriel está com sua pipoca no canto direito do terreno do cinema.' },
  { id: 'nathan-machado', name: 'Nathan Machado', article: 'o', category: 'people', x: 1400, y: 1970, width: 30, height: 45, file: '/images/characters/nathan-machado-v01.png', clue: 'Nathan está fazendo exercício com halteres na Academia marombINs. Procure o machado na camiseta dele.' },
];

