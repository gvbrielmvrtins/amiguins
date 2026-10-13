export default function NorthMountain(){return <g data-layer="north-mountain" pointerEvents="none" aria-label="Montanha com letreiro AMIGUINLÂNDIA">
  <image href="/images/modular/montanha-letreiro-integrado-v02.webp" x="1330" y="-230" width="1700" height="642.82"/>
</g>;}

export function NorthMountainGround(){return <g pointerEvents="none">
  <defs>
    <pattern id="mountain-back-grass" x="2300" y="-700" width="1100" height="412.5" patternUnits="userSpaceOnUse">
      <image href="/images/modular/montanha-chao-organico-v01.webp" width="1100" height="412.5" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
  </defs>
  <path d="M2300-700H3400V140L2600 100L2300-70Z" fill="url(#mountain-back-grass)" aria-label="Chão verde texturizado atrás da montanha"/>
</g>;}
