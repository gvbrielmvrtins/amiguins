// Reuse one immutable illustration in every frame; animate only a cropped water drop.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require(require.resolve('sharp', {paths: [require.resolve('next')]}));
(async () => {
  const root = path.resolve(__dirname, '..');
  const sheet = path.join(root, 'output/imagegen/mariah-carey-descongelando-spritesheet-v01.png');
  const quantized = await sharp(sheet).extract({left:0, top:0, width:512, height:768}).gif({colours:128,dither:0}).toBuffer();
  const base = await sharp(quantized).ensureAlpha().raw().toBuffer();
  // Select the existing illustrated droplet, without generating another character frame.
  const mask = Buffer.from('<svg width="22" height="38"><path fill="white" d="M12 2 C11 10 3 17 3 25 C3 36 20 36 20 25 C20 17 14 10 12 2Z"/></svg>');
  const dropPixels = await sharp(base,{raw:{width:512,height:768,channels:4}}).extract({left:105,top:90,width:22,height:38}).composite([{input:mask,blend:'dest-in'}]).raw().toBuffer();
  for(let i=3;i<dropPixels.length;i+=4) dropPixels[i]=dropPixels[i]>=128?255:0;
  const drop = await sharp(dropPixels,{raw:{width:22,height:38,channels:4}}).png().toBuffer();
  const frames = [];
  for (let i=0;i<16;i++) {
    const top = 175 + i*27;
    const frame = await sharp(base,{raw:{width:512,height:768,channels:4}})
      .composite([{input:drop,left:86,top}]).raw().toBuffer();
    // Mariah and the entire ice block must remain byte-for-byte stationary.
    for(let y=0;y<768;y++) {
      const a=(y*512+128)*4, b=(y*512+512)*4;
      if(!frame.subarray(a,b).equals(base.subarray(a,b))) throw Error('Stationary region changed');
    }
    frames.push(frame);
  }
  const prefix=path.join(root,'public/images/modular/mariah-carey-descongelando-v02');
  await sharp(Buffer.concat(frames),{raw:{width:512,height:768*frames.length,channels:4,pageHeight:768}})
    .gif({loop:0,delay:100,colours:256,dither:0}).toFile(prefix+'.gif');
  await sharp(base,{raw:{width:512,height:768,channels:4}}).webp({quality:90}).toFile(prefix+'-estatica.webp');
  const decoded=await sharp(prefix+'.gif',{animated:true}).raw().toBuffer();
  const stride=512*768*4;
  for(let i=1;i<frames.length;i++) for(let y=0;y<768;y++) {
    const a=(y*512+128)*4,b=(y*512+512)*4;
    if(!decoded.subarray(a,b).equals(decoded.subarray(i*stride+a,i*stride+b))) throw Error('GIF stationary region changed');
  }
  console.log('16 frames; fixed character and ice verified before and after GIF encoding.');
})();
