# HANU DIGIHIVE — Website deployment package

A responsive static HTML/CSS/JavaScript agency website with SEO metadata, structured data, sitemap, robots.txt, social-sharing metadata, privacy notice, 404 page, and static-host security headers.

## Files
- `index.html` — main landing page and SEO/schema metadata
- `privacy.html` — privacy notice (review before publishing)
- `404.html` — custom not-found page
- `css/style.css`, `js/main.js` — site styles and interactions
- `assets/` — favicon, social-sharing artwork, and original plus web-playable work samples in `Work_Samples/`
- `robots.txt`, `sitemap.xml` — search engine crawl files
- `site.webmanifest` — install metadata
- `_headers` — security/cache headers for Netlify and compatible hosts

## Deploy (static site; no build command)
**Netlify:** Drag the extracted folder into Netlify Drop, or connect a Git repository. Publish directory: `.` (the folder root). The `_headers` file is read automatically.

**Cloudflare Pages:** Create a Pages project from a Git repository and set build command to none / blank and output directory to `.`. Confirm your chosen setup supports `_headers`; otherwise configure equivalent headers in the dashboard.

**Vercel:** Import the folder/repository as a static site. If headers from `_headers` are not applied by your Vercel setup, configure them in `vercel.json`.

**GitHub Pages:** Upload the contents to the root of a repository and enable Pages. GitHub Pages does not apply Netlify `_headers`; configure host-specific headers if needed.

No npm install, framework build, or video conversion is required. Upload the `.mp4` files in `assets/Work_Samples/` together with the rest of the site.

## Important launch checks
1. **Domain:** SEO files currently use `https://www.hanudigihive.com/`. Confirm ownership, HTTPS, and whether `www` or apex is canonical. Update canonical, Open Graph URLs, structured-data URL, `robots.txt`, and `sitemap.xml` consistently if the live domain differs.
2. **Business details:** Verify the business address, postal code, email, phone number, service areas, and all claims in `index.html` and its structured data before publishing.
3. **Contact form:** `js/main.js` submits enquiries to FormSubmit for `info@hanudigihive.com`. The mailbox owner may need to activate the service from its confirmation email. Test a real submission on the deployed HTTPS site and check inbox/spam. Until verified, visitors can use the WhatsApp/email links. Do not tell customers the form works until tested.
4. **Work samples:** The homepage plays the `.mp4` files in `assets/Work_Samples/`. Confirm the samples are approved for public playback before publishing.
5. **Social profiles:** Instagram, LinkedIn and Facebook footer icons link to the supplied HANU DIGIHIVE profiles. Confirm the profiles are publicly accessible before launch.
6. **Privacy:** Review `privacy.html` against actual data handling, retention, third-party form processing and applicable law.
7. **Search visibility:** After launch, verify the domain in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`, inspect the canonical homepage, and request indexing. SEO cannot guarantee rankings.
8. **Social image:** `assets/og-cover.svg` is used for sharing metadata. Some platforms prefer a 1200×630 PNG/JPG; create and test a raster image if previews do not render correctly.
9. **Quality assurance:** Test mobile navigation, all contact links, form delivery, 404 handling, keyboard navigation, contrast, page speed and HTTPS on the live domain.

## SEO included
- Descriptive page title and meta description
- Canonical URL and robots directives
- Open Graph and Twitter card metadata
- `MarketingAgency` JSON-LD structured data
- XML sitemap and crawl rules
- Semantic HTML, responsive layout and accessibility affordances
- Web manifest, favicon and social-sharing cover

Avoid adding keyword-stuffing meta keywords. Prioritise useful, unique page content, real portfolio evidence, accurate business information, local business profile consistency, and useful service-specific landing pages.
