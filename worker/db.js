export function database(env){if(!env.DB)throw new Error('Leaderboard database unavailable');return env.DB;}
export async function tokenHash(token){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)))].map(n=>n.toString(16).padStart(2,'0')).join('');}
export async function currentPlayer(request,db){const token=request.headers.get('cookie')?.match(/(?:^|;\s*)bloom_player=([a-f0-9]{64})(?:;|$)/)?.[1];return token?db.prepare('SELECT * FROM players WHERE token_hash = ?').bind(await tokenHash(token)).first():null;}
export function publicPlayer(p){return p?{id:p.id,name:p.name,bestScore:p.best_score,bestGifts:p.best_gifts,rounds:p.rounds}:null;}
