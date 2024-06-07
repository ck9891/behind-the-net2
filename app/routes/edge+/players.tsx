import { json, type LoaderFunctionArgs } from '@remix-run/node'

import { data } from '#app/data/edge_test.js'
import { useLoaderData } from '@remix-run/react'
import { PlayerStats } from '#app/types/edge'
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from '#app/components/ui/table'
import { StatsPopup } from '#app/components/stats-popup.js'

function transformYear(year: number) {
  const year1 = year.toString().slice(0, 4)
  const year2 = year.toString().slice(4, 8)
  return `${year1}-${year2}`
}
export function loader({ request }: LoaderFunctionArgs) {
	const playerStats: PlayerStats[] = data
	return json({ edgePlayerData: playerStats })
}

export default function EdgePlayersRoute() {
	const { edgePlayerData } = useLoaderData<typeof loader>()

	return (
    <div className='w-11/12 mx-auto rounded-md bg-foreground text-background p-4 shadow-slate-800 shadow-sm'>
      <Table>
        <TableCaption className='mb-4 text-background'>Player Edge Stats</TableCaption>
        <TableRow>
          <TableHead>Season</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Shoots</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Jersey</TableHead>
          <TableHead>GP</TableHead>
          <TableHead>Goals</TableHead>
          <TableHead>Assists</TableHead>
          <TableHead className='hidden sm:table-cell'>Actions</TableHead>
        </TableRow>
        <TableBody>
          {edgePlayerData.map(player => (
            <>
              <TableRow key={player.Player}>
                <TableCell className='w-[100px]'>{transformYear(player.Season)}</TableCell>
                <TableCell className='w-[170px]'>{player.First} {player.Last}</TableCell>
                <TableCell>{player.Pos}</TableCell>
                <TableCell>{player.Shoots}</TableCell>
                <TableCell>{player.Team}</TableCell>
                <TableCell>{player.Jersey}</TableCell>
                <TableCell>{player.GP}</TableCell>
                <TableCell>{player.G}</TableCell>
                <TableCell>{player.A}</TableCell>
                <TableCell className='flex gap-1 flex-wrap w-full'>
                <StatsPopup
                    popupTitle={`${player.First} ${player.Last} Speed`}
                    triggerTitle="View Speed Stats"
                    key={`${player.Season}-${player.Player}-speed`}
                  >
                    <Table>
                      <TableRow>
                        <TableHead>Skating Speed</TableHead>
                        <TableHead>Avg Skating Speed</TableHead>
                        <TableHead>%ile Skating Speed</TableHead>
                      </TableRow>
                      <TableBody>
                        <TableCell>{player['Skating Speed']}</TableCell>
                        <TableCell>{player['Avg Skating Speed']}</TableCell>
                        <TableCell>{player['%ile Skating Speed']}</TableCell>
                      </TableBody>
                    </Table>
                  </StatsPopup>

                  <StatsPopup
                    popupTitle={`${player.First} ${player.Last} Speed Bursts`}
                    triggerTitle="View Speed Burst Stats"
                    key={`${player.Season}-${player.Player}-bursts`}
                  >
                    <Table>
                      <TableRow>
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
                  </StatsPopup>
                  <StatsPopup
                    popupTitle={`${player.First} ${player.Last} Zone Starts`}
                    triggerTitle="View Zone Starts"
                    key={`${player.Season}-${player.Player}-zone-starts`}
                  >
                    <Table>
                      <TableRow>
                        <TableHead>O-Zone</TableHead>
                        <TableHead>Avg O-Zone</TableHead>
                        <TableHead>N-Zone</TableHead>
                        <TableHead>Avg N-Zone</TableHead>
                        <TableHead>D-Zone</TableHead>
                        <TableHead>Avg D-Zone</TableHead>
                      </TableRow>
                      <TableBody>
                        <TableCell>{player['O-Zone']}</TableCell>
                        <TableCell>{player['Avg O-Zone']}</TableCell>
                        <TableCell>{player['N-Zone']}</TableCell>
                        <TableCell>{player['Avg N-Zone']}</TableCell>
                        <TableCell>{player['D-Zone']}</TableCell>
                        <TableCell>{player['Avg D-Zone']}</TableCell>
                      </TableBody>
                    </Table>
                  </StatsPopup>

                  <StatsPopup
                    popupTitle={`${player.First} ${player.Last} Shot Speed`}
                    triggerTitle="View Shot Speed"
                    key={`${player.Season}-${player.Player}-shot-speed`}
                  >
                    <Table>
                      <TableRow>
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
                  </StatsPopup>
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell
                  colSpan={11}
                  className={`flex flex-wrap justify-center gap-2`}
                >
                  
                </TableCell>
              </TableRow> */}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
	)
}
