/*
  Warnings:

  - You are about to drop the column `actions` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - Added the required column `first` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "season" TEXT NOT NULL,
    "first" TEXT NOT NULL,
    "last" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "shoots" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "jersey" INTEGER NOT NULL,
    "gp" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL
);
INSERT INTO "new_Player" ("assists", "goals", "gp", "id", "jersey", "position", "season", "shoots", "team") SELECT "assists", "goals", "gp", "id", "jersey", "position", "season", "shoots", "team" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
