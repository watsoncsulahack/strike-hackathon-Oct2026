# Branding and asset provenance

## Website styling evidence

The owner supplied the saved DRMZ homepage and both local stylesheets linked by that HTML. Reviewed on 2026-10-25. The original download time is not recorded in the files. This evidence supersedes the earlier logo-derived palette as the basis for [design.md](../design.md).

| Supplied file | Role |
| --- | --- |
| `index.html` | Saved homepage markup, applied classes, asset paths, stylesheet order, and external font request. |
| `3e30e7e231be9211.css` | Tailwind 3.4.17 utilities, generic component-library variables, and bespoke DRMZ classes. |
| `3cd83cfe34ca397f.css` | Swiper styles and its embedded icon font; not the website's body font or primary brand palette. |

The HTML loads the main stylesheet before the Swiper stylesheet. The captured files are user-provided reference inputs; this documentation update does not add copies of the complete webpage or stylesheets to the repository.

SHA-256 fingerprints of the supplied bytes:

| File | SHA-256 |
| --- | --- |
| `index.html` | `4fcf949738f9de9d74c7589cf761e309469c79593a216a0c9003e7f53eeaabce` |
| `3e30e7e231be9211.css` | `df495a799539e2acb011ed2ddb28e41654e44b7957e7be4922a1eaacdf01a4f6` |
| `3cd83cfe34ca397f.css` | `11f47f69d58ae08ad2e3691400092bd1fb32e1695bd7abd4cb8fc40047a900bb` |

Verified CSS declarations include purple `#753CC2`, cream `#EFF0D8`, navy `#111D35`, Cardano blue `#4E84F1`, their documented hover variants, the body gradient, footer styling, system sans-serif typography, and the declared Lobster quotation treatment. “Verified” here means present in the supplied files, not measured in a running browser.

## Assets referenced by the HTML

Paths below identify references in the captured page. They do not establish that an asset has been downloaded, inspected, or added to this repository.

| Reference | Evidence and intended handling |
| --- | --- |
| `images/drmz-logo-snake-trans2.png` | Hero image source; preserve the actual artwork and aspect ratio. |
| `/images/drmz-logo-snake-final.gif` | Hero image data attribute; also referenced through the footer's Next.js image URL. Animation behavior needs the image and runtime code. |
| `images/morpheus.jpg` | Editorial image reference; inspect the file before asserting its appearance. |
| `morpheus-avatar.jpg` | Floating onboarding launcher's image source; the HTML shows an 80px-equivalent circular launcher. |
| `images/drmz-banner.jpg` | Footer banner reference. |
| `images/cardano-logo.png` | Cardano Resources section graphic. |
| `https://fonts.googleapis.com/css2?family=Lobster&display=swap` | External font stylesheet requested in the HTML. The font response and binary were not supplied. |

Some alt labels differ from filenames, so asset identity must be verified visually. The saved HTML includes only the closed Morpheus launcher. Screenshots of the open panel and desktop/mobile page states would support visual validation. JavaScript and image/font files would support exact runtime reproduction, but are not required to identify the CSS foundation already documented.

## Historical references

The earlier concept sampled navy `#0E1A34`, lavender `#B9AFD6`, and gold `#FCEBA9` from [DRMZ artwork](https://github.com/rodg-drmz/web3ie-media-assets/blob/main/Web3%20In%20Education%20Courses/AI%20Demystified%20Course/DRMZNEW24.png). Those samples describe the artwork, not the homepage's UI. They are no longer normative interface colors.

Additional artwork was previously referenced from [DRMZ -14.png](https://github.com/rodg-drmz/web3ie-media-assets/blob/main/Web3%20In%20Education%20Courses/AI%20Demystified%20Course/DRMZ%20-14.png). Earlier concept videos and theme-comparison images are historical mockups, not evidence of website styling or a working application.

## Attribution and rights

The captured homepage footer states “All rights reserved.” Treat DRMZ artwork and third-party media as retaining their owners' rights unless permission or a specific license establishes otherwise. The repository's software license does not itself grant rights to those assets. Retain attribution and any permission record when assets are reused.

The Tailwind bundle identifies version 3.4.17 and an MIT license in its comment; that comment does not establish the license of all other page content. No new brand approval, partnership, or media permission is asserted by this extraction.
