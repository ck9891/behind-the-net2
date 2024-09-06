import { prisma } from "#app/utils/db.server.js";

export async function getTeams() {
  const teams = await prisma.player.findMany({
    select: {
      team: true,
    },
    distinct: ['team'],
    orderBy: {
      team: 'asc',
    },
  });

  const uniqueTeams = teams.map(t => t.team);

  return uniqueTeams;
}

export async function getTeamRoster(teamName: string, season: string) {
  console.log(teamName, season);
  const players = await prisma.player.findMany({
    where: {
      team: teamName,
      season: season,
    },
    orderBy: {
      last: 'asc',
    },
  });
  if (players.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  return players;
}