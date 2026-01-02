import { pgTable, text, integer, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Tabela de Usuários (Jogadores)
export const users = pgTable("users", {
    id: text("id").primaryKey(), // Discord ID
    coins: integer("coins").default(0).notNull(),
    wins: integer("wins").default(0).notNull(),
    loses: integer("loses").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabela de Personagens Base (Ex: Pirata, Marujo, Capitao)
export const characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    baseAtk: integer("base_atk").notNull(),
    baseDef: integer("base_def").notNull(),
    baseHp: integer("base_hp").notNull(),
    imageUrl: text("image_url"),
});

// Tabela de Skins (Modificadores Visuais e de Status)
export const skins = pgTable("skins", {
    id: serial("id").primaryKey(),
    characterId: integer("character_id").references(() => characters.id),
    name: text("name").notNull(),
    modifierAtk: integer("modifier_atk").default(0).notNull(),
    modifierDef: integer("modifier_def").default(0).notNull(),
    modifierHp: integer("modifier_hp").default(0).notNull(),
    imageUrl: text("image_url").notNull(),
    rarity: text("rarity").default("common").notNull(), // common, rare, epic, legendary
});

// Relacionamento N:N entre Usuários e Skins (Inventário)
export const userSkins = pgTable("user_skins", {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => users.id).notNull(),
    skinId: integer("skin_id").references(() => skins.id).notNull(),
    equipped: boolean("equipped").default(false).notNull(),
    obtainedAt: timestamp("obtained_at").defaultNow().notNull(),
});

// Relações para Drizzle Queries
export const usersRelations = relations(users, ({ many }) => ({
    skins: many(userSkins),
}));

export const userSkinsRelations = relations(userSkins, ({ one }) => ({
    user: one(users, {
        fields: [userSkins.userId],
        references: [users.id],
    }),
    skin: one(skins, {
        fields: [userSkins.skinId],
        references: [skins.id],
    }),
}));

export const skinsRelations = relations(skins, ({ one, many }) => ({
    character: one(characters, {
        fields: [skins.characterId],
        references: [characters.id],
    }),
}));
