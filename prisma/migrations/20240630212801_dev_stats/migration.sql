/*
  Warnings:

  - You are about to drop the column `assists` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `gp` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `jersey` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `Player` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "season" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "gp" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "team" TEXT NOT NULL,
    "jersey" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first" TEXT NOT NULL,
    "last" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "shoots" TEXT NOT NULL
);
INSERT INTO "new_Player" ("first", "id", "last", "position", "shoots") SELECT "first", "id", "last", "position", "shoots" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
