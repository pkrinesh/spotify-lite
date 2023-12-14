import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPlatLists } from '~/server/api/get-playlists.server'
import { requireAuth } from '~/server/utils/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireAuth(request)
	const data = await getPlatLists(request)
	return data
}

export default function Component() {
	const data = useLoaderData<typeof loader>()
	return (
		<div>
			<p>Playlists</p>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
