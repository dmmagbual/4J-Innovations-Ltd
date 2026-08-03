# 4J Innovation Limited — Image Map (compressed WebP)

All photos were compressed from the original JPEG uploads
(`assets/image/` on the `main` branch, ~2.97 MB) to WebP
(`assets/images/`, ~1.39 MB total — 54% smaller, max 1200px, q72).

Original un-compressed files are preserved in git history on
`origin/main` (`assets/image/`) if ever needed.

## Site logo (already in place)
- `assets/logo.jpg` — brand logo (navbar + footer + Open Graph)
- `assets/favicon.jpg` — browser tab icon

## Project photos — used by the website (all resolve)

| File | Photo content | Used on |
|---|---|---|
| `assets/images/pih/pih-wayfinding.webp` | PIH "100M THIS WAY" directional wayfinding sign | Home hero + Portfolio |
| `assets/images/landcros/landcros-angle.webp` | LANDCROS pylon sign (angled view) | Portfolio |
| `assets/images/landcros/landcros-front.webp` | LANDCROS pylon sign (front view) | Home hero + Portfolio |
| `assets/images/pih/pih-banner.webp` | PIH "Your Complete Care Network" roll-up banner | Portfolio |
| `assets/images/pih/pih-story-wall.webp` | PIH milestone/services wall | Portfolio |
| `assets/images/pih/pih-emergency.webp` | PIH Emergency signage | Portfolio |
| `assets/images/pngeiti/merch-set.webp` | PNGEITI gift items / merchandise set | Portfolio + Home + Services |
| `assets/images/dts/dts-tumbler.webp` | DTS2 Digital Transformation Summit tumbler | Portfolio |

> City Pharmacy item was removed from the portfolio (photo not among the uploads),
> and the PNGEITI pen slot was removed (no pen photo provided).

## Additional photos — organised by client (not yet used on the site)

### `assets/images/pih/` (Pacific International Hospital)
- `pih-specialty-services.webp` — Paediatrics/Dental/Specialty services signage
- `pih-history-timeline.webp` — PIH history timeline (2001–2025)
- `pih-billboard.webp` — PIH billboard
- `pih-staff.webp` — staff at work

### `assets/images/dts/` (DTS2 — Digital Transformation Summit)
- `dts-cap-sample.webp`, `dts-cap.webp`

### `assets/images/pngeiti/`
- `cap-sample.webp`, `gift-item-sample.webp`, `tote-bag.webp`

### `assets/images/ombudsman/` (Ombudsman Commission)
- `t-shirt-sample.webp`, `merch-good-governance.webp`, `merch-item.webp`

### `assets/images/samples/`
- `fvc-tambayan-merch.webp`, `lanyard-sample.webp`, `printing-in-progress.webp`,
  `covid-sleeves.webp`, `merch-2.webp`, `merch-3.webp`, `merch-5.webp`,
  `merch-6.webp`, `merch-6b.webp`, `merch-7.webp`

## Re-compress after replacing any photo
```
convert input.jpg -resize '1200x1200>' -quality 72 -define webp:method=6 output.webp
```
