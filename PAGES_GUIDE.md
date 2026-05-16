# Costa Driver — Pages Structure Guide

## 📁 Project Structure

```
costa-driver/
├── index.html                    # Home page
├── services.html                 # Services overview page
├── faq.html                       # Frequently asked questions
├── favicon.svg                    # CD logo favicon
├── destinations/
│   ├── les-deux-alpes.html       # Destination detail page (template)
│   ├── monaco.html               # Duplicate les-deux-alpes.html and customize
│   ├── cannes.html
│   ├── saint-tropez.html
│   ├── portofino.html
│   ├── cinque-terre.html
│   └── milano.html
├── services/
│   ├── destination-weddings.html # Service detail page (template)
│   ├── private-excursions.html   # Duplicate and customize
│   ├── luxury-concierge.html
│   └── events-occasions.html
└── assets/
    ├── css/style.css             # All styles for all pages
    ├── js/main.js                # Navigation and interaction
    ├── images/                   # Destination and asset photos
    └── videos/                   # Hero video
```

## 🎯 Creating Destination Pages

### Template: `destinations/les-deux-alpes.html`

To create new destination pages:

1. **Copy the template:**
   - Duplicate `destinations/les-deux-alpes.html`
   - Name it after your destination (e.g., `monaco.html`)

2. **Update these sections:**
   - `<title>` — Change to "[Destination Name] Transfers — Costa Driver"
   - `<meta name="description">` — Update with destination-specific info
   - `meta property="og:*"` — Update OpenGraph tags
   - `.geo.latitude` / `.geo.longitude` — Update coordinates for the destination
   - `.areaServed` — Update with destination region

3. **Update page content:**
   - `#dest-hero` — Update hero text and imagery reference
   - `#dest-overview` — Describe the destination
   - `.dest-stats` — Update altitude, terrain, distance, season
   - `#dest-services` — List services available at this destination
   - `#dest-practical` — Add practical information (getting there, best times, etc.)

4. **Key SEO elements already in place:**
   - Canonical URL in `<meta name="canonical">`
   - Schema.org LocalBusiness structured data
   - Proper heading hierarchy (H1 → H2 → H3)
   - Mobile-responsive meta viewport

### Destinations to Create:
- [ ] Monaco (`destinations/monaco.html`)
- [ ] Cannes (`destinations/cannes.html`)
- [ ] Saint-Tropez (`destinations/saint-tropez.html`)
- [ ] Portofino (`destinations/portofino.html`)
- [ ] Cinque Terre (`destinations/cinque-terre.html`)
- [ ] Milano (`destinations/milano.html`)

---

## 🎨 Creating Service Pages

### Template: `services/destination-weddings.html`

To create new service pages:

1. **Copy the template:**
   - Duplicate `services/destination-weddings.html`
   - Name it after your service (e.g., `private-excursions.html`)

2. **Update these sections:**
   - `<title>` — Change to "[Service Name] — Costa Driver"
   - `<meta name="description">` — Update with service-specific benefits
   - `.service-hero-content` — Update hero messaging
   - `#service-overview` — Describe the service in detail
   - `#service-offerings` — List the 6 key offerings/benefits
   - `#why-us` — Explain why Costa Driver excels at this service

3. **Key content areas:**
   - Each `.offering-card` has a number (01-06), title, and description
   - The `.why-grid` contains 6 reasons why choose Costa Driver
   - All sections are pre-styled and responsive

4. **Key SEO elements already in place:**
   - Proper meta tags and OpenGraph data
   - Schema.org LocalBusiness structured data for services
   - Clear heading hierarchy
   - Mobile-responsive design

### Services to Create:
- [ ] Private Excursions (`services/private-excursions.html`)
- [ ] Luxury Concierge (`services/luxury-concierge.html`)
- [ ] Events & Occasions (`services/events-occasions.html`)

---

## 🔗 Linking New Pages

### Update Navigation Links:

In `index.html`, `services.html`, `faq.html`, and all destination/service pages:

- Main nav links: `<a href="destinations/monaco.html">` (from index.html)
- Footer links: Update footer column links to include new pages
- Breadcrumbs: Add `<section id="[page]-back">` with back links

### Example Footer Update (in all pages):

```html
<div class="footer-col">
  <h4>Destinations</h4>
  <ul>
    <li><a href="destinations/les-deux-alpes.html">Les Deux-Alpes</a></li>
    <li><a href="destinations/monaco.html">Monaco</a></li>
    <!-- Add more destinations here -->
  </ul>
</div>
```

---

## 📝 Customization Tips

### For Destination Pages:

1. **Coordinates:** Update `.geo.latitude` and `.geo.longitude` for accurate local SEO
2. **Photos:** Reference high-quality destination images in assets/images/
3. **Distance/Time:** Update travel times from major airports (Geneva, Nice, Milan)
4. **Local Services:** List Michelin restaurants, hotels, attractions specific to the destination

### For Service Pages:

1. **Offerings:** Keep 6 offerings (numbered 01-06) for visual balance
2. **Benefits:** Why-grid has 6 items for consistent layout
3. **Calls-to-action:** All CTAs link to #booking on index.html for centralized contact form
4. **Unique value:** Highlight what makes Costa Driver special for this service

---

## 🎨 CSS Classes Reference

### Semantic Structure:
- `.section-inner` — Constrains content width
- `.section-label` — Small uppercase section identifier
- `h2 em` — Italicized subheading for styling variation
- `.hero-sub` — Large subheading text (golden color)

### Buttons:
- `.btn-primary` — Gold background, dark text
- `.btn-ghost` — Transparent, gold border
- `.btn-book` — Gold button in header

### Grids:
- `.dest-info-grid` — 2-column layout (destination pages)
- `.offering-grid` — Auto-fit responsive grid (service pages)
- `.why-grid` — 3-column flexible grid

### Hover Effects:
- Card hover: border color changes to gold, background lightens
- Link hover: text decoration underline

---

## 🚀 Deployment

1. **Test locally:**
   - Navigate links between pages
   - Check mobile responsiveness
   - Verify SEO meta tags with browser dev tools

2. **Commit to Git:**
   ```bash
   git add destinations/ services/
   git commit -m "Add destination and service pages"
   git push origin main
   ```

3. **Vercel Auto-Deploy:**
   - Vercel automatically detects GitHub changes
   - New pages are live within seconds
   - No additional deployment steps needed

---

## 📊 SEO Optimization

All pages include:

- ✅ Unique, descriptive `<title>` tags
- ✅ Meta descriptions (150-160 characters)
- ✅ Canonical URLs for duplicate content prevention
- ✅ OpenGraph meta tags for social sharing
- ✅ Schema.org structured data (LocalBusiness)
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Mobile-responsive viewport
- ✅ Fast loading (SVG favicon, optimized images)
- ✅ Clear site structure with breadcrumbs

---

## 📱 Mobile Responsiveness

All new pages automatically include:
- Responsive header with mobile hamburger menu
- Mobile navigation overlay
- Responsive grid layouts (auto-fit, minmax)
- Touch-friendly button sizes
- Proper viewport meta tag

---

## 🎯 Next Steps

1. **Create remaining destination pages** (Monaco, Cannes, Saint-Tropez, Portofino, Cinque Terre, Milano)
2. **Create remaining service pages** (Private Excursions, Luxury Concierge, Events & Occasions)
3. **Update all footer links** to include new pages
4. **Update main nav** if adding destination quick-links
5. **Add local images** for each destination (if available)
6. **Test all links** between pages
7. **Submit sitemap** to Google Search Console

---

## ❓ Common Edits

### Change footer text:
- In all HTML files, search `<!-- FOOTER -->` section
- Update contact info, copyright year, or links

### Add/remove service offerings:
- In service pages, duplicate/remove `.offering-card` divs
- Maintain numbering (01-06 for visual balance)

### Update global styles:
- All CSS is in `assets/css/style.css`
- Media queries included for responsive design
- Color variables at top: `--gold`, `--charcoal`, `--cream`, etc.

---

Built with ❤️ by Claude for Costa Driver
