import { z } from 'zod'
import { apiClient } from './api-client'

const MeSchema = z.object({
	display_name: z.string(),
	external_urls: z.object({ spotify: z.string() }),
	href: z.string(),
	id: z.string(),
	images: z.array(z.unknown()),
	type: z.enum(['user']),
	uri: z.string(),
	followers: z.object({ href: z.null(), total: z.number() }),
	country: z.string(),
	product: z.enum(['free']),
	explicit_content: z.object({
		filter_enabled: z.boolean(),
		filter_locked: z.boolean(),
	}),
	email: z.string(),
})

type Me = z.infer<typeof MeSchema>

export async function getMe(request: Request) {
	return await apiClient<Me>('me', request)
}
