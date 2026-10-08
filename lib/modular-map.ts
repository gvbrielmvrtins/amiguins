export const mapPalette = { blue: '#3774FA', coral: '#F77B5D', yellow: '#FAD846', pink: '#F889BA', cream: '#FFFEF9', ink: '#1C1C1C', gray: '#D9D9D9' } as const;

// Coordinates describe the logical ground plan; map-projection.ts converts them to the SVG artboard.
export const modularDestinations = [
  { id: 'colabin', name: 'colabIN', lines: ['colabIN'], x: 1650, y: 1400, width: 220, color: 'blue' },
  { id: 'vagao-feminino', name: 'vagão femININo', lines: ['vagão femININo'], x: 260, y: 55, width: 234, color: 'pink' },
  { id: 'livrinhoteca', name: 'livrINhoteca', lines: ['livrINhoteca'], x: 850, y: 350, width: 187, color: 'yellow' },
  { id: 'prefeintura', name: 'gabINete da prefeitura', lines: ['gabINete da', 'prefeitura'], x: 1340, y: 420, width: 300, color: 'blue' },
  { id: 'taverna-joguins', name: 'taverna dos joguINs', lines: ['taverna dos', 'joguINs'], x: 2890, y: 310, width: 300, color: 'coral' },
  { id: 'pracinha', name: 'pracINha', lines: ['pracINha'], x: 1340, y: 930, width: 280, color: 'yellow' },
  { id: 'mercado-vagas', name: 'mercadIN de vaguINhas', lines: ['mercadIN de', 'vaguINhas'], x: 850, y: 795, width: 231, color: 'coral' },
  { id: 'espacin-coloridin', name: 'cantIN coloridIN', lines: ['cantIN coloridIN'], x: -170, y: -155, width: 440, color: 'pink' },
  { id: 'cineminha', name: 'no escurIN do cINema', lines: ['no escurIN', 'do cINema'], x: 385, y: 795, width: 184, color: 'coral' },
  { id: 'linkedin', name: 'INbaixada do linkedIN', lines: ['INbaixada do', 'linkedIN'], x: 2340, y: 810, width: 260, color: 'blue' },
  { id: 'jardim-secreto', name: 'jardIN secreto', lines: ['jardIN secreto'], x: 2100, y: -500, width: 280, color: 'pink' },
  { id: 'estudio-criativins', name: 'estúdio criativIN', lines: ['estúdio criativIN'], x:750, y:1220, width: 320, color: 'yellow' },
  { id: 'silicin-valley', name: 'silicIN valley', lines: ['silicIN valley'], x: 2850, y: 1000, width: 290, color: 'blue' },
  { id: 'departamento-xerifins', name: 'departamento dos xerifINs', lines: ['departamento', 'dos xerifINs'], x:190, y:1780, width: 310, color: 'yellow' },
  { id: 'inglish-pub', name: 'INglish pub', lines: ['INglish pub'], x:750, y:2340, width: 270, color: 'coral' },
  { id: 'oficina-vendinhas', name: 'oficINa de vendINhas', lines: ['oficINa de', 'vendINhas'], x:1310, y:2340, width: 290, color: 'pink' },
  { id: 'torre-mistica', name: 'torre mINstica', lines: ['torre mINstica'], x: 1850, y: 420, width: 260, color: 'pink' },
  { id: 'plaza-hispanica', name: 'la plaza hispânica', lines: ['la plaza hispânica'], x: 1850, y: 930, width: 320, color: 'yellow' },
  { id: 'academia-marombins', name: 'gINásio dos marombINs', lines: ['gINásio dos', 'marombINs'], x:1310, y:1780, width: 290, color: 'coral' },
  { id: 'binstro', name: 'bINstrô', lines: ['bINstrô'], x:750, y:1780, width: 260, color: 'coral' },
  { id: 'paises-africanos', name: 'aeroporto', lines: ['aeroporto'], x: 2680, y: 1775, width: 320, color: 'yellow' },
] as const;

export type ModularDestination = typeof modularDestinations[number];


