# scroll-state() Container Queries - Critical Gotchas & Implementation Guide

> **Last Updated:** January 22, 2026
> **Based on:** Production implementation with Chrome 144 testing
> **Browser Support:** Chrome 133+, Safari 18+

## 🚨 Critical Implementation Rules

### Rule #1: You CANNOT Query the Container Itself

**❌ WRONG - This will NOT work:**
```css
.container {
  container-type: scroll-state;
  background: white;
}

/* Trying to style the container itself - FAILS! */
@container scroll-state(stuck: top) {
  .container {
    background: blue; /* This will NEVER apply */
  }
}
```

**✅ CORRECT - Query children of the container:**
```css
.container {
  container-type: scroll-state;
}

/* Style CHILDREN of the container - WORKS! */
@container scroll-state(stuck: top) {
  .child-element {
    background: blue; /* This works */
  }
}
```

**Why?** Container queries apply to **descendants** of the container, not the container itself. This is by design to prevent circular dependencies.

---

### Rule #2: Use `scrollable` Instead of `scrolled`

**Browser Support Differences:**
- `scrollable` → Chrome 133+, Safari 18+ ✅ Available now
- `scrolled` → Chrome 144+ only ⚠️ Very new, limited support

**Use Cases:**

#### ✅ RECOMMENDED: `scrollable` (Better Browser Support)

```css
/* Detects if content CAN be scrolled in a direction */

/* scrollable: top = Can scroll UP (user has scrolled DOWN) */
@container scroll-state(scrollable: top) {
  .back-to-top {
    opacity: 1; /* Show button when can scroll to top */
  }
}

/* scrollable: bottom = Can scroll DOWN (more content below) */
@container scroll-state(scrollable: bottom) {
  .scroll-indicator {
    display: block; /* Show "more content" indicator */
  }
}
```

#### ⚠️ ADVANCED: `scrolled` (Chrome 144+ Only)

```css
/* Detects the DIRECTION of recent user scrolling */

/* scrolled: down = User just scrolled DOWN */
@container scroll-state(scrolled: down) {
  .header {
    transform: translateY(-100%); /* Hide header */
  }
}

/* scrolled: up = User just scrolled UP */
@container scroll-state(scrolled: up) {
  .header {
    transform: translateY(0); /* Show header */
  }
}
```

**When to Use Which:**
- **`scrollable`** - Show/hide elements based on position (back-to-top buttons, scroll indicators)
- **`scrolled`** - Respond to scroll direction (auto-hiding headers, directional UX)

---

### Rule #3: Container Must Be Named + Must Be Sticky or Scrollable

**The container that has `container-type: scroll-state` MUST be:**
1. **Named** with `container-name`
2. **Either sticky positioned OR scrollable** (overflow)

#### Pattern A: Sticky Element Detection

```css
/* The STICKY ELEMENT is the container */
.sticky-header {
  position: sticky;
  top: 0;

  /* This element detects its own stuck state */
  container-name: sticky-heading;
  container-type: scroll-state;
}

/* Style CHILDREN when sticky element is stuck */
@container sticky-heading scroll-state(stuck: top) {
  .header-content {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
```

**Required HTML Structure:**
```html
<div class="sticky-header">
  <div class="header-content">
    <!-- Content here gets styled -->
    <h4>Header Title</h4>
  </div>
</div>
```

#### Pattern B: Scrollable Container Detection

```css
/* The SCROLLABLE ELEMENT is the container */
.scrollable-area {
  overflow-y: auto;
  height: 500px;

  /* This element detects its scroll state */
  container-name: scrollable-area;
  container-type: scroll-state;
}

/* Style CHILDREN based on scroll position */
@container scrollable-area scroll-state(scrollable: top) {
  .back-to-top {
    opacity: 1;
  }
}
```

**Required HTML Structure:**
```html
<div class="scrollable-area">
  <!-- Direct children can be styled -->
  <button class="back-to-top">Back to Top</button>
  <div class="content">...</div>
</div>
```

---

## 🎯 Complete Working Examples

### Example 1: Sticky Header That Changes When Stuck

**Goal:** Header gets a shadow and blue text when it sticks to the top.

```html
<div class="page-container">
  <!-- The sticky element itself is the container -->
  <header class="sticky-header">
    <!-- Wrapper div gets styled -->
    <div class="header-content">
      <h1>My Site</h1>
      <nav>...</nav>
    </div>
  </header>

  <main>
    <!-- Long content that causes scrolling -->
  </main>
</div>
```

```css
/* Sticky header setup */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;

  /* Enable scroll-state detection on THIS element */
  container-name: sticky-heading;
  container-type: scroll-state;
}

/* Default header content styles */
.header-content {
  padding: 1rem 2rem;
  background: #f9fafb;
  border-bottom: 2px solid transparent;
  transition: all 250ms ease;
}

/* When sticky header is stuck, style its CHILD */
@container sticky-heading scroll-state(stuck: top) {
  .header-content {
    background: white;
    border-bottom-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #3b82f6;
  }
}
```

---

### Example 2: Back-to-Top Button in Scrollable Container

**Goal:** Show "Back to Top" button when user has scrolled down (can scroll back up).

```html
<div class="article-container">
  <article class="content">
    <!-- Long article content -->
    <h2>Article Title</h2>
    <p>Long content...</p>
  </article>

  <!-- Button appears when scrollable: top is true -->
  <button class="back-to-top" onclick="this.closest('.article-container').scrollTo({top: 0, behavior: 'smooth'})">
    ↑ Back to Top
  </button>
</div>
```

```css
/* Scrollable container setup */
.article-container {
  height: 600px;
  overflow-y: auto;
  position: relative;

  /* Enable scroll-state detection */
  container-name: article-scroll;
  container-type: scroll-state;
}

/* Button styling - hidden by default */
.back-to-top {
  position: sticky;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  padding: 0.75rem 1.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

/* Show button when can scroll to top (user scrolled down) */
@container article-scroll scroll-state(scrollable: top) {
  .back-to-top {
    opacity: 1;
    pointer-events: auto;
  }
}
```

**Note:** Use `onclick` with `scrollTo()` instead of anchor links, because anchor links scroll the entire page, not a specific scrollable container.

---

## 📋 Quick Reference: scroll-state Values

### `stuck` - Sticky Positioning State
Detects when a sticky element is stuck to an edge.

```css
/* Container = sticky element */
.sticky-element {
  position: sticky;
  top: 0;
  container-type: scroll-state;
}

@container scroll-state(stuck: top) { /* Element stuck to top */ }
@container scroll-state(stuck: bottom) { /* Element stuck to bottom */ }
@container scroll-state(stuck: left) { /* Element stuck to left */ }
@container scroll-state(stuck: right) { /* Element stuck to right */ }
```

### `scrollable` - Overflow Detection
Detects if content can be scrolled in a direction.

```css
/* Container = scrollable element */
.scrollable {
  overflow: auto;
  container-type: scroll-state;
}

@container scroll-state(scrollable: top) { /* Can scroll UP (content above) */ }
@container scroll-state(scrollable: bottom) { /* Can scroll DOWN (content below) */ }
@container scroll-state(scrollable: left) { /* Can scroll LEFT */ }
@container scroll-state(scrollable: right) { /* Can scroll RIGHT */ }
```

### `snapped` - Scroll Snap Detection
Detects when an element is snapped on an axis.

```css
.carousel {
  scroll-snap-type: x mandatory;
  container-type: scroll-state;
}

@container scroll-state(snapped: x) { /* Element snapped on X axis */ }
@container scroll-state(snapped: y) { /* Element snapped on Y axis */ }
```

### `scrolled` - Scroll Direction (Chrome 144+ Only)
Detects the direction of recent user scrolling.

```css
@container scroll-state(scrolled: up) { /* User scrolled UP */ }
@container scroll-state(scrolled: down) { /* User scrolled DOWN */ }
@container scroll-state(scrolled: left) { /* User scrolled LEFT */ }
@container scroll-state(scrolled: right) { /* User scrolled RIGHT */ }
```

---

## ⚠️ Common Mistakes & Solutions

### Mistake #1: Trying to Style the Container Itself

**❌ Doesn't Work:**
```css
.sticky-header {
  container-type: scroll-state;
}

@container scroll-state(stuck: top) {
  .sticky-header { /* This NEVER applies */ }
}
```

**✅ Solution: Add a Wrapper**
```html
<div class="sticky-header">
  <div class="header-wrapper">Content</div>
</div>
```

```css
@container scroll-state(stuck: top) {
  .header-wrapper { /* This works! */ }
}
```

---

### Mistake #2: Forgetting to Name the Container

**❌ Doesn't Work:**
```css
.container {
  container-type: scroll-state; /* Missing name! */
}

/* This is ambiguous - which container? */
@container scroll-state(stuck: top) {
  .child { }
}
```

**✅ Solution: Always Use Named Containers**
```css
.container {
  container-name: my-container;
  container-type: scroll-state;
}

@container my-container scroll-state(stuck: top) {
  .child { }
}
```

---

### Mistake #3: Using Anchor Links for Internal Scroll

**❌ Doesn't Work Well:**
```html
<div class="scrollable">
  <div id="top"></div>
  <a href="#top">Back to Top</a>
</div>
```

**Problem:** `href="#top"` scrolls the entire PAGE, not the scrollable container.

**✅ Solution: Use JavaScript scrollTo()**
```html
<button onclick="this.closest('.scrollable').scrollTo({top: 0, behavior: 'smooth'})">
  Back to Top
</button>
```

Or use a simple inline script:
```html
<button onclick="document.querySelector('.scrollable').scrollTo({top: 0})">
  Back to Top
</button>
```

---

### Mistake #4: Wrong Specificity Order

**❌ Container Query Gets Overridden:**
```css
/* Base styles (high specificity) */
.container .back-to-top {
  opacity: 0;
}

/* Container query (low specificity) */
@container scroll-state(scrollable: top) {
  .back-to-top {
    opacity: 1; /* Gets overridden! */
  }
}
```

**✅ Solution: Use !important or Increase Specificity**
```css
/* Option 1: Use !important in container query */
@container scroll-state(scrollable: top) {
  .back-to-top {
    opacity: 1 !important;
  }
}

/* Option 2: Match specificity */
@container scroll-state(scrollable: top) {
  .container .back-to-top {
    opacity: 1;
  }
}
```

---

## 🎨 Design Patterns

### Pattern: Auto-Hide Header on Scroll Down

```css
.page-container {
  container-name: page-scroll;
  container-type: scroll-state;
  overflow-y: auto;
  height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

/* Hide header when can scroll up (user scrolled down) */
@container page-scroll scroll-state(scrollable: top) {
  .header {
    transform: translateY(-100%);
  }
}
```

### Pattern: Scroll Progress Indicator

```css
.content-area {
  container-name: content;
  container-type: scroll-state;
  overflow-y: auto;
}

.progress-indicator {
  position: sticky;
  top: 0;
  height: 4px;
  background: #e5e7eb;
}

.progress-bar {
  height: 100%;
  background: #3b82f6;
  width: 0;
  transition: width 0.3s ease;
}

/* Show progress when scrolling */
@container content scroll-state(scrollable: top) {
  .progress-bar {
    width: 50%; /* Could use calc() with scroll position */
  }
}

@container content scroll-state(scrollable: bottom) {
  .progress-bar {
    width: 100%;
  }
}
```

---

## 🔍 Browser Support & Feature Detection

### Check Support
```css
@supports (container-type: scroll-state) {
  /* scroll-state is supported */
  .sticky-header {
    container-type: scroll-state;
  }
}
```

### Progressive Enhancement
```css
/* Fallback: Always show shadow */
.header-content {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Enhancement: Only show shadow when stuck */
@supports (container-type: scroll-state) {
  .header-content {
    box-shadow: none;
  }

  @container scroll-state(stuck: top) {
    .header-content {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
}
```

---

## 📚 Resources

- [MDN: Container scroll-state queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries)
- [Chrome for Developers: CSS scroll-state()](https://developer.chrome.com/blog/css-scroll-state-queries)
- [Una Kravets: Directional CSS with scroll-state()](https://una.im/scroll-state-scrolled)
- [Can I Use: scroll-state support](https://caniuse.com/mdn-css_properties_container-type_scroll-state)

---

**Last Updated:** January 22, 2026
**Tested With:** Chrome 144, Safari 18
**Status:** Production-ready for sticky detection, emerging for scroll direction
