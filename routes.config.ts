export const routesConfig = {
  "routes/auth+/login": "/auth/login",
  "routes/auth+/logout": "/auth/logout",
  "routes/auth+/spotify": "/auth/spotify",
  "routes/auth+/spotify.callback": "/auth/spotify/callback",
  "routes/_index": "/",
  "routes/_private+/_layout": "/",
  "routes/_private+/user+/_layout": "/user",
  "routes/_private+/user+/me": "/user/me"
} as const;
