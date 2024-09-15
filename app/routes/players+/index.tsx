import {
	type ActionFunctionArgs,
	json,
	type LoaderFunctionArgs,
} from '@remix-run/node'

import {
	Form,
	NavLink,
	useActionData,
	useLoaderData,
	useSubmit,
} from '@remix-run/react'
import { Link } from 'lucide-react'
import React from 'react'
import { StatsPopup } from '#app/components/stats-popup.js'
import { Button } from '#app/components/ui/button.js'
import { Checkbox } from '#app/components/ui/checkbox.js'
import { Input } from '#app/components/ui/input.js'
import { Label } from '#app/components/ui/label.js'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '#app/components/ui/select'
import {
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from '#app/components/ui/table'

import { transformYear } from '#app/utils/misc.tsx'
import { getPlayers } from './players.server'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const season = formData.get('season')
	const team = formData.get('team')
	const position = formData.get('position')
	const firstName = formData.get('first-name')
	const lastName = formData.get('last-name')
	const page = parseInt(formData.get('number-of-players')) || 50
  const sort = formData.get('sort')
  console.log(sort)
	const players = await getPlayers({
		page,
		skip: 0,
		season,
		team,
		position,
		firstName,
		lastName,
	})
	console.log(players)
	return json({ players })
}

export async function loader({ request }: LoaderFunctionArgs) {
	const players = await getPlayers({ page: 50, skip: 0 })
	return json({ edgePlayerData: players })
}

export default function EdgePlayersRoute() {
	const { edgePlayerData } = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()
	const filteredPlayers = actionData?.players

	const players = filteredPlayers || edgePlayerData

	const submit = useSubmit()

	const handleChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const form = event.currentTarget.form
			if (form) {
				submit(form)
			}
		},
		[submit],
	)

	return (
		<Form
			method="POST"
			className="mx-auto w-11/12 rounded-md bg-foreground p-4 text-background shadow-sm shadow-slate-800"
		>
			<div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
				<p className="text-body-md text-muted-foreground">Filters:</p>
				<Input
					name="first-name"
					placeholder="First Name"
					className="bg-foreground"
					onChange={handleChange}
				/>
				<Input
					name="last-name"
					placeholder="Last Name"
					className="bg-foreground"
					onChange={handleChange}
				/>
				<Select name="season">
					<SelectTrigger>
						<SelectValue placeholder="Select a season…" />
						<SelectContent>
							<SelectItem value="20222023">2023</SelectItem>
							<SelectItem value="20212022">2022</SelectItem>
							<SelectItem value="20202021">2021</SelectItem>
						</SelectContent>
					</SelectTrigger>
				</Select>
				<Select name="team">
					<SelectTrigger>
						<SelectValue placeholder="Select a team…" />
						<SelectContent>
							<SelectItem value="VAN">VAN</SelectItem>
							<SelectItem value="NYR">NYR</SelectItem>
							<SelectItem value="PHI">PHI</SelectItem>
							<SelectItem value="TBL">TBL</SelectItem>
						</SelectContent>
					</SelectTrigger>
				</Select>
				<Select name="position">
					<SelectTrigger>
						<SelectValue placeholder="Select a position…" />
						<SelectContent>
							<SelectItem value="C">C</SelectItem>
							<SelectItem value="LW">LW</SelectItem>
							<SelectItem value="RW">RW</SelectItem>
							<SelectItem value="D">D</SelectItem>
						</SelectContent>
					</SelectTrigger>
				</Select>
				<Select name="number-of-players">
					<SelectTrigger>
						<SelectValue placeholder="Select a number of players…" />
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="25">25</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
							<SelectItem value="250">250</SelectItem>
							<SelectItem value="500">500</SelectItem>
							<SelectItem value="1000">1000</SelectItem>
						</SelectContent>
					</SelectTrigger>
				</Select>
				<Button className="w-full md:w-auto" type="submit">
					Filter
				</Button>
			</div>
			<Table>
				<TableCaption className="mb-4 text-background">
					Player Edge Stats
				</TableCaption>
				<TableRow>
					<TableHead>
            <Label className="relative">Season
						<Checkbox name="sort" value="Season" onClick={e => handleChange(e)} className="text-background absolute w-full h-full l-0 opacity-0 cursor-pointer">
							Season
						</Checkbox>
            </Label>
					</TableHead>
					<TableHead>
            <Label className="relative">Name
						<Checkbox name="sort" value="Name" onClick={e => handleChange(e)} className="text-background absolute w-full h-full l-0 opacity-0 cursor-pointer">
							Name
						</Checkbox>
            </Label>
					</TableHead>
					<TableHead>
            <Label className="relative">Position
						<Checkbox name="sort" value="Position" onClick={e => handleChange(e)} className="text-background absolute w-full h-full l-0 opacity-0 cursor-pointer">
							Position
						</Checkbox>
            </Label>
					</TableHead>
					<TableHead>
            <Label className="relative">Shoots
						<Checkbox name="sort" value="Shoots" onClick={e => handleChange(e)} className="text-background absolute w-full h-full l-0 opacity-0 cursor-pointer">
							Shoots
						</Checkbox>
            </Label>
					</TableHead>
					<TableHead>
            <Label className="relative">Team
						<Checkbox name="sort" value="Team" onClick={e => handleChange(e)} className="text-background absolute w-full h-full l-0 opacity-0 cursor-pointer">
							Team
						</Checkbox>
            </Label>
					</TableHead>
					<TableHead>
            <Label className="relative">Jersey
						<Checkbox name="sort" value="Jersey" onClick={e => handleChange(e)} className="text-background absolute w-full h-full l-0 opacity-0 cursor-pointer">
							Jersey
						</Checkbox>
            </Label>
					</TableHead>
					<TableHead>
            <Label className="relative">GP
						<Checkbox name="sort" value="GP" onClick={e => handleChange(e)} className="text-background absolute w-full h-full l-0 opacity-0 cursor-pointer">
							GP
						</Checkbox>
            </Label>
					</TableHead>
					<TableHead>
            <Label className="relative">Goals
						<Checkbox name="sort" value="Goals" onClick={e => handleChange(e)} className="text-background absolute w-full h-full l-0 opacity-0 cursor-pointer">
							Goals
						</Checkbox>
            </Label>
					</TableHead>
					<TableHead>
            <Label className="relative">Assists
						<Checkbox name="sort" value="Assists" onClick={e => handleChange(e)} className="text-background absolute w-full h-full l-0 opacity-0 cursor-pointer">
							Assists
						</Checkbox>
            </Label>
					</TableHead>
				</TableRow>
				<TableBody>
					{players.map(player => (
						<>
							<TableRow key={player.playerId}>
								<TableCell className="w-[100px]">
									{transformYear(player.season)}
								</TableCell>
								<TableCell className="w-[170px]">
									<NavLink
										to={`./single/${player.playerId}`}
										className="flex gap-2"
									>
										<Link />
										{player.first} {player.last}
									</NavLink>
								</TableCell>
								<TableCell>{player.position}</TableCell>
								<TableCell>{player.shoots}</TableCell>
								<TableCell>{player.team}</TableCell>
								<TableCell>{player.jersey}</TableCell>
								<TableCell>{player.gp}</TableCell>
								<TableCell>{player.goals}</TableCell>
								<TableCell>{player.assists}</TableCell>
								{/* <TableCell className='flex gap-1 flex-wrap w-[140px] md:w-full'> */}
								{/* <StatsPopup
                    popupTitle={`${player.First} ${player.Last} Speed`}
                    triggerTitle="View Speed Stats"
                    key={`${player.Season}-${player.Player}-speed`}
                  >
                    <Table className='flex md:table'>
                      <TableRow className='flex flex-col md:table-row'>
                        <TableHead>Skating Speed</TableHead>
                        <TableHead>Avg Skating Speed</TableHead>
                        <TableHead>%ile Skating Speed</TableHead>
                      </TableRow>
                      <TableBody className='flex flex-col md:table-row'>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Skating Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg Skating Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['%ile Skating Speed']}</TableCell>
                      </TableBody>
                    </Table>
                  </StatsPopup>

                  <StatsPopup
                    popupTitle={`${player.First} ${player.Last} Speed Bursts`}
                    triggerTitle="View Speed Burst Stats"
                    key={`${player.Season}-${player.Player}-bursts`}
                  >
                    <Table className='flex md:table'>
                      <TableRow className='flex flex-col md:table-row'>
                        <TableHead>22+ Bursts</TableHead>
                        <TableHead>Avg 22+ Bursts</TableHead>
                        <TableHead>%ile 22+ Bursts</TableHead>
                        <TableHead>20-22 Bursts</TableHead>
                        <TableHead>Avg 20-22 Bursts</TableHead>
                        <TableHead>%ile 20-22 Bursts</TableHead>
                        <TableHead>18-20 Bursts</TableHead>
                        <TableHead>Avg 18-20 Bursts</TableHead>
                        <TableHead>%ile 18-20 Bursts</TableHead>
                      </TableRow>
                      <TableBody className='flex flex-col md:table-row border-l md:border-l-0'>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['22+ Bursts']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg 22+ Bursts']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['%ile 22+ Bursts']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['20-22 Bursts']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg 20-22 Bursts']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['%ile 20-22 Bursts']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['18-20 Bursts']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg 18-20 Bursts']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['%ile 18-20 Bursts']}</TableCell>
                      </TableBody>
                    </Table>
                  </StatsPopup>
                  <StatsPopup
                    popupTitle={`${player.First} ${player.Last} Zone Starts`}
                    triggerTitle="View Zone Starts"
                    key={`${player.Season}-${player.Player}-zone-starts`}
                  >
                    <Table className='flex md:table'>
                      <TableRow className='flex flex-col md:table-row'>
                        <TableHead>O-Zone</TableHead>
                        <TableHead>Avg O-Zone</TableHead>
                        <TableHead>N-Zone</TableHead>
                        <TableHead>Avg N-Zone</TableHead>
                        <TableHead>D-Zone</TableHead>
                        <TableHead>Avg D-Zone</TableHead>
                      </TableRow>
                      <TableBody className='flex flex-col md:table-row border-l md:border-l-0'>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['O-Zone']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg O-Zone']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['N-Zone']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg N-Zone']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['D-Zone']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg D-Zone']}</TableCell>
                      </TableBody>
                    </Table>
                  </StatsPopup>

                  <StatsPopup
                    popupTitle={`${player.First} ${player.Last} Shot Speed`}
                    triggerTitle="View Shot Speed"
                    key={`${player.Season}-${player.Player}-shot-speed`}
                  >
                    <Table className='flex md:table'>
                      <TableRow className='flex flex-col md:table-row'>
                        <TableHead>Shot Speed</TableHead>
                        <TableHead>Avg Shot Speed</TableHead>
                        <TableHead>%ile Shot Speed</TableHead>
                        <TableHead>100+ Speed</TableHead>
                        <TableHead>Avg 100+ Speed</TableHead>
                        <TableHead>%ile 100+ Speed</TableHead>
                        <TableHead>90-100 Speed</TableHead>
                        <TableHead>Avg 90-100 Speed</TableHead>
                        <TableHead>%ile 90-100 Speed</TableHead>
                        <TableHead>80-90 Speed</TableHead>
                        <TableHead>Avg 80-90 Speed</TableHead>
                        <TableHead>%ile 80-90 Speed</TableHead>
                        <TableHead>70-80 Speed</TableHead>
                        <TableHead>Avg 70-80 Speed</TableHead>
                        <TableHead>%ile 70-80 Speed</TableHead>
                      </TableRow>
                      <TableBody className='flex flex-col md:table-row border-l md:border-l-0'>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Shot Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg Shot Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['%ile Shot Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['100+ Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg 100+ Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['%ile 100+ Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['90-100 Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg 90-100 Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['%ile 90-100 Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['80-90 Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg 80-90 Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['%ile 80-90 Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['70-80 Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['Avg 70-80 Speed']}</TableCell>
                        <TableCell className='pt-0 md:p-4 h-12'>{player['%ile 70-80 Speed']}</TableCell>
                      </TableBody>
                    </Table>
                  </StatsPopup> */}
								{/* </TableCell> */}
							</TableRow>
						</>
					))}
				</TableBody>
			</Table>
		</Form>
	)
}
