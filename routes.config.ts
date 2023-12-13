export const routesConfig = {
  "routes/auth+/spotify": "/auth/spotify",
  "routes/auth+/spotify.callback": "/auth/spotify/callback",
  "routes/login": "/login",
  "routes/logout": "/logout",
  "routes/user.$id": "/user/:id",
  "routes/_index": "/"
} as const;
