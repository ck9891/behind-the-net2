import { invariantResponse } from '@epic-web/invariant'
import { type Shift } from '@prisma/client'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { StatsPopup } from '#app/components/stats-popup.js'
import {
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from '#app/components/ui/table'
import { type Player } from '#app/types/edge.js'
import { type PlayerShot, getPlayer, getPlayerEvents, getPlayerShots, getPlayerShifts} from './players.server'
// async function getTeamSchedule(team: string, season: number) {
// 	// get the entire year's schedule by default
// 	let url = `https://api-web.nhle.com/v1/club-schedule-season/${team}/${season}`
// 	const response = await fetch(url)
// 	const data = await response.json()
// 	return data
// }

// async function getPlayerLandingStats(player: string) {
// 	let url = `https://api-web.nhle.com/v1/player/${player}/landing`
// 	const response = await fetch(url)
// 	const data = await response.json()
// 	return data
// }

// async function getSingleGameStats(gameID: number) {
// 	let url = `https://api-web.nhle.com/v1/gamecenter/${gameID}/play-by-play/`
// 	const response = await fetch(url)
// 	const data = await response.json()
// 	return data
// }

// async function getSeasonGameStats(games) {
// 	const gameIDs = games.map(game => game.id)
// 	const gamePBPStats = await Promise.all(
// 		gameIDs.map(gameID => getSingleGameStats(gameID)),
// 	)
// 	return gamePBPStats
// }

// async function getPBPStats(stats) {
// 	const pbpStats = stats.map(stat => stat.plays)
// 	return pbpStats.flat()
// }
// ||
// stat.details?.blockingPlayerId === player ||
// stat.details?.playerId === player ||
// stat.details?.losingPlayerId === player ||
// stat.details?.winningPlayerId === player ||
// stat.details?.assist1PlayerId === player ||
// stat.details?.assist2PlayerId === player ||
// stat.details?.scoringPlayerId === player

// async function getPlayerPBPStats(player: number, pbpData) {
// 	const playerStats = pbpData
// 		.map(stat => {
// 			console.log(stat.details)
// 			if (
// 				stat.details?.shootingPlayerId === player ||
// 				stat.details?.blockingPlayerId === player ||
// 				stat.details?.playerId === player ||
// 				stat.details?.losingPlayerId === player ||
// 				stat.details?.winningPlayerId === player ||
// 				stat.details?.assist1PlayerId === player ||
// 				stat.details?.assist2PlayerId === player ||
// 				stat.details?.scoringPlayerId === player
// 			) {
// 				return stat
// 			}
// 			return null
// 		})
// 		.filter(stat => stat !== null)
// 	console.log(player)
// 	return playerStats
// }


interface CategorizedShots {
  reallyClose: PlayerShot[];
  close: PlayerShot[];
  notSoClose: PlayerShot[];
}

export function sortAndCategorizePlayerShots(shots: PlayerShot[]): CategorizedShots {
  // Calculate the distance from the origin for each shot
  shots.forEach(shot => {
    shot.distance = Math.sqrt(shot.xCoord ** 2 + shot.yCoord ** 2);
  });

  // Sort the shots based on their distance from the origin
  shots.sort((a, b) => a.distance! - b.distance!);

  // Categorize the shots
  const categorizedShots: CategorizedShots = {
    reallyClose: [],
    close: [],
    notSoClose: []
  };

  shots.forEach(shot => {
    if (shot.distance! <= 10) {
      categorizedShots.reallyClose.push(shot);
    } else if (shot.distance! <= 20) {
      categorizedShots.close.push(shot);
    } else {
      categorizedShots.notSoClose.push(shot);
    }
  });

  return categorizedShots;
}

export async function loader({ params }: LoaderFunctionArgs) {
	console.log({ params })
	try {
		const { playerId } = params

		if (!playerId) {
			return invariantResponse('No player provided', { status:  '400 '})
		}

    const playerLandingData: Player[] = await getPlayer(playerId);
		const playerEvents: PlayerShot[] = await getPlayerShots(playerId);
		const playerShifts: Shift[] = await getPlayerShifts(playerId);
		// console.log(playerEvents);

		const allOtherEvents = await getPlayerEvents(playerId);
		
		console.log(allOtherEvents);	
		const playerShots = sortAndCategorizePlayerShots(playerEvents);

    return json({ playerLandingData, playerEvents: [...playerShots.close, ...playerShots.reallyClose, ...playerShots.notSoClose], allOtherEvents, playerShifts });

	} catch (error) {
		console.log({ error })
	}
	return json({})
}

export function PlayerTable({ player }: { player: Player[] }) {

	return (
		<Table
			aria-label="Player Stats"
		>
			<TableCaption>Player Stats</TableCaption>
				<TableRow>
					<TableCell>Season</TableCell>
					<TableCell>First</TableCell>
					<TableCell>Last</TableCell>
					<TableCell>Position</TableCell>
					<TableCell>Shoots</TableCell>
					<TableCell>Team</TableCell>
					<TableCell>Jersey</TableCell>
					<TableCell>GP</TableCell>
					<TableCell>G</TableCell>
					<TableCell>A</TableCell>
				</TableRow>
			<TableBody>
				{player.map((p: Player, i) => (
					<TableRow key={`${i}-${p.season}`}>
						<TableCell className='w-10'>{p.season}</TableCell>
						<TableCell>{p.first}</TableCell>
						<TableCell>{p.last}</TableCell>
						<TableCell>{p.position}</TableCell>
						<TableCell>{p.shoots}</TableCell>
						<TableCell>{p.team}</TableCell>
						<TableCell>{p.jersey}</TableCell>
						<TableCell>{p.gp}</TableCell>
						<TableCell>{p.goals}</TableCell>
						<TableCell>{p.assists}</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
	)

}

export function PlayerShotsTable({ playerShots }: { playerShots: PlayerShot[] }) {
	return (
		<Table
			aria-label="Player Shots"
		>
			<TableCaption>Player Shots</TableCaption>
				<TableRow>
					<TableCell>xCoord</TableCell>
					<TableCell>yCoord</TableCell>
					<TableCell>yrGm</TableCell>
					<TableCell>eventId</TableCell>
					<TableCell>id</TableCell>
					<TableCell>periodType</TableCell>
					<TableCell>situationCode</TableCell>
					<TableCell>distance</TableCell>
				</TableRow>
			<TableBody>
				{playerShots.map((p: PlayerShot, i) => (
					<TableRow key={`${i}-${p.id}`}>
						<TableCell>{p.xCoord}</TableCell>
						<TableCell>{p.yCoord}</TableCell>
						<TableCell>{p.yrGm}</TableCell>
						<TableCell>{p.eventId}</TableCell>
						<TableCell>{p.id}</TableCell>
						<TableCell>{p.periodType}</TableCell>
						<TableCell>{p.situationCode}</TableCell>
						<TableCell>{p.distance}</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
	)
}

export default function PlayerRoute() {
	const { playerLandingData, playerEvents, allOtherEvents, playerShifts } = useLoaderData<typeof loader>()
	const [player] = playerLandingData;
	return (
		<div className="mx-auto flex h-full w-ful0l max-w-5xl flex-col justify-center gap-4 p-4">
			<h1 className="mb-4 text-3xl">
				{player.first} {player.last}
			</h1>
			<PlayerTable player={playerLandingData} />
			<div className="w-full max-w-5xl mx-auto">
			<h2>Player Events</h2>
			<h3>Player Shots</h3>
			<p>Number of Shots {playerEvents.length}</p>

			<h3>Player Shifts</h3>
			<p>Number of Shifts {playerShifts.length}</p>
		
			<PlayerShotsTable playerShots={playerEvents} />
			</div>
		</div>
	)
}
