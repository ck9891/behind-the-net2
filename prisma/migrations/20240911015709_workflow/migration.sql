/*
  Warnings:

  - You are about to alter the column `endTime` on the `Shift` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to alter the column `startTime` on the `Shift` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - Added the required column `shiftId` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "EdgePlayerStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "season" INTEGER NOT NULL,
    "player" INTEGER NOT NULL,
    "first" TEXT NOT NULL,
    "last" TEXT NOT NULL,
    "pos" TEXT NOT NULL,
    "shoots" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "jersey" INTEGER NOT NULL,
    "gp" INTEGER NOT NULL,
    "g" INTEGER NOT NULL,
    "a" INTEGER NOT NULL,
    "skatingSpeed" REAL NOT NULL,
    "avgSkatingSpeed" REAL NOT NULL,
    "percentileSkatingSpeed" REAL NOT NULL,
    "bursts22Plus" INTEGER NOT NULL,
    "avgBursts22Plus" REAL NOT NULL,
    "percentileBursts22Plus" REAL NOT NULL,
    "bursts20To22" INTEGER NOT NULL,
    "avgBursts20To22" REAL NOT NULL,
    "percentileBursts20To22" REAL NOT NULL,
    "bursts18To20" INTEGER NOT NULL,
    "avgBursts18To20" REAL NOT NULL,
    "percentileBursts18To20" REAL NOT NULL,
    "oZone" TEXT NOT NULL,
    "avgOZone" TEXT NOT NULL,
    "nZone" TEXT NOT NULL,
    "avgNZone" TEXT NOT NULL,
    "dZone" TEXT NOT NULL,
    "avgDZone" TEXT NOT NULL,
    "shotSpeed" REAL NOT NULL,
    "avgShotSpeed" REAL NOT NULL,
    "percentileShotSpeed" REAL NOT NULL,
    "speed100Plus" INTEGER NOT NULL,
    "avgSpeed100Plus" REAL NOT NULL,
    "percentileSpeed100Plus" REAL NOT NULL,
    "speed90To100" INTEGER NOT NULL,
    "avgSpeed90To100" REAL NOT NULL,
    "percentileSpeed90To100" REAL NOT NULL,
    "speed80To90" INTEGER NOT NULL,
    "avgSpeed80To90" REAL NOT NULL,
    "percentileSpeed80To90" REAL NOT NULL,
    "speed70To80" INTEGER NOT NULL,
    "avgSpeed70To80" REAL NOT NULL,
    "percentileSpeed70To80" REAL NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shiftId" INTEGER NOT NULL,
    "detailCode" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "startTime" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "shiftNumber" INTEGER NOT NULL,
    "typeCode" TEXT NOT NULL,
    "eventNumber" INTEGER NOT NULL,
    "eventDescription" TEXT NOT NULL,
    "playerId" TEXT NOT NULL
);
INSERT INTO "new_Shift" ("detailCode", "duration", "endTime", "eventDescription", "eventNumber", "gameId", "id", "period", "playerId", "shiftNumber", "startTime", "teamId", "typeCode") SELECT "detailCode", "duration", "endTime", "eventDescription", "eventNumber", "gameId", "id", "period", "playerId", "shiftNumber", "startTime", "teamId", "typeCode" FROM "Shift";
DROP TABLE "Shift";
ALTER TABLE "new_Shift" RENAME TO "Shift";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
