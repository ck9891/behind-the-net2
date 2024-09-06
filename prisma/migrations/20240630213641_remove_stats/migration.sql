/*
  Warnings:

  - You are about to drop the `PlayerStats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assists` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goals` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gp` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jersey` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PlayerStats";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
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
INSERT INTO "new_Player" ("first", "id", "last", "position", "shoots") SELECT "first", "id", "last", "position", "shoots" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
