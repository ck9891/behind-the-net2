import { type MetaFunction } from '@remix-run/node'

import { logos } from './logos/logos.ts'
import { Link } from 'lucide-react'
import { NavLink } from '@remix-run/react'

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
			<div className='flex flex-col gap-4'>
			<h1 className='text-2xl'>Coming Soon</h1>
			<NavLink className='flex gap-2' to="/edge/players">
				<Link />
				Go to Edge
			</NavLink>
			</div>
		</main>
	)
}
