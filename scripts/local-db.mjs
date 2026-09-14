import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
export function localDatabase(filename=':memory:'){
 const sqlite=new DatabaseSync(filename);sqlite.exec('PRAGMA foreign_keys = ON');
 sqlite.exec('CREATE TABLE IF NOT EXISTS _local_migrations (name TEXT PRIMARY KEY)');
 for(const name of fs.readdirSync('drizzle').filter(n=>n.endsWith('.sql')).sort()){if(!sqlite.prepare('SELECT name FROM _local_migrations WHERE name = ?').get(name)){sqlite.exec(fs.readFileSync('drizzle/'+name,'utf8'));sqlite.prepare('INSERT INTO _local_migrations VALUES (?)').run(name);}}
 const wrapper={prepare(sql){return {args:[],bind(...args){this.args=args;return this},async first(){return sqlite.prepare(sql).get(...this.args)||null},async all(){return{results:sqlite.prepare(sql).all(...this.args)}},async run(){return {success:true,meta:sqlite.prepare(sql).run(...this.args)}}}},async batch(statements){sqlite.exec('BEGIN');try{const result=[];for(const statement of statements)result.push(await statement.run());sqlite.exec('COMMIT');return result}catch(e){sqlite.exec('ROLLBACK');throw e}}};return{db:wrapper,sqlite};
}
