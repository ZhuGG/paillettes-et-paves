export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const wrap=(v,n)=>((v%n)+n)%n;
const points=[[0,95],[65,90],[95,48],[76,0],[105,-52],[55,-103],[-8,-92],[-65,-115],[-108,-65],[-80,-12],[-107,42],[-60,84]];
function curve(t){const n=points.length,u=wrap(t,1)*n,i=Math.floor(u),f=u-i,a=points[wrap(i-1,n)],b=points[i],c=points[(i+1)%n],d=points[(i+2)%n];const at=k=>.5*((2*b[k])+(-a[k]+c[k])*f+(2*a[k]-5*b[k]+4*c[k]-d[k])*f*f+(-a[k]+3*b[k]-3*c[k]+d[k])*f*f*f);return {x:at(0),z:at(1),y:1.5+Math.sin(t*Math.PI*4)*1.4+Math.sin(t*Math.PI*2)*1.4};}
export class Track {
 constructor(){this.samples=[];let distance=0,previous;for(let i=0;i<=960;i++){const p=curve(i/960);if(previous)distance+=Math.hypot(p.x-previous.x,p.z-previous.z);this.samples.push({...p,s:distance});previous=p;}this.length=distance;this.width=13;}
 at(distance,lane=0){const s=wrap(distance,this.length);let lo=0,hi=this.samples.length-1;while(lo+1<hi){const mid=(lo+hi)>>1;if(this.samples[mid].s<=s)lo=mid;else hi=mid;}const a=this.samples[lo],b=this.samples[hi],f=(s-a.s)/(b.s-a.s||1),dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz)||1;return {x:a.x+(b.x-a.x)*f+dz/len*lane,y:a.y+(b.y-a.y)*f,z:a.z+(b.z-a.z)*f-dx/len*lane,tx:dx/len,tz:dz/len,nx:dz/len,nz:-dx/len,angle:Math.atan2(dx,dz),s};}
 bend(s){const a=this.at(s-3),b=this.at(s+3);return Math.atan2(a.tx*b.tz-a.tz*b.tx,a.tx*b.tx+a.tz*b.tz)/6;}
}
export const PILOTS=[{name:'MARCEL',color:0xf4ff40,row:0},{name:'ZAZA',color:0xf62ca5,row:1}];
export class KartRace {
 constructor({track=new Track(),rng=Math.random}={}){this.track=track;this.rng=rng;this.reset();}
 reset(pilot=0){Object.assign(this,{pilot,phase:'ready',time:0,countdown:3.3,elapsed:0,lap:1,laps:3,speed:0,steer:0,lane:0,progress:0,charge:0,drifting:false,boost:0,slow:0,item:null,pickups:0,lastLap:0,lapTimes:[],events:[],collisionCooldown:0,finishedTime:null});this.input={steer:0,drift:false};this.rivals=Array.from({length:5},(_,i)=>({name:['ZAZA','LE VOISIN','LA VOISINE','LE FACTEUR','LE COLLECTIF'][i],progress:-5-i*4,lane:(i%2?1:-1)*(2+i*.35),speed:0,slow:0,finished:false,pace:30.8+i*.63,seed:i*2.1}));this.rivals[0].name=pilot===0?'ZAZA':'MARCEL';this.boxes=Array.from({length:12},(_,i)=>({s:65+i*this.track.length/12,lane:[-3.6,0,3.6][i%3],timer:0}));this.pads=[.18,.48,.76].map(t=>({s:t*this.track.length,lane:t===.48?-3.5:3.5}));this.padCooldown=0;}
 start(pilot=0){this.reset(pilot);this.phase='countdown';}
 emit(type,data={}){this.events.push({type,...data});}
 drain(){return this.events.splice(0);}
 setInput(steer,drift=false){this.input={steer:clamp(steer,-1,1),drift};}
 useItem(){if(this.phase!=='racing'||!this.item)return false;const item=this.item;this.item=null;if(item==='boost'){this.boost=2;this.emit('boost',{label:'COUP DE POUSSE !'});}else{for(const r of this.rivals)if(r.progress>this.progress&&r.progress-this.progress<90)r.slow=2.5;this.emit('confetti',{label:'PLUIE DE PAILLETTES !'});}return true;}
 rank(){return 1+this.rivals.filter(r=>r.progress>this.progress).length;}
 step(dt){dt=clamp(dt,0,.1);if(!['racing','countdown'].includes(this.phase))return;this.time+=dt;if(this.phase==='countdown'){this.countdown-=dt;if(this.countdown<=0){this.phase='racing';this.emit('go');}return;}
  this.elapsed+=dt;this.boost=Math.max(0,this.boost-dt);this.slow=Math.max(0,this.slow-dt);this.padCooldown=Math.max(0,this.padCooldown-dt);this.collisionCooldown=Math.max(0,this.collisionCooldown-dt);
  this.steer+=(this.input.steer-this.steer)*(1-Math.exp(-12*dt));const bend=this.track.bend(this.progress),offroad=Math.abs(this.lane)>this.track.width/2;
  const drifting=this.input.drift&&Math.abs(this.steer)>.17&&this.speed>15&&!offroad;
  if(drifting){this.charge=Math.min(1.6,this.charge+dt*(.45+Math.abs(bend)*28));}else if(this.drifting){if(this.charge>.4){this.boost=Math.max(this.boost,.65+this.charge*.8);this.emit('boost',{label:this.charge>1.1?'DÉRAPAGE PARFAIT !':'RELANCE !'});}this.charge=0;}
  this.drifting=drifting;const target=offroad?16:this.slow>0?22:this.boost>0?48:drifting?32:35;
  this.speed+=(target-this.speed)*(1-Math.exp(-(target<this.speed?4:1.6)*dt));
  // Road-relative steering: the camera follows the course; steer controls the racing line.
  this.lane+=this.steer*(drifting?10:8.4)*dt+bend*this.speed*this.speed*(drifting?.044:.028)*dt;this.lane=clamp(this.lane,-10,10);
  const old=this.progress;this.progress+=this.speed*dt/(clamp(1-bend*this.lane,.7,1.3));const crossed=Math.floor(this.progress/this.track.length)>Math.floor(old/this.track.length);
  if(crossed){this.lapTimes.push(this.elapsed-this.lastLap);this.lastLap=this.elapsed;this.lap=Math.min(this.laps,Math.floor(this.progress/this.track.length)+1);this.emit('lap',{lap:this.lap});}
  for(const b of this.boxes){b.timer=Math.max(0,b.timer-dt);if(!b.timer&&this.near(b.s,2.2)&&Math.abs(this.lane-b.lane)<1.7){b.timer=5;this.pickups++;if(!this.item){this.item=this.rank()>2&&this.rng()<.65?'boost':this.rng()<.5?'boost':'confetti';this.emit('pickup',{item:this.item});}}}
  if(!this.padCooldown)for(const p of this.pads)if(this.near(p.s,3)&&Math.abs(this.lane-p.lane)<1.8){this.boost=1.35;this.padCooldown=2;this.emit('boost',{label:'ÇA ROULE !'});break;}
  for(const [i,r] of this.rivals.entries()){if(r.finished)continue;r.slow=Math.max(0,r.slow-dt);const curve=Math.abs(this.track.bend(r.progress));const pace=(r.slow?21:r.pace)-Math.min(4,curve*100);r.speed+=(pace-r.speed)*(1-Math.exp(-1.5*dt));r.progress+=r.speed*dt;r.lane=Math.sin(this.time*.55+r.seed)*3.8;
   if(this.collisionCooldown<=0&&Math.abs(r.progress-this.progress)<2&&Math.abs(r.lane-this.lane)<1.65){this.lane=clamp(this.lane+(this.lane>=r.lane?1:-1)*1,-10,10);this.speed*=.85;this.collisionCooldown=.8;this.emit('bump');}
   if(r.progress>=this.laps*this.track.length){r.finished=true;r.progress=this.laps*this.track.length+.01+i*.001;}}
  if(this.progress>=this.laps*this.track.length){this.progress=this.laps*this.track.length;this.phase='finished';this.finishedTime=this.elapsed;this.emit('finish',{rank:this.rank()});}
 }
 near(s,radius){const a=wrap(this.progress,this.track.length),d=Math.abs(a-wrap(s,this.track.length));return Math.min(d,this.track.length-d)<radius;}
}
