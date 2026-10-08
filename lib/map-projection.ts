// Logical ground coordinates are independent of the SVG viewport.
// Equal ground axes at ±30°; vertical buildings remain vertical.
export const groundTransform = 'matrix(0.5196152423 0.3 -0.5196152423 0.3 1080 220)';
export const buildingScale = 0.75;

// Rectify an already illustrated upright object, NOT a flat ground tile.
// Source slopes are measured on straight architectural edges (screen y down).
// x' = a*x, y' = b*x + d*y: verticals stay vertical and (0, 0) stays anchored.
// Preserve area to distribute the correction between width and height.
export function uprightProjection(risingSlope: number, fallingSlope: number) {
  const a = Math.sqrt((fallingSlope - risingSlope) / (2 * Math.tan(Math.PI / 6)));
  const d = 1 / a;
  const b = -d * (fallingSlope + risingSlope) / 2;
  return {
    transform: `matrix(${a} ${b} 0 ${d} 0 0)`,
    project: (x: number, y: number) => ({ x: a * x, y: b * x + d * y }),
  };
}
export function projectGround(x: number, y: number) {
  return { x: Number((1080 + (x - y) * 0.5196152423).toFixed(6)), y: Number((220 + (x + y) * 0.3).toFixed(6)) };
}
