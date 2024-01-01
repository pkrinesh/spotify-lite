import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { authenticator } from '~/server/provider/spotify.server'
import { path } from '~/utils/typed-remix'

export async function loader() {
	return redirect(path('/auth/login'))
}

export async function action({ request }: ActionFunctionArgs) {
	return await authenticator.authenticate('spotify', request)
}
