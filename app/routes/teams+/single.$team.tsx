import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { NavLink, useLoaderData } from '@remix-run/react'
import { getTeamRoster } from './teams.server'
import { invariant } from '@epic-web/invariant'
import React from 'react'

export async function loader({ params }: LoaderFunctionArgs) {
	console.log({ params })
	const { team } = params
	invariant(team, 'Team name is required')
	const currentYear = new Date().getFullYear()
	const previousYear = new Date().getFullYear() - 1
	const previousSeason = `${previousYear}${currentYear}`
	const players = await getTeamRoster(team, previousSeason)

	if (players.length === 0) {
		throw new Response('Not Found', { status: 404 })
	}

	return json({ teamName: team, players })
}

export default function TeamRoute() {
	const { teamName, players } = useLoaderData<typeof loader>()

	return (
		<div className="w-ful0l mx-auto flex h-full max-w-5xl flex-col justify-center gap-4 p-4">
			<h1 className="text-3xl">{teamName}</h1>
			<h2>Players:</h2>
			<ul className="grid grid-cols-3 gap-4">
				{players.map(player => (
					<li
						key={player.id}
						className="border border-muted-foreground p-4 text-lg"
					>
						<NavLink
							to={`/players/single/${player.playerId}`}
							className="flex gap-2 text-body-md hover:opacity-50 transition-all"
						>
							{player.first} {player.last} - {player.position} (#{player.jersey}
							)
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	)
}
