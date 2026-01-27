# Claude Code Instructions for Modern CSS Features Showcase

This file contains project-specific instructions for Claude Code when working on this repository.

## Project Overview

This is a showcase of 10 modern CSS features that replace JavaScript. Each feature is demonstrated with interactive demos and code examples.

## Development Workflow

### Git Commits
- **After completing each feature or significant fix**, ask the user if they want to commit and push the changes
- Keep commits atomic and focused on a single feature or fix
- Use descriptive commit messages that explain what was changed and why
- Always include the co-authorship tag as per standard practice

### Feature Development
- Each CSS feature is in its own file under `/css/features/`
- Each feature should have corresponding HTML demos in `/index.html`
- Test all interactive demos before committing

### Code Style
- Follow the existing CSS variable naming conventions (see `/css/base.css`)
- Ensure responsive design works on mobile, tablet, and desktop
- Respect `prefers-reduced-motion` for all animations
- Use semantic HTML with proper accessibility attributes

### CSS Variables and Transitions

When using CSS variables for transition values, avoid duplicating timing functions:

❌ **Wrong:**
```css
transition: transform var(--transition-base) ease;
/* If --transition-base contains '0.3s ease', this becomes invalid */
```

✅ **Correct:**
```css
transition: transform var(--transition-base);
/* Let the variable provide the complete duration + timing function */
```

**Why:** CSS variables for transitions typically include both duration and timing function. Specifying the timing function again creates invalid syntax like `0.3s ease ease`, causing the transition to fail silently with no console errors.

### Documentation
- Keep feature documentation in `/docs/FEATURES.md` updated
- Update browser support information in `/docs/BROWSER_SUPPORT.md` when needed
- Include MDN links and resources for each feature

### Testing Checklist
Before committing:
- [ ] Test with `prefers-reduced-motion` both on and off
- [ ] Test on different viewport sizes (mobile, tablet, desktop)
- [ ] Verify browser compatibility for the feature
- [ ] Check that all interactive elements are keyboard accessible
- [ ] Validate HTML and CSS (no console errors)

## File Structure

```
css/
  features/          # Individual feature CSS files
  base.css          # Design tokens and base styles
  layout.css        # Layout and navigation
docs/               # Documentation
index.html          # Main demo page
js/                 # Minimal JavaScript (navigation, feature detection)
```

## Important Notes

- This project emphasizes CSS-only solutions where possible
- Minimize JavaScript usage - only for navigation and feature detection
- Each demo should be self-contained and easy to understand
- Performance matters - keep animations smooth and efficient

## Claude Code Skill

This project includes a **modern-css-features** skill located in `.claude/skills/modern-css-features/` that provides comprehensive knowledge about all 10 modern CSS features demonstrated in this project. The skill can be invoked with `/modern-css-features` or will auto-activate when relevant CSS questions are asked.

### Skill Contents:
- **SKILL.md** - Main skill file with auto-activation triggers
- **BROWSER_SUPPORT.md** - Browser compatibility information
- **EXAMPLES.md** - Working code examples
- **PATTERNS.md** - Implementation patterns and best practices

When working on CSS features in this project, you can reference the skill documentation for detailed implementation guidance and browser support information.
