import { routesConfig } from '../../routes.config'

type ParseUrlParams<Url> = Url extends `${infer Path}(${infer OptionalPath})`
	? ParseUrlParams<Path> & Partial<ParseUrlParams<OptionalPath>>
	: Url extends `${infer Start}/${infer Rest}`
	  ? ParseUrlParams<Start> & ParseUrlParams<Rest>
	  : Url extends `:${infer Param}`
		  ? { [K in Param]: string }
		  : // biome-ignore lint/complexity/noBannedTypes: <explanation>
			  {}

export function path<
	T extends (typeof routesConfig)[number],
	P extends {
		params: ParseUrlParams<T>
	},
>(
	...args: P['params'] extends Record<string, never>
		? [path: T]
		: [path: T, params: P['params']]
) {
	const [path, params] = args
	if (!params) return path

	let url = Object.entries<string>(params).reduce<string>(
		(path, [key, value]) => path.replace(`:${key}`, value),
		path as string,
	)

	url = url.replace(/(\(|\)|\/?:[^\/]+)/g, '')

	return url
}
