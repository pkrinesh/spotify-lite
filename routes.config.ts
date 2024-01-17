export const routesConfig = {
  "routes/auth+/login": "/auth/login",
  "routes/auth+/logout": "/auth/logout",
  "routes/auth+/spotify": "/auth/spotify",
  "routes/auth+/spotify.callback": "/auth/spotify/callback",
  "routes/_index": "/",
  "routes/_private+/_layout": "/",
  "routes/_private+/_user+/user": "/user",
  "routes/_private+/_user+/user.$id": "/user/:id",
  "routes/_private+/_user+/user.album": "/user/album",
  "routes/_private+/_user+/user.artists": "/user/artists",
  "routes/_private+/_user+/user.me": "/user/me",
  "routes/_private+/_user+/user.playlists": "/user/playlists",
  "routes/_private+/_user+/user.recent": "/user/recent",
  "routes/_private+/_user+/user.tracks": "/user/tracks"
} as const;

export type RouteId = "routes/auth+/login" | "routes/auth+/logout" | "routes/auth+/spotify" | "routes/auth+/spotify.callback" | "routes/_index" | "routes/_private+/_layout" | "routes/_private+/_user+/user" | "routes/_private+/_user+/user.$id" | "routes/_private+/_user+/user.album" | "routes/_private+/_user+/user.artists" | "routes/_private+/_user+/user.me" | "routes/_private+/_user+/user.playlists" | "routes/_private+/_user+/user.recent" | "routes/_private+/_user+/user.tracks";

export type Route = "/auth/login" | "/auth/logout" | "/auth/spotify" | "/auth/spotify/callback" | "/" | "/user" | "/user/:id" | "/user/album" | "/user/artists" | "/user/me" | "/user/playlists" | "/user/recent" | "/user/tracks";
