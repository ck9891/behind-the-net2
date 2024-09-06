import { type EdgePlayerStats, type Shift } from "@prisma/client";
import { type Player } from "#app/types/edge.ts"
import { prisma } from "#app/utils/db.server.js";

const currentYear = new Date().getFullYear();
const previousYear = new Date().getFullYear() - 1;

const previousSeason = `${previousYear}${currentYear}`;


export type PlayersRequest = {
  page?: number
  skip?: number
  year?: string
  season?: string
  team?: string
  position?: string,
  firstName?: string,
  lastName?: string
}

export async function getPlayers({ page, skip, season, team, position, firstName, lastName }: PlayersRequest): Promise<Player[]> {
  
  const where = {
    season: season || previousSeason,
  }
  
  if (team) {
    where.team = team
  }

  if (position) {
    where.position = position
  }

  if (firstName) {
    where.first = { contains: firstName }
  }

  if (lastName) {
    where.last = { contains: lastName }
  }

  return prisma.player.findMany({
    take: page || 25,
    skip: skip || 0,
    where
  });
}

export async function getPlayer(playerId: string): Promise<Player[]> {
  const player = await prisma.player.findMany({
    where: {
      playerId
    }
  });

  // filter for duplicate season stats
  const filteredPlayer = player.filter((p, index, self) =>
    index === self.findIndex((t) => (
      t.season === p.season
    ))
  );

  return filteredPlayer
}

export type PlayerShot = {
  xCoord: number;
  yCoord: number;
  yrGm: string|number;
  eventId: number|string;
  id: number;
  periodType: string;
  situationCode: string;
  distance?: number;
}

export async function getPlayerShots(playerId: string): Promise<PlayerShot[]> {
  return prisma.event.findMany({
    where: {
      shootingPlayerId: parseInt(playerId)
    },
    select: {
      xCoord: true,
      yCoord: true,
      yrGm: true,
      eventId: true,
      id: true,
      periodType: true,
      situationCode: true,
      shootingPlayerId: true
    },
    
  });
}

// get all other events for a player
export async function getPlayerEvents(playerId: string): Promise<PlayerShot[]> {
  return prisma.event.findMany({
    where: {
      OR:[
        {blockingPlayerId: parseInt(playerId)},
        {goalieInNetId: parseInt(playerId)},
        {winningPlayerId: parseInt(playerId)},
        {losingPlayerId: parseInt(playerId)},
        {assist1PlayerId: parseInt(playerId)},
        {assist2PlayerId: parseInt(playerId)},
        {drawnByPlayerId: parseInt(playerId)},
        {hitteePlayerId: parseInt(playerId)},
        {servedByPlayerId: parseInt(playerId)},
        {committedByPlayerId: parseInt(playerId)},
      ]

    },
    
  });
}

export async function getPlayerShifts(playerId: string): Promise<Shift[]> {
  return prisma.shift.findMany({
    where: {
      playerId: playerId
    },
  });
}

export async function getEdgePlayerStats(playerId: string): Promise<EdgePlayerStats[]> {
  return prisma.edgePlayerStats.findMany({
    where: {
      player: parseInt(playerId)
    },
  });
}