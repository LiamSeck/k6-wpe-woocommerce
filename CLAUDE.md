# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a [k6](https://k6.io) load testing suite for a WooCommerce site hosted on WP Engine. It simulates a full e-commerce user journey: browse → add to cart → checkout.

## Running Tests

```bash
# Run against the default target (liamseprod.wpenginepowered.com)
k6 run main.js

# Run against a different WooCommerce site
k6 run -e HOSTNAME=domain.com main.js

# Run in Grafana Cloud k6
k6 cloud main.js
```

k6 must be installed and on your PATH. There is no package.json or build step — scripts run directly via the k6 runtime.

## Architecture

Each file represents one distinct user action in a sequential purchase flow. `main.js` imports and calls them in order:

1. `navigateHomepage.js` — GETs `/products/`, parses product listings, picks a random product, stores it in `globalThis.vars["selectedProduct"]`
2. `addToCart.js` — uses the selected product from step 1
3. `navigateToCart.js` — simulates "View Cart"
4. `navigateToCheckout.js` — extracts two dynamic tokens needed for checkout (stored in `globalThis.vars`)
5. `updateAddress.js` — fires the AJAX address update call that WooCommerce makes before checkout
6. `submitCheckout.js` — POSTs to `/?wc-ajax=checkout`, verifies `result: "success"` in JSON response, extracts order ID and redirect URL

**State is shared between modules via `globalThis.vars[]`** (an array set in `main.js`). Steps are not independently executable — they depend on values produced by earlier steps.

**`config.js`** exports `base_url`, resolved from the `HOSTNAME` env var or defaulting to the WP Engine host. All modules import this.

**`utils.js`** exports `checkStatus()`, the standard response validator used across all modules. It wraps k6's `check()` and optionally calls `fail()` to abort the iteration on unexpected status codes or missing response content. The `dynamicIds` parameter lets callers strip order-specific IDs from check names so k6 groups them correctly in results.

**Sleep between steps** uses `randomIntBetween(pauseMin, pauseMax)` (globals set in `main.js` to 2–5 seconds) to simulate realistic think time.

## k6 Options

Configured in `main.js` `options` export:
- Default: 1 VU, 5-minute duration
- Cloud project ID `3717362`, routed through `amazon:gb:london`
- Threshold: `http_req_failed < 1%`

The server is not scaled for heavy load — keep VU counts low when running against the live site.
