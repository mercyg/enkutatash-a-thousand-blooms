import http from 'node:http';
import worker from '../dist/server/index.js';
import {localDatabase} from './local-db.mjs';
const {db}=localDatabase('.local-game.sqlite');
const port=Number(process.env.PORT||4174);
http.createServer(async(req,res)=>{try{const buffers=[];for await(const b of req)buffers.push(b);const method=req.method;const request=new Request('http://'+req.headers.host+req.url,{method,headers:req.headers,body:['GET','HEAD'].includes(method)?undefined:Buffer.concat(buffers)});const result=await worker.fetch(request,{DB:db});res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));}catch(e){console.error(e);res.writeHead(500);res.end('Local preview error');}}).listen(port,'127.0.0.1',()=>console.log('Game preview: http://localhost:'+port));
