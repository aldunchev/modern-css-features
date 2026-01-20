# Modern CSS with Claude Code: A Planning-First Approach

---

## Agenda

- AI planning phase
- The end result
- Live demo
- AI Usage details
- Key takeaways and Key Mindset Shifts

## Quick Stats

- **Time:** 2.75 hours instead of 15-22 hours
- **Savings:** 87%
- **Built:** 5 CSS features, 11 interactive demos, 3,500+ lines of code
- **Approach:** Plan → Implement → Validate

---

## 1. The Planning Phase (5 min)

### How It Started

📄 **Show:** [INITIAL_PROMPT.md](./INITIAL_PROMPT.md)

**Dual Purpose:**

1. Teach modern CSS features that replace JavaScript
2. Demonstrate effective AI workflow with Claude Code

### Strategic Questions

📄 **Show:** [PLANNING_PHASE.md](./PLANNING_PHASE.md)

Claude asked:

- Target audience? → Mixed (senior devs + back-end)
- Tech stack? → Vanilla HTML/CSS/JS, single page
- Which features? → 10 modern CSS features
- Document AI workflow? → Yes!

### Proactive Suggestions

Claude **proactively suggested** Prism.js for syntax highlighting:

- Lightweight library via CDN
- Supports HTML, CSS, JavaScript
- Professional code display

**Result:** Used throughout the project - code examples look great!

**Planning time:** 15-20 minutes
**Key insight:** Good planning prevents wasted implementation effort

---

## 2. The Implementation Plan (2 min)

📄 **Show:** [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)

**6 Phases Planned:**

1. Foundation & Git Setup
2. Feature Detection System
3. Tier 1 Features (5 widely-supported)
4. Tier 2 & 3 Features (5 emerging)
5. AI Workflow Documentation ⭐
6. Polish, README & Deployment

**Claude Code tools identified:**

- Explore agent → Research demos
- WebSearch → Browser support (parallel)
- TodoWrite → Track tasks
- Write/Edit → Generate code
- Bash → Git commits

---

## 3. What We Built (8 min)

### Completed Features (60%)

🎨 **Live Demo:** [index.html](http://127.0.0.1:8080/)

1. **:has() selector**
   - Parent/sibling selection without JS
   - Form validation, card hover effects, gallery

2. **Container queries**
   - Component-based responsive design
   - Profile cards, product grids

3. **CSS carousel**
   - scroll-snap image galleries
   - No JavaScript needed

4. **Popover API**
   - Native modals with backdrop
   - Light dismiss, focus management

5. **Animations (@starting-style)**
   - Animate display:none transitions
   - Smooth accordions

### How Claude Code Helped

**Research Phase:**

- **Explore Agent** → Found creative demo ideas in minutes
- **WebSearch (parallel)** → Checked 5 browser supports simultaneously

**Implementation Phase:**

- **Write/Edit** → Generated code with explanations
- **TodoWrite** → Tracked 20+ tasks across phases
- **Read** → Analyzed patterns before editing

**Documentation Phase:**

- **AI wrote its own workflow docs** → 800+ lines
- **Bash tool** → Structured git commits with heredoc

---

## 4. The PIV Loop (5 min)

### Plan → Implement → Validate

This methodology ensures quality AI-assisted development:

#### **PLAN** (15-20 min)

- Ask strategic questions
- Clarify requirements
- Create implementation roadmap
- Identify tools to use

**Example:** The planning conversation in [PLANNING_PHASE.md](./PLANNING_PHASE.md)

#### **IMPLEMENT** (~2 hours with AI)

- Use appropriate Claude Code tools
- Generate code incrementally
- Track progress with TodoWrite
- Commit after each feature

**Example:** 5 features built in 2.75 hours

#### **VALIDATE** (ongoing)

- Review all generated code
- Test in actual browsers
- Verify browser support claims
- Run demos and check accessibility

**Example:** Found `@starting-style` animation issue, verified container query syntax

### Why PIV Works

**Traditional approach:**

- Jump to coding → Get stuck → Research → Rewrite → Repeat
- Time wasted on false starts

**PIV approach:**

- Plan upfront → Implement efficiently → Catch issues early
- 87% time savings

---

## 5. Key Mindset Shifts (5 min)

📄 **Reference:** [CHEAT_SHEET.md](./CHEAT_SHEET.md) § Key Mindset Shifts

### Claude Code is NOT:

- ❌ A replacement for developers
- ❌ An architecture decision maker
- ❌ 100% accurate all the time
- ❌ A browser testing tool

### Claude Code IS:

- ✅ A **research assistant** (reads docs faster than humans)
- ✅ A **code generator** (handles boilerplate)
- ✅ A **documentation writer** (documents while you build)
- ✅ A **pair programmer** (you drive, it assists)

### The Reality Check

**You're still responsible for:**

- Architecture decisions
- Code review
- Testing in browsers
- Understanding what the code does

**Claude Code accelerates:**

- Research (88% faster)
- Boilerplate code (87% faster)
- Documentation (85% faster)

### Effective Prompting

**✅ Good (Specific):**

```
"Research 3 creative demos for CSS :has() selector"
"Search in parallel: browser support for :has(), container queries, Popover API"
"Create css/features/carousel.css with scroll-snap. Add 3 examples with comments."
```

**❌ Bad (Vague):**

```
"Make it better"
"Fix the CSS"
"Help me with this"
```

---

## 6. Exploration Tools Deep Dive (5 min)

### How We Used Tools

#### **Explore Agent** (Research)

```
Prompt: "Research creative demo ideas for CSS :has() selector.
Find 3-5 real-world use cases that show how it replaces JavaScript."

Result: Found form validation, parent hover, sibling fade-out patterns
```

#### **WebSearch** (Browser Support)

```
Prompt: "Search in parallel: browser support for
1. :has() selector
2. Container queries
3. Popover API
4. @starting-style
5. scroll-snap"

Result: Verified support across Chrome, Firefox, Safari in 30 seconds
```

#### **TodoWrite** (Task Tracking)

- Tracked implementation of 5 features
- Each feature had 9 subtasks
- Marked complete as we progressed
- Prevented forgetting steps

---

## 7. The Time Savings Breakdown (3 min)

| Task                | Manual          | With Claude Code | Savings |
| ------------------- | --------------- | ---------------- | ------- |
| Research 5 features | 2-3 hours       | 15 min           | 88%     |
| Write 3,500+ lines  | 8-12 hours      | 1.5 hours        | 87%     |
| Documentation       | 3-5 hours       | 45 min           | 85%     |
| Browser testing     | 2 hours         | 30 min           | 75%     |
| **TOTAL**           | **15-22 hours** | **2.75 hours**   | **87%** |

### Why These Savings Matter

**Traditional workflow:**

- Google → Read docs → Trial/error → Debug → Repeat
- Context switching between tools
- Documentation backlog grows

**Claude Code workflow:**

- Parallel research → Generate code → Test → Commit
- AI handles boilerplate and docs
- Documentation happens during development

---

## 8. Lessons Learned (3 min)

### ✅ What Worked

1. **Planning first** → Prevented false starts
2. **Parallel execution** → WebSearch saved 10+ minutes
3. **Explore Agent** → Found better examples than manual search
4. **Immediate docs** → AI documented while building
5. **Structured commits** → Bash tool with heredoc

### ⚠️ What to Watch For

1. **Review everything** → AI is ~95% accurate, not 100%
2. **Be specific** → Vague prompts = poor results
3. **Use right tool** → Explore for research, not direct prompts
4. **Browser test** → AI can't replace actual testing
5. **You're the architect** → AI assists, you decide

### Real Example: Animation Bug

**Issue:** `@starting-style` animation didn't work
**Root cause:** Had `prefers-reduced-motion` enabled in system settings
**Lesson:** AI correctly implemented the code, but couldn't test accessibility settings

---

## 9. Live Demo: Implementing scroll-state() (8 min)

> **Live demonstration of the full workflow from research to commit**

### Step 1: Research (3 min)

**Prompt to use:**

```
Use Explore agent to research CSS scroll-state() function.
Find 2-3 practical examples that replace JavaScript scroll listeners.
Focus on header styling and back-to-top buttons.
```

**What to show:**

- How Explore agent works
- Results returned
- Quick scan of findings

### Step 2: Implement (3 min)

**Prompt to use:**

```
Create css/features/scroll-state.css with two demos:
1. Header that changes background/shadow when scrolled
2. Back-to-top button that appears on scroll

Include @supports detection for progressive enhancement.
Add comments explaining the approach.
```

**What to show:**

- Generated CSS file
- Scroll through code
- Point out @supports usage
- Show progressive enhancement

### Step 3: Test & Commit (2 min)

**Actions:**

1. Open index.html in browser
2. Scroll to see header change
3. Scroll to see back-to-top button
4. Commit with Bash tool:

```bash
git add css/features/scroll-state.css

git commit -m "$(cat <<'EOF'
feat: add scroll-state() function demonstration

Implemented CSS scroll-state() feature with 2 demos:
- Header that changes style on scroll
- Back-to-top button appears on scroll

Includes @supports detection for progressive enhancement.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

**Talking points:**

- "Notice how fast that was - 8 minutes total"
- "AI handled research, code generation, comments"
- "I still reviewed the code before committing"
- "This is the workflow you'll use for your first task"

---

## 10. Resources & Next Steps (5 min)

### In This Repository

📁 **Documentation:**

- [AI_WORKFLOW.md](./AI_WORKFLOW.md) - Complete workflow guide (800+ lines)
- [PLANNING_PHASE.md](./PLANNING_PHASE.md) - How we started
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - What we planned
- [CHEAT_SHEET.md](./CHEAT_SHEET.md) - Quick reference for your first task
- [FEATURES.md](./FEATURES.md) - CSS technical reference
- [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md) - Compatibility matrix

📝 **Code:**

- [index.html](../index.html) - Live interactive demos
- [css/features/](../css/features/) - Implementation patterns

### Getting Started

**Your First Task (< 1 hour):**

1. Install Claude Code CLI
2. Clone this repository for reference
3. Read [CHEAT_SHEET.md](./CHEAT_SHEET.md) (5 min)
4. Pick a small task (refactor CSS, research feature, add docs)
5. Use Explore Agent to research
6. Review generated code
7. Create structured git commit

**Pair Programming Offer:**

- Available for pairing on first task
- Schedule via calendar
- Questions welcome anytime

---

## Key Takeaways

1. **87% time savings is real** → Git timestamps prove it
2. **Planning prevents waste** → 15-20 min planning saved hours
3. **AI is a pair programmer** → You drive, it assists
4. **Start small** → First task < 1 hour
5. **Review everything** → AI accelerates, you validate

---

## Git Commands Reference

**Show git history:** `git log --oneline --graph --all`
**Show commit details:** `git show <hash> --stat`

---

**Next:** Try it yourself. Pick a small task. Use the cheat sheet. Pair with me for first attempt.

---

_Last updated: 2026-01-20_
_Created for internal team presentation_
