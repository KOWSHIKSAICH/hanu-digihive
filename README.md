# HANU DIGIHIVE Website

A responsive, animated HTML/CSS/JavaScript agency website using the existing black-and-gold visual identity.

## File structure

```text
hanu_digihive_website/
├── index.html
├── privacy.html
├── robots.txt
├── sitemap.xml
├── README.md
├── assets/
│   ├── favicon.svg
│   └── og-cover.svg
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Run locally

Open `index.html` in a browser, or use VS Code's Live Server extension. Keep the folder structure unchanged because the HTML references `css/style.css` and `js/main.js`.

## Before publishing

1. Confirm the contact email, both phone numbers, address, and domain are correct.
2. Replace the sample concept artwork in the portfolio with real approved projects. The current panels are labelled as concepts and do not claim client work or results.
3. Replace Instagram, Facebook and LinkedIn links in the footer with HANU DIGIHIVE's actual profile URLs.
4. Add approved founder roles, biographies and photographs if you want to publish them.
5. Confirm the domain's canonical URL and sitemap URLs if the live website uses a different domain or non-www version.
6. Review the privacy notice against your actual data handling and applicable law.
7. Test mobile layout, form submission, contact links, accessibility, page speed and HTTPS on the deployed site.

## Contact form setup

The form is configured to send an AJAX request to:

`https://formsubmit.co/ajax/info@hanudigihive.com`

FormSubmit typically requires the inbox owner to activate the address using the confirmation email after the first submission. Test the form on the deployed website and check spam/junk folders. Until activation is complete, visitors can use the WhatsApp link or email directly. The browser will show a fallback message if submission cannot be confirmed.

For a production site that needs more control, replace this endpoint in `js/main.js` with a backend or trusted form service endpoint. Add server-side validation and spam protection for a custom backend. Do not put private API keys or credentials in front-end JavaScript.

## SEO and social links

- `index.html` includes title, description, canonical URL, Open Graph metadata and basic `MarketingAgency` structured data.
- `robots.txt` and `sitemap.xml` use `https://www.hanudigihive.com/`; update these if your canonical domain differs.
- `assets/og-cover.svg` is a simple social-sharing cover. Some social platforms prefer a raster image such as JPG/PNG; if needed, create a 1200 × 630 PNG version.
- The social profile links currently point to platform homepages intentionally; replace them with the actual agency profiles.

## Notes

No analytics tracker, ad pixel, fabricated testimonials, fake client logos or invented performance metrics are included. Add analytics only after deciding what data you need and implementing the appropriate consent and privacy disclosures.
