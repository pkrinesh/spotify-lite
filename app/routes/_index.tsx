import { type LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { getAuthSession } from '~/server/utils/auth.server'

import { path } from '~/utils/typed-remix'

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
			<div className='text-white text-center h-xs flex flex-col items-center justify-between'>
				<h2 className='text-3xl font-medium text-foreground/80'>
					Welcome to Spotify-lite
				</h2>
				<Form action={path('/auth/spotify')} method='POST'>
					<button
						className='bg-primary text-primary-foreground font-medium w-[280px] py2 rounded-full
												hover:opacity-60 transition
											'
						type='submit'
					>
						Log in with Spotify
					</button>
				</Form>
				<div className='' />
			</div>
		</div>
	)
}
