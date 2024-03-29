import { writeFile } from 'node:fs/promises'
import { unstable_vitePlugin as remix } from '@remix-run/dev'
import { resolve } from 'pathe'
import { RouteManifest, flatRoutes } from 'remix-flat-routes'
import { cleanDoubleSlashes } from 'ufo'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		remix({
			ignoredRouteFiles: ['**/*'],
			routes: async (defineRoutes) => {
				await generateRoutes(flatRoutes('routes', defineRoutes))
				return flatRoutes('routes', defineRoutes)
			},
		}),
		tsconfigPaths(),
		UnoCSS(),
	],
})

async function generateRoutes(routesObject: RouteManifest) {
	const routes = routesObject
	const routesArray = Object.values(routes)

	const buildFullPath = (
		routeObject: RouteManifest,
		itemId: string,
	): string => {
		const item = routeObject[itemId]
		if (!item) return ''

		const { parentId, path } = item

		const parentPath =
			parentId !== 'root' ? buildFullPath(routeObject, parentId ?? '') : ''

		return cleanDoubleSlashes(`${parentPath}/${path ?? ''}`)
	}

	const routeObj: Record<string, string> = {}
	const routeIdSet = new Set<string>()
	const routeValueSet = new Set<string>()

	routesArray.map((item) => {
		const absPath = buildFullPath(routes, item.id)
		routeObj[item.id] = absPath
		routeIdSet.add(JSON.stringify(item.id))
		routeValueSet.add(JSON.stringify(absPath))
		return absPath
	})

	const content = `export const routesConfig = ${JSON.stringify(
		routeObj,
		null,
		2,
	)} as const;\n\n`
	const routesId = `export type RouteId = ${[...routeIdSet].join(' | ')};\n\n`
	const routesValue = `export type Route = ${[...routeValueSet].join(' | ')};\n`

	const filePath = resolve('./routes.config.ts')
	await writeFile(filePath, content + routesId + routesValue)
}
