import { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
	return null
}

export default function Albums() {
	return (
		<div>
			<h3>Albums</h3>
		</div>
	)
}
