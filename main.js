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

    distribution: {
      AWSLondon: { loadZone: 'amazon:gb:london', percent: 100 },
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