import { base_url } from "./config.js";
import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export function addToCart() {
  group("Add to Cart", function () {
    const response = http.post(
      `https://${base_url}/?wc-ajax=add_to_cart`,
      {
        // product_sku: "1000",
        // product_id: "47",
        // quantity: "1",

        product_sku: globalThis.vars["selectedProduct"].sku,
        product_id: globalThis.vars["selectedProduct"].id,
        quantity: "1",
      },
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          connection: "keep-alive",
          "content-type":
            "application/x-www-form-urlencoded;type=content-type;mimeType=application/x-www-form-urlencoded",
          host: `${base_url}`,
          origin: `https://${base_url}`,
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    checkStatus({
      response: response,
      expectedStatus: 200,
      failOnError: true,
      printOnError: true
    });
  });

  sleep(randomIntBetween(pauseMin, pauseMax));
}