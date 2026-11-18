import {build} from 'esbuild';
import {mkdir,rm,cp,readFile,stat,readdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url)),out=path.join(root,'dist');
const html=await readFile(path.join(root,'index.html'),'utf8'),css=await readFile(path.join(root,'kart.css'),'utf8');
for(const [,asset] of [...html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g),...css.matchAll(/url\('([^']+)'\)/g)])await stat(path.join(root,asset));
await rm(out,{recursive:true,force:true});await mkdir(out);
for(const file of ['index.html','kart.css','kart-ui.js','kart-core.mjs','agenda.mjs','agenda.json','icon.svg','assets','audio'])await cp(path.join(root,file),path.join(out,file),{recursive:true});
await mkdir(path.join(out,'3d'));
await build({entryPoints:[path.join(root,'kart-scene.mjs')],outfile:path.join(out,'3d/kart.js'),bundle:true,format:'esm',platform:'browser',target:['es2022'],minify:true,legalComments:'eof'});
await cp(path.join(out,'3d'),path.join(root,'3d'),{recursive:true});
await writeFile(path.join(out,'3d/THREEJS-LICENSE.txt'),'License for the bundled Three.js library only. This is not a license for the Paillettes & Pavés project.\n\n'+await readFile(path.join(root,'node_modules/three/LICENSE'),'utf8'));
await writeFile(path.join(out,'.nojekyll'),'');
async function size(dir){let total=0;for(const f of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,f.name);total+=f.isDirectory()?await size(p):(await stat(p)).size;}return total;}
const bytes=await size(out),audioBytes=await size(path.join(out,'audio')),threeBytes=await size(path.join(out,'3d')),initialBytes=bytes-audioBytes-threeBytes;if(initialBytes>750000)throw new Error(`Budget initial dépassé : ${initialBytes} octets / 750000`);if(threeBytes>2000000)throw new Error(`Budget 3D dépassé : ${threeBytes} octets / 2000000`);if(audioBytes>3500000)throw new Error(`Budget audio dépassé : ${audioBytes} octets / 3500000`);
console.log(`Export GitHub Pages : ${initialBytes} octets hors audio ; ${threeBytes} octets 3D + ${audioBytes} octets audio chargés sur action ; ${bytes} octets au total. Dossier : ${out}`);
