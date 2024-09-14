-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoteImage" (
    "id" TEXT NOT NULL,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "noteId" TEXT NOT NULL,

    CONSTRAINT "NoteImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImage" (
    "id" TEXT NOT NULL,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "digits" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "charSet" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
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
    "assists" INTEGER NOT NULL,
    "teamId" TEXT,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
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
    "playerId" TEXT NOT NULL,
    "teamId2" TEXT,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
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
    "xCoord" DOUBLE PRECISION NOT NULL,
    "yCoord" DOUBLE PRECISION NOT NULL,
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
    "assist2PlayerTotal" INTEGER NOT NULL,
    "teamId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EdgePlayerStats" (
    "id" SERIAL NOT NULL,
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
    "skatingSpeed" DOUBLE PRECISION NOT NULL,
    "avgSkatingSpeed" DOUBLE PRECISION NOT NULL,
    "percentileSkatingSpeed" DOUBLE PRECISION NOT NULL,
    "bursts22Plus" INTEGER NOT NULL,
    "avgBursts22Plus" DOUBLE PRECISION NOT NULL,
    "percentileBursts22Plus" DOUBLE PRECISION NOT NULL,
    "bursts20To22" INTEGER NOT NULL,
    "avgBursts20To22" DOUBLE PRECISION NOT NULL,
    "percentileBursts20To22" DOUBLE PRECISION NOT NULL,
    "bursts18To20" INTEGER NOT NULL,
    "avgBursts18To20" DOUBLE PRECISION NOT NULL,
    "percentileBursts18To20" DOUBLE PRECISION NOT NULL,
    "oZone" TEXT NOT NULL,
    "avgOZone" TEXT NOT NULL,
    "nZone" TEXT NOT NULL,
    "avgNZone" TEXT NOT NULL,
    "dZone" TEXT NOT NULL,
    "avgDZone" TEXT NOT NULL,
    "shotSpeed" DOUBLE PRECISION NOT NULL,
    "avgShotSpeed" DOUBLE PRECISION NOT NULL,
    "percentileShotSpeed" DOUBLE PRECISION NOT NULL,
    "speed100Plus" INTEGER NOT NULL,
    "avgSpeed100Plus" DOUBLE PRECISION NOT NULL,
    "percentileSpeed100Plus" DOUBLE PRECISION NOT NULL,
    "speed90To100" INTEGER NOT NULL,
    "avgSpeed90To100" DOUBLE PRECISION NOT NULL,
    "percentileSpeed90To100" DOUBLE PRECISION NOT NULL,
    "speed80To90" INTEGER NOT NULL,
    "avgSpeed80To90" DOUBLE PRECISION NOT NULL,
    "percentileSpeed80To90" DOUBLE PRECISION NOT NULL,
    "speed70To80" INTEGER NOT NULL,
    "avgSpeed70To80" DOUBLE PRECISION NOT NULL,
    "percentileSpeed70To80" DOUBLE PRECISION NOT NULL,
    "teamId" TEXT,

    CONSTRAINT "EdgePlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamId" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "conference" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "color1" TEXT NOT NULL,
    "color2" TEXT NOT NULL,
    "color3" TEXT NOT NULL,
    "color4" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Note_ownerId_idx" ON "Note"("ownerId");

-- CreateIndex
CREATE INDEX "Note_ownerId_updatedAt_idx" ON "Note"("ownerId", "updatedAt");

-- CreateIndex
CREATE INDEX "NoteImage_noteId_idx" ON "NoteImage"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "UserImage_userId_key" ON "UserImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_entity_access_key" ON "Permission"("action", "entity", "access");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_target_type_key" ON "Verification"("target", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Connection_providerName_providerId_key" ON "Connection"("providerName", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteImage" ADD CONSTRAINT "NoteImage_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToRole" ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
