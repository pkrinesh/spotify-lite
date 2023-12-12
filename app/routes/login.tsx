import { ActionFunctionArgs } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'

export async function action({ request }: ActionFunctionArgs) {
	return await authenticator.authenticate('spotify', request)
}

export default function Login() {
	return (
		<Form method='post'>
			<button type='submit'>Login</button>
		</Form>
	)
}
