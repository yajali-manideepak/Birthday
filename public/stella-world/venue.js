import * as THREE from './three.module.js';
export function createVenue(host){
const shared={},mats={};let seed=1711;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};const TAU=Math.PI*2,lerp=THREE.MathUtils.lerp;let renderer,scene,camera,cake,slice,knife,flames=[],candles=[],people=[],confetti,sparkles,targetCamera,targetLook;const look=new THREE.Vector3();let hotspots=[];
function material(color, roughness=.65, metalness=0) { const key = `${color}/${roughness}/${metalness}`; return mats[key] ??= new THREE.MeshStandardMaterial({color,roughness,metalness}); }
function sphere(r,mat,x,y,z,parent=scene,sx=1,sy=1,sz=1) { const geo = shared.sphere ??= new THREE.SphereGeometry(1,16,12); const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.scale.set(r*sx,r*sy,r*sz);m.castShadow=true;parent.add(m);return m; }
function mesh(geo,mat,x,y,z,parent=scene) { const m = new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m; }
function cylinder(rt,rb,h,mat,x,y,z,parent=scene,segments=48) { return mesh(new THREE.CylinderGeometry(rt,rb,h,segments),mat,x,y,z,parent); }
function box(w,h,d,mat,x,y,z,parent=scene) { return mesh(new THREE.BoxGeometry(w,h,d),mat,x,y,z,parent); }
function tube(points,r,mat,parent=scene,closed=false) { const curve = new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),closed); return mesh(new THREE.TubeGeometry(curve,Math.max(24,points.length*4),r,6,closed),mat,0,0,0,parent); }
function ring(r,t,mat,x,y,z,parent=scene) { const m=mesh(new THREE.TorusGeometry(r,t,8,80),mat,x,y,z,parent);m.rotation.x=Math.PI/2;return m; }
function textPlane(text,w,h,x,y,z,opts={}) { const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d');ctx.fillStyle=opts.color || '#ead2a7';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${opts.italic?'italic ':''}${opts.size||112}px Georgia`;const lines=text.split('\n');lines.forEach((line,i)=>ctx.fillText(line,512,256+(i-(lines.length-1)/2)*(opts.leading||125)));const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:THREE.DoubleSide}));m.position.set(x,y,z);(opts.parent||scene).add(m);return m; }
function arch(x,y,z,w,h,mat,r=.045) { const points = [[x-w/2,y,z],[x-w/2,y+h-w/2,z]];for(let i=0;i<=28;i++){const a=Math.PI-i/28*Math.PI;points.push([x+Math.cos(a)*w/2,y+h-w/2+Math.sin(a)*w/2,z]);}points.push([x+w/2,y,z]);return tube(points,r,mat); }
function flower(x,y,z,scale=1,parent=scene,col='#d8a6ad') { const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(scale);parent.add(g);const petal=material(col,.9);for(let i=0;i<7;i++){const a=i/7*TAU;const p=sphere(.12,petal,Math.cos(a)*.10,Math.sin(a)*.10,0,g,1.1,.7,.6);p.rotation.z=a;}sphere(.075,material('#ead3ad'),0,0,.055,g);return g; }
function bouquet(x,y,z,s=1) { const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(s);scene.add(g);for(let i=0;i<17;i++){const a=i*2.399;const r=.18+Math.sqrt(i/17)*.33;const fx=Math.cos(a)*r,fy=Math.sin(a)*r;flower(fx,fy,rand()*.18,.7+rand()*.5,g,i%3?'#d6adb0':'#e8d8bd');if(i%3===0){const leaf=sphere(.18,material('#5a6551'),fx*1.2,fy*1.25,-.1,g,.45,1.7,.3);leaf.rotation.z=-a;}}return g; }
function balloonCluster(x,y,z,scale=1) { const colors=['#d5b1a9','#ba8595','#eddbc6','#b69a68'];for(let i=0;i<9;i++){const a=i*2.39;const xx=x+Math.cos(a)*(.25+i*.035)*scale, yy=y+Math.sin(a)*(.35+i*.045)*scale;const b=sphere(.28*scale,material(colors[i%4],.3,.18),xx,yy,z+(rand()-.5)*.3,scene,1,1.2,1);b.userData.balloon=true;const knot=cylinder(.018*scale,.035*scale,.05*scale,material(colors[i%4]),xx,yy-.34*scale,z);tube([[xx,yy-.35*scale,z],[xx-.05,yy-.7*scale,z],[x,y-1.3*scale,z]],.003,material('#e4d0b0'));} }
function chandelier(x,y,z,s=1) { const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(s);scene.add(g);const gold=material('#c6a271',.28,.72);cylinder(.015,.015,2,gold,0,1.25,0,g);ring(.58,.025,gold,0,0,0,g);ring(.3,.02,gold,0,.38,0,g);for(let i=0;i<10;i++){const a=i/10*TAU;const xx=Math.cos(a)*.58,zz=Math.sin(a)*.58;tube([[0,.65,0],[xx,.2,zz],[xx,.05,zz]],.018,gold,g);cylinder(.025,.025,.17,material('#f3dcc0'),xx,.12,zz,g,8);sphere(.05,new THREE.MeshBasicMaterial({color:'#ffce88'}),xx,.25,zz,g,1,1.6,1);for(let j=0;j<3;j++)sphere(.027,material('#f2d6ae',.1,.2),xx,-.07-j*.09,zz,g,1,1.5,1);}const l=new THREE.PointLight('#ffca8d',11,9,2);l.position.set(0,-.3,0);g.add(l); }
function curtain(x,z,width,height,color) { const geo=new THREE.PlaneGeometry(width,height,80,16);const a=geo.attributes.position;for(let i=0;i<a.count;i++){const xx=a.getX(i), yy=a.getY(i);a.setZ(i,Math.sin(xx*9)*.095+Math.sin(xx*18)*.018+(yy/height)*.04);}geo.computeVertexNormals();const m=mesh(geo,material(color,.95),x,height/2,z);m.material.side=THREE.DoubleSide;return m; }
function character(x,z,dress,color,scale=1,angle=0){const g=new THREE.Group();g.position.set(x,.18,z);g.rotation.y=angle;g.userData={female:dress,name:people.length===0?'Stella':people.length===1?'Deepak':'Friend',homeX:x,homeZ:z,phase:rand()*TAU,ready:false};scene.add(g);people.push(g);return g;}
function cakeWedge(r,h,a,b,mat,parent,y) { const shape=new THREE.Shape();shape.moveTo(0,0);const count=Math.ceil((b-a)*20);for(let i=0;i<=count;i++){const t=lerp(a,b,i/count);shape.lineTo(Math.sin(t)*r,-Math.cos(t)*r);}shape.lineTo(0,0);const geo=new THREE.ExtrudeGeometry(shape,{depth:h,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.007,bevelThickness:.007,curveSegments:24});geo.rotateX(-Math.PI/2);return mesh(geo,mat,0,y,0,parent); }
function buildCake() { cake=new THREE.Group();cake.position.set(2,1.16,.55);cake.scale.setScalar(.65);scene.add(cake);const ivory=material('#f0deca',.82),blush=material('#dcacb1',.85),gold=material('#c9a36a',.32,.65);cylinder(1.35,1.35,.07,gold,0,.02,0,cake);cylinder(1.28,1.28,.05,ivory,0,.07,0,cake);
  slice=new THREE.Group();cake.add(slice);const a=-.08,b=.48;const layers=[['#d9b28c',.14],['#f4e5d2',.065],['#d9b28c',.13],['#ca8e99',.065],['#e6c0a1',.13],['#f0deca',.06]];let y=.1;
  for(const [c,h] of layers){cakeWedge(1.14,h,b,a+TAU,material(c,.9),cake,y);cakeWedge(1.14,h,a,b,material(c,.9),slice,y);y+=h;}
  const icing = new THREE.Mesh(new THREE.CylinderGeometry(1.151,1.151,y-.13,96,1,true,b,TAU-(b-a)),ivory);icing.position.y=(y+.1)/2;cake.add(icing);const icingSlice=new THREE.Mesh(new THREE.CylinderGeometry(1.151,1.151,y-.13,20,1,true,a,b-a),ivory);icingSlice.position.y=icing.position.y;slice.add(icingSlice);
  cylinder(.84,.84,.48,blush,0,.95,0,cake);cylinder(.855,.855,.055,ivory,0,1.215,0,cake);cylinder(.55,.55,.4,ivory,0,1.43,0,cake);cylinder(.56,.56,.04,ivory,0,1.65,0,cake);
  for(const [r,yy,count,col] of [[1.15,.15,70,'#f0deca'],[1.13,.68,64,'#eddbcb'],[.84,.74,50,'#f1dccc'],[.84,1.2,48,'#f1dccc'],[.55,1.25,34,'#d6a9a9'],[.55,1.65,34,'#f1dccc']])for(let i=0;i<count;i++){const a=i/count*TAU;let parent=cake;if(r>1 && (a>=TAU-.08||a<=.48))parent=slice;sphere(.035,material(col),Math.sin(a)*r,yy,Math.cos(a)*r,parent,1,1.1,1);}
  for(let i=0;i<36;i++){const a=i/36*TAU;sphere(.018,gold,Math.sin(a)*.853,.96+Math.sin(a*6)*.085,Math.cos(a)*.853,cake);}
  for(const [x,y,z,s] of [[-.65,.78,.7,.8],[-.78,.8,.45,.7],[-.55,1.2,.52,.7],[.32,1.68,-.2,.75],[.1,1.68,-.33,.65],[-.1,1.68,-.32,.65]]){const f=flower(x,y,z,s,cake,'#d7a0aa');f.rotation.x=-Math.PI/3;}
  const message=textPlane('Happy Birthday\nStella',1.2,.6,0,1.255,.53,{size:105,leading:115,color:'#8d5b61',italic:true,parent:cake});message.rotation.x=-Math.PI*.37;
  for(let i=0;i<5;i++){const a=lerp(-1.1,1.1,i/4);const x=Math.sin(a)*.36,z=Math.cos(a)*.26;const c=new THREE.Group();c.position.set(x,1.66,z);cake.add(c);cylinder(.018,.018,.26,material(i%2?'#cea272':'#e4b3bc'),0,.13,0,c,12);cylinder(.004,.004,.035,material('#4b3630'),0,.276,0,c,6);const flame=sphere(.037,new THREE.MeshBasicMaterial({color:'#ffcf79'}),0,.325,0,c,.7,1.8,.7);flames.push(flame);const light=new THREE.PointLight('#ffc079',.42,1.8,2);light.position.y=.32;c.add(light);candles.push(light);}
  knife=new THREE.Group();knife.position.set(3.2,1.2,1.05);scene.add(knife);const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(.79,0);shape.quadraticCurveTo(.86,.05,.72,.12);shape.lineTo(0,.12);shape.closePath();const bladeGeo=new THREE.ExtrudeGeometry(shape,{depth:.018,bevelEnabled:true,bevelSize:.005,bevelThickness:.005,bevelSegments:1,steps:1});const blade=mesh(bladeGeo,material('#dbd6ca',.16,.95),0,0,0,knife);blade.rotation.x=-Math.PI/2;box(.35,.055,.10,material('#785349',.45),-.18,0,-.05,knife);for(let i=0;i<2;i++)sphere(.015,gold,-.1-i*.15,.033,-.05,knife,1,.3,1);knife.rotation.y=.35;
  const plate=cylinder(.39,.35,.035,ivory,3.25,1.18,.2);ring(.32,.012,gold,3.25,1.204,.2);slice.userData.plate=plate;
}
function buildScene() { scene=new THREE.Scene();scene.background=new THREE.Color('#34222b');scene.fog=new THREE.FogExp2('#35232c',.022);camera=new THREE.PerspectiveCamera(64,1,.08,65);camera.position.set(9.7,5.2,13.8);look.set(0,2.3,-.3);camera.lookAt(look);targetCamera=camera.position.clone();targetLook=look.clone();
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight('#f8dec3','#47303d',2.3));const spot=new THREE.SpotLight('#ffe4b7',100,25,Math.PI/5,.7,1.5);spot.position.set(5,8,5);spot.target.position.set(2,1.5,0);spot.castShadow=true;spot.shadow.mapSize.set(1024,1024);spot.shadow.bias=-.0004;scene.add(spot,spot.target);const rim=new THREE.DirectionalLight('#d393a5',2.3);rim.position.set(-3,5,-5);scene.add(rim);
  const floor=box(28,.1,28,material('#6d5352',.38,.15),0,-.08,0);for(let i=-6;i<=7;i++){box(.012,.005,24,material('#a7856c',.5,.45),i*1.7,-.024,0);box(24,.005,.012,material('#a7856c',.5,.45),0,-.024,i*1.7);}
  box(25,9,.25,material('#5e3d49'),0,4.5,-5);box(.25,9,21,material('#4b333e'),11,4.5,4);for(let i=-4;i<=4;i++){arch(i*2.8,.2,-4.82,2.2,6.8,material('#b08d69',.3,.55),.025);curtain(i*2.8,-4.75,2.1,6.6,i%2?'#795762':'#88636a');}
  const stage=cylinder(5,5,.16,material('#8b646b',.7),2,.08,-.5);ring(4.98,.025,material('#c3a076',.25,.55),2,.17,-.5);
  arch(2,.2,-3.55,5.9,5.6,material('#c5a47c',.3,.65),.045);arch(2,.2,-3.52,5.55,5.4,material('#c5a47c',.3,.65),.015);curtain(2,-3.65,4.6,5.2,'#9c747b');
  textPlane('a little older, a little lovelier',3.9,.7,2,4.51,-3.39,{size:57,italic:true});textPlane('Stella',3.8,1.35,2,3.76,-3.35,{size:205,italic:true,color:'#f4dec2'});textPlane('THIRTIETH OF DECEMBER',3.4,.5,2,2.99,-3.33,{size:46,color:'#dcc4aa'});
  for(let i=0;i<13;i++){const a=i/12*Math.PI;const x=2+Math.cos(a)*2.9,y=2.7+Math.sin(a)*2.8;if(i<4||i>9)bouquet(x,y,-3.32,.5+rand()*.3);}bouquet(-.88,.7,-3.2,1.6);bouquet(4.88,.7,-3.2,1.6);balloonCluster(-.95,2.6,-3.1,1.35);balloonCluster(5.1,3,-3.2,1.45);
  chandelier(2,6,-.3,1.2);chandelier(-4.5,6,-3,.85);chandelier(7.6,6.4,-3.2,.85);
  for(let row=0;row<3;row++){const points=[];for(let i=0;i<=24;i++){const x=-7+i*16/24,y=6.8-Math.sin(i/24*Math.PI)*(.9+row*.18);points.push([x,y,-1.6-row*1.4]);if(i%2===0)sphere(.027,new THREE.MeshBasicMaterial({color:'#ffd9a1'}),x,y,-1.6-row*1.4);}tube(points,.008,material('#ab8c69'));}
  const table=new THREE.Group();table.position.set(2,.12,.55);table.scale.y=.75;scene.add(table);cylinder(1.74,1.74,.12,material('#b7926f',.3,.5),0,1.27,0,table);const clothGeo=new THREE.CylinderGeometry(1.74,1.82,1.25,96,12,true);const p=clothGeo.attributes.position;for(let i=0;i<p.count;i++){const a=Math.atan2(p.getX(i),p.getZ(i)),r=1+Math.sin(a*28)*.018;p.setX(i,p.getX(i)*r);p.setZ(i,p.getZ(i)*r);}clothGeo.computeVertexNormals();mesh(clothGeo,material('#d1b6ac',.95),0,.625,0,table);cylinder(1.73,1.73,.03,material('#e1ccba',.75),0,1.35,0,table);ring(1.8,.012,material('#bd9772',.3,.65),0,.07,0,table);
  buildCake();const stellaChar=character(-.15,-.55,true,'#a5526b',1.12,.18);stellaChar.userData.name='Stella';const deepakChar=character(4.1,-.55,false,'#c5b49d',1.13,-.18);deepakChar.userData.name='Deepak';character(-1.4,-1.9,true,'#9b8c9e',.96,.35);character(5.6,-1.8,false,'#4e465b',1.04,-.45);
  for(const [x,z] of [[7.7,.9],[-3.8,-.5],[8,-4]]){cylinder(.8,.8,.08,material('#d5bcb0'),x,1.05,z);cylinder(.1,.2,1,material('#ae8d67',.3,.6),x,.5,z);cylinder(.15,.15,.25,material('#bc9974',.25,.5),x,1.2,z);bouquet(x,1.5,z,.55);for(let i=0;i<3;i++){const a=i/3*TAU;const xx=x+Math.cos(a)*1.15,zz=z+Math.sin(a)*1.15;box(.45,.08,.45,material('#a98684'),xx,.5,zz);box(.45,.55,.08,material('#a98684'),xx,.82,zz-.2);for(const side of [-1,1])cylinder(.018,.018,.5,material('#b6966e',.3,.7),xx+side*.18,.24,zz);}}
  const positions=new Float32Array(120*3);for(let i=0;i<120;i++){positions[i*3]=rand()*20-8;positions[i*3+1]=rand()*7+.2;positions[i*3+2]=rand()*12-6;}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));sparkles=new THREE.Points(geo,new THREE.PointsMaterial({color:'#f3d3ac',size:.024,transparent:true,opacity:.65,depthWrite:false}));scene.add(sparkles);
  confetti=new THREE.Group();confetti.visible=false;scene.add(confetti);const colors=['#d6a5ae','#d6b577','#ede0c8','#b5798b'];for(let i=0;i<110;i++){const p=mesh(new THREE.PlaneGeometry(.045,.085),new THREE.MeshStandardMaterial({color:colors[i%4],side:THREE.DoubleSide}),0,0,0,confetti);p.userData={x:rand()*9-2.5,y:rand()*7+4,z:rand()*5-2,speed:.7+rand(),rot:rand()*6};}
  textPlane('Stella',1.3,.58,-.15,2.22,-.53,{size:230,italic:true,color:'#f1d0b3'});textPlane('Deepak',1.3,.58,4.1,2.31,-.53,{size:230,italic:true,color:'#f1d0b3'});buildExploration();batchStaticDetails();
}
function batchStaticDetails(){
  scene.updateMatrixWorld(true);
  const dynamic=new Set([...people,slice,...flames]);
  const batches=new Map();const originals=[];
  scene.traverse(o=>{if(!o.isMesh||o.geometry!==shared.sphere)return;let parent=o;while(parent){if(dynamic.has(parent))return;parent=parent.parent;}const key=o.material.uuid;const batch=batches.get(key)||{material:o.material,matrices:[]};batch.matrices.push(o.matrixWorld.clone());batches.set(key,batch);originals.push(o);});
  originals.forEach(o=>o.removeFromParent());
  for(const {material,matrices} of batches.values()){const instanced=new THREE.InstancedMesh(shared.sphere,material,matrices.length);matrices.forEach((m,i)=>instanced.setMatrixAt(i,m));instanced.castShadow=true;instanced.receiveShadow=true;instanced.computeBoundingSphere();scene.add(instanced);}
}
function buildExploration(){
  const gold=material('#b89564',.3,.65),wall=material('#5e3d49'),cream=material('#e6d8c4',.9);
  box(.22,7.8,17,wall,-9,3.9,3.5);box(9,.22,1,wall,-4.5,7.8,11.9);box(6.8,7.8,.22,wall,-5.6,3.9,12);box(7,7.8,.22,wall,7.5,3.9,12);box(4,4.5,.22,wall,2,5.55,12);box(20,.15,17,material('#3f2c37'),1,7.8,3.5);
  arch(2,0,11.85,3.3,3.5,gold,.04);box(2.2,.015,8.4,material('#9d6b76',.95),2,.015,6.7);for(const x of [.88,3.12])box(.025,.022,8.4,gold,x,.015,6.7);
  const memory=new THREE.Group();memory.position.set(-8.75,2.1,.6);memory.rotation.y=Math.PI/2;scene.add(memory);
  const texLoader=new THREE.TextureLoader();
  const memoryPhotos=[
    {src:'/assets/photos/stella-hero.jpg',title:'Serenity on the Water',subtitle:'Radiant Smile & Pure Grace'},
    {src:'/assets/photos/stella-car-memory.jpg',title:'Cinematic Elegance',subtitle:'Timeless Black & White Memories'},
    {src:'/assets/photos/memory-party.jpg',title:'Night of Lights',subtitle:'Golden Moments & Smiles'}
  ];
  for(let i=0;i<3;i++){
    box(1.45,1.9,.08,gold,(i-1)*1.7,0,0,memory);
    box(1.32,1.76,.02,cream,(i-1)*1.7,0,.045,memory);
    const photoMat=new THREE.MeshBasicMaterial({color:0xffffff});
    texLoader.load(memoryPhotos[i].src,tex=>{
      tex.colorSpace=THREE.SRGBColorSpace;
      photoMat.map=tex;
      photoMat.needsUpdate=true;
    });
    const photoMesh=new THREE.Mesh(new THREE.PlaneGeometry(1.24,1.68),photoMat);
    photoMesh.position.set((i-1)*1.7,0,.06);
    photoMesh.userData={isPhotoMesh:true,photoIndex:i};
    memory.add(photoMesh);
  }
  const photoZ=[-1.1,0.6,2.3]; // For i=2,1,0
  hotspots.push({id:'photo-0',label:'View Photo 01: Serenity on the Water 📸',position:new THREE.Vector3(-7.2,1.8,2.3),radius:1.55,type:'photo-memory',index:0});
  hotspots.push({id:'photo-1',label:'View Photo 02: Cinematic Elegance 📸',position:new THREE.Vector3(-7.2,1.8,0.6),radius:1.55,type:'photo-memory',index:1});
  hotspots.push({id:'photo-2',label:'View Photo 03: Night of Lights 📸',position:new THREE.Vector3(-7.2,1.8,-1.1),radius:1.55,type:'photo-memory',index:2});
  textPlane('DIGITAL PHOTO ALBUM',3,.5,-8.65,3.45,.6,{size:63,color:'#e5c6a3'}).rotation.y=Math.PI/2;
  textPlane('01 · SERENITY',1.2,.22,-8.65,1.05,2.3,{size:42,color:'#e5c6a3'}).rotation.y=Math.PI/2;
  textPlane('02 · ELEGANCE',1.2,.22,-8.65,1.05,0.6,{size:42,color:'#e5c6a3'}).rotation.y=Math.PI/2;
  textPlane('03 · LIGHTS',1.2,.22,-8.65,1.05,-1.1,{size:42,color:'#e5c6a3'}).rotation.y=Math.PI/2;
  for(let i=0;i<3;i++){const x=-6.4+i*1.2,z=5.2;box(.86,.65,.86,material(['#b77d8c','#dbb89a','#9d8e9c'][i],.55),x,.55,z);box(.9,.10,.9,gold,x,.92,z);box(.1,.67,.88,gold,x,.55,z);box(.88,.67,.1,gold,x,.55,z);const a=ring(.14,.025,gold,x-.12,1,z);a.rotation.x=.3;const b=ring(.14,.025,gold,x+.12,1,z);b.rotation.x=-.3;hotspots.push({id:['luxury','promise','future'][i],type:'gift',label:['Open Gift 01: Best Friend Charm Bracelet 🎀','Open Gift 02: Rose Velvet Nail Polish 💅','Open Gift 03: Intricate Mehendi Artistry 🌿'][i],position:new THREE.Vector3(x,1,z),radius:1.75});}
  textPlane('A PROMISE KEPT FOR STELLA 🎁',3.7,.6,-5.2,2.2,4.8,{size:64,italic:true});
  box(1.1,.85,.7,material('#63483e'),7,.46,5.3);box(1.16,.07,.76,gold,7,.93,5.3);cylinder(.27,.27,.025,material('#242027',.2),7,.99,5.3);ring(.1,.008,gold,7,1.01,5.3);tube([[7.45,1,5.5],[7.45,1.1,5.35],[7.16,1.1,5.35]],.016,gold);textPlane('THE LITTLE PLAYLIST',2.8,.5,7,2.1,4.9,{size:62,italic:true});hotspots.push({id:'music',type:'music',label:'Play a little music',position:new THREE.Vector3(7,1.2,5.3),radius:2.1});
  const book=box(.65,.09,.48,material('#ad7a83'),2,1.04,10.45);book.rotation.y=.3;cylinder(.43,.54,.9,material('#b99e87'),2,.5,10.45);textPlane('STELLA’S WORLD\nThe next little chapter',2.8,.95,2,2.35,11.7,{size:96,italic:true});hotspots.push({id:'world',type:'world',label:'Open Stella’s world',position:new THREE.Vector3(2,1.6,10.4),radius:2.1});
  for(const [x,z] of [[-7.3,8.6],[7.9,9.2],[-7.4,-3.7]]){cylinder(.5,.37,.6,material('#b69b82'),x,.3,z);cylinder(.065,.13,1.6,material('#6c5543'),x,1.2,z);for(let i=0;i<5;i++)sphere(.55,material('#54614a',.95),x+Math.cos(i*2.4)*.3,1.95+i*.1,z+Math.sin(i*2.4)*.3,scene,1,1.25,1);}
  for(const x of [-7.8,8.6])for(const z of [1,5,9]){cylinder(.18,.2,.12,gold,x,.07,z);cylinder(.015,.015,1.2,gold,x,.66,z);sphere(.12,new THREE.MeshBasicMaterial({color:'#ffe3af'}),x,1.35,z);const l=new THREE.PointLight('#ffd3a0',1.5,4,2);l.position.set(x,1.35,z);scene.add(l);}
}

buildScene();return {scene,camera,renderer,cake,slice,knife,flames,candles,people,confetti,sparkles,hotspots};
}
