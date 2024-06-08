import { StatsPopup } from '#app/components/stats-popup.js';
import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react';

export async function loader({ params }: LoaderFunctionArgs) {
	console.log({ params })
  try {
    const { player } = params;
    const response = await fetch(`https://api-web.nhle.com/v1/player/${player}/landing`);
    const data = await response.json();
    console.log({ data })
    return json({ playerData: data })
  } catch (error) {
    console.log({ error })
  }
	return json({})
}

export default function PlayerRoute() {

  const { playerData } = useLoaderData<typeof loader>()

	return (
		<div className='mx-auto w-full max-w-2xl'>
			<h1>Play by Play Stats</h1>
      <StatsPopup popupTitle='Temp Player Details' triggerTitle='Temp Player Details'>
      <pre>{JSON.stringify(playerData, null, 2)}</pre>
      </StatsPopup>
		</div>
	)
}
