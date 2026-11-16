import {
 WebGLRenderer,Scene,OrthographicCamera,Group,Mesh,BoxGeometry,CylinderGeometry,
 PlaneGeometry,CircleGeometry,RingGeometry,Shape,ExtrudeGeometry,InstancedMesh,Matrix4,
 MeshStandardMaterial,MeshBasicMaterial,AmbientLight,DirectionalLight,SpotLight,
 Texture,CanvasTexture,NearestFilter,SRGBColorSpace,NoToneMapping
} from 'three';

const P={pink:0xf62ca5,yellow:0xf4ff40,ink:0x161616,paper:0xfffefa};
const coord=(x,y)=>[(x-160)/45,(200-y)/45];
function pixelTexture(image){const t=new Texture(image);t.colorSpace=SRGBColorSpace;t.magFilter=NearestFilter;t.minFilter=NearestFilter;t.generateMipmaps=false;t.needsUpdate=true;return t;}
function labelTexture(text){const c=document.createElement('canvas');c.width=64;c.height=24;const x=c.getContext('2d');x.fillStyle='#161616';x.fillRect(0,0,64,24);x.fillStyle='#f4ff40';x.font='bold 15px monospace';x.textAlign='center';x.fillText(text,32,18);const t=new CanvasTexture(c);t.magFilter=t.minFilter=NearestFilter;t.generateMipmaps=false;t.colorSpace=SRGBColorSpace;return t;}
export async function createTheatre(canvas,{stageImage,onLost,reduced=false}={}){
 let gl;try{gl=canvas.getContext('webgl2',{alpha:false,antialias:false,powerPreference:'low-power'});}catch{return null;}if(!gl)return null;
 const renderer=new WebGLRenderer({canvas,context:gl,antialias:false,powerPreference:'low-power',precision:'mediump'});
 renderer.setPixelRatio(1);renderer.setSize(320,400,false);renderer.outputColorSpace=SRGBColorSpace;renderer.toneMapping=NoToneMapping;renderer.setClearColor(0xfff17b);renderer.shadowMap.enabled=false;
 const scene=new Scene(),camera=new OrthographicCamera(-160/45,160/45,200/45,-200/45,.1,40);camera.position.set(0,0,18);camera.lookAt(0,0,0);
 const matte=color=>new MeshStandardMaterial({color,roughness:.85,metalness:0});
 const ink=matte(P.ink),pink=matte(P.pink),yellow=matte(P.yellow),paper=matte(P.paper),wood=matte(0x842857);
 const simple=color=>new MeshBasicMaterial({color});
 function box(parent,w,h,d,material,x=0,y=0,z=0){const m=new Mesh(new BoxGeometry(w,h,d),material);m.position.set(x,y,z);parent.add(m);return m;}
 const backMap=pixelTexture(stageImage),back=new Mesh(new PlaneGeometry(320/45,400/45),new MeshBasicMaterial({map:backMap}));back.position.z=-1.2;scene.add(back);
 const frame=new Group();scene.add(frame);box(frame,6.85,.14,.6,ink,0,3.86,-.5);box(frame,.12,6.85,.5,pink,-3.4,.2,-.5);box(frame,.12,6.85,.5,pink,3.4,.2,-.5);box(frame,6.85,.18,.9,wood,0,-3.25,-.2);box(frame,6.7,.045,.95,yellow,0,-3.12,-.17);
 const stars=[];for(const [i,x,y] of [[0,-3.1,1.8],[1,3.1,1.5],[2,-2.85,-1.7],[3,2.95,-1.5]]){const shape=new Shape();for(let j=0;j<10;j++){const a=Math.PI/2+j*Math.PI/5,r=j%2?.19:.4;const px=Math.cos(a)*r,py=Math.sin(a)*r;if(j===0)shape.moveTo(px,py);else shape.lineTo(px,py);}shape.closePath();const star=new Mesh(new ExtrudeGeometry(shape,{depth:.1,bevelEnabled:false}),i%2?pink:yellow);star.position.set(x,y,-.3);frame.add(star);stars.push(star);}
 scene.add(new AmbientLight(P.paper,2));const key=new DirectionalLight(P.paper,2.5);key.position.set(-3,4,7);scene.add(key);
 const lights=[];for(let i=0;i<2;i++){const light=new SpotLight(i?P.pink:P.yellow,16,22,.58,.55,1);light.position.set(i?3:-3,4,5);scene.add(light,light.target);lights.push(light);box(frame,.36,.2,.35,ink,i?2.6:-2.6,3.55,0);box(frame,.24,.06,.28,yellow,i?2.6:-2.6,3.43,.14);}
 // The physics board is a single tilted group: floor, holes, bolts, podium, bumpers and puck share its transform.
 const board=new Group();scene.add(board);box(board,6.3,7.15,.18,ink,0,-.04,-.08);box(board,6.13,6.98,.1,paper,0,-.04,.04);
 const dots=new InstancedMesh(new BoxGeometry(.018,.018,.005),simple(P.pink),15*18);let dot=0;for(let y=63;y<352;y+=18)for(let x=30;x<294;x+=18){const [px,py]=coord(x,y);dots.setMatrixAt(dot++,new Matrix4().makeTranslation(px,py,.1));}dots.count=dot;board.add(dots);
 const bumpers=[];for(const [x,y,r] of [[160,187,33],[65,166,15],[255,166,15]]){const [px,py]=coord(x,y),g=new Group();g.position.set(px,py,.17);board.add(g);const base=new Mesh(new CylinderGeometry((r+2)/45,(r+3)/45,.16,16),ink);base.rotation.x=Math.PI/2;g.add(base);const cap=new Mesh(new CylinderGeometry(r/45,r/45,.18,16),yellow);cap.rotation.x=Math.PI/2;cap.position.z=.1;g.add(cap);const label=new Mesh(new PlaneGeometry(r>20?1.05:.48,r>20?.4:.18),new MeshBasicMaterial({map:labelTexture('BLA')}));label.position.z=.21;g.add(label);bumpers.push(g);}
 for(const [x,y] of [[92,245],[228,245]]){const [px,py]=coord(x,y);const rim=new Mesh(new RingGeometry(13/45,17/45,16),simple(P.pink));rim.position.set(px,py,.12);board.add(rim);const hole=new Mesh(new CircleGeometry(13/45,16),simple(P.ink));hole.position.set(px,py,.13);board.add(hole);}
 const bolts=[];for(const [x,y] of [[54,82],[266,82],[54,322],[266,322]]){const [px,py]=coord(x,y),g=new Group();g.position.set(px,py,.15);board.add(g);const cap=new Mesh(new CylinderGeometry(.25,.28,.2,8),pink);cap.rotation.x=Math.PI/2;g.add(cap);const slot=box(g,.065,.33,.035,paper,0,0,.13);slot.rotation.z=Math.PI/4;bolts.push(g);}
 const podium=new Group();podium.position.set(0,1.6,.22);board.add(podium);box(podium,1.62,.65,.48,wood);box(podium,1.86,.14,.62,pink,0,.36,.04);box(podium,.2,.65,.2,ink,-.55,-.5,0);box(podium,.2,.65,.2,ink,.55,-.5,0);
 const moi=labelTexture('MOI'),nous=labelTexture('NOUS'),podiumLabelMat=new MeshBasicMaterial({map:moi}),podiumLabel=new Mesh(new PlaneGeometry(1.32,.46),podiumLabelMat);podiumLabel.position.z=.25;podium.add(podiumLabel);
 const ball=new Group();board.add(ball);box(ball,.36,.36,.27,ink);box(ball,.29,.29,.04,pink,0,0,.16);box(ball,.19,.045,.02,paper,-.03,.08,.19);
 const trails=[];for(let i=0;i<4;i++){const trail=box(board,.13,.13,.04,new MeshBasicMaterial({color:P.pink,transparent:true,opacity:.4-i*.075,depthWrite:false}));trails.push(trail);}
 let lost=false,lastMetrics=-1,lastFreed=-1;canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;canvas.hidden=true;onLost?.();});
 // Compile once while the rules are displayed, rather than stopping the first playable frame.
 board.visible=true;await renderer.compileAsync(scene,camera);canvas.dataset.resolution='320x400';
 return {
  render(model,{time=0,state='playing',ovation=0,topple=0}={}){
   if(lost)return false;
   board.visible=model.mode===2&&state!=='finale';frame.visible=true;
   for(let i=0;i<stars.length;i++){stars[i].rotation.y=reduced?.2:Math.sin(time*1.2+i)*.45;stars[i].rotation.z=reduced?0:Math.sin(time+i)*.15;}
   for(let i=0;i<lights.length;i++){lights[i].target.position.set(reduced?0:Math.sin(time*.8+i)*2,0,0);lights[i].intensity=state==='finale'?24:ovation>0?22:14;}
   if(board.visible){board.rotation.x=model.tilt.y*.15;board.rotation.y=-model.tilt.x*.15;board.rotation.z=model.tilt.x*.035;for(let i=0;i<bolts.length;i++){bolts[i].visible=!model.bolts[i].dead;bolts[i].rotation.z=time*.5;}
    const b=model.ball,[x,y]=coord(b.x,b.y);ball.position.set(x,y,.24);ball.rotation.z=-time*Math.hypot(b.vx,b.vy)*.012;for(let i=0;i<trails.length;i++){const [tx,ty]=coord(b.x-b.vx*.018*(i+1),b.y-b.vy*.018*(i+1));trails[i].position.set(tx,ty,.16);trails[i].visible=Math.hypot(b.vx,b.vy)>45;}
    if(lastFreed!==model.falls){lastFreed=model.falls;podiumLabelMat.map=model.falls?nous:moi;podiumLabelMat.needsUpdate=true;}
    const fall=topple>0?1-topple:0;podium.rotation.z=fall*1.8;podium.position.y=1.6-fall*2;podium.visible=fall<.8;
   }
   renderer.render(scene,camera);if(Math.floor(time)!==lastMetrics){lastMetrics=Math.floor(time);canvas.dataset.drawCalls=String(renderer.info.render.calls);canvas.dataset.triangles=String(renderer.info.render.triangles);}return true;
  },
  dispose(){scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const material of Array.isArray(o.material)?o.material:[o.material]){material.map?.dispose();material.dispose();}}});renderer.dispose();}
 };
}
