# CSS Features Technical Reference

> Comprehensive technical documentation for all modern CSS features demonstrated in this project.

## Table of Contents

- [Feature 1: :has() Selector](#feature-1-has-selector)
- [Feature 2: Container Queries](#feature-2-container-queries)
- [Feature 3: CSS Carousel (scroll-snap)](#feature-3-css-carousel-scroll-snap)
- [Feature 4: Popover API](#feature-4-popover-api)
- [Feature 5: Modern Animations](#feature-5-modern-animations)
- [Future Features (Tier 2 & 3)](#future-features-tier-2--3)

---

## Feature 1: :has() Selector

### Overview

The `:has()` selector (also called the "parent selector") allows you to select an element based on its descendants or siblings. This was previously impossible in CSS and required JavaScript event listeners.

**Browser Support:** Chrome 106+, Firefox 122+, Safari 15.5+

### Syntax

```css
/* Basic syntax */
parent:has(child) {
    /* styles */
}

/* With combinators */
element:has(> direct-child) { }
element:has(+ next-sibling) { }
element:has(~ any-sibling) { }

/* Multiple selectors */
element:has(selector1, selector2) { }

/* Negation */
element:not(:has(child)) { }
```

### Use Cases

#### 1. Form Validation Without JavaScript

**Problem:** Traditionally required JavaScript to detect invalid inputs and style parent containers.

**Old JavaScript Approach:**
```javascript
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        const container = this.closest('.form-group');
        if (!this.validity.valid && this.value !== '') {
            container.classList.add('error');
        } else {
            container.classList.remove('error');
        }
    });
});
```

**New CSS Approach:**
```css
/* Style parent when input is invalid */
.form-group:has(input:invalid:not(:placeholder-shown)) {
    border-color: #ef4444;
    background-color: #fee2e2;
}

/* Style parent when input is valid */
.form-group:has(input:valid:not(:placeholder-shown)) {
    border-color: #10b981;
    background-color: #d1fae5;
}
```

**Benefits:**
- Zero JavaScript required
- Automatic updates as user types
- Declarative, easier to maintain
- Better performance (browser-native)

#### 2. Card Hover Effects on Parent

**Problem:** Hovering a button inside a card should style the entire card.

**CSS Solution:**
```css
/* Card changes when button is hovered */
.hover-card:has(.hover-btn:hover) {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

/* Button itself also changes */
.hover-btn:hover {
    background: #2563eb;
}
```

#### 3. Sibling Fade-Out Gallery

**Problem:** When hovering one image, fade out all siblings but keep the hovered one bright.

**CSS Solution:**
```css
/* Fade all items when container has a hovered child */
.gallery:has(.gallery-item:hover) .gallery-item {
    opacity: 0.4;
}

/* Keep hovered item bright */
.gallery-item:hover {
    opacity: 1;
    transform: scale(1.05);
    z-index: 10;
}
```

### Advanced Patterns

#### Combining Multiple Conditions
```css
/* Form section that has both required and invalid inputs */
.form-section:has(input[required]:invalid) {
    border-left: 4px solid #ef4444;
}

/* Article that contains both headings and images */
article:has(h2):has(img) {
    /* Special layout for articles with headings and images */
}
```

#### Negation Patterns
```css
/* Style cards that DON'T have images */
.card:not(:has(img)) {
    padding: var(--space-8);
}

/* List items without checkboxes */
li:not(:has(input[type="checkbox"])) {
    padding-left: 0;
}
```

### Browser Support Detection

```javascript
// Feature detection
function supportsHas() {
    try {
        document.querySelector(':has(*)');
        return true;
    } catch {
        return false;
    }
}

// CSS detection
@supports selector(:has(+ *)) {
    /* :has() supported styles */
}
```

### Performance Considerations

- `:has()` is fast for static selectors
- Avoid complex selectors inside `:has()` when possible
- Prefer direct child (`>`) over descendant selectors
- Browser optimizes common patterns automatically

### Resources

- [MDN: :has() Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- [Can I Use: CSS :has()](https://caniuse.com/css-has)
- [CSS-Tricks: The :has() Selector](https://css-tricks.com/the-css-has-selector/)

---

## Feature 2: Container Queries

### Overview

Container queries allow components to respond to their container's size instead of the viewport size. This enables true component-based responsive design.

**Browser Support:** Chrome 105+, Firefox 110+, Safari 16+

### Syntax

```css
/* Define container */
.container {
    container-type: inline-size;  /* or size, normal */
    container-name: card;         /* optional name */
}

/* Query the container */
@container (min-width: 400px) {
    .child {
        /* styles when container >= 400px */
    }
}

/* Named container query */
@container card (min-width: 400px) {
    .child { }
}
```

### Container Types

```css
/* inline-size: queries container's width only (most common) */
.container {
    container-type: inline-size;
}

/* size: queries both width and height */
.container {
    container-type: size;
}

/* normal: not a query container (default) */
.container {
    container-type: normal;
}
```

### Use Cases

#### 1. Adaptive Profile Card

**Problem:** Card should switch from vertical to horizontal layout based on available space, not viewport size.

**Old Media Query Approach:**
```css
/* BAD: Responds to viewport, not container */
@media (min-width: 768px) {
    .profile-card {
        display: flex;
    }
}
```

**New Container Query Approach:**
```css
/* Card container */
.profile-card {
    container-type: inline-size;
}

/* Vertical layout by default */
.profile-card {
    display: flex;
    flex-direction: column;
}

/* Horizontal layout when container >= 320px */
@container (min-width: 20rem) {
    .profile-card {
        flex-direction: row;
        gap: var(--space-4);
    }

    .profile-avatar {
        width: 80px;
        height: 80px;
    }
}

/* Larger layout when container >= 480px */
@container (min-width: 30rem) {
    .profile-avatar {
        width: 120px;
        height: 120px;
    }

    .profile-name {
        font-size: var(--text-2xl);
    }
}
```

**Benefits:**
- Same component works in sidebar (narrow) or main content (wide)
- Truly reusable components
- No JavaScript needed
- Responds to actual available space

#### 2. Product Card Grid

**Problem:** Product cards should adapt based on grid column width, not viewport width.

**CSS Solution:**
```css
/* Grid container (NOT a query container itself) */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-6);
}

/* Each card IS a query container */
.product-card {
    container-type: inline-size;
}

/* Compact layout (narrow container) */
.product-card .card-image {
    height: 200px;
}

/* Medium layout */
@container (min-width: 18rem) {
    .product-card .card-image {
        height: 250px;
    }

    .product-card .card-title {
        font-size: var(--text-lg);
    }
}

/* Expanded layout */
@container (min-width: 24rem) {
    .product-card .card-image {
        height: 300px;
    }

    .product-card .card-details {
        display: block; /* Show additional details */
    }
}
```

### Advanced Patterns

#### Named Containers
```css
/* Useful when you have nested containers */
.sidebar {
    container-type: inline-size;
    container-name: sidebar;
}

.content {
    container-type: inline-size;
    container-name: content;
}

/* Query specific container by name */
@container sidebar (min-width: 300px) {
    .widget { /* ... */ }
}

@container content (min-width: 600px) {
    .article { /* ... */ }
}
```

#### Container Query Units
```css
.container {
    container-type: inline-size;
}

.child {
    /* cqw: 1% of container width */
    width: 50cqw;

    /* cqh: 1% of container height */
    height: 30cqh;

    /* cqi: 1% of container inline size */
    padding: 2cqi;

    /* cqb: 1% of container block size */
    margin: 1cqb;

    /* cqmin: smaller of cqi or cqb */
    font-size: 3cqmin;

    /* cqmax: larger of cqi or cqb */
    gap: 2cqmax;
}
```

#### Combining Multiple Conditions
```css
@container (min-width: 400px) and (max-width: 600px) {
    /* Medium container size */
}

@container (min-width: 400px) or (orientation: portrait) {
    /* Wide container OR portrait orientation */
}
```

### Browser Support Detection

```javascript
// Feature detection
function supportsContainerQueries() {
    return CSS.supports('container-type: inline-size');
}
```

```css
/* CSS detection */
@supports (container-type: inline-size) {
    /* Container queries supported */
}
```

### Performance Considerations

- Container queries are highly performant (browser-optimized)
- Prefer `inline-size` over `size` when you only need width queries
- Container queries don't cause reflow loops (browser prevents circular dependencies)
- Use container query units sparingly (can be harder to read)

### Common Pitfalls

1. **Forgetting `container-type`**: Container queries won't work without it
2. **Using `size` when `inline-size` is enough**: `size` has layout constraints
3. **Querying the wrong container**: Use `container-name` for clarity in nested scenarios

### Resources

- [MDN: Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries)
- [Can I Use: Container Queries](https://caniuse.com/css-container-queries)
- [Josh Comeau: Container Queries Introduction](https://www.joshwcomeau.com/css/container-queries-introduction/)

---

## Feature 3: CSS Carousel (scroll-snap)

### Overview

`scroll-snap` creates smooth, native scrolling carousels without JavaScript. The browser handles snap points, smooth scrolling, and momentum automatically.

**Browser Support:** Chrome 69+, Firefox 68+, Safari 14.1+

### Syntax

```css
/* Container */
.carousel {
    scroll-snap-type: x mandatory;  /* or y, proximity */
    overflow-x: auto;
}

/* Items */
.carousel-item {
    scroll-snap-align: start;  /* or center, end */
    scroll-snap-stop: always;  /* or normal */
}
```

### Properties Explained

#### `scroll-snap-type`

**Syntax:** `scroll-snap-type: <axis> <strictness>`

```css
/* Horizontal snapping (required) */
scroll-snap-type: x mandatory;

/* Vertical snapping (optional) */
scroll-snap-type: y mandatory;

/* Both axes (rare) */
scroll-snap-type: both mandatory;

/* Strictness levels */
scroll-snap-type: x mandatory;  /* MUST snap to a point */
scroll-snap-type: x proximity;  /* Snap if close to a point */
```

**When to use:**
- `mandatory`: Carousels, full-page sections (always snap)
- `proximity`: Image galleries, scrollable lists (snap if nearby)

#### `scroll-snap-align`

```css
/* Snap to start of item */
scroll-snap-align: start;  /* Most common for carousels */

/* Snap to center of item */
scroll-snap-align: center;  /* Good for galleries */

/* Snap to end of item */
scroll-snap-align: end;

/* No snapping for this item */
scroll-snap-align: none;
```

#### `scroll-behavior`

```css
/* Smooth scrolling animation */
scroll-behavior: smooth;

/* Instant scrolling */
scroll-behavior: auto;
```

### Use Cases

#### 1. Image Carousel

**Old JavaScript Approach:**
```javascript
let currentIndex = 0;

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    carousel.scrollTo({
        left: slides[currentIndex].offsetLeft,
        behavior: 'smooth'
    });
}

// Set up event listeners, track state, handle edge cases...
```

**New CSS Approach:**
```css
.carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    /* Hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.carousel::-webkit-scrollbar {
    display: none;
}

.carousel-item {
    flex: 0 0 100%;
    scroll-snap-align: start;
}
```

**HTML:**
```html
<div class="carousel">
    <div class="carousel-item">Slide 1</div>
    <div class="carousel-item">Slide 2</div>
    <div class="carousel-item">Slide 3</div>
</div>
```

**Benefits:**
- Native scrolling performance
- Touch/trackpad gestures work automatically
- Momentum scrolling on mobile
- Accessibility built-in (keyboard scrolling)
- Zero JavaScript

#### 2. Multi-Item Carousel

**Problem:** Show multiple items at once, snap to each item.

```css
.carousel {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 1rem;
}

.carousel-item {
    flex: 0 0 300px;  /* Fixed width items */
    scroll-snap-align: start;
}
```

#### 3. Full-Page Sections

**Problem:** Create full-page scroll sections that snap.

```css
.page-sections {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
}

.section {
    height: 100vh;
    scroll-snap-align: start;
}
```

### Advanced Patterns

#### Scroll Padding

```css
/* Add padding before snap point */
.carousel {
    scroll-snap-type: x mandatory;
    scroll-padding: 20px;  /* Items snap 20px from edge */
}

/* Useful for carousels with visible next/prev items */
.carousel {
    scroll-padding: 0 50px;  /* Left/right padding */
}
```

#### Scroll Margin

```css
/* Add margin to snap point of individual items */
.carousel-item {
    scroll-snap-align: start;
    scroll-margin: 10px;  /* Snap 10px before item start */
}
```

#### Scroll Snap Stop

```css
/* Force scroll to stop at this item (no skipping) */
.important-slide {
    scroll-snap-stop: always;
}

/* Allow normal scrolling past (default) */
.normal-slide {
    scroll-snap-stop: normal;
}
```

### JavaScript Integration (Optional)

While scroll-snap works without JavaScript, you can add navigation:

```javascript
// Scroll to specific slide
function scrollToSlide(index) {
    const item = carousel.children[index];
    item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
}

// Detect current slide (for indicators)
carousel.addEventListener('scroll', () => {
    const scrollLeft = carousel.scrollLeft;
    const itemWidth = carousel.children[0].offsetWidth;
    const currentIndex = Math.round(scrollLeft / itemWidth);
    updateIndicators(currentIndex);
});
```

### Browser Support Detection

```css
@supports (scroll-snap-type: x mandatory) {
    /* Scroll snap supported */
}
```

### Performance Considerations

- Scroll snap is GPU-accelerated (excellent performance)
- Native scrolling uses hardware acceleration
- Better than JavaScript scroll libraries for battery life
- Works perfectly with touch devices

### Common Pitfalls

1. **Forgetting `overflow`**: scroll-snap requires `overflow: auto` or `overflow: scroll`
2. **Not setting item dimensions**: Items must have fixed or consistent sizes
3. **Using `mandatory` with uneven items**: Can cause jarring snaps
4. **Nesting scroll containers**: Can cause scroll interference

### Resources

- [MDN: scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)
- [Can I Use: Scroll Snap](https://caniuse.com/css-snappoints)
- [CSS-Tricks: Scroll Snap](https://css-tricks.com/practical-css-scroll-snapping/)

---

## Feature 4: Popover API

### Overview

The Popover API provides native modal dialogs and popovers with automatic backdrop management, focus trapping, and accessibility features—all without JavaScript.

**Browser Support:** Chrome 114+, Firefox 125+, Safari 17+

### Syntax

```html
<!-- Trigger button -->
<button popovertarget="my-popover">Open</button>

<!-- Popover element -->
<div id="my-popover" popover>
    Popover content
</div>
```

```css
/* Style the popover */
[popover] {
    /* Your styles */
}

/* Style the backdrop */
[popover]::backdrop {
    background: rgba(0, 0, 0, 0.5);
}
```

### Popover Types

#### Auto Popover (Default)
```html
<!-- Automatically handles light-dismiss (click outside to close) -->
<div id="popover" popover="auto">
    Content
</div>
```

**Behavior:**
- Clicking outside closes it
- Pressing Escape closes it
- Opening another popover closes this one
- Backdrop is NOT created

#### Manual Popover
```html
<!-- Must be explicitly closed -->
<div id="popover" popover="manual">
    Content
    <button popovertarget="popover" popovertargetaction="hide">Close</button>
</div>
```

**Behavior:**
- Does NOT close on outside click
- Does NOT close on Escape
- Must use close button or JavaScript
- Useful for important messages

#### Modal Popover
```html
<!-- Creates backdrop, traps focus -->
<div id="modal" popover>
    Modal content
</div>
```

```css
/* Style modal backdrop */
#modal::backdrop {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
}
```

### Trigger Actions

```html
<!-- Show popover (default) -->
<button popovertarget="menu" popovertargetaction="show">Open</button>

<!-- Hide popover -->
<button popovertarget="menu" popovertargetaction="hide">Close</button>

<!-- Toggle popover (default behavior) -->
<button popovertarget="menu" popovertargetaction="toggle">Toggle</button>
```

### Use Cases

#### 1. Simple Popover (Tooltip Alternative)

**Old JavaScript Approach:**
```javascript
button.addEventListener('click', () => {
    tooltip.style.display = 'block';
    positionTooltip(button, tooltip);

    document.addEventListener('click', (e) => {
        if (!tooltip.contains(e.target)) {
            tooltip.style.display = 'none';
        }
    });
});
```

**New Popover API:**
```html
<button popovertarget="info">Info</button>

<div id="info" popover="auto" class="simple-popover">
    <h4>Quick Info</h4>
    <p>Additional details here.</p>
</div>
```

```css
.simple-popover {
    padding: var(--space-5);
    background: white;
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    max-width: 400px;
}
```

**Benefits:**
- No JavaScript
- Automatic light-dismiss
- Accessible by default

#### 2. Modal Dialog

**Old JavaScript Approach:**
```javascript
// Show modal
function showModal() {
    modal.style.display = 'block';
    backdrop.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Focus trap
    modal.addEventListener('keydown', trapFocus);

    // Close on backdrop click
    backdrop.addEventListener('click', closeModal);
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    backdrop.style.display = 'none';
    document.body.style.overflow = '';
}
```

**New Popover API:**
```html
<button popovertarget="modal">Open Modal</button>

<div id="modal" popover class="modal-popover">
    <div class="modal-header">
        <h3>Modal Title</h3>
        <button popovertarget="modal" class="modal-close">×</button>
    </div>
    <div class="modal-body">
        <p>Modal content...</p>
    </div>
    <div class="modal-footer">
        <button popovertarget="modal">Close</button>
        <button class="btn-primary">Confirm</button>
    </div>
</div>
```

```css
.modal-popover {
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    max-width: 500px;
    width: 90vw;
}

[popover]::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}
```

**Benefits:**
- Automatic backdrop
- Focus management built-in
- Escape key closes automatically
- Accessible by default

#### 3. Multiple Independent Popovers

```html
<div class="popover-demo">
    <button popovertarget="info1">Info 1</button>
    <button popovertarget="info2">Info 2</button>
    <button popovertarget="info3">Info 3</button>
</div>

<div id="info1" popover="auto">Info 1 content</div>
<div id="info2" popover="auto">Info 2 content</div>
<div id="info3" popover="auto">Info 3 content</div>
```

**Behavior:** Opening one auto-popover automatically closes others.

### Pseudo-Classes

```css
/* Style when popover is open */
[popover]:popover-open {
    opacity: 1;
    transform: scale(1);
}

/* Style when popover is closed (default state) */
[popover] {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.2s, transform 0.2s;
}
```

### JavaScript API (Optional)

While popovers work without JavaScript, the API is available:

```javascript
// Show popover
popover.showPopover();

// Hide popover
popover.hidePopover();

// Toggle popover
popover.togglePopover();

// Check if open
if (popover.matches(':popover-open')) {
    // Popover is open
}

// Events
popover.addEventListener('beforetoggle', (e) => {
    console.log('Popover state:', e.newState); // 'open' or 'closed'
});

popover.addEventListener('toggle', (e) => {
    console.log('Popover toggled');
});
```

### Accessibility Features

The Popover API automatically provides:
- **Focus management**: Focus moves to popover when opened
- **Escape key**: Closes popover
- **ARIA attributes**: Automatically added
- **Tab trapping**: Focus stays within popover (modal behavior)
- **Return focus**: Focus returns to trigger button on close

### Styling Backdrop

```css
/* Dark backdrop with blur */
[popover]::backdrop {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
}

/* Gradient backdrop */
[popover]::backdrop {
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0.4)
    );
}

/* Animated backdrop */
[popover]::backdrop {
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s;
}

[popover]:popover-open::backdrop {
    background: rgba(0, 0, 0, 0.5);
}
```

### Browser Support Detection

```javascript
function supportsPopover() {
    return HTMLElement.prototype.hasOwnProperty('popover');
}
```

```css
@supports (selector([popover])) {
    /* Popover supported */
}
```

### Performance Considerations

- Popovers are part of the "top layer" (render above all other content)
- No z-index battles
- Browser-optimized rendering
- Better performance than JavaScript modals

### Common Pitfalls

1. **Forgetting `id` and `popovertarget` match**: They must be identical
2. **Using `popover="manual"` for tooltips**: Use `auto` for light-dismiss behavior
3. **Overriding default styles too aggressively**: Preserve top-layer behavior
4. **Not providing close button for manual popovers**: Users can't close them otherwise

### Resources

- [MDN: Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
- [Can I Use: Popover API](https://caniuse.com/mdn-api_htmlelement_popover)
- [Chrome: Introducing Popover API](https://developer.chrome.com/blog/introducing-popover-api)

---

## Feature 5: Modern Animations

### Overview

Modern CSS animations allow you to animate previously un-animatable properties like `display`, `height: auto`, and discrete properties. This is achieved with `@starting-style`, `transition-behavior: allow-discrete`, and `calc-size()`.

**Browser Support:**
- `@starting-style`: Chrome 117+, Safari 17.4+
- `allow-discrete`: Chrome 117+, Safari 17.4+
- `calc-size()`: Chrome 129+, Safari 18+

### New Features

#### 1. `@starting-style`

Defines the starting state for elements that are just added to the DOM.

**Syntax:**
```css
@starting-style {
    .element {
        /* Starting state when element appears */
        opacity: 0;
        transform: scale(0.9);
    }
}

/* Normal state */
.element {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.3s, transform 0.3s;
}
```

#### 2. `transition-behavior: allow-discrete`

Allows animating discrete properties like `display`.

**Syntax:**
```css
.element {
    display: block;
    transition:
        opacity 0.3s,
        display 0.3s allow-discrete;
}

.element.hidden {
    display: none;
    opacity: 0;
}
```

#### 3. `calc-size()`

Animates from/to `auto` values (like `height: auto`).

**Syntax:**
```css
.element {
    height: calc-size(auto);
    transition: height 0.3s;
}

.element.collapsed {
    height: 0;
}
```

### Use Cases

#### 1. Animating `display: none`

**Problem:** Previously impossible to animate elements fading in/out with `display: none`.

**Old Workaround (Hacky):**
```javascript
// Show element
element.style.display = 'block';
setTimeout(() => {
    element.style.opacity = '1';
}, 10);

// Hide element
element.style.opacity = '0';
setTimeout(() => {
    element.style.display = 'none';
}, 300);
```

**New CSS Approach:**
```css
.box {
    display: block;
    opacity: 1;
    transform: scale(1);

    transition:
        opacity 0.4s ease-out,
        transform 0.4s ease-out,
        display 0.4s allow-discrete;
}

.box.hidden {
    display: none;
    opacity: 0;
    transform: scale(0.9);
}

/* Starting state when element appears */
@starting-style {
    .box {
        opacity: 0;
        transform: scale(0.9);
    }
}
```

**HTML:**
```html
<button onclick="box.classList.toggle('hidden')">Toggle</button>
<div class="box">
    <p>This box smoothly animates in and out!</p>
</div>
```

**Benefits:**
- Smooth fade-in when element appears
- Smooth fade-out before `display: none`
- No JavaScript timing hacks
- Works with browser paint optimization

#### 2. Smooth Accordion (Animating Height)

**Problem:** `height: auto` couldn't be animated before.

**Old Workaround:**
```javascript
function toggleAccordion(element) {
    if (element.style.height) {
        element.style.height = element.scrollHeight + 'px';
        setTimeout(() => {
            element.style.height = '0';
        }, 10);
    } else {
        element.style.height = element.scrollHeight + 'px';
        setTimeout(() => {
            element.style.height = '';
        }, 300);
    }
}
```

**New CSS Approach (with `<details>`):**
```css
details {
    overflow: hidden;
}

details summary {
    cursor: pointer;
    list-style: none;
}

/* Animate content appearance */
.details-content {
    opacity: 0;
    transform: translateY(-10px);
}

details[open] .details-content {
    animation: slideDownFade 0.3s ease-out forwards;
}

@keyframes slideDownFade {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**HTML:**
```html
<details class="accordion-item">
    <summary>Click to expand</summary>
    <div class="details-content">
        <p>Accordion content that smoothly animates in!</p>
    </div>
</details>
```

**Benefits:**
- Native `<details>` element (accessible)
- Smooth animation
- No JavaScript required
- Works with dynamic content heights

#### 3. Modal Entry Animation

```css
dialog {
    opacity: 0;
    transform: translateY(-50px);
    transition:
        opacity 0.3s,
        transform 0.3s,
        display 0.3s allow-discrete,
        overlay 0.3s allow-discrete;
}

dialog[open] {
    opacity: 1;
    transform: translateY(0);
}

@starting-style {
    dialog[open] {
        opacity: 0;
        transform: translateY(-50px);
    }
}

/* Backdrop animation */
dialog::backdrop {
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s;
}

dialog[open]::backdrop {
    background: rgba(0, 0, 0, 0.5);
}

@starting-style {
    dialog[open]::backdrop {
        background: rgba(0, 0, 0, 0);
    }
}
```

### Advanced Patterns

#### Entry and Exit Animations

```css
/* Exit animation */
.element {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.3s, transform 0.3s;
}

.element.removing {
    opacity: 0;
    transform: scale(0.8);
}

/* Entry animation */
@starting-style {
    .element {
        opacity: 0;
        transform: scale(0.8);
    }
}
```

#### Combining Multiple Discrete Properties

```css
.element {
    display: block;
    content-visibility: visible;
    opacity: 1;

    transition:
        display 0.3s allow-discrete,
        content-visibility 0.3s allow-discrete,
        opacity 0.3s;
}

.element.hidden {
    display: none;
    content-visibility: hidden;
    opacity: 0;
}
```

### Browser Support Detection

```javascript
// Check for @starting-style support
function supportsStartingStyle() {
    return CSS.supports('@starting-style', '');
}

// Check for allow-discrete support
function supportsAllowDiscrete() {
    return CSS.supports('transition-behavior', 'allow-discrete');
}
```

```css
@supports (transition-behavior: allow-discrete) {
    /* Modern animations supported */
}
```

### Performance Considerations

- These animations are GPU-accelerated
- `@starting-style` runs before first paint (efficient)
- Use `will-change` sparingly for complex animations
- Prefer `transform` and `opacity` for best performance

### Common Pitfalls

1. **Forgetting `allow-discrete`**: Won't work for `display`, `content-visibility`
2. **Not defining `@starting-style`**: Entry animation won't work
3. **Conflicting transitions**: Make sure transition durations match
4. **Using `calc-size()` without fallback**: Limited browser support

### Fallback Strategy

```css
/* Fallback for browsers without support */
.box {
    display: block;
    opacity: 1;
}

.box.hidden {
    display: none;
    opacity: 0;
}

/* Progressive enhancement */
@supports (transition-behavior: allow-discrete) {
    .box {
        transition:
            opacity 0.4s,
            display 0.4s allow-discrete;
    }

    @starting-style {
        .box {
            opacity: 0;
        }
    }
}
```

### Resources

- [MDN: @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- [MDN: transition-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior)
- [Chrome: Animate to height auto](https://developer.chrome.com/blog/animate-to-height-auto)

---

## Future Features (Tier 2 & 3)

### Planned Features

#### 6. Anchor Positioning
- **Status:** Chrome 125+, Firefox 145+ (Nightly)
- **Purpose:** Position elements relative to anchor elements (tooltips, popovers)
- **Replaces:** Manual positioning calculations in JavaScript

#### 7. Modal Trigger Commands
- **Status:** Chrome 114+, Firefox 125+, Safari 17+
- **Purpose:** `popovertarget` without needing popover attribute
- **Replaces:** JavaScript modal toggle functions

#### 8. Modern Observer APIs
- **IntersectionObserver:** Lazy loading, infinite scroll, scroll animations
- **ResizeObserver:** Respond to element size changes
- **MutationObserver:** Watch DOM changes
- **Status:** Widely supported (Chrome 58+, Firefox 55+, Safari 12.1+)

#### 9. `scroll-state()`
- **Status:** Chrome 133+, Safari 18+
- **Purpose:** Apply styles based on scroll position
- **Replaces:** JavaScript scroll event listeners

#### 10. Styleable Select
- **Status:** Chrome 135+ (experimental)
- **Purpose:** `appearance: base-select` for custom select styling
- **Replaces:** Custom dropdown libraries

### Implementation Timeline

These features are documented in the implementation plan but not yet built in this showcase. They will be added in future iterations as browser support improves and the specifications stabilize.

---

## Summary Comparison Table

| Feature | JS Replacement | Browser Support | Difficulty |
|---------|---------------|-----------------|------------|
| `:has()` | Event listeners for parent styling | Widely supported | Easy |
| Container Queries | Media query based component sizing | Widely supported | Medium |
| `scroll-snap` | Carousel libraries (Swiper, Slick) | Widely supported | Easy |
| Popover API | Modal/dialog libraries | Good support | Easy |
| Modern Animations | JavaScript animation timing | Good support | Medium |

## General Best Practices

1. **Progressive Enhancement:** Always provide fallbacks for older browsers
2. **Feature Detection:** Use `@supports` and JavaScript feature detection
3. **Performance:** CSS features are generally more performant than JavaScript
4. **Accessibility:** Modern CSS features often have better built-in accessibility
5. **Maintainability:** Declarative CSS is easier to maintain than imperative JavaScript

---

**Last Updated:** January 18, 2026
**Project:** Modern CSS Features Showcase
**For More:** See [README.md](../README.md) and [AI_WORKFLOW.md](AI_WORKFLOW.md)
