import { ActionFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/server/provider/spotify.server'

export async function loader({ request }: ActionFunctionArgs) {
	await authenticator.authenticate('spotify', request)
}

// export default function Login() {
// 	return (
// 		<Form method='post'>
// 			<button type='submit'>Login</button>
// 		</Form>
// 	)
// }
