import { invariantResponse } from '@epic-web/invariant'
import { type Shift } from '@prisma/client'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { Link } from 'lucide-react'
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
import {
	type PlayerShot,
	getPlayer,
	getPlayerEvents,
	getPlayerShots,
} from './players.server'
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

export async function loader({ params }: LoaderFunctionArgs) {
	try {
		const { playerId } = params

		if (!playerId) {
			return invariantResponse('No player provided', { status: '400 ' })
		}

		const playerLandingData: Player[] = await getPlayer(playerId)
		// console.log(playerEvents);

		const allOtherEvents = await getPlayerEvents(playerId)


		return json({ playerLandingData, allOtherEvents })
	} catch (error) {
		console.log({ error })
	}
	return json({})
}

export function PlayerTable({ player }: { player: Player[] }) {
	return (
		<Table aria-label="Player Stats">
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
						<TableCell className="w-10">{p.season}</TableCell>
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

export default function PlayerRoute() {
	const { playerLandingData } = useLoaderData<typeof loader>()
	const [player] = playerLandingData
	return (
		<div className="w-ful0l mx-auto flex h-full max-w-5xl flex-col justify-center gap-4 p-4">
			<h1 className="mb-4 text-3xl">
				{player.first} {player.last}
			</h1>
			<PlayerTable player={playerLandingData} />
			<div className="mx-auto w-full max-w-5xl my-8">
				<nav className='flex gap-4 justify-center'>
			<NavLink to={`/players/single/${player.playerId}/shots`} className="text-body-sm bg-foreground/65 text-background border p-4 radius-2 hover:bg-foreground transition-all border-muted-foreground active:bg-foreground/75">
				View Shots
			</NavLink>
			<NavLink to={`/players/single/${player.playerId}/shifts`} className="text-body-sm bg-foreground/65 text-background border p-4 radius-2 hover:bg-foreground transition-all border-muted-foreground">
				View Shifts
			</NavLink>
			<NavLink to={`/players/single/${player.playerId}/edge`} className="text-body-sm bg-foreground/65 text-background border p-4 radius-2 hover:bg-foreground transition-all border-muted-foreground">View Edge Data</NavLink>
			</nav>
				<Outlet />


			</div>
		</div>
	)
}
