import {BoxGeometry,BufferAttribute,Mesh,MeshLambertMaterial} from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
// Local +Z is the kart's front. Faces and hands point forwards; the camera sees the back.
const geometries=new Map(),material=new MeshLambertMaterial({vertexColors:true});
function geometry(row){if(geometries.has(row))return geometries.get(row);const parts=[];
 function voxel(w,h,d,color,x,y,z){const g=new BoxGeometry(w,h,d);g.translate(x,y,z);const rgb=[(color>>16&255)/255,(color>>8&255)/255,(color&255)/255];const a=new Float32Array(g.attributes.position.count*3);for(let i=0;i<a.length;i+=3)a.set(rgb,i);g.setAttribute('color',new BufferAttribute(a,3));parts.push(g);}
 const pink=0xf62ca5,cream=0xffedcd,ink=0x161616,teal=0x62b5a6,fur=row?pink:teal;
 voxel(.7,.8,.5,fur,0,1.35,-.12); // torso
 voxel(.74,.62,.59,fur,0,1.98,-.1); // head, back visible from chase camera
 voxel(.49,.36,.18,cream,0,1.84,.26);voxel(.2,.14,.14,pink,0,1.98,.39); // muzzle and nose
 for(const side of [-1,1]){voxel(.12,.17,.07,ink,side*.19,2.09,.23);voxel(.09,.09,.03,0xfffefa,side*.18,2.13,.275); // forward eyes
  voxel(.2,.45,.23,fur,side*.44,1.45,.15);voxel(.24,.2,.26,pink,side*.43,1.27,.42); // arms reach the wheel
  voxel(.28,.28,.31,cream,side*.32,1.86,.24);}
 if(row===0){for(const side of [-1,1]){voxel(.23,.83,.22,cream,side*.24,2.61,-.12);voxel(.11,.65,.045,pink,side*.24,2.64,.015);}voxel(.28,.25,.23,cream,0,1.22,-.47);}
 else{for(const side of [-1,1]){voxel(.29,.36,.27,pink,side*.33,2.34,-.1);voxel(.12,.2,.04,cream,side*.33,2.35,.055);for(let i=0;i<3;i++)voxel(.22,.29,.31,i%2?cream:pink,side*(.42+i*.07),1.4+i*.17,-.21);}
  voxel(.55,.64,.48,pink,0,1.19,-.61);voxel(.66,.58,.51,pink,0,1.68,-.75);voxel(.5,.35,.44,pink,0,2.07,-.65);voxel(.27,.36,.07,cream,0,1.65,-1.015);}
 // Small steering wheel in front of both hands.
 voxel(.77,.09,.1,ink,0,1.3,.55);voxel(.09,.24,.08,ink,0,1.2,.54);
 const merged=mergeGeometries(parts);parts.forEach(g=>g.dispose());geometries.set(row,merged);return merged;
}
export function createKartDriver(row){return new Mesh(geometry(row),material);}
export function setKartDriver(driver,row){driver.geometry=geometry(row);}
