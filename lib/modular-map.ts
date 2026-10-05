export const mapPalette = { blue: '#3774FA', coral: '#F77B5D', yellow: '#FAD846', pink: '#F889BA', cream: '#FFFEF9', ink: '#1C1C1C', gray: '#D9D9D9' } as const;

// Coordinates describe the logical ground plan; map-projection.ts converts them to the SVG artboard.
export const modularDestinations = [
  { id: 'vagao-feminino', name: 'Vagão feminINo', lines: ['Vagão feminINo'], x: 385, y: 350, width: 234, color: 'pink' },
  { id: 'livrinhoteca', name: 'LivrINhoteca', lines: ['LivrINhoteca'], x: 850, y: 350, width: 187, color: 'yellow' },
  { id: 'prefeintura', name: 'PrefeINtura', lines: ['PrefeINtura'], x: 1340, y: 420, width: 300, color: 'blue' },
  { id: 'taverna-joguins', name: 'Taverna dos joguINs', lines: ['Taverna dos', 'joguINs'], x: 2340, y: 300, width: 300, color: 'coral' },
  { id: 'pracinha', name: 'PracINha', lines: ['PracINha'], x: 1340, y: 930, width: 280, color: 'yellow' },
  { id: 'mercado-vagas', name: 'Mercado de vagas', lines: ['Mercado de vagas'], x: 850, y: 795, width: 231, color: 'coral' },
  { id: 'espacin-coloridin', name: 'EspacIN ColoridIN', lines: ['EspacIN ColoridIN'], x: 190, y: 1220, width: 320, color: 'pink' },
  { id: 'cineminha', name: 'CinemINha', lines: ['CinemINha'], x: 385, y: 795, width: 184, color: 'coral' },
  { id: 'linkedin', name: 'LinkedIn', lines: ['LinkedIn'], x: 2340, y: 810, width: 260, color: 'blue' },
  { id: 'jardim-secreto', name: 'Jardim secreto', lines: ['Jardim secreto'], x: 2800, y: 360, width: 280, color: 'pink' },
  { id: 'estudio-criativins', name: 'Estúdio criativINs', lines: ['Estúdio criativINs'], x:750, y:1220, width: 320, color: 'yellow' },
  { id: 'silicin-valley', name: 'SilicIN Valley', lines: ['SilicIN Valley'], x: 2850, y: 1000, width: 290, color: 'blue' },
  { id: 'departamento-xerifins', name: 'Departamento dos xerifINs', lines: ['Departamento', 'dos xerifINs'], x:190, y:1780, width: 310, color: 'yellow' },
  { id: 'inglish-pub', name: 'INglish pub', lines: ['INglish pub'], x:750, y:2340, width: 270, color: 'coral' },
  { id: 'oficina-vendinhas', name: 'Oficina de vendinhas', lines: ['Oficina de', 'vendinhas'], x:1310, y:2340, width: 290, color: 'pink' },
  { id: 'torre-mistica', name: 'Torre MÍNstica', lines: ['Torre MÍNstica'], x: 1850, y: 420, width: 260, color: 'pink' },
  { id: 'plaza-hispanica', name: 'Plaza hispanica', lines: ['Plaza hispanica'], x: 1850, y: 930, width: 320, color: 'yellow' },
  { id: 'academia-marombins', name: 'Academia marombINs', lines: ['Academia', 'marombINs'], x:1310, y:1780, width: 290, color: 'coral' },
  { id: 'binstro', name: 'BINstrô', lines: ['BINstrô'], x:750, y:1780, width: 260, color: 'coral' },
  { id: 'paises-africanos', name: 'Países africanos', lines: ['Países africanos'], x: 2680, y: 1775, width: 320, color: 'yellow' },
] as const;

export type ModularDestination = typeof modularDestinations[number];


