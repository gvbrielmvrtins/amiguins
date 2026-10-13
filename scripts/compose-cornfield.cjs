const fs=require('fs'),path=require('path');
const offsets=require('../lib/map-layout-offsets.json');
const root=path.resolve(__dirname,'..');
const entries=[];
for(let i=0;i<29;i++){const row=i<13?0:1,j=row?i-13:i,w=[86,94,81,91,88][j%5],h=+(w*1185/1186).toFixed(2),x=(row?390:352)+[-8,5,-2,9,-5,3,-7][j%7],y=(row?680:708)+j*(row?59:69),id=`pamonha-cornfield-${i}`;
for(const [key,o]of [[id,offsets[id]||{}],...Object.entries(offsets).filter(([,o])=>o.sourceId===id)]){if(o.hidden)continue;const cx=x+w/2,cy=y+h/2,s=o.scale??1,a=(o.rotation??0)*Math.PI/180,pts=[[x,y],[x+w,y],[x,y+h],[x+w,y+h]].map(([px,py])=>[cx+(o.x||0)+s*((px-cx)*Math.cos(a)-(py-cy)*Math.sin(a)),cy+(o.y||0)+s*((px-cx)*Math.sin(a)+(py-cy)*Math.cos(a))]);entries.push({id:key,x,y,w,h,layer:o.layer||0,block:y+(o.y||0)<930?0:y+(o.y||0)<1250?1:2,transform:`translate(${o.x||0} ${o.y||0}) translate(${cx} ${cy}) rotate(${o.rotation||0}) scale(${s}) translate(${-cx} ${-cy})`,pts});}}
const data=fs.readFileSync(path.join(root,'public/images/modular/milharal-pamonhas-v01.webp')).toString('base64'),blocks=[];
for(let block=0;block<3;block++){const list=entries.filter(e=>e.block===block),xs=list.flatMap(e=>e.pts.map(p=>p[0])),ys=list.flatMap(e=>e.pts.map(p=>p[1])),x=Math.floor(Math.min(...xs)),y=Math.floor(Math.min(...ys)),w=Math.ceil(Math.max(...xs))-x,h=Math.ceil(Math.max(...ys))-y,layers=[...new Set(list.map(e=>e.layer))];
const groups=layers.map(layer=>`<g id="layer-${layer}">${list.filter(e=>e.layer===layer).map(e=>`<g transform="${e.transform}"><use href="#corn-art" transform="translate(${e.x} ${e.y}) scale(${e.w/1186} ${e.h/1185})"/></g>`).join('')}</g>`).join('');
const file=`/images/modular/pamonhal-bloco-${block+1}-v01.svg`;
fs.writeFileSync(root+'/public'+file,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}"><defs><image id="corn-art" width="1186" height="1185" href="data:image/webp;base64,${data}"/></defs>${groups}</svg>`);blocks.push({id:`pamonhal-bloco-${block+1}`,file,layers,x,y,width:w,height:h,sourceIds:list.map(e=>e.id)});}
fs.writeFileSync(root+'/lib/cornfield-composite.json',JSON.stringify(blocks,null,2)+'\n');console.log(blocks.map(b=>({id:b.id,layers:b.layers,count:b.sourceIds.length})));
