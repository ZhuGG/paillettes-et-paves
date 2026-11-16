// Rendering-independent rules. Coordinates are in a fixed 320 × 400 pixel stage.
export const W=320,H=400,DURATION=25;
export const MODES=[
 {name:'RETOUR DE BÂTON',gesture:'↔ ↕',control:'TIRE LES FICELLES',explanation:'Renvoie les « BLA » dans les porte-voix.',detail:'Gauche / droite : déplace-la. Haut / bas : incline ses bras. Renvoie les BLA dans les trois porte-voix.'},
 {name:'MICRO FRONDE',gesture:'⟳ ↗',control:'MAINTIENS · VISE · RELÂCHE',explanation:'Fais passer le micro aux trois voix.',detail:'Maintiens pour faire tournoyer le micro. Relâche quand les pointillés visent une bouche. Vise la bouche rose pour faire chanter une nouvelle voix.'},
 {name:'PAVÉ PENDULE',gesture:'↙ ✳ ↗',control:'INCLINE LE PLATEAU',explanation:'Dévisse le pupitre pour ouvrir le plateau.',detail:'Glisse dans les quatre directions pour faire rouler le pavé. Dévisse les quatre attaches du pupitre. Évite les trous noirs !'}
];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function reflect(vx,vy,nx,ny){const d=vx*nx+vy*ny;return {vx:vx-2*d*nx,vy:vy-2*d*ny};}
export function slingVelocity(angle,speed){return {vx:Math.cos(angle)*speed,vy:-Math.sin(angle)*speed};}
export class Cabaret {
 constructor({rng=Math.random,duration=DURATION}={}){this.rng=rng;this.duration=duration;this.mode=0;this.score=0;this.round=0;this.history=[];this.events=[];this.playing=false;this.input={x:.5,y:.5,held:false};this.time=0;this.combo=0;this.effects=[];}
 random(a,b){return a+this.rng()*(b-a);}
 emit(type,data={}){this.events.push({type,...data});}
 drain(){return this.events.splice(0);}
 start(mode=0,tour=true){this.mode=mode;this.first=mode;this.tour=tour;this.score=0;this.history=[];this.public=0;this.replies=0;this.sharedVoices=0;this.freedStages=0;this.begin();}
 begin(){this.time=0;this.roundScore=0;this.combo=0;this.playing=true;this.input={x:.5,y:.5,held:false};this.effects=[];this.events=[];this.cooldown=0;this.spawn=.7;this.launches=0;this.misses=0;this.actor={x:160,angle:0};this.words=[];this.speakers=[{x:50,y:64,r:25},{x:160,y:64,r:25},{x:270,y:64,r:25}];this.sling={angle:-2.5,speed:2.5,heldTime:0,cooldown:0,flight:null};this.voices=[{x:54,y:85,r:29,lit:0},{x:266,y:85,r:29,lit:0},{x:160,y:325,r:29,lit:0}];this.wanted=0;this.chorus=new Set();this.chorusCelebrated=false;this.speakerHits=new Set();this.ball={x:160,y:310,vx:0,vy:0};this.bolts=[{x:54,y:82},{x:266,y:82},{x:54,y:322},{x:266,y:322}];this.holes=[{x:92,y:245,r:13},{x:228,y:245,r:13}];this.bumpers=[{x:160,y:187,r:33},{x:65,y:166,r:15},{x:255,y:166,r:15}];this.falls=0;this.tilt={x:0,y:0};this.emit('begin',{mode:this.mode});}
 next(){if(this.tour&&this.mode<2){this.mode++;this.begin();return true;}return false;}
 gain(n,x,y,label){this.combo++;const mult=Math.min(4,1+Math.floor(this.combo/4)),amount=n*mult;this.score+=amount;this.roundScore+=amount;this.public=Math.min(120,(this.public||0)+(n>=70?4:1));this.emit('gain',{amount,x,y,label,mult});if(this.combo%4===0)this.emit('ovation',{x,y,level:mult});}
 miss(x,y,label='ÇA DÉBORDE…'){this.combo=0;this.misses++;this.emit('miss',{x,y,label});}
 inputAt(x,y,held=this.input.held){this.input.x=clamp(x,0,1);this.input.y=clamp(y,0,1);if(held&&!this.input.held&&this.mode===1)this.sling.heldTime=0;this.input.held=held;}
 release(cancel=false){if(this.mode===1&&this.input.held&&!cancel&&!this.sling.flight&&this.sling.cooldown<=0&&this.sling.heldTime>.07){const s=this.sling,a=s.angle,p=this.microPosition();s.flight={x:p.x,y:p.y,...slingVelocity(a,220+Math.min(s.heldTime,1.5)*90),age:0,bounces:0};this.launches++;this.emit('launch');}this.input.held=false;if(this.mode===2){this.input.x=.5;this.input.y=.5;}}
 microPosition(){return {x:160+Math.sin(this.sling.angle)*78,y:185+Math.cos(this.sling.angle)*78};}
 finish(){if(!this.playing)return;this.playing=false;this.release(true);this.history.push(this.roundScore);this.emit('end',{score:this.score,roundScore:this.roundScore,final:!this.tour||this.mode===2});}
 step(dt){if(!this.playing)return;dt=clamp(dt,0,.1);this.time+=dt;this.cooldown=Math.max(0,this.cooldown-dt);if(this.time>=this.duration){this.time=this.duration;this.finish();return;}const steps=Math.max(1,Math.ceil(dt/(1/120))),h=dt/steps;for(let i=0;i<steps;i++){if(this.mode===0)this.elastic(h);else if(this.mode===1)this.micro(h);else this.plateau(h);}}
 elastic(dt){const a=this.actor;a.x+=(32+this.input.x*256-a.x)*Math.min(1,dt*18);a.angle+=((this.input.y-.5)*1.5-a.angle)*Math.min(1,dt*14);this.spawn-=dt;if(this.spawn<=0){this.spawn=this.random(.8,1.15)/(1+this.time/45);this.words.push({x:this.random(40,280),y:105,vx:this.random(-24,24),vy:100+this.time*2,echo:false,id:this.random(0,5)|0});}
  for(const b of this.words){const prev=b.y;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.x<20||b.x>300){b.x=clamp(b.x,20,300);b.vx*=-1;}const surface=300+Math.tan(a.angle)*(b.x-a.x);if(!b.echo&&b.vy>0&&Math.abs(b.x-a.x)<52&&prev<surface+9&&b.y>=surface-9){b.echo=true;b.y=surface-11;const v=reflect(b.vx,b.vy,Math.sin(a.angle),-Math.cos(a.angle));b.vx=v.vx*1.5;b.vy=Math.min(-95,v.vy*1.8);this.replies++;this.gain(10,b.x,b.y,'RETOUR !');}
   if(b.echo){for(const s of this.speakers){if(Math.hypot(b.x-s.x,b.y-s.y)<s.r+10){b.dead=true;s.flash=.5;this.speakerHits.add(this.speakers.indexOf(s));this.gain(80,s.x,s.y,'ÇA RÉSONNE !');if(this.speakerHits.size===3){this.speakerHits.clear();this.gain(120,160,135,'TOUT LE MONDE RÉPOND !');this.emit('ovation',{x:160,y:135,level:4});}break;}}}
   if(b.y>385){b.dead=true;this.miss(b.x,375,'DU VENT');}if(b.y<12){b.dead=true;if(b.echo)this.miss(b.x,30,'À CÔTÉ');}
  }
  // A returning reply can turn a nearby incoming monologue into a new reply.
  for(const echo of this.words){if(!echo.echo||echo.dead)continue;for(const word of this.words){if(word.echo||word.dead||Math.hypot(echo.x-word.x,echo.y-word.y)>26)continue;word.echo=true;word.vy=-Math.max(150,Math.abs(word.vy)*1.6);word.vx=echo.vx*.65+(word.x<echo.x?-45:45);this.replies++;this.gain(25,word.x,word.y,'RÉPLIQUE EN CHAÎNE !');this.emit('chain',{x:word.x,y:word.y});}}
  this.words=this.words.filter(b=>!b.dead);this.speakers.forEach(s=>s.flash=Math.max(0,(s.flash||0)-dt));
 }
 micro(dt){const s=this.sling;s.cooldown=Math.max(0,s.cooldown-dt);this.voices.forEach(v=>v.lit=Math.max(0,v.lit-dt));if(!s.flight){if(this.input.held&&s.cooldown<=0){s.heldTime+=dt;s.speed=2.7+Math.min(s.heldTime,1.5)*1.25;s.angle+=s.speed*dt;}else if(s.cooldown<=0){s.angle+=dt*.5;}return;}
  const f=s.flight;f.x+=f.vx*dt;f.y+=f.vy*dt;f.age+=dt;for(let i=0;i<this.voices.length;i++){const v=this.voices[i];if(Math.hypot(f.x-v.x,f.y-v.y)<v.r+5){const fresh=i===this.wanted;const newVoice=!this.chorus.has(i);this.chorus.add(i);if(newVoice)this.sharedVoices++;v.lit=.7;this.gain(fresh?120:40,v.x,v.y,fresh?'UNE VOIX DE PLUS !':'ENCORE !');if(fresh)this.wanted=(this.wanted+1)%3;s.flight=null;s.cooldown=.28;this.emit('voice',{voice:i,chorus:this.chorus.size});if(this.chorus.size===3&&!this.chorusCelebrated){this.chorusCelebrated=true;this.gain(200,160,185,'LE CHŒUR EST LÀ !');this.emit('ovation',{x:160,y:185,level:4});}return;}}
  if(!f.bounces&&(f.x<12||f.x>308||f.y<38||f.y>358)){if(f.x<12||f.x>308){f.x=clamp(f.x,12,308);f.vx*=-1;}if(f.y<38||f.y>358){f.y=clamp(f.y,38,358);f.vy*=-1;}f.bounces=1;this.emit('ricochet',{x:f.x,y:f.y});}
  if(f.x<-20||f.x>340||f.y<-20||f.y>420||f.age>2.4){this.miss(clamp(f.x,20,300),clamp(f.y,30,370),'MICRO PERDU');s.flight=null;s.cooldown=.25;}
 }
 plateau(dt){const b=this.ball;this.tilt.x+=(this.input.x*2-1-this.tilt.x)*Math.min(1,dt*12);this.tilt.y+=(this.input.y*2-1-this.tilt.y)*Math.min(1,dt*12);b.vx+=this.tilt.x*510*dt;b.vy+=this.tilt.y*510*dt;const friction=Math.pow(.52,dt);b.vx=clamp(b.vx*friction,-310,310);b.vy=clamp(b.vy*friction,-310,310);b.x+=b.vx*dt;b.y+=b.vy*dt;for(const axis of ['x','y']){const min=axis==='x'?24:49,max=axis==='x'?296:358;if(b[axis]<min||b[axis]>max){b[axis]=clamp(b[axis],min,max);b['v'+axis]*=-.8;}}
  for(const c of this.bumpers){const dx=b.x-c.x,dy=b.y-c.y,d=Math.hypot(dx,dy),r=c.r+8;if(d<r){const nx=d?dx/d:1,ny=d?dy/d:0;b.x=c.x+nx*(r+.1);b.y=c.y+ny*(r+.1);if(b.vx*nx+b.vy*ny<0){const v=reflect(b.vx,b.vy,nx,ny);b.vx=v.vx*1.03;b.vy=v.vy*1.03;if(this.cooldown<=0){this.emit('bounce',{x:b.x,y:b.y});this.cooldown=.09;}}}}
  for(const bolt of this.bolts){if(!bolt.dead&&Math.hypot(b.x-bolt.x,b.y-bolt.y)<22){bolt.dead=true;this.gain(70,bolt.x,bolt.y,'DÉVISSÉ !');}}
  if(this.bolts.every(p=>p.dead)){this.gain(200,160,150,'LE PUPITRE TOMBE !');this.falls++;this.freedStages++;this.emit('topple');this.bolts.forEach(p=>p.dead=false);b.x=160;b.y=310;b.vx=0;b.vy=0;this.input.x=.5;this.input.y=.5;}
  for(const hole of this.holes){if(Math.hypot(b.x-hole.x,b.y-hole.y)<hole.r){this.miss(b.x,b.y,'DANS LE TROU');b.x=160;b.y=310;b.vx=0;b.vy=0;this.emit('hole');break;}}
 }
}
