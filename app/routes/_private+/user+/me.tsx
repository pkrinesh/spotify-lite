import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { spotifyStrategy } from '~/services/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const sessionData = await spotifyStrategy.getSession(request)
	const token = sessionData?.accessToken ?? ''

	const res = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})

	console.log(await res.json())
	return sessionData
}

export default function UserProfile() {
	const data = useLoaderData<typeof loader>()
	const user = data?.user

	return (
		<div className='min-h-screen flex justify-center items-center text-center'>
			{/* <Link to={path('/user/profile')}>Profile</Link> */}
			<p>{user?.email}</p>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
