// One gesture, one stage, two different physical outcomes. World units: x across the stage, z into it.
export const W=320,H=400,DURATION=30;
export const MODES=[
 {name:'PASSE LE MICRO',gesture:'↔ ↕ ↗',control:'VISE · RELÂCHE POUR PASSER',explanation:'Envoie le micro aux trois voix sur scène.',detail:'Gauche / droite pour viser. En haut de la zone : plus loin. Relâche pour passer. La cible rose rapporte davantage.'},
 {name:'BAS LES PUPITRES',gesture:'↔ ↕ ↗',control:'VISE · RELÂCHE POUR LANCER',explanation:'Fais tomber les pupitres avec une boule de mousse.',detail:'Même geste : vise et relâche. En haut de la zone : plus de force. Les pupitres se renversent les uns sur les autres.'}
];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const ORIGIN={x:0,y:.85,z:3.4};
export function aimFromInput(x,y){return {x:(clamp(x,0,1)-.5)*7.4,z:-2.6-(1-clamp(y,0,1))*5.9,power:.5+(1-clamp(y,0,1))*.5};}
export function flightPoint(shot,u){u=clamp(u,0,1);return {x:ORIGIN.x+(shot.target.x-ORIGIN.x)*u,y:.85+Math.sin(Math.PI*u)*2.7,z:ORIGIN.z+(shot.target.z-ORIGIN.z)*u};}
export function bowlingVelocity(aim){const dx=aim.x,dz=-9.5,length=Math.hypot(dx,dz),speed=14+aim.power*8;return {vx:dx/length*speed,vz:dz/length*speed};}
export class Cabaret {
 constructor({rng=Math.random,duration=DURATION}={}){this.rng=rng;this.duration=duration;this.playing=false;this.mode=0;this.time=0;this.score=0;this.public=0;this.combo=0;this.events=[];this.input={x:.5,y:.5,held:false};this.aim=aimFromInput(.5,.5);this.targets=[];this.posts=[];this.shot=null;this.chorus=new Set();}
 emit(type,data={}){this.events.push({type,...data});}
 drain(){return this.events.splice(0);}
 start(mode=0,tour=true){this.mode=clamp(mode,0,1);this.tour=tour;this.score=0;this.public=0;this.history=[];this.passes=0;this.sharedVoices=0;this.freedStages=0;this.totalToppled=0;this.begin();}
 begin(){this.time=0;this.roundScore=0;this.combo=0;this.playing=true;this.events=[];this.input={x:.5,y:.5,held:false};this.aim=aimFromInput(.5,.5);this.cooldown=0;this.shot=null;this.launches=0;this.misses=0;this.wanted=0;this.chorus=new Set();this.heard=new Set();this.wave=0;this.waveWait=0;this.targets=[{x:-2.45,z:-4.6,baseX:-2.45,lit:0},{x:0,z:-6.2,baseX:0,lit:0},{x:2.45,z:-4.6,baseX:2.45,lit:0}];this.setWave();this.emit('begin',{mode:this.mode});}
 next(){if(this.tour&&this.mode<MODES.length-1){this.mode++;this.begin();return true;}return false;}
 gain(n,x,z,label=''){this.combo++;const mult=Math.min(4,1+Math.floor(this.combo/4)),amount=n*mult;this.score+=amount;this.roundScore+=amount;this.public=Math.min(120,this.public+(n>=80?5:2));this.emit('gain',{amount,x:160+x*22,y:205+z*10,label,mult,world:{x,z}});if(this.combo%4===0)this.emit('ovation',{x:160,y:135,level:mult});}
 miss(label='ENCORE UN ESSAI'){this.combo=0;this.misses++;this.emit('miss',{x:160,y:255,label});}
 inputAt(x,y,held=this.input.held){this.input={x:clamp(x,0,1),y:clamp(y,0,1),held};this.aim=aimFromInput(this.input.x,this.input.y);}
 release(cancel=false){const launch=this.input.held&&!cancel&&this.playing&&!this.shot&&this.cooldown<=0&&this.waveWait<=0;this.input.held=false;if(!launch)return false;this.launches++;const target={...this.aim};if(this.mode===0){this.shot={type:'micro',target,age:0,duration:.7+Math.hypot(target.x,target.z-ORIGIN.z)*.035,...ORIGIN};}else{this.shot={type:'foam',age:0,x:0,y:.4,z:ORIGIN.z,...bowlingVelocity(target),hits:0};}this.emit('launch');return true;}
 finish(){if(!this.playing)return;this.playing=false;this.release(true);this.history.push(this.roundScore);this.emit('end',{score:this.score,roundScore:this.roundScore,final:!this.tour||this.mode===MODES.length-1});}
 step(dt){if(!this.playing)return;dt=clamp(dt,0,.1);this.time+=dt;if(this.time>=this.duration){this.time=this.duration;this.finish();return;}this.cooldown=Math.max(0,this.cooldown-dt);for(const t of this.targets)t.lit=Math.max(0,t.lit-dt);if(this.mode===0)this.stepMicro(dt);else{const count=Math.max(1,Math.ceil(dt*120));for(let i=0;i<count;i++)this.stepBowling(dt/count);}}
 stepMicro(dt){for(let i=0;i<this.targets.length;i++){const t=this.targets[i];t.x=t.baseX+Math.sin(this.time*.7+i*2)*.23;}const shot=this.shot;if(!shot)return;shot.age+=dt;Object.assign(shot,flightPoint(shot,shot.age/shot.duration));if(shot.age<shot.duration)return;let hit=-1,best=1.03;for(let i=0;i<this.targets.length;i++){const t=this.targets[i],d=Math.hypot(shot.x-t.x,shot.z-t.z);if(d<best){hit=i;best=d;}}
  if(hit>=0){const t=this.targets[hit],fresh=hit===this.wanted;if(!this.heard.has(hit)){this.heard.add(hit);this.sharedVoices++;}this.chorus.add(hit);this.passes++;t.lit=.9;this.gain(fresh?120:50,t.x,t.z,fresh?'LA PAROLE PASSE !':'BIEN REÇU !');if(fresh)this.wanted=(this.wanted+1)%3;this.emit('voice',{voice:hit,chorus:this.chorus.size});if(this.chorus.size===3){this.chorus.clear();this.gain(180,0,-5,'LES TROIS VOIX !');this.emit('ovation',{x:160,y:135,level:4});}}else this.miss('ÇA REVIENT !');this.shot=null;this.cooldown=.18;}
 setWave(){this.wave++;const layouts=[[[0,-2.2],[-.75,-3.15],[.75,-3.15],[-1.5,-4.1],[0,-4.1],[1.5,-4.1],[0,-5.1]], [[-.6,-2.2],[.6,-2.2],[-1.2,-3.25],[0,-3.25],[1.2,-3.25],[-.6,-4.3],[.6,-4.3]],[[0,-2.2],[0,-3.15],[-1,-3.9],[1,-3.9],[-1.85,-4.65],[0,-4.65],[1.85,-4.65]]];this.posts=layouts[(this.wave-1)%layouts.length].map(([x,z],i)=>({id:i,x,z,angle:0,omega:0,dx:0,dz:-1,falling:false,scored:false,spread:false}));}
 topple(post,dx,dz,speed=4){if(post.falling)return false;const length=Math.hypot(dx,dz)||1;post.falling=true;post.dx=dx/length;post.dz=dz/length;post.omega=clamp(speed*.28,1.5,4.5);this.emit('impact',{world:{x:post.x,z:post.z},x:160+post.x*22,y:205+post.z*10});return true;}
 stepBowling(dt){if(this.waveWait>0){this.waveWait-=dt;if(this.waveWait<=0){this.shot=null;this.setWave();this.emit('wave',{wave:this.wave});}return;}
  const b=this.shot;if(b){b.age+=dt;b.x+=b.vx*dt;b.z+=b.vz*dt;b.y=.35+Math.abs(Math.sin(b.age*16))*.12*Math.exp(-b.age);const drag=Math.exp(-.18*dt);b.vx*=drag;b.vz*=drag;if(b.x<-4||b.x>4){b.x=clamp(b.x,-4,4);b.vx*=-.8;this.emit('ricochet',{x:160+b.x*20,y:230});}
   for(const p of this.posts){if(p.falling||Math.hypot(b.x-p.x,b.z-p.z)>.72)continue;if(this.topple(p,b.vx,b.vz,Math.hypot(b.vx,b.vz))){b.hits++;b.vx*=.89;b.vz*=.92;}}
   if(b.z<-8||b.z>5||b.age>1.65){if(!b.hits)this.miss('À CÔTÉ');this.shot=null;this.cooldown=.18;}}
  for(const p of this.posts){if(!p.falling)continue;p.omega+=(1.5+Math.sin(p.angle)*6)*dt;p.angle=Math.min(Math.PI/2,p.angle+p.omega*dt);if(p.angle>.38&&!p.spread){p.spread=true;for(const other of this.posts){if(other.falling)continue;const dx=other.x-p.x,dz=other.z-p.z,d=Math.hypot(dx,dz);if(d<1.46&&(dx*p.dx+dz*p.dz)/Math.max(.001,d)>-.1)this.topple(other,dx,dz,8);}}
   if(p.angle>1&&!p.scored){p.scored=true;this.totalToppled++;this.gain(45,p.x,p.z,'ÇA TOMBE !');this.emit('topple',{world:{x:p.x,z:p.z},x:160+p.x*22,y:205+p.z*10});}}
  if(this.posts.length&&this.posts.every(p=>p.scored)){this.freedStages++;this.gain(200,0,-3,'LA SCÈNE EST LIBRE !');this.emit('ovation',{x:160,y:145,level:4});this.waveWait=1;}}
}
