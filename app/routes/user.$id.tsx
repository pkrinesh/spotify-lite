import { useParams } from '@remix-run/react'

export default function UserProfile() {
	const { id } = useParams()
	return (
		<div>
			<p>{id}</p>
		</div>
	)
}
