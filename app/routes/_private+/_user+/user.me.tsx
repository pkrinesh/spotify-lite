import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getMe } from '~/server/api/getMe.server'
import { requireAuth } from '~/server/utils/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
	await requireAuth(request)
	const res = await getMe(request)

	return json(res)
}

export default function UserProfile() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className='min-h-screen flex justify-center items-center text-center'>
			<div className='flex flex-col gap-4'>
				<h3 className='text-xl font-medium'>{data?.email}</h3>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</div>
	)
}
