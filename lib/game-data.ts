export type Target = { id: string; name: string; category: 'people' | 'places' | 'animals'; x: number; y: number; width: number; height: number; clue: string };
export const targets: Target[] = [
  { id: 'bia', name: 'Bia', category: 'people', x: 26.5, y: 30, width: 4, height: 7, clue: 'Bia adora uma boa sessão de cinema.' },
  { id: 'leo', name: 'Léo', category: 'people', x: 46, y: 14.5, width: 4, height: 7, clue: 'Léo está passeando perto da bicicleta, no alto da cidade.' },
  { id: 'nina', name: 'Nina', category: 'people', x: 65, y: 19, width: 4, height: 7, clue: 'Nina está pertinho de um arco-íris, na parte de cima.' },
  { id: 'rui', name: 'Rui', category: 'people', x: 72, y: 31, width: 4, height: 7, clue: 'Rui não sai da porta da loja de discos.' },
  { id: 'tina', name: 'Tina', category: 'people', x: 44.3, y: 41, width: 4, height: 7, clue: 'Tina está de amarelo, ao lado das barraquinhas.' },
  { id: 'caio', name: 'Caio', category: 'people', x: 34, y: 54, width: 4, height: 7, clue: 'Caio está de braços abertos, perto das flores.' },
  { id: 'luna', name: 'Luna', category: 'people', x: 66, y: 46, width: 4, height: 7, clue: 'Luna está pronta para cantar no palco.' },
  { id: 'dudu', name: 'Dudu', category: 'people', x: 83, y: 62, width: 4, height: 7, clue: 'Dudu está atravessando a ponte.' },
  { id: 'mila', name: 'Mila', category: 'people', x: 51.3, y: 83, width: 4, height: 7, clue: 'Mila foi tomar um ar perto da fonte.' },
  { id: 'zeca', name: 'Zeca', category: 'people', x: 70, y: 81.5, width: 4, height: 7, clue: 'Zeca está entre a fonte e o rio.' },
  { id: 'cinema', name: 'Cinema', category: 'places', x: 21, y: 20, width: 17, height: 17, clue: 'Procure o grande letreiro amarelo, no canto superior esquerdo.' },
  { id: 'records', name: 'Loja de discos', category: 'places', x: 83, y: 17, width: 18, height: 20, clue: 'Um disco gigante no telhado? Só pode ser ali!' },
  { id: 'cafe', name: 'Café', category: 'places', x: 28, y: 72, width: 14, height: 15, clue: 'O cheirinho de café vem da casinha rosa, perto do rio.' },
  { id: 'pingo', name: 'Pingo', category: 'animals', x: 38.5, y: 22, width: 4, height: 5, clue: 'Pingo passeia atrás do cinema, perto do poste.' },
  { id: 'mingau', name: 'Mingau', category: 'animals', x: 81.3, y: 82.5, width: 4, height: 5, clue: 'Mingau está na margem direita do rio.' },
];
export const categories = [{ id: 'people', label: 'Pessoas', subtitle: 'A turma toda está por aí', color: 'blue' }, { id: 'places', label: 'Espaços', subtitle: 'Lugares cheios de histórias', color: 'coral' }, { id: 'animals', label: 'Animais', subtitle: 'Nossos amigos de quatro patas', color: 'pink' }] as const;
export const worldImage = '/images/amiguins-town.png';
