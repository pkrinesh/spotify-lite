import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getRecent } from '~/server/api/get-recents'
import { requireAuth } from '~/server/utils/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireAuth(request)
	const data = await getRecent(request)
	return data
}

export default function Component() {
	const data = useLoaderData<typeof loader>()
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
