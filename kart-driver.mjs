import {Mesh,MeshBasicMaterial,PlaneGeometry,NearestFilter,SRGBColorSpace,DoubleSide} from 'three';
import {driverFrame} from './kart-input.mjs';
const plane=new PlaneGeometry(2.35,2.35);
export function driverMaterials(atlas){atlas.colorSpace=SRGBColorSpace;const rows=[];for(let row=0;row<2;row++){const frames=[];for(let frame=0;frame<4;frame++){const map=atlas.clone();map.repeat.set(.25,.5);map.offset.set(frame*.25,.5-row*.5);map.magFilter=map.minFilter=NearestFilter;map.generateMipmaps=false;map.needsUpdate=true;frames.push(new MeshBasicMaterial({map,transparent:true,alphaTest:.5,side:DoubleSide}));}rows.push(frames);}return rows;}
export function createKartDriver(row,materials){const driver=new Mesh(plane,materials[row][0]);driver.position.set(0,1.95,-.12);return driver;}
// The quad faces the camera, but its artwork is chosen from the camera's position
// relative to the kart: chase view always shows the character's back, never its face.
export function orientKartDriver(driver,row,materials,camera,kart){const dx=camera.position.x-kart.position.x,dz=camera.position.z-kart.position.z,a=kart.rotation.y;const localX=Math.cos(a)*dx-Math.sin(a)*dz,localZ=Math.sin(a)*dx+Math.cos(a)*dz;driver.material=materials[row][driverFrame(localX,localZ)];driver.rotation.y=Math.atan2(dx,dz)-a;}
