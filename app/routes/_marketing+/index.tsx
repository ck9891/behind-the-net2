import { type MetaFunction } from '@remix-run/node'

import { NavLink } from '@remix-run/react'
import { Link, ShieldHalf, ShieldQuestion, User } from 'lucide-react'
import { Card, CardContent } from '#app/components/ui/card.js'
import { type logos } from './logos/logos.ts'

export const meta: MetaFunction = () => [{ title: 'Behind the Net' }]

// Tailwind Grid cell classes lookup
const columnClasses: Record<(typeof logos)[number]['column'], string> = {
	1: 'xl:col-start-1',
	2: 'xl:col-start-2',
	3: 'xl:col-start-3',
	4: 'xl:col-start-4',
	5: 'xl:col-start-5',
}
const rowClasses: Record<(typeof logos)[number]['row'], string> = {
	1: 'xl:row-start-1',
	2: 'xl:row-start-2',
	3: 'xl:row-start-3',
	4: 'xl:row-start-4',
	5: 'xl:row-start-5',
	6: 'xl:row-start-6',
}

export default function Index() {
	return (
		<main className="font-poppins grid h-full place-items-center">
			<div className="flex flex-col gap-4">
				<h1 className="text-2xl text-center">Behind the Net</h1>
				<div className="grid grid-cols-3 gap-4">
					<NavLink to="/players">
						<Card className='h-24 flex items-center justify-center'>
							<CardContent className="pb-0 items-center justify-center flex-col w-full h-full flex gap-2 bg-foreground hover:bg-background text-background hover:text-foreground transition-all rounded-md">
								<User />
								Go to Players
							</CardContent>
						</Card>
					</NavLink>
					<NavLink to="/teams">
						<Card className='h-24 flex items-center justify-center'>
							<CardContent className="pb-0 items-center justify-center flex-col w-full h-full flex gap-2 bg-foreground hover:bg-background text-background hover:text-foreground transition-all rounded-md">
								<ShieldHalf />
								Go to Teams
							</CardContent>
						</Card>
					</NavLink>
					<NavLink to="/about">
						<Card className='h-24 flex items-center justify-center'>
							<CardContent className="pb-0 items-center justify-center flex-col w-full h-full flex gap-2 bg-foreground hover:bg-background text-background hover:text-foreground transition-all rounded-md">
							<ShieldQuestion />
								About
							</CardContent>
						</Card>
					</NavLink>
				</div>
			</div>
		</main>
	)
}
