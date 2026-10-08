import {projectGround} from '@/lib/map-projection';
import {MovableMapElement} from './map-layout-editor';

const cars = [
  {id:'car-hatch',file:'hatch',x:600,width:56,height:42},
  {id:'car-sedan',file:'sedan',x:900,width:62,height:42},
  {id:'car-suv',file:'suv',x:1200,width:60,height:45},
  {id:'car-pickup',file:'picape',x:1750,width:64,height:48},
];

export default function MapCars(){
  return <g data-layer="cars">
    {cars.map(car=>{
      const at=projectGround(car.x,1500);
      return <MovableMapElement key={car.id} id={car.id}>
        <image href={`/images/modular/carro-${car.file}-v01.png`}
          x={at.x-car.width/2} y={at.y-car.height*.72}
          width={car.width} height={car.height} pointerEvents="none"/>
      </MovableMapElement>;
    })}
  </g>;
}
