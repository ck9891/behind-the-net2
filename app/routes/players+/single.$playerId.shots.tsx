import { invariantResponse } from '@epic-web/invariant'
import { type Shift } from '@prisma/client'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { StatsPopup } from '#app/components/stats-popup.js'
import { type Player } from '#app/types/edge.js'
import {
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from '../../components/ui/table'
import { type PlayerShot, getPlayer, getPlayerEvents, getPlayerShots, getPlayerShifts} from './players.server'

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
	const { playerId } = params
	invariantResponse(playerId, 'No playerId provided')
	const playerShots: PlayerShot[] = await getPlayerShots(playerId);
	console.log(playerShots)
	const sortedShots: CategorizedShots = sortAndCategorizePlayerShots(playerShots);

	return json({playerShots:  [...sortedShots.close, ...sortedShots.reallyClose, ...sortedShots.notSoClose]})
}


export default function PlayerDataRoute() {

	const { playerShots } = useLoaderData<typeof loader>()

	return (
		<div className="mx-auto flex h-full w-ful0l max-w-5xl flex-col justify-center gap-4 p-4">
			<h2 className="mb-4 text-3xl">
				Player Shots
			</h2>
			

			<p>Number of Shots: {playerShots.length}</p>
			{/* <PlayerTable player={playerShifts} /> */}
			<PlayerShotsTable playerShots={playerShots} />

		</div>
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