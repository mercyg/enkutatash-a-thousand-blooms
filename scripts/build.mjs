import fs from 'node:fs/promises';
await fs.mkdir('dist/server',{recursive:true});
await fs.mkdir('dist/.openai',{recursive:true});
const assets={};for(const [file,type] of [['index.html','text/html'],['style.css','text/css'],['game.js','text/javascript'],['community.js','text/javascript']])assets['/'+file]={body:await fs.readFile(file,'utf8'),type:type+'; charset=utf-8'};
await fs.writeFile('dist/server/assets.js','export default '+JSON.stringify(assets)+';\n');
for(const file of ['index.js','db.js'])await fs.copyFile('worker/'+file,'dist/server/'+file);
await fs.copyFile('.openai/hosting.json','dist/.openai/hosting.json');
await fs.cp('drizzle','dist/.openai/drizzle',{recursive:true});
console.log('Game and leaderboard built.');
