const paypal = require('@paypal/checkout-server-sdk');

const environment = new paypal.core.SandboxEnvironment(
    "ARXEyfWtOq_fNJp_jUf-bgcPmxxNZzQQjbgHRGpyPISCV6gEdG9aI4WvJL1yP0SOt_ZYZFaCLPmCyNF-", // Reemplaza con tu Client ID
    "ECWzFFxJ-8SwSKwnbKrbqx07rAW_VhHgZBcUqcWp1F3CW3PMptxASIu5z5GeytxXxn-Aa6ZNdEsSZU-8" // Reemplaza con tu Secret
);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = { client };
