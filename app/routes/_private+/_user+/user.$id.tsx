import { LoaderFunctionArgs } from '@remix-run/node'
import { useParams } from '@remix-run/react'

export async function loader({ request }: LoaderFunctionArgs) {
	return null
}

export default function UserProfile() {
	const { id } = useParams()

	return (
		<div className='min-h-screen flex justify-center items-center text-center'>
			<div className='flex flex-col gap-4'>
				<h3 className='text-xl font-medium'>{id}</h3>
			</div>
		</div>
	)
}
