import { Form, Outlet } from '@remix-run/react'
import { path } from '~/utils/typed-routes'

export async function loader() {
	return null
}

export default function User() {
	return (
		<div>
			<Form action={path('/auth/logout')} method='GET'>
				<button type='submit'>Logout</button>
			</Form>
			<Outlet />
		</div>
	)
}
