import { invariantResponse } from '@epic-web/invariant'
import { type EdgePlayerStats } from '@prisma/client'
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { colors } from 'chalk'
import React from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	Legend,
	ComposedChart,
	ScatterChart,
	Scatter,
} from 'recharts'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card.js'
import { StatsPopup } from '../../components/stats-popup.js'
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from '../../components/ui/table'
import { getEdgePlayerStats } from './players.server'


function transformYear(year: number) {
	const year1 = year.toString().slice(0, 4)
	const year2 = year.toString().slice(4, 8)
	return `${year1}-${year2}`
}

export async function loader({ params }: LoaderFunctionArgs) {
	console.log({ params })

	const { playerId } = params
	invariantResponse(playerId, 'No playerId provided')
	const playerEdgeData: EdgePlayerStats[] = await getEdgePlayerStats(playerId)

	return json({ playerEdgeData })
}

export default function PlayerEdgeDataRoute() {
	const { playerEdgeData } = useLoaderData<typeof loader>()
// Prepare data for the charts
const chartData = playerEdgeData.map(data => ({
  season: data.season,
  avgSpeed: parseFloat(data.avgSkatingSpeed),
  bursts22Plus: parseInt(data.bursts22Plus)
}));

// Function to generate ticks with a tighter range
const generateTicks = (data) => {
  const speeds = data.map(d => d.avgSpeed);
  const minSpeed = Math.min(...speeds);
  const maxSpeed = Math.max(...speeds);
  
  const start = Math.floor(minSpeed * 4) / 4; // Round down to nearest 0.25
  const end = Math.ceil(maxSpeed * 4) / 4;    // Round up to nearest 0.25
  
  const ticks = [];
  for (let i = start; i <= end; i += 0.25) {
    ticks.push(Number(i.toFixed(2))); // Ensure we don't get floating point errors
  }
  return ticks;
};


// Custom tick component
const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={8} textAnchor="end" fill="#666" >
        {payload.value.toFixed(2)}
      </text>
    </g>
  );
};
	return (
		<div className="w-ful0l mx-auto flex h-full max-w-5xl flex-col justify-center gap-4 p-4">
			<h2 className="mb-4 text-3xl">Edge Data</h2>
			<Table>
				<TableCaption className="mb-4 text-background">
					Player Edge Stats
				</TableCaption>
				<TableRow>
					<TableHead>Season</TableHead>

					<TableHead className="flex justify-center">Actions</TableHead>
				</TableRow>
				<TableBody>
					{playerEdgeData.map(player => (
						<>
							<TableRow key={`${player.season}-${player.player}`}>
								<TableCell className="w-[100px]">
									{transformYear(player.season)}
								</TableCell>

								<TableCell className="flex w-[140px] flex-wrap justify-center gap-2 md:w-full">
									<StatsPopup
										popupTitle={`${player.first} ${player.last} Speed`}
										triggerTitle="View Speed Stats"
										key={`${player.season}-${player.player}-speed`}
									>
										<Table className="flex md:table">
											<TableRow className="flex flex-col md:table-row">
												<TableHead>Skating Speed</TableHead>
												<TableHead>Avg Skating Speed</TableHead>
												<TableHead>%ile Skating Speed</TableHead>
											</TableRow>
											<TableBody className="flex flex-col md:table-row">
												<TableCell className="h-12 pt-0 md:p-4">
													{player.skatingSpeed}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgSkatingSpeed}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.percentileSkatingSpeed}
												</TableCell>
											</TableBody>
										</Table>
									</StatsPopup>

									<StatsPopup
										popupTitle={`${player.first} ${player.last} Speed Bursts`}
										triggerTitle="View Speed Burst Stats"
										key={`${player.season}-${player.player}-bursts`}
									>
										<Table className="flex md:table">
											<TableRow className="flex flex-col md:table-row">
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
											<TableBody className="flex flex-col border-l md:table-row md:border-l-0">
												<TableCell className="h-12 pt-0 md:p-4">
													{player.bursts22Plus}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgBursts22Plus}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.percentileBursts22Plus}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.bursts20To22}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgBursts20To22}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.percentileBursts20To22}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.bursts18To20}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgBursts18To20}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.percentileBursts18To20}
												</TableCell>
											</TableBody>
										</Table>
									</StatsPopup>
									<StatsPopup
										popupTitle={`${player.first} ${player.last} Zone Starts`}
										triggerTitle="View Zone Starts"
										key={`${player.season}-${player.player}-zone-starts`}
									>
										<Table className="flex md:table">
											<TableRow className="flex flex-col md:table-row">
												<TableHead>O-Zone</TableHead>
												<TableHead>Avg O-Zone</TableHead>
												<TableHead>N-Zone</TableHead>
												<TableHead>Avg N-Zone</TableHead>
												<TableHead>D-Zone</TableHead>
												<TableHead>Avg D-Zone</TableHead>
											</TableRow>
											<TableBody className="flex flex-col border-l md:table-row md:border-l-0">
												<TableCell className="h-12 pt-0 md:p-4">
													{player.oZone}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgOZone}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.nZone}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgNZone}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.dZone}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgDZone}
												</TableCell>
											</TableBody>
										</Table>
									</StatsPopup>

									<StatsPopup
										popupTitle={`${player.first} ${player.last} Shot Speed`}
										triggerTitle="View Shot Speed"
										key={`${player.season}-${player.player}-shot-speed`}
									>
										<Table className="flex md:table">
											<TableRow className="flex flex-col md:table-row">
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
											<TableBody className="flex flex-col border-l md:table-row md:border-l-0">
												<TableCell className="h-12 pt-0 md:p-4">
													{player.shotSpeed}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgShotSpeed}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.percentileShotSpeed}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.speed100Plus}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgSpeed100Plus}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.percentileSpeed100Plus}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.speed90To100}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgSpeed90To100}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.percentileSpeed90To100}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.speed80To90}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgSpeed80To90}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.percentileSpeed80To90}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.speed70To80}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.avgSpeed70To80}
												</TableCell>
												<TableCell className="h-12 pt-0 md:p-4">
													{player.percentileSpeed70To80}
												</TableCell>
											</TableBody>
										</Table>
									</StatsPopup>
								</TableCell>
							</TableRow>
						</>
					))}
				</TableBody>
			</Table>
			<Card>
  <CardHeader>
    <CardTitle>Zone Starts by Season</CardTitle>
  </CardHeader>
  <CardContent className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={playerEdgeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="season" tickFormatter={transformYear} />
        <YAxis domain={[0, 100]} />
        <Tooltip 
          labelFormatter={transformYear}
          formatter={(value, name) => [`${value}%`, name]}
        />
        <Legend />
        <Bar dataKey={(data) => parseFloat(data.dZone)} name="Defensive" fill="#8884d8" />
        <Bar dataKey={(data) => parseFloat(data.nZone)} name="Neutral" fill="#82ca9d" />
        <Bar dataKey={(data) => parseFloat(data.oZone)} name="Offensive" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

<Card>
  <CardHeader>
    <CardTitle>Average Speed by Season</CardTitle>
  </CardHeader>
  <CardContent className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="season" 
          type="category" 
          name="Season" 
          tickFormatter={transformYear}
        />
        <YAxis 
          dataKey="avgSpeed" 
          name="Average Speed" 
          unit="km/h"
          domain={['dataMin - 0.5', 'dataMax + 0.5']}
          ticks={generateTicks(chartData)}
          tick={<CustomYAxisTick />}
        />
        <Tooltip 
          formatter={(value, name) => [
            `${value.toFixed(2)} km/h`,
            "Average Speed"
          ]}
          labelFormatter={transformYear}
        />
        <Legend />
        <Line 
          type="monotone"
          dataKey="avgSpeed" 
          name={`${playerEdgeData[0].first} ${playerEdgeData[0].last} - Avg Speed`} 
          stroke="#8884d8"
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
<Card>
  <CardHeader>
    <CardTitle>Number of 22+ km/h Bursts by Season</CardTitle>
  </CardHeader>
  <CardContent className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="season" 
          type="category"
          tickFormatter={transformYear}
        />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => [value, name]}
          labelFormatter={transformYear}
        />
        <Legend />
        <Bar 
          dataKey="bursts22Plus" 
          name="22+ km/h Bursts" 
          fill="#82ca9d" 
        />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
		</div>
	)
}
