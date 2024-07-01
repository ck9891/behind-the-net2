-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "yrGm" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "maxRegulationPeriods" INTEGER NOT NULL DEFAULT 3,
    "number" INTEGER NOT NULL,
    "periodType" TEXT NOT NULL DEFAULT 'REG',
    "minutesElapsed" INTEGER NOT NULL,
    "secondsElapsed" INTEGER NOT NULL,
    "minutesRemaining" INTEGER NOT NULL,
    "secondsRemaining" INTEGER NOT NULL,
    "situationCode" TEXT NOT NULL,
    "homeTeamDefendingSide" TEXT NOT NULL,
    "typeCode" TEXT NOT NULL,
    "zero" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "xCoord" REAL NOT NULL,
    "yCoord" REAL NOT NULL,
    "zoneCode" TEXT NOT NULL,
    "awayScore" INTEGER NOT NULL,
    "awaySOG" INTEGER NOT NULL,
    "homeScore" INTEGER NOT NULL,
    "homeSOG" INTEGER NOT NULL,
    "eventOwnerTeamId" TEXT NOT NULL,
    "shotType" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,
    "shootingPlayerId" INTEGER NOT NULL,
    "blockingPlayerId" INTEGER NOT NULL,
    "goalieInNetId" INTEGER NOT NULL,
    "winningPlayerId" INTEGER NOT NULL,
    "losingPlayerId" INTEGER NOT NULL,
    "committedByPlayerId" INTEGER NOT NULL,
    "drawnByPlayerId" INTEGER NOT NULL,
    "servedByPlayerId" INTEGER NOT NULL,
    "hittingPlayerId" INTEGER NOT NULL,
    "hitteePlayerId" INTEGER NOT NULL,
    "descKey" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "secondaryReason" TEXT NOT NULL,
    "scoringPlayerId" INTEGER NOT NULL,
    "scoringPlayerTotal" INTEGER NOT NULL,
    "assist1PlayerId" INTEGER NOT NULL,
    "assist1PlayerTotal" INTEGER NOT NULL,
    "assist2PlayerId" INTEGER NOT NULL,
    "assist2PlayerTotal" INTEGER NOT NULL
);
INSERT INTO "new_Event" ("assist1PlayerId", "assist1PlayerTotal", "assist2PlayerId", "assist2PlayerTotal", "awaySOG", "awayScore", "blockingPlayerId", "committedByPlayerId", "descKey", "drawnByPlayerId", "duration", "eventId", "eventOwnerTeamId", "goalieInNetId", "hitteePlayerId", "hittingPlayerId", "homeSOG", "homeScore", "homeTeamDefendingSide", "id", "losingPlayerId", "maxRegulationPeriods", "minutesElapsed", "minutesRemaining", "number", "periodType", "playerId", "reason", "scoringPlayerId", "scoringPlayerTotal", "secondaryReason", "secondsElapsed", "secondsRemaining", "servedByPlayerId", "shootingPlayerId", "shotType", "situationCode", "sortOrder", "typeCode", "winningPlayerId", "xCoord", "yCoord", "yrGm", "zero", "zoneCode") SELECT "assist1PlayerId", "assist1PlayerTotal", "assist2PlayerId", "assist2PlayerTotal", "awaySOG", "awayScore", "blockingPlayerId", "committedByPlayerId", "descKey", "drawnByPlayerId", "duration", "eventId", "eventOwnerTeamId", "goalieInNetId", "hitteePlayerId", "hittingPlayerId", "homeSOG", "homeScore", "homeTeamDefendingSide", "id", "losingPlayerId", "maxRegulationPeriods", "minutesElapsed", "minutesRemaining", "number", "periodType", "playerId", "reason", "scoringPlayerId", "scoringPlayerTotal", "secondaryReason", "secondsElapsed", "secondsRemaining", "servedByPlayerId", "shootingPlayerId", "shotType", "situationCode", "sortOrder", "typeCode", "winningPlayerId", "xCoord", "yCoord", "yrGm", "zero", "zoneCode" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
