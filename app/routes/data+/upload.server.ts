import { createReadStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { parse } from 'csv-parse'
import { prisma } from '#app/utils/db.server.ts'

export async function uploadFile(filename: string, contentType: string, file: File, model: string) {
	try {
			const fileContent = await file.text();
			const records = parse(fileContent, {
					columns: false,
					skip_empty_lines: true,
			});

			const batchSize = 500;
			for (let i = 0; i < records.length; i += batchSize) {
					const batch = records.slice(i, i + batchSize);
					await processRecords(batch, model);
			}

			// Save metadata about the upload
			// await prisma.fileUpload.create({
			//   data: {
			//     filename,
			//     model,
			//     uploadedAt: new Date(),
			//   },
			// });

			return { status: 'success' };
	} catch (error) {
			console.error('Upload error:', error);
			throw new Error('File upload failed');
	}
}

// export async function uploadFile(filename, contentType, file, model) {
// 	try {
// 	const records = []

// 	await pipeline(
// 		fileStream,
// 		parse({
// 			columns: false,
// 			skip_empty_lines: true,

// 		}),
// 		async function* (source) {
// 			for await (const record of source) {
// 				records.push(record)
//         console.log(record)
// 				// Process in batches of 1000 to avoid memory issues
// 				if (records.length >= 500) {
// 					yield* await processRecords(records, model)
//           console.log(records)
// 					records.length = 0
// 				}
// 			}

// 			// Process any remaining records
// 			if (records.length > 0) {
// 				yield* await processRecords(records, model)
// 			}
// 		},
// 	)

// 	// Save metadata about the upload
// 	// await prisma.fileUpload.create({
// 	//   data: {
// 	//     filename,
// 	//     model,
// 	//     uploadedAt: new Date(),
// 	//   },
// 	// });
// 	return { status: 'success' }
// 	} catch (error) {
// 		console.error('Upload error:', error)
// 		throw new Error('File upload failed')
// 	}
	
// }

async function* processRecords(records, model) {
	switch (model) {
		case 'shift':
			await prisma.shift.createMany({
				data: records.map(row => ({
					shiftId: parseInt(row[0]),
					detailCode: row[1] || '',
					gameId: row[2] || '',
					teamId: row[3] || '',
					period: parseInt(row[4]),
					startTime: parseInt(row[5]),
					duration: parseInt(row[6]),
					endTime: parseInt(row[7]),
					shiftNumber: parseInt(row[8]),
					typeCode: row[9] || '',
					eventNumber: parseInt(row[10]),
					eventDescription: row[11] || '',
					playerId: row[12],
				})),
				
			})
			break
		case 'player':
			await prisma.player.createMany({
				data: records.map(row => ({
					season: row[0] || 'unknown',
					playerId: row[1] || `${row[2]}-${row[3]}`,
					first: row[2] || 'unknown',
					last: row[3] || 'unknown',
					position: row[4] || 'unknown',
					shoots: row[5] || 'unknown',
					team: row[6] || 'unknown',
					jersey: parseInt(row[7]) || 0,
					gp: parseInt(row[8]) || 0,
					goals: parseInt(row[9]) || 0,
					assists: parseInt(row[10]) || 0,
				})),
				
			})
			break
		case 'event':
			await prisma.event.createMany({
				data: records.map(row => ({
					yrGm: row[0] || '',
					eventId: row[1] || '',
					maxRegulationPeriods: parseInt(row[2]) || 3,
					number: parseInt(row[3]) || 0,
					periodType: row[4] || 'REG',
					minutesElapsed: parseInt(row[5]) || 0,
					secondsElapsed: parseInt(row[6]) || 0,
					minutesRemaining: parseInt(row[7]) || 0,
					secondsRemaining: parseInt(row[8]) || 0,
					situationCode: row[9] || '',
					homeTeamDefendingSide: row[10] || '',
					typeCode: row[11] || '',
					zero: row[12] || '',
					sortOrder: parseInt(row[13]) || 0,
					xCoord: parseFloat(row[14]) || 0.0,
					yCoord: parseFloat(row[15]) || 0.0,
					zoneCode: row[16] || '',
					awayScore: parseInt(row[17]) || 0,
					awaySOG: parseInt(row[18]) || 0,
					homeScore: parseInt(row[19]) || 0,
					homeSOG: parseInt(row[20]) || 0,
					eventOwnerTeamId: row[21] || '',
					shotType: row[22] || '',
					playerId: parseInt(row[23]) || 0,
					shootingPlayerId: parseInt(row[24]) || 0,
					blockingPlayerId: parseInt(row[25]) || 0,
					goalieInNetId: parseInt(row[26]) || 0,
					winningPlayerId: parseInt(row[27]) || 0,
					losingPlayerId: parseInt(row[28]) || 0,
					committedByPlayerId: parseInt(row[29]) || 0,
					drawnByPlayerId: parseInt(row[30]) || 0,
					servedByPlayerId: parseInt(row[31]) || 0,
					hittingPlayerId: parseInt(row[32]) || 0,
					hitteePlayerId: parseInt(row[33]) || 0,
					descKey: row[34] || '',
					duration: parseInt(row[35]) || 0,
					reason: row[36] || '',
					secondaryReason: row[37] || '',
					scoringPlayerId: parseInt(row[38]) || 0,
					scoringPlayerTotal: parseInt(row[39]) || 0,
					assist1PlayerId: parseInt(row[40]) || 0,
					assist1PlayerTotal: parseInt(row[41]) || 0,
					assist2PlayerId: parseInt(row[42]) || 0,
					assist2PlayerTotal: parseInt(row[43]) || 0,
				})),
				
			})
			break
		case 'edge':
			await prisma.edgePlayerStats.createMany({
				data: records.map(row => ({
					season: parseInt(row[0]) || 0,
					player: parseInt(row[1]) || 0,
					first: row[2] || '',
					last: row[3] || '',
					pos: row[4] || '',
					shoots: row[5] || '',
					team: row[6] || '',
					jersey: parseInt(row[7]) || 0,
					gp: parseInt(row[8]) || 0,
					g: parseInt(row[9]) || 0,
					a: parseInt(row[10]) || 0,
					skatingSpeed: parseFloat(row[11]) || 0,
					avgSkatingSpeed: parseFloat(row[12]) || 0,
					percentileSkatingSpeed: parseFloat(row[13]) || 0,
					bursts22Plus: parseInt(row[14]) || 0,
					avgBursts22Plus: parseFloat(row[15]) || 0,
					percentileBursts22Plus: parseFloat(row[16]) || 0,
					bursts20To22: parseInt(row[17]) || 0,
					avgBursts20To22: parseFloat(row[18]) || 0,
					percentileBursts20To22: parseFloat(row[19]) || 0,
					bursts18To20: parseInt(row[20]) || 0,
					avgBursts18To20: parseFloat(row[21]) || 0,
					percentileBursts18To20: parseFloat(row[22]) || 0,
					oZone: row[23] || '',
					avgOZone: row[24] || '',
					nZone: row[25] || '',
					avgNZone: row[26] || '',
					dZone: row[27] || '',
					avgDZone: row[28] || '',
					shotSpeed: parseFloat(row[29]) || 0,
					avgShotSpeed: parseFloat(row[30]) || 0,
					percentileShotSpeed: parseFloat(row[31]) || 0,
					speed100Plus: parseInt(row[32]) || 0,
					avgSpeed100Plus: parseFloat(row[33]) || 0,
					percentileSpeed100Plus: parseFloat(row[34]) || 0,
					speed90To100: parseInt(row[35]) || 0,
					avgSpeed90To100: parseFloat(row[36]) || 0,
					percentileSpeed90To100: parseFloat(row[37]) || 0,
					speed80To90: parseInt(row[38]) || 0,
					avgSpeed80To90: parseFloat(row[39]) || 0,
					percentileSpeed80To90: parseFloat(row[40]) || 0,
					speed70To80: parseInt(row[41]) || 0,
					avgSpeed70To80: parseFloat(row[42]) || 0,
					percentileSpeed70To80: parseFloat(row[43]) || 0,
				})),
				
			})
			break
		default:
			throw new Error(`Unsupported model: ${model}`)
	}
	yield `Processed ${records.length} ${model} records`
}
