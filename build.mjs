import {mkdir,rm,cp,readFile,stat,readdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url)),out=path.join(root,'dist');
const html=await readFile(path.join(root,'index.html'),'utf8'),css=await readFile(path.join(root,'style.css'),'utf8');
for(const [,asset] of [...html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g),...css.matchAll(/url\('([^']+)'\)/g)])await stat(path.join(root,asset));
await rm(out,{recursive:true,force:true});await mkdir(out);
for(const file of ['index.html','style.css','game.js','core.mjs','icon.svg','assets'])await cp(path.join(root,file),path.join(out,file),{recursive:true});
await writeFile(path.join(out,'.nojekyll'),'');
async function size(dir){let total=0;for(const f of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,f.name);total+=f.isDirectory()?await size(p):(await stat(p)).size;}return total;}
const bytes=await size(out);if(bytes>750000)throw new Error(`Budget statique dépassé : ${bytes} octets / 750000`);
console.log(`Export GitHub Pages : ${bytes} octets, sans dépendance distante. Dossier : ${out}`);
