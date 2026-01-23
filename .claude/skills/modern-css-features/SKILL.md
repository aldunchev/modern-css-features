---
name: modern-css-features
description: Expert guidance on modern CSS features that replace JavaScript. Provides implementation patterns, browser support info, and code examples for :has() selector, container queries, Popover API, scroll-snap carousels, @starting-style animations, anchor positioning, and more. Use when implementing CSS features, replacing JavaScript with CSS, building modals/dialogs/carousels/galleries, working on forms/validation, animating display/height, or when user mentions "without JavaScript", "pure CSS", "CSS only", or asks about browser support for modern CSS.
allowed-tools: Read, Grep, Glob, WebSearch, WebFetch
---

# Modern CSS Features Expert

## Overview

This Skill provides expert guidance on modern CSS features from a production-ready showcase project that achieved **87% time savings** (2.75 hours vs 15-22 hours) using Claude Code.

**Knowledge Base Location:**

- **GitHub Repository:** https://github.com/aldunchev/modern-css-features
- **Live Demos:** https://aldunchev.github.io/modern-css-features (once GitHub Pages is enabled)
- **Implemented features:** 6 features (5 Tier 1 production-ready + 1 Tier 2 emerging)
- **Documentation:** `docs/FEATURES.md`, `docs/BROWSER_SUPPORT.md`, `docs/AI_WORKFLOW.md`
- **Source code:** `css/features/*.css`, `index.html`

**Note:** This skill references the GitHub repository. Use WebFetch to retrieve code examples.

## When This Skill Activates

Claude will automatically use this Skill when you:

- Ask about implementing UI patterns (modals, carousels, tooltips, galleries, forms)
- Mention "without JavaScript", "pure CSS", or "CSS only"
- Ask about browser support for modern CSS features
- Need progressive enhancement strategies
- Want to replace JavaScript with CSS
- Ask about animating `display` or `height` properties
- Discuss form validation, parent selectors, or responsive components

## Capabilities

### Tier 1: Production-Ready Features (Implemented)

#### 1. `:has()` Selector - Parent/Sibling Selection

**What it does:** Select parent elements based on children (revolutionary!)
**Replaces:** JavaScript parent traversal, querySelectorAll + classList
**Browser support:** Chrome 105+, Firefox 121+, Safari 15.4+
**File:** `css/features/has-selector.css`

**Use cases:**

- Form validation states (highlight form when input is invalid)
- Card hover effects (highlight entire card when any child is hovered)
- Gallery selection (fade siblings when one is selected)

**Example:**

```css
/* Old way: JavaScript required */
input.addEventListener('invalid', () => {
  form.classList.add('has-error');
});

/* New way: Pure CSS */
form:has(input:invalid) {
  border-color: red;
}
```

#### 2. Container Queries - Component-Based Responsive Design

**What it does:** Responsive styles based on container size, not viewport
**Replaces:** JavaScript ResizeObserver, media queries with limitations
**Browser support:** Chrome 105+, Firefox 110+, Safari 16+
**File:** `css/features/container-queries.css`

**Use cases:**

- Responsive cards that adapt to any container width
- Sidebar components that work in multiple layouts
- Reusable components with self-contained responsive behavior

**Example:**

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

#### 3. CSS Carousel - scroll-snap Galleries

**What it does:** Smooth-scrolling, snap-to-point carousels
**Replaces:** Swiper.js, Slick.js, custom scroll JavaScript
**Browser support:** Chrome 69+, Firefox 68+, Safari 14.1+
**File:** `css/features/carousel.css`

**Use cases:**

- Image galleries with touch-friendly navigation
- Product showcases with smooth scrolling
- Hero sections with full-width slides

**Example:**

```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.carousel-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

#### 4. Popover API - Native Modals with Backdrop

**What it does:** Built-in modal/dialog system with focus trapping
**Replaces:** Custom modal JavaScript, dialog polyfills
**Browser support:** Chrome 114+, Firefox 125+, Safari 17+
**File:** `css/features/modals.css`

**Use cases:**

- Modal dialogs without JavaScript
- Tooltips and popovers
- Dropdown menus with proper focus management

**Example:**

```html
<button popovertarget="my-modal">Open Modal</button>
<div
  id="my-modal"
  popover
>
  <h2>Modal Title</h2>
  <p>Modal content here</p>
</div>
```

**CSS:**

```css
[popover] {
  /* Styles for modal */
}

[popover]::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
```

#### 5. Modern Animations - @starting-style & allow-discrete

**What it does:** Animate `display: none` to `display: block` and `height: auto`
**Replaces:** JavaScript height calculations, complex transition hacks
**Browser support:** Chrome 117+, Firefox 129+, Safari 17.5+
**File:** `css/features/animations.css`

**Use cases:**

- Smooth expand/collapse animations
- Fade in elements with display changes
- Accordion transitions without JavaScript

**Example:**

```css
dialog {
  transition:
    opacity 0.3s,
    display 0.3s allow-discrete;
}

@starting-style {
  dialog[open] {
    opacity: 0;
  }
}

dialog[open] {
  opacity: 1;
}
```

#### 6. scroll-state() - CSS Scroll Detection

**What it does:** Detect scroll state (stuck, scrollable, snapped) with pure CSS
**Replaces:** JavaScript scroll event listeners, IntersectionObserver for scroll effects
**Browser support:** Chrome 133+ (scrollable, stuck, snapped), Chrome 144+ (scrolled)
**File:** `css/features/scroll-state.css`

**Use cases:**

- Sticky headers that change appearance when stuck
- Back-to-top buttons that appear when scrollable
- Scroll-aware navigation (hide on scroll down)

**⚠️ CRITICAL GOTCHAS - READ FIRST:**
See [SCROLL_STATE_GOTCHAS.md](SCROLL_STATE_GOTCHAS.md) for complete implementation guide.

**Three Critical Rules:**

1. **CANNOT query the container itself** - only style children
2. **Use `scrollable` not `scrolled`** - better browser support (133+ vs 144+)
3. **Container must be named + sticky/scrollable** - `container-name` required

**Example - Sticky Header:**

```css
/* CRITICAL: Sticky element IS the container */
.sticky-header {
  position: sticky;
  top: 0;
  container-name: sticky-heading; /* Name required */
  container-type: scroll-state;
}

/* Style CHILD wrapper (not container!) */
.header-content {
  padding: 1rem 2rem;
  background: #f9fafb;
  transition: all 0.3s ease;
}

/* Detect stuck state, style CHILD */
@container sticky-heading scroll-state(stuck: top) {
  .header-content {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #3b82f6;
  }
}
```

**Required HTML Structure:**

```html
<!-- Container = sticky element -->
<div class="sticky-header">
  <!-- Child gets styled -->
  <div class="header-content">
    <h4>Header Title</h4>
  </div>
</div>
```

**Example - Back-to-Top Button:**

```css
/* Scrollable container IS the container */
.scrollable-area {
  overflow-y: auto;
  height: 500px;
  container-name: scrollable-area; /* Name required */
  container-type: scroll-state;
}

/* Button hidden by default */
.back-to-top {
  position: sticky;
  bottom: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

/* Show when can scroll up (user scrolled down) */
@container scrollable-area scroll-state(scrollable: top) {
  .back-to-top {
    opacity: 1 !important; /* !important for specificity */
    pointer-events: auto !important;
  }
}
```

**Button Click Handler:**

```html
<!-- Use scrollTo(), NOT anchor links -->
<button
  class="back-to-top"
  onclick="this.closest('.scrollable-area').scrollTo({top: 0, behavior: 'smooth'})"
>
  ↑ Back to Top
</button>
```

**Why `scrollable: top` not `scrolled: down`?**

- `scrollable: top` = "can scroll up" = user has scrolled down (Chrome 133+) ✅
- `scrolled: down` = "user scrolling down" = very new (Chrome 144+) ⚠️

**CRITICAL IMPLEMENTATION NOTES:**

- Container queries style **descendants**, NOT the container itself
- Must use `container-name` to target specific containers
- Use `!important` if base styles have higher specificity
- For scrollable containers, use `scrollTo()` not anchor links
- See [SCROLL_STATE_GOTCHAS.md](SCROLL_STATE_GOTCHAS.md) for complete details

### Tier 2 & 3: Emerging Features (Planned/Documentation Only)

7. **Anchor positioning** (Chrome 125+, Firefox 145+) - Tooltip/popover positioning
8. **Modal trigger commands** - `popovertarget` attribute (same as Popover API)
9. **Modern Observer APIs** - IntersectionObserver, ResizeObserver, MutationObserver
10. **Styleable select** (Chrome 135+ experimental) - Custom select styling

## How to Use This Knowledge

### Step 1: Identify Relevant Feature

Match the user's question to one of the features above.

### Step 2: Access Knowledge Base

Use **WebFetch** tool to load relevant files from GitHub:

```
WebFetch: https://raw.githubusercontent.com/aldunchev/modern-css-features/main/docs/FEATURES.md
WebFetch: https://raw.githubusercontent.com/aldunchev/modern-css-features/main/css/features/<feature-name>.css
WebFetch: https://raw.githubusercontent.com/aldunchev/modern-css-features/main/docs/BROWSER_SUPPORT.md
```

**Tip:** If the user has the project cloned locally, you can also use Read tool with local paths for faster access.

### Step 3: Provide Browser Support

- Always check current browser support (use **WebSearch** if needed for latest info)
- Reference `docs/BROWSER_SUPPORT.md` for documented compatibility
- Provide progressive enhancement strategies

### Step 4: Deliver Answer

Follow the response template below.

## Response Template

When answering CSS questions, use this structure:

**1. Feature Identification**
"You can use **[Feature Name]** for this."

**2. Code Example**

```css
/* From css/features/<feature>.css */
[Include relevant code snippet from the project]
```

**3. Explanation**
"This works because [explain how CSS feature replaces JavaScript]."

**4. Browser Support**
"**Browser Support:** Chrome X+, Firefox Y+, Safari Z+
**Status:** [Widely Supported / Good Support / Emerging]"

**5. Progressive Enhancement**

```css
@supports ([feature-detection]) {
  /* Enhanced styles */
}
```

**6. Learn More**
"See full implementation: `https://github.com/aldunchev/modern-css-features/tree/main/[path]`"

## Browser Support Tiers

### Tier 1: Widely Supported (Recommend for Production)

- **:has()**: Chrome 105+, Firefox 121+, Safari 15.4+ (~95% coverage)
- **Container queries**: Chrome 105+, Firefox 110+, Safari 16+ (~93% coverage)
- **scroll-snap**: Chrome 69+, Firefox 68+, Safari 14.1+ (~97% coverage)
- **Popover API**: Chrome 114+, Firefox 125+, Safari 17+ (~90% coverage)
- **@starting-style**: Chrome 117+, Firefox 129+, Safari 17.5+ (~88% coverage)

### Tier 2: Good Support (Use with Feature Detection)

- **scroll-state()**: Chrome 133+, Safari 18+ (~30-40% coverage, but growing fast)
- **Anchor positioning**: Chrome 125+, Firefox 145+ (~50% coverage)
- **Modal trigger commands**: Same as Popover API (~90% coverage)

### Tier 3: Emerging (Use with Strong Fallbacks)

- **Styleable select**: Chrome 135+ only (~20% coverage)

## Example Interactions

### Example 1: Modal Question

**User:** "How can I implement a modal without JavaScript?"

**Response:**
"You can use the **Popover API** which provides native modal functionality.

[Read css/features/modals.css to get code example]

Here's the HTML:

```html
<button popovertarget="my-modal">Open</button>
<div
  id="my-modal"
  popover
>
  <h2>Modal Title</h2>
  <button popovertarget="my-modal">Close</button>
</div>
```

And CSS for styling:

```css
[popover] {
  padding: 2rem;
  border: none;
  border-radius: 8px;
}

[popover]::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
```

**Browser Support:** Chrome 114+, Firefox 125+, Safari 17+ (Widely Supported - ~90% of users)

**Progressive Enhancement:**

```css
@supports (popover: auto) {
  /* Popover styles */
}
```

See full implementation with 3 interactive demos: `https://aldunchev.github.io/modern-css-features` (live demos)"

### Example 2: Parent Selection

**User:** "How do I style a parent element when a child has focus?"

**Response:**
"Use the **`:has()` selector** - one of the most powerful modern CSS features.

[Read css/features/has-selector.css for code]

**Example:**

```css
form:has(input:focus) {
  border-color: blue;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

This eliminates the need for JavaScript like:

```javascript
// Old way - no longer needed!
inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    form.classList.add('focused');
  });
});
```

**Browser Support:** Chrome 105+, Firefox 121+, Safari 15.4+ (Production-ready - ~95% coverage)

**More examples:**

- Form validation states
- Card hover effects
- Gallery selection with sibling fade

See 3 interactive demos: `https://aldunchev.github.io/modern-css-features` (live demos)"

### Example 3: Carousel Question

**User:** "What's the best way to make an image carousel without a library?"

**Response:**
"Use **CSS scroll-snap** - no JavaScript library needed.

[Read css/features/carousel.css for implementation]

**Basic setup:**

```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 1rem;
}

.carousel-item {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 100%;
}
```

This replaces libraries like Swiper.js or Slick.js for basic carousels.

**Browser Support:** Chrome 69+, Firefox 68+, Safari 14.1+ (Excellent support - ~97% coverage)

**Bonus:** Works great on mobile with touch scrolling built-in.

See live demo: `https://aldunchev.github.io/modern-css-features` (live demos)"

### Example 4: Animation Question

**User:** "Can I animate height: auto with CSS?"

**Response:**
"Yes! Use **@starting-style** with the **allow-discrete** keyword (new in 2024).

[Read css/features/animations.css for examples]

**Modern approach:**

```css
details {
  transition: height 0.3s ease;
}

@starting-style {
  details[open] {
    height: 0;
  }
}

details[open] {
  height: auto;
}
```

This previously required JavaScript to calculate heights.

**Browser Support:** Chrome 117+, Firefox 129+, Safari 17.5+ (Good support - ~88% coverage)

**Progressive Enhancement:**

```css
@supports (height: auto) and (transition-behavior: allow-discrete) {
  /* Animated height styles */
}
```

See 2 demo examples: `https://aldunchev.github.io/modern-css-features` (live demos)"

## Supporting Files

For detailed information, reference these files in the project:

- **[BROWSER_SUPPORT.md](BROWSER_SUPPORT.md)** - Comprehensive compatibility matrix
- **[EXAMPLES.md](EXAMPLES.md)** - Code examples from all 5 features
- **[PATTERNS.md](PATTERNS.md)** - Common implementation patterns

## Project Context

This Skill is based on a showcase project that achieved:

- **87% time savings** (2.75 hours vs 15-22 hours)
- **5 production-ready features** with 11 interactive demos
- **3,500+ lines** of code and documentation
- **Proven patterns** that replace JavaScript

The project demonstrates modern CSS eliminates JavaScript for:

- Form validation (`:has()`)
- Modals/dialogs (Popover API)
- Carousels (scroll-snap)
- Responsive design (container queries)
- Animations (display, height transitions)

## Key Principles

When providing CSS guidance:

1. **Always prefer CSS over JavaScript** when the CSS feature is widely supported
2. **Check browser support** before recommending (use WebSearch for latest)
3. **Provide progressive enhancement** with `@supports` queries
4. **Show before/after comparisons** (JavaScript vs CSS)
5. **Link to actual code** in the project for working examples
6. **Explain WHY** the CSS approach is better (performance, maintainability, accessibility)

## Advanced Usage

### When to Use WebSearch

If the user asks about:

- Very new CSS features not in the project (2025+)
- Current browser support percentages
- Latest experimental features

### When to Read Project Files

If the user asks about:

- Implementation details for any of the 5 features
- Code examples and patterns
- Progressive enhancement strategies
- Browser detection approaches

### When to Offer Alternatives

If the user asks about a Tier 3 feature:

- Mention it's emerging/experimental
- Provide Tier 1 alternative if available
- Show progressive enhancement pattern
- Check latest browser support with WebSearch

## Limitations

This Skill does NOT cover:

- CSS preprocessors (Sass, Less, Stylus)
- CSS-in-JS solutions (styled-components, emotion)
- Build tools or bundlers
- CSS frameworks (Tailwind, Bootstrap, etc.)
- Features not documented in the project (unless WebSearch is used)

For those topics, rely on general CSS knowledge and web search.

## Success Metrics

This Skill helps users achieve:

- ✅ Reduce JavaScript bundle size (eliminate libraries)
- ✅ Improve performance (CSS is faster than JS)
- ✅ Better maintainability (declarative vs imperative)
- ✅ Enhanced accessibility (native features have built-in ARIA)
- ✅ Time savings (proven 87% faster with Claude Code assistance)

---

**GitHub Repository:** https://github.com/aldunchev/modern-css-features
**Live Demos:** https://aldunchev.github.io/modern-css-features
**Last Updated:** January 2026
**Features Implemented:** 6 of 10 (5 Tier 1 complete, 1 Tier 2 complete, remaining documented)
**Status:** Production-ready, open source
