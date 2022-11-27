# Change Log

## [0.1.0] - 2022-11-22

Here we would have the update steps for 0.1.3 for people to follow.

### Added

- init projectr.
- Added alulu sharing page.

### Changed

Modified project schema

## [0.1.1] - 2022-11-25

Modify the user authentication logic. The token and refresh token are saved separately. The video link intercepts the header request through the service worker.

### Added

- Service worker proxy image and video request.
- Add the refreshToken.astro page to complete the token expiration refresh and save the refresh token


### Changed

Modify axios to fetch, because cloudflare does not support
