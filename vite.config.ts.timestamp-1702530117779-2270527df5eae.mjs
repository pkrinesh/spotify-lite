// vite.config.ts
import { writeFile } from "node:fs/promises";
import { unstable_vitePlugin as remix } from "file:///F:/gh/spotify-lite/node_modules/.pnpm/@remix-run+dev@2.3.1_@remix-run+serve@2.3.1_typescript@5.3.3_vite@5.0.7/node_modules/@remix-run/dev/dist/index.js";
import { resolve } from "file:///F:/gh/spotify-lite/node_modules/.pnpm/pathe@1.1.1/node_modules/pathe/dist/index.mjs";
import { flatRoutes } from "file:///F:/gh/spotify-lite/node_modules/.pnpm/remix-flat-routes@0.6.4_@remix-run+dev@2.3.1/node_modules/remix-flat-routes/dist/index.js";
import { defineConfig } from "file:///F:/gh/spotify-lite/node_modules/.pnpm/vite@5.0.7/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///F:/gh/spotify-lite/node_modules/.pnpm/vite-tsconfig-paths@4.2.2_typescript@5.3.3_vite@5.0.7/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*"],
      routes: async (defineRoutes) => {
        await generateRoutes(flatRoutes("routes", defineRoutes));
        return flatRoutes("routes", defineRoutes);
      }
    }),
    tsconfigPaths()
  ]
});
async function generateRoutes(routesObject) {
  const routes = routesObject;
  const routesArray = Object.values(routes);
  const buildFullPath = (routeObject, itemId) => {
    const item = routeObject[itemId];
    if (!item)
      return "";
    const { parentId, path } = item;
    const parentPath = parentId !== "root" ? buildFullPath(routeObject, parentId ?? "") : "";
    return `${parentPath}/${path ?? ""}`.replace(/\/+$/, "");
  };
  const routeObj = {};
  routesArray.map((item) => {
    const absPath = buildFullPath(routes, item.id);
    routeObj[item.id] = absPath === "" ? "/" : absPath;
    return absPath;
  });
  const content = `export const routesConfig = ${JSON.stringify(
    routeObj,
    null,
    2
  )} as const;
`;
  const filePath = resolve("./routes.config.ts");
  await writeFile(filePath, content);
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxnaFxcXFxzcG90aWZ5LWxpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXGdoXFxcXHNwb3RpZnktbGl0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovZ2gvc3BvdGlmeS1saXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgd3JpdGVGaWxlIH0gZnJvbSAnbm9kZTpmcy9wcm9taXNlcydcclxuaW1wb3J0IHsgdW5zdGFibGVfdml0ZVBsdWdpbiBhcyByZW1peCB9IGZyb20gJ0ByZW1peC1ydW4vZGV2J1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aGUnXHJcbmltcG9ydCB7IFJvdXRlTWFuaWZlc3QsIGZsYXRSb3V0ZXMgfSBmcm9tICdyZW1peC1mbGF0LXJvdXRlcydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0cGx1Z2luczogW1xyXG5cdFx0cmVtaXgoe1xyXG5cdFx0XHRpZ25vcmVkUm91dGVGaWxlczogWycqKi8qJ10sXHJcblx0XHRcdHJvdXRlczogYXN5bmMgKGRlZmluZVJvdXRlcykgPT4ge1xyXG5cdFx0XHRcdGF3YWl0IGdlbmVyYXRlUm91dGVzKGZsYXRSb3V0ZXMoJ3JvdXRlcycsIGRlZmluZVJvdXRlcykpXHJcblx0XHRcdFx0cmV0dXJuIGZsYXRSb3V0ZXMoJ3JvdXRlcycsIGRlZmluZVJvdXRlcylcclxuXHRcdFx0fSxcclxuXHRcdH0pLFxyXG5cdFx0dHNjb25maWdQYXRocygpLFxyXG5cdF0sXHJcbn0pXHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVJvdXRlcyhyb3V0ZXNPYmplY3Q6IFJvdXRlTWFuaWZlc3QpIHtcclxuXHRjb25zdCByb3V0ZXMgPSByb3V0ZXNPYmplY3RcclxuXHRjb25zdCByb3V0ZXNBcnJheSA9IE9iamVjdC52YWx1ZXMocm91dGVzKVxyXG5cclxuXHRjb25zdCBidWlsZEZ1bGxQYXRoID0gKFxyXG5cdFx0cm91dGVPYmplY3Q6IFJvdXRlTWFuaWZlc3QsXHJcblx0XHRpdGVtSWQ6IHN0cmluZyxcclxuXHQpOiBzdHJpbmcgPT4ge1xyXG5cdFx0Y29uc3QgaXRlbSA9IHJvdXRlT2JqZWN0W2l0ZW1JZF1cclxuXHRcdGlmICghaXRlbSkgcmV0dXJuICcnXHJcblxyXG5cdFx0Y29uc3QgeyBwYXJlbnRJZCwgcGF0aCB9ID0gaXRlbVxyXG5cclxuXHRcdGNvbnN0IHBhcmVudFBhdGggPVxyXG5cdFx0XHRwYXJlbnRJZCAhPT0gJ3Jvb3QnID8gYnVpbGRGdWxsUGF0aChyb3V0ZU9iamVjdCwgcGFyZW50SWQgPz8gJycpIDogJydcclxuXHJcblx0XHRyZXR1cm4gYCR7cGFyZW50UGF0aH0vJHtwYXRoID8/ICcnfWAucmVwbGFjZSgvXFwvKyQvLCAnJylcclxuXHR9XHJcblxyXG5cdGNvbnN0IHJvdXRlT2JqOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge31cclxuXHJcblx0cm91dGVzQXJyYXkubWFwKChpdGVtKSA9PiB7XHJcblx0XHRjb25zdCBhYnNQYXRoID0gYnVpbGRGdWxsUGF0aChyb3V0ZXMsIGl0ZW0uaWQpXHJcblx0XHRyb3V0ZU9ialtpdGVtLmlkXSA9IGFic1BhdGggPT09ICcnID8gJy8nIDogYWJzUGF0aFxyXG5cdFx0cmV0dXJuIGFic1BhdGhcclxuXHR9KVxyXG5cclxuXHRjb25zdCBjb250ZW50ID0gYGV4cG9ydCBjb25zdCByb3V0ZXNDb25maWcgPSAke0pTT04uc3RyaW5naWZ5KFxyXG5cdFx0cm91dGVPYmosXHJcblx0XHRudWxsLFxyXG5cdFx0MixcclxuXHQpfSBhcyBjb25zdDtcXG5gXHJcblxyXG5cdGNvbnN0IGZpbGVQYXRoID0gcmVzb2x2ZSgnLi9yb3V0ZXMuY29uZmlnLnRzJylcclxuXHRhd2FpdCB3cml0ZUZpbGUoZmlsZVBhdGgsIGNvbnRlbnQpXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4TyxTQUFTLGlCQUFpQjtBQUN4USxTQUFTLHVCQUF1QixhQUFhO0FBQzdDLFNBQVMsZUFBZTtBQUN4QixTQUF3QixrQkFBa0I7QUFDMUMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLE1BQ0wsbUJBQW1CLENBQUMsTUFBTTtBQUFBLE1BQzFCLFFBQVEsT0FBTyxpQkFBaUI7QUFDL0IsY0FBTSxlQUFlLFdBQVcsVUFBVSxZQUFZLENBQUM7QUFDdkQsZUFBTyxXQUFXLFVBQVUsWUFBWTtBQUFBLE1BQ3pDO0FBQUEsSUFDRCxDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDZjtBQUNELENBQUM7QUFFRCxlQUFlLGVBQWUsY0FBNkI7QUFDMUQsUUFBTSxTQUFTO0FBQ2YsUUFBTSxjQUFjLE9BQU8sT0FBTyxNQUFNO0FBRXhDLFFBQU0sZ0JBQWdCLENBQ3JCLGFBQ0EsV0FDWTtBQUNaLFVBQU0sT0FBTyxZQUFZLE1BQU07QUFDL0IsUUFBSSxDQUFDO0FBQU0sYUFBTztBQUVsQixVQUFNLEVBQUUsVUFBVSxLQUFLLElBQUk7QUFFM0IsVUFBTSxhQUNMLGFBQWEsU0FBUyxjQUFjLGFBQWEsWUFBWSxFQUFFLElBQUk7QUFFcEUsV0FBTyxHQUFHLFVBQVUsSUFBSSxRQUFRLEVBQUUsR0FBRyxRQUFRLFFBQVEsRUFBRTtBQUFBLEVBQ3hEO0FBRUEsUUFBTSxXQUFtQyxDQUFDO0FBRTFDLGNBQVksSUFBSSxDQUFDLFNBQVM7QUFDekIsVUFBTSxVQUFVLGNBQWMsUUFBUSxLQUFLLEVBQUU7QUFDN0MsYUFBUyxLQUFLLEVBQUUsSUFBSSxZQUFZLEtBQUssTUFBTTtBQUMzQyxXQUFPO0FBQUEsRUFDUixDQUFDO0FBRUQsUUFBTSxVQUFVLCtCQUErQixLQUFLO0FBQUEsSUFDbkQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0QsQ0FBQztBQUFBO0FBRUQsUUFBTSxXQUFXLFFBQVEsb0JBQW9CO0FBQzdDLFFBQU0sVUFBVSxVQUFVLE9BQU87QUFDbEM7IiwKICAibmFtZXMiOiBbXQp9Cg==
