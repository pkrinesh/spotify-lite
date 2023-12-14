import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { requireAuth } from '~/server/utils/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireAuth(request)

	return null
}

export default function User() {
	return (
		<>
			<Outlet />
		</>
	)
}
