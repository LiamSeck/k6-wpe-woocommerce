import { navigateHomepage } from "./navigateHomepage.js";
import { addToCart } from "./addToCart.js";
import { navigateToCart } from "./navigateToCart.js";
import { navigateToCheckout } from "./navigateToCheckout.js";
import { updateAddress } from "./updateAddress.js";
import { submitCheckout } from "./submitCheckout.js";

export const options = {
  vus: 20,
  duration: '5m',
  cloud: {
    // Project: WPE WooCommerce Load Testing
    projectID: 3717362,
    // Test runs with the same name groups test runs together.
    name: 'Load Testing of https://liamseprod.wpenginepowered.com/',
    // Adding Load Zone so that traffic routes from amazon:gb:london over the default location
    distribution: {
      AWSLondon: { loadZone: 'amazon:gb:london', percent: 100 },
    },
    // Adding request error rates and request duration thresholds 
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },


  }
};

// used to store global variables
globalThis.vars = [];

// global min/max sleep durations (in seconds):
globalThis.pauseMin = 5;
globalThis.pauseMax = 10;

export default function main() {
  navigateHomepage();
  addToCart();
  navigateToCart();
  navigateToCheckout();
  updateAddress();
  submitCheckout();
}