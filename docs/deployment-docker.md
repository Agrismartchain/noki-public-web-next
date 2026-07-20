# Docker deployment notes

This frontend is prepared for a Coolify-managed Docker deployment.

- Build image: `docker build -t noki-public-web-next:local .`
- Runtime port: `3000`
- Runtime host: `0.0.0.0`
- Health endpoint: `GET /api/health`
- Production canonical stays `https://noki-services.com`, including staging builds.

Before exposing a staging domain publicly, protect it with Cloudflare Access, Coolify access controls, or an equivalent noindex strategy so staging does not compete with production canonical URLs.

No frontend secret is required by the current public site.
