import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const players=sqliteTable('players',{
 id:text('id').primaryKey(),tokenHash:text('token_hash').notNull(),name:text('name').notNull(),
 bestScore:integer('best_score').notNull().default(0),bestGifts:integer('best_gifts').notNull().default(0),
 rounds:integer('rounds').notNull().default(0),bestAt:integer('best_at').notNull().default(0),createdAt:integer('created_at').notNull()
},t=>[uniqueIndex('players_token_idx').on(t.tokenHash),index('players_ranking_idx').on(t.bestScore,t.bestAt,t.id)]);
export const runs=sqliteTable('runs',{
 id:text('id').primaryKey(),playerId:text('player_id').notNull().references(()=>players.id),
 startedAt:integer('started_at').notNull(),finishedAt:integer('finished_at'),score:integer('score'),gifts:integer('gifts')
},t=>[index('runs_player_started_idx').on(t.playerId,t.startedAt),index('runs_started_idx').on(t.startedAt)]);
