import { invariantResponse } from '@epic-web/invariant'
import { type Shift } from '@prisma/client'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { StatsPopup } from '#app/components/stats-popup.js'
import { type Player } from '#app/types/edge.js'
import { type PlayerShot, getPlayer, getPlayerEvents, getPlayerShots, getPlayerShifts} from './players.server'

export async function loader({ params }: LoaderFunctionArgs) {
	console.log({ params })

	const { playerId } = params
	invariantResponse(playerId, 'No playerId provided')
	const playerShifts: Shift[] = await getPlayerShifts(playerId);

	return json({playerShifts})
}


export default function PlayerDataRoute() {

	const { playerShifts } = useLoaderData<typeof loader>()
	console.log(playerShifts)

	return (
		<div className="mx-auto flex h-full w-ful0l max-w-5xl flex-col justify-center gap-4 p-4">
			<h2 className="mb-4 text-3xl">
				Player Shifts
			</h2>
			{/* <PlayerTable player={playerShifts} /> */}
			<div className="w-full max-w-5xl mx-auto">
				<h2>Player Shifts</h2>
				<p>Number of Shifts {playerShifts.length}</p>
				<pre>{JSON.stringify(playerShifts, null, 2)}</pre>
				</div>
		</div>
	)
}