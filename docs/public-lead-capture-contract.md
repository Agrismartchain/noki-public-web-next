# Public Lead Capture Contract

Status: proposed backend contract. The current `noki-api` audit did not find a compatible public lead, merchant application, or merchant account provisioning endpoint. The public web UI must not claim persistence until one of these endpoints exists and confirms success.

## A. `POST /v1/public/leads`

Purpose: capture qualified public contact requests from `/contact`.

Request headers:

- `Content-Type: application/json`
- `Idempotency-Key: <uuid-v4>` generated server-side by the Next.js boundary or accepted from a trusted backend caller.

Payload:

```json
{
  "requestType": "demo",
  "locale": "fr",
  "contact": {
    "firstName": "string",
    "lastName": "string",
    "role": "string",
    "email": "name@company.com",
    "phone": "string",
    "countryCode": "+242",
    "country": "cg",
    "city": "string"
  },
  "company": {
    "name": "string",
    "website": "https://example.com"
  },
  "qualification": {
    "monthlyOrdersRange": "500-2000",
    "codShareRange": "50-75",
    "averageBasket": "string",
    "currency": "xaf",
    "platforms": ["shopify"],
    "servedCountries": ["cg"],
    "deliveryModel": "mixed",
    "painPoints": ["cod", "reconciliation"],
    "timeline": "1-3-months",
    "partnership": {
      "organizationType": "string",
      "services": "string",
      "coveredCountries": ["cg"],
      "zones": "string",
      "apiCapability": "yes",
      "partnershipType": "coverage",
      "proposal": "string",
      "technicalContact": "string"
    },
    "api": {
      "platform": "string",
      "stack": "string",
      "integrationNeeds": ["orders", "webhooks"],
      "environment": "saas",
      "technicalContact": "string",
      "sandbox": "yes",
      "comment": "string"
    }
  },
  "request": {
    "message": "string",
    "preferredChannel": "email"
  },
  "consent": {
    "contactConsent": true,
    "marketingConsent": false
  },
  "metadata": {
    "source": "public-web",
    "page": "/contact"
  }
}
```

Validation:

- `requestType`: `demo | commercial | merchant | logistics | technology | api | press | general | other`
- `locale`: `fr | en | ar`
- Required: contact first/last name, role, email, phone, country code, country, city, company name, preferred channel, message, contact consent.
- Validate email, phone length/characters, URL protocol if provided.
- Conditional fields required only for their request type groups.
- Ignore empty optional objects and empty arrays in persisted records.
- `metadata.submittedAt` must be created server-side, never trusted from the browser.

Success response:

```json
{
  "id": "lead_...",
  "status": "received"
}
```

Error responses:

- `400 invalid_payload`
- `409 duplicate_idempotency_key`
- `413 payload_too_large`
- `429 rate_limited`
- `500 lead_capture_unavailable`

## B. `POST /v1/public/merchant-applications`

Purpose: capture the `/register` six-step merchant prospect onboarding.

Payload groups:

```json
{
  "locale": "fr",
  "source": "public-web",
  "contact": {
    "firstName": "string",
    "lastName": "string",
    "role": "string",
    "email": "name@company.com",
    "phone": "string",
    "country": "cg",
    "city": "string",
    "preferredLanguage": "fr"
  },
  "company": {
    "legalName": "string",
    "brandName": "string",
    "website": "https://example.com",
    "registrationCountry": "cg",
    "mainCity": "string",
    "companyType": "pure-player",
    "sector": "fashion",
    "teamSize": "6-20",
    "yearsActive": "1-3",
    "legalId": "string"
  },
  "commerce": {
    "platforms": ["shopify"],
    "salesChannels": ["website"],
    "monthlyOrdersRange": "500-2000",
    "averageBasket": "string",
    "currency": "xaf",
    "codShareRange": "50-75",
    "servedCountries": ["cg"],
    "shopsRange": "2-5",
    "skuRange": "100-1000",
    "warehousesRange": "1"
  },
  "logistics": {
    "deliveryModel": "mixed",
    "carriers": "string",
    "couriersRange": "11-50",
    "zonesServed": "string",
    "deliveryTime": "24-48h"
  },
  "cod": {
    "remittanceFrequency": "weekly",
    "reconciliationDelay": "2-7-days",
    "failureRateRange": "5-15",
    "returnRateRange": "5-15",
    "painPoints": ["cod", "reconciliation"]
  },
  "integrations": {
    "modules": ["orders-confirmation"],
    "integrations": ["orders", "webhooks"],
    "apiAvailable": "yes",
    "techTeam": "review"
  },
  "needs": {
    "projectTimeline": "1-3-months",
    "mainGoal": "string",
    "comments": "string"
  },
  "consent": {
    "contactConsent": true,
    "marketingConsent": false
  }
}
```

Validation:

- Enforce the same country, range and enum sets as the public UI.
- Do not accept password, card, bank account, identity documents, API secrets or file uploads on this endpoint.
- Required groups: `contact`, `company`, `commerce`, `logistics`, `cod`, `integrations`, `needs`, `consent`.
- Server must add `submittedAt`, IP-derived anti-abuse context and normalized user agent in an internal metadata table.
- Store consent timestamp and source separately from the lead body.

Success response:

```json
{
  "id": "merchant_application_...",
  "status": "received"
}
```

## C. Merchant Auth Endpoint Needed

The existing audit found `POST /v1/auth/login`, but no confirmed public merchant account provisioning or registration lifecycle. Before connecting `/login`, the backend must define:

- Whether merchant users are human actors under the existing auth model.
- How merchant accounts are created, invited, approved and disabled.
- Token transport: bearer response or secure HTTP-only cookies.
- CORS policy for the public web origin.
- Password reset route if the UI is allowed to show a forgotten password flow.
- Audit trail without logging raw credentials or raw PII.

## Security Requirements

- Browser should call a Next.js server boundary, which calls `noki-api`.
- No backend secrets in `NEXT_PUBLIC_*`.
- Payload size limit, strict content type and method checks.
- Rate limiting by IP, user agent fingerprint and normalized email/company tuple.
- Honeypot support plus server-side bot scoring.
- Idempotency by request hash and `Idempotency-Key`.
- No raw payload logging. Log request id, endpoint, validation result and timing only.
- Sanitize free text before display in internal tools.
- Return generic errors to the browser; keep detailed validation paths server-side where appropriate.
