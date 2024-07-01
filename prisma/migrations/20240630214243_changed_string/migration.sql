-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" TEXT NOT NULL,
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
INSERT INTO "new_Player" ("assists", "first", "goals", "gp", "id", "jersey", "last", "playerId", "position", "season", "shoots", "team") SELECT "assists", "first", "goals", "gp", "id", "jersey", "last", "playerId", "position", "season", "shoots", "team" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
