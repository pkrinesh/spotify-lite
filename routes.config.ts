export const routesConfig = {
  "routes/auth+/login": "/auth/login",
  "routes/auth+/logout": "/auth/logout",
  "routes/auth+/spotify": "/auth/spotify",
  "routes/auth+/spotify.callback": "/auth/spotify/callback",
  "routes/_index": "/",
  "routes/_private+/_layout": "/",
  "routes/_private+/_user+/user": "/user",
  "routes/_private+/_user+/user.me": "/user/me",
  "routes/_private+/_user+/user.playlists": "/user/playlists",
  "routes/_private+/_user+/user.recent": "/user/recent",
  "routes/_private+/_user+/user.top-artists": "/user/top-artists",
  "routes/_private+/_user+/user.top-tracks": "/user/top-tracks"
} as const;
