import { withQuery } from 'ufo'
import { Route } from '../../routes.config'

export type ParseUrlParams<Url> =
	Url extends `${infer Path}(${infer OptionalPath})`
		? ParseUrlParams<Path> & Partial<ParseUrlParams<OptionalPath>>
		: Url extends `${infer Start}/${infer Rest}`
		  ? ParseUrlParams<Start> & ParseUrlParams<Rest>
		  : Url extends `:${infer Param}`
			  ? { [K in Param]: string }
			  : // biome-ignore lint/complexity/noBannedTypes: <explanation>
				  {}

// type ObjectVal<T> = T[keyof T]
// type ObjectKey<T> = keyof T

// export type RouteId = ObjectKey<typeof routesConfig>
// export type Route = ObjectVal<typeof routesConfig>

export function path<
	T extends Route,
	P extends {
		params: ParseUrlParams<T>
		search?: Record<string, any> | undefined
	},
>(
	...args: P['params'] extends Record<string, never>
		? [path: T, params?: P['search']]
		: [path: T, params: P['params'] & P['search']]
) {
	const [path, params] = args
	if (!params) return path

	const searchParams = Object.entries(params).filter(
		([k, _]) => !path.includes(`:${k}`),
	)

	let url = Object.entries<string>(params).reduce(
		(path, [key, value]) => path.replace(`:${key}`, value),
		path as string,
	)

	// remove trailing slash
	url = url.replace(/(\(|\)|\/?:[^\/]+)/g, '')

	if (searchParams.length > 0)
		return withQuery(url, Object.fromEntries(searchParams))

	return url
}
