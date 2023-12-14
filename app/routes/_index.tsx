import { type LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { getAuthSession } from '~/server/utils/auth.server'

import { path } from '~/utils/typed-routes'

export async function loader({ request }: LoaderFunctionArgs) {
	const sessionData = await getAuthSession(request)
	if (sessionData?.user) {
		return redirect(path('/user/me'))
	}

	return null
}

export default function Index() {
	return (
		<div
			className='min-h-screen flex justify-center items-center
								bg-gradient-to-bl from-black to-70% to-[--night-green]
							'
		>
			<div className='text-white text-center'>
				<h2>Welcome to Spotify-lite!</h2>
				<Form action={path('/auth/spotify')} method='GET'>
					<button type='submit'>Log in with Spotify</button>
				</Form>
			</div>
		</div>
	)
}
