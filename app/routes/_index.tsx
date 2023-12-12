import type { LoaderFunctionArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import { spotifyStrategy } from '~/services/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const sessionData = spotifyStrategy.getSession(request)
	return sessionData
}

export default function Index() {
	const data = useLoaderData<typeof loader>()
	const user = data?.user

	return (
		<div style={{ textAlign: 'center', padding: 20 }}>
			<h2>Welcome to Remix!</h2>
			<p>
				<a href='https://docs.remix.run'>Check out the docs</a> to get started.
			</p>
			{user ? (
				<>
					<p>You are logged in as: {user?.email}</p>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</>
			) : (
				<p>You are not logged in yet!</p>
			)}
			<Form action={user ? '/logout' : '/auth/spotify'} method='GET'>
				<button type='submit'>{user ? 'Logout' : 'Log in with Spotify'}</button>
			</Form>
		</div>
	)
}
