import { StatsPopup } from '#app/components/stats-popup.js'
import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

async function getTeamSchedule(team: string, season: number) {
	// get the entire year's schedule by default
	let url = `https://api-web.nhle.com/v1/club-schedule-season/${team}/${season}`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

async function getPlayerLandingStats(player: string) {
	let url = `https://api-web.nhle.com/v1/player/${player}/landing`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

async function getSingleGameStats(gameID: number) {
	let url = `https://api-web.nhle.com/v1/gamecenter/${gameID}/play-by-play/`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

async function getSeasonGameStats(games) {
	const gameIDs = games.map(game => game.id)
	const gamePBPStats = await Promise.all(
		gameIDs.map(gameID => getSingleGameStats(gameID)),
	)
	return gamePBPStats
}

async function getPBPStats(stats) {
	const pbpStats = stats.map(stat => stat.plays)
	return pbpStats.flat()
}
// ||
// stat.details?.blockingPlayerId === player ||
// stat.details?.playerId === player ||
// stat.details?.losingPlayerId === player ||
// stat.details?.winningPlayerId === player ||
// stat.details?.assist1PlayerId === player ||
// stat.details?.assist2PlayerId === player ||
// stat.details?.scoringPlayerId === player

async function getPlayerPBPStats(player: number, pbpData) {
	const playerStats = pbpData
		.map(stat => {
			console.log(stat.details)
			if (
				stat.details?.shootingPlayerId === player ||
				stat.details?.blockingPlayerId === player ||
				stat.details?.playerId === player ||
				stat.details?.losingPlayerId === player ||
				stat.details?.winningPlayerId === player ||
				stat.details?.assist1PlayerId === player ||
				stat.details?.assist2PlayerId === player ||
				stat.details?.scoringPlayerId === player
			) {
				return stat
			}
			return null
		})
		.filter(stat => stat !== null)
	console.log(player)
	return playerStats
}

export async function loader({ params }: LoaderFunctionArgs) {
	console.log({ params })
	try {
		const { player } = params

		if (!player) {
			return invariantResponse('No player provided', { status: 400 })
		}
		// need to get player data to get more than just basic stats and details
		const landingData = await getPlayerLandingStats(player)

		// get the player's schedule
		const teamSchedule = await getTeamSchedule(
			landingData.currentTeamAbbrev,
			20232024,
		)

		const gamePBPStats = await getSeasonGameStats(teamSchedule.games)
		const pbpStats = await getPBPStats(gamePBPStats)

		const playerPBPStats = await getPlayerPBPStats(parseInt(player), pbpStats)
		console.log(playerPBPStats)
		return json({ playerLandingData: landingData, playerPBPStats })
	} catch (error) {
		console.log({ error })
	}
	return json({})
}

export default function PlayerRoute() {
	const { playerLandingData, playerPBPStats } = useLoaderData<typeof loader>()

	return (
		<div className="mx-auto flex h-full w-full max-w-lg flex-col justify-center gap-4 p-4">
			<h1 className="mb-4">
				Play by Play Stats for{' '}
				{`${playerLandingData.firstName.default} ${playerLandingData.lastName.default}`}
			</h1>
			<div className="flex max-w-sm flex-wrap gap-2">
				<StatsPopup
					popupTitle="Temp Player Details"
					triggerTitle="Temp Player Details"
				>
					<pre>{JSON.stringify(playerLandingData, null, 2)}</pre>
				</StatsPopup>
				<StatsPopup
					popupTitle="Temp PBP Details"
					triggerTitle="Temp PBP Details"
				>
					<pre>{JSON.stringify(playerPBPStats, null, 2)}</pre>
				</StatsPopup>
			</div>
		</div>
	)
}
