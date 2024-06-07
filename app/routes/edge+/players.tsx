import { json, type LoaderFunctionArgs } from '@remix-run/node'

import { data } from '#app/data/edge_test.js'
import { useLoaderData } from '@remix-run/react'
import { PlayerStats } from '#app/types/edge'

function Table({
	children,
	styles,
}: {
	children: React.ReactNode
	styles?: string
}) {
	let tableStyles = styles
		? styles
		: 'table-auto bg-white text-gray-800 m-4 w-full border border-collapse border-gray-800 radius-md shadow-md  w-full'

	return <table className={tableStyles}>{children}</table>
}

function TableRow({
	children,
	styles,
  rowSpan
}: {
	children: React.ReactNode
	styles?: string
  rowSpan?: number
}) {
	return <tr>{children}</tr>
}

function TableCell({
	children,
	styles,
  colSpan
}: {
	children: React.ReactNode
  colSpan?: number
	styles?: string
}) {
	let cellStyles = styles
		? styles
		: 'border border-collapse border-gray-800 p-2'
	return <td className={cellStyles} colSpan={colSpan}>{children}</td>
}

function TableHead({
	children,
	styles,
}: {
	children: React.ReactNode
	styles?: string
}) {
	return <thead>{children}</thead>
}

function TableBody({
	children,
	styles,
}: {
	children: React.ReactNode
	styles?: string
}) {
	return <tbody>{children}</tbody>
}

function TableFoot({
	children,
	styles,
}: {
	children: React.ReactNode
	styles?: string
}) {
	return <tfoot>{children}</tfoot>
}

function TableCaption({
	children,
	styles,
}: {
	children: React.ReactNode
	styles?: string
}) {
	return <caption className={styles}>{children}</caption>
}

function TableHeader({
	children,
	styles,
}: {
	children: React.ReactNode
	styles?: string
}) 
{
  let thStyles = styles ? styles : 'border border-collapse border-gray-800 p-2'

	return <th className={thStyles}>{children}</th>
}

export function loader({ request }: LoaderFunctionArgs) {
	const playerStats: PlayerStats[] = data
	return json({ edgePlayerData: playerStats })
}

export default function EdgePlayersRoute() {
	const { edgePlayerData } = useLoaderData<typeof loader>()

	return (
		<Table>
			<TableCaption>Player Stats</TableCaption>
			<TableHead>
				<TableRow>
					<TableHeader>Season</TableHeader>
					<TableHeader>Player</TableHeader>
					<TableHeader>First</TableHeader>
					<TableHeader>Last</TableHeader>
					<TableHeader>Pos</TableHeader>
					<TableHeader>Shoots</TableHeader>
					<TableHeader>Team</TableHeader>
					<TableHeader>Jersey</TableHeader>
					<TableHeader>GP</TableHeader>
					<TableHeader>G</TableHeader>
					<TableHeader>A</TableHeader>
				</TableRow>
			</TableHead>
			<TableBody>
				{edgePlayerData.map(player => (
					<>
						<TableRow key={player.Player}>
							<TableCell>{player.Season}</TableCell>
							<TableCell>{player.Player}</TableCell>
							<TableCell>{player.First}</TableCell>
							<TableCell>{player.Last}</TableCell>
							<TableCell>{player.Pos}</TableCell>
							<TableCell>{player.Shoots}</TableCell>
							<TableCell>{player.Team}</TableCell>
							<TableCell>{player.Jersey}</TableCell>
							<TableCell>{player.GP}</TableCell>
							<TableCell>{player.G}</TableCell>
							<TableCell>{player.A}</TableCell>
						</TableRow>
						<TableRow>
              <TableCell styles='border border-collapse border-gray-800 p-0' colSpan={11}>
							<Table styles='p-0 bg-background text-white w-full m-0'>
								<TableHead>
									<TableRow>
										<TableHeader>Skating Speed</TableHeader>
										<TableHeader>Avg Skating Speed</TableHeader>
										<TableHeader>%ile Skating Speed</TableHeader>
										
									</TableRow>
								</TableHead>
								<TableBody>
									<TableCell>{player['Skating Speed']}</TableCell>
									<TableCell>{player['Avg Skating Speed']}</TableCell>
									<TableCell>{player['%ile Skating Speed']}</TableCell>
								</TableBody>
							</Table>
              </TableCell>
						</TableRow>
            <TableRow>
              <TableCell styles='border border-collapse border-gray-800 p-0' colSpan={11}>
							<Table styles='p-0 bg-background text-white w-full m-0'>
								<TableHead>
									<TableRow>
										<TableHeader>22+ Bursts</TableHeader>
										<TableHeader>Avg 22+ Bursts</TableHeader>
										<TableHeader>%ile 22+ Bursts</TableHeader>
										<TableHeader>20-22 Bursts</TableHeader>
										<TableHeader>Avg 20-22 Bursts</TableHeader>
										<TableHeader>%ile 20-22 Bursts</TableHeader>
										<TableHeader>18-20 Bursts</TableHeader>
										<TableHeader>Avg 18-20 Bursts</TableHeader>
										<TableHeader>%ile 18-20 Bursts</TableHeader>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableCell>{player['22+ Bursts']}</TableCell>
									<TableCell>{player['Avg 22+ Bursts']}</TableCell>
									<TableCell>{player['%ile 22+ Bursts']}</TableCell>
                  <TableCell>{player['20-22 Bursts']}</TableCell>
									<TableCell>{player['Avg 20-22 Bursts']}</TableCell>
									<TableCell>{player['%ile 20-22 Bursts']}</TableCell>
									<TableCell>{player['18-20 Bursts']}</TableCell>
									<TableCell>{player['Avg 18-20 Bursts']}</TableCell>
									<TableCell>{player['%ile 18-20 Bursts']}</TableCell>
								</TableBody>
							</Table>
              </TableCell>
						</TableRow>
            <TableRow>
              <TableCell styles='border border-collapse border-gray-800 p-0' colSpan={11}>
							<Table styles='p-0 bg-background text-white w-full m-0'>
								<TableHead>
									<TableRow>
										<TableHeader>O-Zone</TableHeader>
										<TableHeader>Avg O-Zone</TableHeader>
										<TableHeader>N-Zone</TableHeader>
										<TableHeader>Avg N-Zone</TableHeader>
										<TableHeader>D-Zone</TableHeader>
										<TableHeader>Avg D-Zone</TableHeader>
										
									</TableRow>
								</TableHead>
								<TableBody>
								
									<TableCell>{player['O-Zone']}</TableCell>
									<TableCell>{player['Avg O-Zone']}</TableCell>
									<TableCell>{player['N-Zone']}</TableCell>
									<TableCell>{player['Avg N-Zone']}</TableCell>
									<TableCell>{player['D-Zone']}</TableCell>
									<TableCell>{player['Avg D-Zone']}</TableCell>
									
								</TableBody>
                
							</Table>
              </TableCell>
						</TableRow>
            <TableRow>
              <TableCell styles='border border-collapse border-gray-800 p-0' colSpan={11}>
							<Table styles='p-0 bg-background text-white w-full m-0'>
								<TableHead>
									<TableRow>

										<TableHeader>Shot Speed</TableHeader>
										<TableHeader>Avg Shot Speed</TableHeader>
										<TableHeader>%ile Shot Speed</TableHeader>
										<TableHeader>100+ Speed</TableHeader>
										<TableHeader>Avg 100+ Speed</TableHeader>
										<TableHeader>%ile 100+ Speed</TableHeader>
										<TableHeader>90-100 Speed</TableHeader>
										<TableHeader>Avg 90-100 Speed</TableHeader>
										<TableHeader>%ile 90-100 Speed</TableHeader>
										<TableHeader>80-90 Speed</TableHeader>
										<TableHeader>Avg 80-90 Speed</TableHeader>
										<TableHeader>%ile 80-90 Speed</TableHeader>
										<TableHeader>70-80 Speed</TableHeader>
										<TableHeader>Avg 70-80 Speed</TableHeader>
										<TableHeader>%ile 70-80 Speed</TableHeader>
									</TableRow>
								</TableHead>
								<TableBody>
								
									<TableCell>{player['Shot Speed']}</TableCell>
									<TableCell>{player['Avg Shot Speed']}</TableCell>
									<TableCell>{player['%ile Shot Speed']}</TableCell>
									<TableCell>{player['100+ Speed']}</TableCell>
									<TableCell>{player['Avg 100+ Speed']}</TableCell>
									<TableCell>{player['%ile 100+ Speed']}</TableCell>
									<TableCell>{player['90-100 Speed']}</TableCell>
									<TableCell>{player['Avg 90-100 Speed']}</TableCell>
									<TableCell>{player['%ile 90-100 Speed']}</TableCell>
									<TableCell>{player['80-90 Speed']}</TableCell>
									<TableCell>{player['Avg 80-90 Speed']}</TableCell>
									<TableCell>{player['%ile 80-90 Speed']}</TableCell>
									<TableCell>{player['70-80 Speed']}</TableCell>
									<TableCell>{player['Avg 70-80 Speed']}</TableCell>
									<TableCell>{player['%ile 70-80 Speed']}</TableCell>
								</TableBody>
                
							</Table>
              </TableCell>
						</TableRow>
            
					</>
				))}
			</TableBody>
			<TableFoot>
				<TableCaption styles='text-white'>
					Edge data last updated {new Date().toISOString()}
				</TableCaption>
			</TableFoot>
		</Table>
	)
}
