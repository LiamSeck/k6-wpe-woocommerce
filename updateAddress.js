import { base_url } from "./config.js";
import { sleep, group } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export function updateAddress() {
  group("Update Address", function () {
    let response = http.post(
      `https://${base_url}/?wc-ajax=update_order_review`,
      {
        security: globalThis.vars["securityToken"],
        payment_method: "cod",
        country: "GB",
        state: "",
        postcode: "AA901XX",
        city: "London",
        address: "Address Line One",
        address_2: "",
        s_country: "GB",
        s_state: "",
        s_postcode: "AA901XX",
        s_city: "London",
        s_address: "Address Line One",
        s_address_2: "",
        has_full_address: "True",
        post_data:
          "billing_first_name=FirstName&billing_last_name=LastName&billing_company=&billing_country=GB&billing_address_1=Address%20Line%20One&billing_address_2=&billing_city=London&billing_state=&billing_postcode=AA901XX&billing_phone=00000000000&billing_email=contact%40kcesmail.tech&order_comments=&payment_method=cod&woocommerce-process-checkout-nonce=" + globalThis.vars["checkoutToken"] + "_wp_http_referer=%2Fcheckout%2F",      },
      {
        headers: {
          accept: "*/*",
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

    response = http.post(
      `https://${base_url}/?wc-ajax=update_order_review`,
      {
        security: globalThis.vars["securityToken"],
        payment_method: "cod",
        country: "GB",
        state: "",
        postcode: "AA901XX",
        city: "London",
        address: "Address Line One",
        address_2: "",
        s_country: "GB",
        s_state: "",
        s_postcode: "",
        s_city: "London",
        s_address: "Address Line One",
        s_address_2: "",
        has_full_address: "true",
        post_data:
          "billing_first_name=FirstName&billing_last_name=LastName&billing_company=&billing_country=GB&billing_address_1=Address%20Line%20One&billing_address_2=&billing_city=London&billing_state=&billing_postcode=AA901XX&billing_phone=00000000000&billing_email=contact%40kcesmail.tech&order_comments=&payment_method=cod&woocommerce-process-checkout-nonce=" + globalThis.vars["checkoutToken"] + "_wp_http_referer=%2Fcheckout%2F",
      },
      {
        headers: {
          accept: "*/*",
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