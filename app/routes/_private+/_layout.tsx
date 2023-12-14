import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { spotifyStrategy } from '~/services/auth.server'
import { path } from '~/utils/typed-routes'

export async function loader({ request }: LoaderFunctionArgs) {
	const sessionData = await spotifyStrategy.getSession(request)
	if (!sessionData?.user) {
		return redirect(path('/'))
	}
	return null
}

export default function User() {
	return (
		<>
			<Outlet />
		</>
	)
}
