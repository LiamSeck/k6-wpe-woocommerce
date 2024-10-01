import { navigateHomepage } from "./navigateHomepage.js";
import { addToCart } from "./addToCart.js";
import { navigateToCart } from "./navigateToCart.js";
import { navigateToCheckout } from "./navigateToCheckout.js";
import { updateAddress } from "./updateAddress.js";
import { submitCheckout } from "./submitCheckout.js";

export const options = {
  executor: 'constant-vus',
  vus: 10,
  duration: '5m',

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