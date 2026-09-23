# Janssen Orders — Google Sheets connection

The cart now posts checkout data to the deployed Apps Script Web App.

## Important
Update the Apps Script code using `GOOGLE_APPS_SCRIPT_FINAL.js`, save it, then create a new deployment version.

Web App URL configured in the site:
`https://script.google.com/macros/s/AKfycbw4b8TyQlShSQJ72xL_dPoklH7gp65D2yQBRV9Jt5BMLfW76d9yDwTeLM2LeXHJQp0Jdg/exec`

The checkout sends form-encoded data to avoid browser CORS preflight. Payment screenshots are resized client-side and sent as base64 to Apps Script, which saves them in the `Janssen Payment Proofs` Drive folder.


## Version 13 — matching Order ID + cache bust
The checkout generates a unique JAN-XXXXXXXXXXXX... Order ID in the browser and sends that exact ID to Apps Script. Apps Script stores the exact same ID in Google Sheets and rejects duplicate IDs. Phone validation is enforced in the browser and server.


## Browser cache
The cart script is loaded with `?v=13` so an older cached cart.js cannot keep generating the old JAN-1001 IDs. The browser-generated ID is sent unchanged to Apps Script and displayed on the confirmation page.
