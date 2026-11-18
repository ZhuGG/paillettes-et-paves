export function touchSteer(clientX,left,width){
 if(!Number.isFinite(clientX)||!Number.isFinite(left)||!Number.isFinite(width)||width<=0)return 0;
 const x=(clientX-left)/width-.5;
 // Absolute position: left half is left, right half is right, centre is neutral.
 if(Math.abs(x)<.06)return 0;
 return Math.max(-1,Math.min(1,Math.sign(x)*(Math.abs(x)-.06)/.32));
}
export function keyboardSteer(keys){return (keys.has('ArrowRight')||keys.has('d')?1:0)-(keys.has('ArrowLeft')||keys.has('q')||keys.has('a')?1:0);}
export function driverFrame(localCameraX,localCameraZ){
 const angle=Math.atan2(localCameraX,-localCameraZ);
 if(Math.abs(angle)>Math.PI*.65)return 3;
 if(Math.abs(angle)<.4)return 0;
 return angle<0?1:2;
}
