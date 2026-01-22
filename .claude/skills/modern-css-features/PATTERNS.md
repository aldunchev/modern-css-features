# Implementation Patterns & Best Practices

> **Progressive disclosure file for modern-css-features Skill**

This file contains implementation patterns, best practices, and architectural guidance for modern CSS features.

---

## Core Principles

### 1. Progressive Enhancement First
Always provide a baseline experience, then enhance for capable browsers.

```css
/* Base: Works everywhere */
.component {
  /* Essential styles */
}

/* Enhancement: Modern feature */
@supports (modern-feature: value) {
  .component {
    /* Enhanced styles */
  }
}
```

### 2. Declarative Over Imperative
Prefer CSS solutions over JavaScript when functionality is equivalent.

**Why?**
- Faster (CSS runs in browser's style engine)
- Less code to maintain
- Better accessibility (native behaviors)
- Reduced JavaScript bundle size

### 3. Feature Detection, Not Browser Detection
Use `@supports` to detect features, not user agents.

```css
/* ✅ Good: Feature detection */
@supports selector(:has(+ *)) {
  .parent:has(.child:focus) { /* ... */ }
}

/* ❌ Bad: Browser detection */
/* if (navigator.userAgent.includes('Chrome')) { ... } */
```

---

## Pattern: :has() Selector

### Pattern 1: Form State Management
**Problem:** Style parent based on child input state
**Solution:** Use `:has()` with pseudo-classes

```css
/* Pattern: Container responds to child state */
.container:has(.child:state) {
  /* Container styles */
}

/* Examples */
.form:has(input:invalid) { border-color: red; }
.form:has(input:focus) { border-color: blue; }
.form:has(input:valid) { border-color: green; }
.form:has(input:disabled) { opacity: 0.6; }
```

### Pattern 2: Conditional Sibling Styles
**Problem:** Style element based on presence/state of sibling
**Solution:** Combine `:has()` with sibling selectors

```css
/* Pattern: Style based on sibling existence */
.element:has(+ .sibling) {
  /* Styles when sibling exists */
}

/* Example: Add spacing if sibling follows */
.heading:has(+ .subheading) {
  margin-bottom: 0.5rem;
}

.heading:not(:has(+ .subheading)) {
  margin-bottom: 2rem;
}
```

### Pattern 3: Parent Hover from Any Child
**Problem:** Highlight parent when any child is hovered
**Solution:** Use `:has(*:hover)`

```css
/* Pattern: Parent reacts to any child hover */
.parent:has(*:hover) {
  /* Parent hover styles */
}

/* Example: Card with multiple interactive elements */
.card:has(*:hover) {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

### Pattern 4: Quantity Queries
**Problem:** Style based on number of children
**Solution:** Combine `:has()` with `:nth-last-child()`

```css
/* Pattern: Different layouts based on item count */
.grid:has(> :nth-last-child(n + 4)) {
  grid-template-columns: repeat(2, 1fr);
}

.grid:has(> :nth-last-child(n + 7)) {
  grid-template-columns: repeat(3, 1fr);
}
```

---

## Pattern: Container Queries

### Pattern 1: Self-Contained Responsive Components
**Problem:** Component needs to adapt to container, not viewport
**Solution:** Use container queries for component-based breakpoints

```css
/* Pattern: Component adapts to its container */
.component-wrapper {
  container-type: inline-size;
  container-name: component;
}

@container component (min-width: 400px) {
  .component { /* Styles for medium container */ }
}

@container component (min-width: 600px) {
  .component { /* Styles for large container */ }
}
```

### Pattern 2: Layout Switching
**Problem:** Switch between layouts based on available space
**Solution:** Use container queries with display changes

```css
.card-container {
  container-type: inline-size;
}

/* Stack by default */
.card {
  display: flex;
  flex-direction: column;
}

/* Side-by-side when space allows */
@container (min-width: 500px) {
  .card {
    flex-direction: row;
    gap: 2rem;
  }
}

/* Grid for large containers */
@container (min-width: 800px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### Pattern 3: Nested Containers
**Problem:** Multiple levels of containment
**Solution:** Name containers and target specific ones

```css
.outer {
  container-type: inline-size;
  container-name: outer;
}

.inner {
  container-type: inline-size;
  container-name: inner;
}

/* Target specific container */
@container outer (min-width: 800px) {
  /* Styles based on outer container */
}

@container inner (min-width: 400px) {
  /* Styles based on inner container */
}
```

---

## Pattern: scroll-snap

### Pattern 1: Full-Width Sections
**Problem:** Snap to full-width sections like slides
**Solution:** Use `scroll-snap-type: x mandatory` with 100% width items

```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.carousel-item {
  flex-shrink: 0;
  width: 100%;
  scroll-snap-align: start;
}
```

### Pattern 2: Centered Snap with Peek
**Problem:** Show partial views of adjacent items
**Solution:** Use scroll-padding and center alignment

```css
.carousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 85%;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 1rem;
}

.carousel-item {
  scroll-snap-align: center;
}
```

### Pattern 3: Programmatic Scrolling
**Problem:** Navigate carousel with buttons
**Solution:** Combine CSS snap with minimal JavaScript

```css
.carousel {
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.carousel-item {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

```javascript
// Minimal JS for navigation
nextButton.addEventListener('click', () => {
  carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
});
```

---

## Pattern: Popover API

### Pattern 1: Simple Modal
**Problem:** Basic modal dialog
**Solution:** Use `popover` attribute with `popovertarget`

```html
<button popovertarget="modal-id">Open</button>
<div id="modal-id" popover>
  <h2>Title</h2>
  <button popovertarget="modal-id">Close</button>
</div>
```

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

### Pattern 2: Manual Control (Tooltips)
**Problem:** Need manual control over popover state
**Solution:** Use `popover="manual"` with JavaScript

```html
<button id="trigger">Hover for tooltip</button>
<div id="tooltip" popover="manual">Tooltip text</div>
```

```javascript
const trigger = document.getElementById('trigger');
const tooltip = document.getElementById('tooltip');

trigger.addEventListener('mouseenter', () => tooltip.showPopover());
trigger.addEventListener('mouseleave', () => tooltip.hidePopover());
```

### Pattern 3: Nested Popovers
**Problem:** Popover within popover (e.g., modal with dropdown)
**Solution:** Use nested `popover` attributes

```html
<button popovertarget="outer">Open Modal</button>

<div id="outer" popover>
  <h2>Modal</h2>
  <button popovertarget="inner">Open Dropdown</button>

  <div id="inner" popover>
    <p>Nested content</p>
  </div>
</div>
```

---

## Pattern: @starting-style & Animations

### Pattern 1: Fade In on Show
**Problem:** Animate element appearing with `display: none` to `display: block`
**Solution:** Use `@starting-style` with `allow-discrete`

```css
.element {
  opacity: 0;
  transition: opacity 0.3s, display 0.3s allow-discrete;
}

@starting-style {
  .element.show {
    opacity: 0;
  }
}

.element.show {
  opacity: 1;
  display: block;
}
```

### Pattern 2: Height Auto Animation
**Problem:** Animate height from 0 to auto
**Solution:** Transition height with calc-size()

```css
.collapsible {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease, display 0.3s allow-discrete;
}

@starting-style {
  .collapsible.open {
    height: 0;
  }
}

.collapsible.open {
  height: auto;
}
```

### Pattern 3: Multi-Property Transition
**Problem:** Animate multiple properties including discrete values
**Solution:** Combine transitions with `allow-discrete`

```css
.modal {
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity 0.3s,
    transform 0.3s,
    display 0.3s allow-discrete,
    overlay 0.3s allow-discrete;
}

@starting-style {
  .modal[open] {
    opacity: 0;
    transform: scale(0.95);
  }
}

.modal[open] {
  opacity: 1;
  transform: scale(1);
}
```

---

## Anti-Patterns (What NOT to Do)

### Anti-Pattern 1: Overusing :has()
❌ **Wrong:** Using :has() when simpler selector exists
```css
.parent:has(> .child) .child {
  color: red;
}
```

✅ **Better:** Use direct selector
```css
.parent > .child {
  color: red;
}
```

### Anti-Pattern 2: Missing Fallbacks
❌ **Wrong:** Using modern feature without fallback
```css
[popover] {
  /* Styles only */
}
```

✅ **Better:** Provide fallback
```css
/* Fallback modal */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Enhanced with popover */
@supports selector(:popover-open) {
  [popover] {
    /* Popover-specific styles */
  }
}
```

### Anti-Pattern 3: Forgetting Container Type
❌ **Wrong:** Using @container without setting container-type
```css
@container (min-width: 400px) {
  .card { /* ... */ }
}
```

✅ **Better:** Define container first
```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { /* ... */ }
}
```

### Anti-Pattern 4: Complex :has() Chains
❌ **Wrong:** Deeply nested :has() selectors
```css
.a:has(.b:has(.c:has(.d))) {
  /* Hard to read and maintain */
}
```

✅ **Better:** Simplify or use JavaScript for complex logic
```css
.a:has(.b .c .d) {
  /* Same result, simpler */
}
```

---

## Architecture Patterns

### Pattern: CSS-First Architecture
**Principle:** Let CSS handle UI state when possible, use JavaScript only for data/logic

```
HTML (Structure)
    ↓
CSS (Presentation + State)
    ↓
JavaScript (Data + Logic only)
```

**Example:**
```css
/* CSS handles UI state */
.form:has(input:invalid) { /* ... */ }
[popover] { /* ... */ }
.carousel { scroll-snap-type: x mandatory; }
```

```javascript
// JavaScript handles data only
async function submitForm(data) {
  const response = await fetch('/api', { method: 'POST', body: data });
  return response.json();
}
```

### Pattern: Progressive Enhancement Layers
**Principle:** Build in layers from basic to enhanced

```
Layer 1: Semantic HTML (works everywhere)
    ↓
Layer 2: Basic CSS (classic properties)
    ↓
Layer 3: Modern CSS with @supports (enhanced)
    ↓
Layer 4: JavaScript (only if CSS can't do it)
```

---

## Performance Best Practices

### 1. Minimize :has() Scope
```css
/* ❌ Expensive: Searches entire document */
body:has(.active-modal) {
  overflow: hidden;
}

/* ✅ Better: Scoped to specific element */
.modal-container:has(.active-modal) {
  overflow: hidden;
}
```

### 2. Use Container Queries for Components
```css
/* ✅ Good: Component-scoped */
.product-card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .product-card { /* ... */ }
}
```

### 3. Limit Scroll-Snap Items
```css
/* Optimal: ~50 items or fewer */
.carousel {
  scroll-snap-type: x mandatory;
}

/* For 100+ items, use virtual scrolling (JavaScript) */
```

---

## Accessibility Patterns

### Pattern 1: Focus Management with :has()
```css
/* Visual focus indicator for parent */
.form-group:has(input:focus) {
  outline: 2px solid #3b82f6;
  outline-offset: 4px;
}
```

### Pattern 2: Accessible Modals with Popover
```html
<!-- Popover API provides automatic focus trapping -->
<div id="modal" popover aria-labelledby="modal-title">
  <h2 id="modal-title">Modal Title</h2>
  <p>Content</p>
</div>
```

### Pattern 3: Keyboard Navigation with Scroll-Snap
```javascript
// Enhance snap with keyboard support
carousel.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
  } else if (e.key === 'ArrowRight') {
    carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
  }
});
```

---

## Testing Patterns

### Pattern 1: Feature Detection in Tests
```javascript
describe('Modern CSS features', () => {
  beforeEach(() => {
    if (!CSS.supports('selector(:has(+ *))')) {
      this.skip(); // Skip test if :has() not supported
    }
  });

  it('should style parent on child focus', () => {
    // Test implementation
  });
});
```

### Pattern 2: Progressive Enhancement Testing
```javascript
// Test both enhanced and fallback
it('works without :has() support', () => {
  // Test fallback behavior
});

it('enhances with :has() support', () => {
  if (CSS.supports('selector(:has(+ *))')) {
    // Test enhanced behavior
  }
});
```

---

## Migration Patterns

### Migrating from JavaScript to CSS

**Step 1:** Identify JavaScript-managed UI state
```javascript
// Current: JavaScript manages modal
button.addEventListener('click', () => {
  modal.classList.add('open');
  backdrop.classList.add('visible');
});
```

**Step 2:** Replace with CSS feature
```html
<!-- New: Popover API -->
<button popovertarget="modal">Open</button>
<div id="modal" popover>Content</div>
```

**Step 3:** Remove JavaScript
```javascript
// No longer needed!
// ~50 lines of modal management code deleted
```

**Step 4:** Add progressive enhancement
```css
@supports not selector(:popover-open) {
  /* Fallback for older browsers */
  .modal { /* ... */ }
}
```

---

**GitHub Repository:** https://github.com/aldunchev/modern-css-features
**Full Documentation:** https://github.com/aldunchev/modern-css-features/tree/main/docs
**Last Updated:** January 2026
