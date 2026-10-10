import { createServer } from 'node:http';
import { readFileSync, realpathSync, statSync } from 'node:fs';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { basePath } from './render.ts';
const root=realpathSync(resolve(dirname(fileURLToPath(import.meta.url)),'../../../dist'));
const base=basePath(process.env.BASE_PATH);
const port=Number(process.env.PORT??4173);
if (!Number.isInteger(port)||port<1||port>65535) throw new Error('Invalid PORT');
const server=createServer((req,res)=>{
  try {
    if (req.method!=='GET' && req.method!=='HEAD') {res.writeHead(405).end();return;}
    const path=decodeURIComponent(new URL(req.url??'/', 'http://localhost').pathname);
    if (!path.startsWith(base)) {res.writeHead(404).end();return;}
    const relative=path.slice(base.length);
    if (relative.split('/').some(p=>p.startsWith('.') || p.includes('\\'))) {res.writeHead(404).end();return;}
    let file=resolve(root,relative);
    if (statSync(file).isDirectory()) {
      if (!path.endsWith('/')) {res.writeHead(308,{Location:path+'/'}).end();return;}
      file=resolve(file,'index.html');
    }
    file=realpathSync(file);
    if (!file.startsWith(root+sep)) {res.writeHead(404).end();return;}
    const content=readFileSync(file);
    const type=extname(file)==='.css'?'text/css':extname(file)==='.svg'?'image/svg+xml':'text/html';
    res.writeHead(200,{'Content-Type':type+'; charset=utf-8','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:content);
  } catch {res.writeHead(404).end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Book: http://localhost:${port}${base} — local preview, not a production server`));
