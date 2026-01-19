# Browser Support Reference

> **Progressive disclosure file for modern-css-features Skill**

This file provides detailed browser compatibility data for modern CSS features. Claude loads this when users ask specific browser support questions.

---

## Quick Reference Matrix

| Feature | Chrome | Firefox | Safari | Coverage | Status |
|---------|--------|---------|--------|----------|--------|
| **:has() selector** | 105+ | 121+ | 15.4+ | ~95% | ✅ Widely Supported |
| **Container queries** | 105+ | 110+ | 16+ | ~93% | ✅ Widely Supported |
| **scroll-snap** | 69+ | 68+ | 14.1+ | ~97% | ✅ Widely Supported |
| **Popover API** | 114+ | 125+ | 17+ | ~90% | ✅ Widely Supported |
| **@starting-style** | 117+ | 129+ | 17.5+ | ~88% | ✅ Widely Supported |
| **Anchor positioning** | 125+ | 145+ | ❌ | ~50% | ⚠️ Good Support |
| **scroll-state()** | 133+ | ❌ | 18+ | ~30% | 🟠 Emerging |
| **Styleable select** | 135+ | ❌ | ❌ | ~20% | 🟠 Emerging |

---

## Feature Detection Patterns

### :has() Selector
```css
@supports selector(:has(+ *)) {
  form:has(input:invalid) {
    border-color: red;
  }
}
```

```javascript
const supported = CSS.supports('selector(:has(+ *))');
```

**Important:** Use `:has(+ *)` with a relative selector for robust detection.

### Container Queries
```css
@supports (container-type: inline-size) {
  .card-container {
    container-type: inline-size;
  }
}
```

```javascript
const supported = CSS.supports('container-type', 'inline-size');
```

### scroll-snap
```css
@supports (scroll-snap-align: start) {
  .carousel {
    scroll-snap-type: x mandatory;
  }
}
```

**Note:** Test for `scroll-snap-align` to detect modern spec (not `-webkit-scroll-snap-type`).

### Popover API
```css
@supports selector(:popover-open) {
  [popover] {
    /* Styles */
  }
}
```

```javascript
const supported = 'popover' in HTMLElement.prototype;
// or
const supported = CSS.supports('selector(:popover-open)');
```

### @starting-style
```css
@supports (transition-behavior: allow-discrete) {
  dialog {
    transition: opacity 0.3s, display 0.3s allow-discrete;
  }
}
```

```javascript
const supported = CSS.supports('transition-behavior', 'allow-discrete');
```

### Anchor Positioning
```css
@supports (anchor-name: --my-anchor) {
  .tooltip {
    position: absolute;
    position-anchor: --my-anchor;
  }
}
```

**Warning:** Limited browser support as of January 2026. Use with strong fallbacks.

### scroll-state()
```css
@supports selector(:scroll-state(snapped)) {
  .item:scroll-state(snapped) {
    /* Styles */
  }
}
```

**Warning:** Chrome 133+ and Safari 18+ only. Very limited support.

---

## Progressive Enhancement Strategy

### Three-Tier Approach

**Tier 1: Production-Ready (95%+ support)**
```css
/* No fallback needed, but include detection for future-proofing */
@supports selector(:has(+ *)) {
  form:has(input:invalid) {
    border-color: red;
  }
}

/* Fallback for old browsers */
form.has-error {
  border-color: red;
}
```

**Tier 2: Good Support (50-90% support)**
```css
/* Enhanced experience for supporting browsers */
@supports (anchor-name: --tooltip) {
  .tooltip {
    position: absolute;
    position-anchor: --tooltip;
    top: anchor(bottom);
  }
}

/* Fallback: Traditional positioning */
.tooltip {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}
```

**Tier 3: Emerging (<50% support)**
```css
/* Future-proof enhancement */
@supports selector(:scroll-state(snapped)) {
  .carousel-item:scroll-state(snapped) {
    transform: scale(1.1);
  }
}

/* Fallback: IntersectionObserver (JavaScript required) */
.carousel-item.is-snapped {
  transform: scale(1.1);
}
```

---

## Browser Version Timeline

### Major Release Dates

**:has() selector:**
- Chrome 105: August 30, 2022
- Safari 15.4: March 14, 2022
- Firefox 121: December 19, 2023

**Container queries:**
- Chrome 105: August 30, 2022
- Safari 16: September 12, 2022
- Firefox 110: February 14, 2023

**Popover API:**
- Chrome 114: May 30, 2023
- Safari 17: September 18, 2023
- Firefox 125: April 16, 2024

**@starting-style:**
- Chrome 117: September 12, 2023
- Safari 17.5: May 13, 2024
- Firefox 129: August 6, 2024

---

## Global Browser Market Share (2026)

**Desktop:**
- Chrome: ~65%
- Safari: ~20%
- Edge: ~10%
- Firefox: ~3%

**Mobile:**
- Safari (iOS): ~25%
- Chrome (Android): ~65%
- Samsung Internet: ~5%

**Tier 1 Features Reach:**
- ~95% of global users (Chrome 105+, Safari 15.4+, Firefox 121+)

---

## Testing Recommendations

### Minimum Test Matrix for Production

**Tier 1 Features (Must test):**
- Chrome latest (desktop)
- Safari latest (macOS and iOS)
- Firefox latest (desktop)
- Edge latest (desktop)

**Tier 2 Features (Should test):**
- Chrome latest (desktop)
- Firefox Developer Edition (for anchor positioning)
- Safari Technology Preview (for upcoming features)

**Tier 3 Features (Optional test):**
- Chrome Canary with experimental flags
- Safari Technology Preview
- Always include fallback testing

### Browser Testing Tools

**Free:**
- BrowserStack (limited free tier)
- LambdaTest (limited free tier)
- Can I Use (browser support data)
- MDN Browser Compatibility Tables

**Paid:**
- BrowserStack
- Sauce Labs
- CrossBrowserTesting

### Local Testing

```bash
# Modern browser versions (2026)
Chrome: Version 125+
Firefox: Version 125+
Safari: Version 17+
Edge: Version 125+

# Test on actual devices when possible
# iOS Safari behaves differently than macOS Safari
# Android Chrome may have version lag
```

---

## Common Pitfalls

### :has() Selector
❌ **Wrong:** `:has(*)` - May not work in all browsers
✅ **Correct:** `:has(+ *)` or `:has(> *)` - Reliable detection

### Container Queries
❌ **Wrong:** Forgetting `container-type` on parent
✅ **Correct:** Always set `container-type: inline-size` (or size) on container

### scroll-snap
❌ **Wrong:** Using `-webkit-scroll-snap-type` (deprecated)
✅ **Correct:** Use `scroll-snap-type` without prefix

### Popover API
❌ **Wrong:** Mixing `popover` with `dialog` element incorrectly
✅ **Correct:** Use `popover` attribute on `div` or native `dialog` element

### @starting-style
❌ **Wrong:** Animating without `allow-discrete` keyword
✅ **Correct:** Use `transition: display 0.3s allow-discrete`

---

## Resources

**Official Documentation:**
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Can I Use](https://caniuse.com/)
- [Web Platform Status](https://webstatus.dev/)

**Browser Release Notes:**
- [Chrome Platform Status](https://chromestatus.com/features)
- [WebKit Feature Status](https://webkit.org/status/)
- [Firefox Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases)

**Testing:**
- [BrowserStack](https://www.browserstack.com/)
- [Can I Use - Usage Tables](https://caniuse.com/usage-table)

---

**GitHub Repository:** https://github.com/aldunchev/modern-css-features
**Full Documentation:** https://github.com/aldunchev/modern-css-features/blob/main/docs/BROWSER_SUPPORT.md
**Last Updated:** January 2026
