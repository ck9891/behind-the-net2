import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import csv from 'csv-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import { prisma } from '#app/utils/db.server.js'

const batchSize = 2000 // Adjust this value based on your system's performance

const shiftFiles = ['shifts2021.csv']
const eventFiles = ['events2021.csv', 'events2022.csv', 'events2023.csv']

async function main() {
	try {
		console.log('🌱 Seeding...')
		console.time(`🌱 Database has been seeded`)

		// await seedPlayers()
		// console.log('Players seeded')
		
		// await seedEdgePlayerStats('player_list_edge_all.csv')
		// console.log('Edge Player Stats seeded')

		for (const file of shiftFiles) {
			await seedShifts(file)
			console.log(`Shifts seeded for ${file}`)
		}

		// for (const file of eventFiles) {
		// 	await seedEvents(file)
		// 	console.log(`Events seeded for ${file}`)
		// }

	

		console.timeEnd(`🌱 Database has been seeded`)
	} catch (e) {
		console.error(e)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

async function seedPlayers() {
	const filename = '../seedData/player_list_edge_all.csv'
	await processCSVInChunks(filename, 'player', row => ({
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
	}))
}

async function seedShifts(filename) {
	// if row[12] equals '' or undefined, it will be null

	await processCSVInChunks(filename, 'shift', row => {
		// console.log('shift row:')
		// console.log(row)
		// console.log(Object.keys(row).length)
		
		// console.table(row)
		return {
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
		}
	})
}

async function seedEvents(filename) {
	await processCSVInChunks(filename, 'event', row => ({
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
	}))
}

async function seedEdgePlayerStats(filename) {
	await processCSVInChunks(filename, 'edgePlayerStats', row => ({
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
	}))
}

async function retryTransaction(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await prisma.$transaction(operation, {
        maxWait: 10000, // 10 seconds
        timeout: 60000, // 60 seconds
      })
    } catch (error) {
      if (i === maxRetries - 1) throw error
      if (error.message.includes('Unable to start a transaction')) {
        console.log(`Retrying transaction (attempt ${i + 2}/${maxRetries})`)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)))
      } else {
        throw error
      }
    }
  }
}

async function processCSVInChunks(filename, model, rowProcessor, chunkSize = 10000) {
  let rows = [];
  let processedRows = 0;
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, `../seedData/${filename}`))
      .pipe(csv({ headers: false }))
      .on('data', (row) => {
        rows.push(rowProcessor(row));
        if (rows.length >= chunkSize) {
          processChunk(rows, model).then(count => {
            processedRows += count;
            console.log(`Processed ${processedRows} rows for ${model}`);
          });
          rows = [];
        }
      })
      .on('end', async () => {
        if (rows.length > 0) {
          const count = await processChunk(rows, model);
          processedRows += count;
        }
        console.log(`Finished processing ${processedRows} rows for ${model}`);
        resolve(null);
      })
      .on('error', reject);
  });
}
async function ensureConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
  } catch (e) {
    console.log('Reconnecting to database...')
    await prisma.$connect()
  }
}

// In the processChunk function:
async function processChunk(rows, model) {
  let processed = 0;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    try {
      await prisma[model].createMany({ data: batch });
      processed += batch.length;
    } catch (error) {
      console.error(`Error inserting batch for ${model}:`, error);
    }
  }
  return processed;
}
// async function processChunk(rows, model) {
//   let processed = 0;
//   for (let i = 0; i < rows.length; i += batchSize) {
//     const batch = rows.slice(i, i + batchSize);
//     const values = batch.map(row => `(${Object.values(row).map(v => `'${v}'`).join(',')})`).join(',');
//     const columns = Object.keys(batch[0]).join(',');
//     const query = `INSERT INTO ${model} (${columns}) VALUES ${values};`;
//     try {
//       await prisma.$executeRawUnsafe(query);
//       processed += batch.length;
//     } catch (error) {
//       console.error(`Error inserting batch for ${model}:`, error);
//     }
//   }
//   return processed;
// }
// async function processChunk(rows, model) {
//   let processed = 0;
//   for (let i = 0; i < rows.length; i += batchSize) {
//     await ensureConnection()
//     const batch = rows.slice(i, i + batchSize);
//     await retryTransaction(async (tx) => {
//       await tx[model].createMany({ data: batch });
//       processed += batch.length;
//     });
//   }
//   return processed;
// }

// async function processCSV1(filename, model, rowProcessor) {
//   return new Promise((resolve, reject) => {
//     let batch = [];
//     let i = 0;
//     fs.createReadStream(path.join(__dirname, `../seedData/${filename}`))
//       .pipe(csv({ headers: false }))
//       .on('data', (row) => {
//         batch.push(rowProcessor(row));

//         if (batch.length >= batchSize) {
//           const currentBatch = batch;
//           batch = [];
//           prisma.$transaction(async (tx) => {
//             try {
//               await tx[model].createMany({ data: currentBatch });
//               i += currentBatch.length;
//             } catch (error) {
//               console.error(`Error inserting batch for ${model}:`, error);
//             }
//           }).catch(error => {
//             console.error(`Transaction failed for ${model}:`, error);
//           });
//         }
//       })
//       .on('end', async () => {
//         if (batch.length > 0) {
//           await prisma.$transaction(async (tx) => {
//             try {
//               await tx[model].createMany({ data: batch });
//               i += batch.length;
//             } catch (error) {
//               console.error(`Error inserting final batch for ${model}:`, error);
//             }
//           }).catch(error => {
//             console.error(`Final transaction failed for ${model}:`, error);
//           });
//         }
//         console.log(`Processed ${i} rows for ${filename}`);
//         console.log(`Processed ${i} rows for ${model}, now at ${await prisma[model].count()}`);
//         resolve(null);
//       })
//       .on('error', (error) => {
//         reject(error);
//       });
//   });
// }

main().catch(e => {
	console.error(e)
	process.exit(1)
})
