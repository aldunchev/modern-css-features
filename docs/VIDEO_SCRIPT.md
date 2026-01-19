# Git Walkthrough Video Script
## 12-Minute Recording Script with Terminal Commands

**Total Duration:** 12 minutes
**Format:** Screen recording + narration
**Tools:** Terminal + Browser

---

## Pre-Recording Setup Checklist

- [ ] Open terminal in project directory
- [ ] Test all git commands work
- [ ] Open browser with index.html
- [ ] Close unnecessary applications
- [ ] Set terminal font size to 16-18pt (readable on video)
- [ ] Use recording software (Loom, QuickTime, or OBS)
- [ ] Test audio levels
- [ ] Have water nearby for dry mouth

---

## INTRO SEGMENT (1 minute)

### Screen: Show PROJECT_STATUS.md in terminal

**Terminal Command:**
```bash
cat PROJECT_STATUS.md | head -30
```

**Narration:**
> "Hi team. I want to show you something that might change how we approach front-end development.
>
> This project took **2 hours and 45 minutes** instead of 15 to 22 hours. That's **87% time savings**.
>
> I built 5 modern CSS features with 11 interactive demos and over 3,500 lines of code and documentation.
>
> And I'm going to show you *exactly* how I did it using Claude Code, by walking through the actual git history.
>
> Everything you're about to see is real - these are the actual commits with timestamps that prove the timeline."

---

## PHASE 1: FOUNDATION SETUP (2 minutes)

### Screen: Show git log

**Terminal Command:**
```bash
git log --oneline --graph --all --decorate
```

**Narration:**
> "Let me show you the commit history. You can see 8 commits here spanning about 3 hours of active work.
>
> Let's start with the first commit - the foundation."

### Screen: Show first commit

**Terminal Command:**
```bash
git show 33d5536 --stat
```

**Narration:**
> "This is commit 33d5536 - 'feat: initialize project structure'.
>
> Look at everything that was created in this single commit:
> - Complete folder structure: css, js, docs, assets
> - Base HTML file with semantic structure
> - CSS reset and variable system
> - Navigation JavaScript
> - Git ignore file
>
> I gave Claude Code a simple prompt: 'Set up a modern CSS showcase project with this structure' and specified the folders I wanted.
>
> Claude used the **Bash tool** to create directories and the **Write tool** to generate all these files.
>
> **This took 15 minutes.** Normally, setting up a project structure like this - with proper CSS architecture, semantic HTML, and all the boilerplate - would take me 45 minutes to an hour.
>
> That's already a 3-4x speedup on just the setup phase."

### Screen: Show the diff of index.html

**Terminal Command:**
```bash
git show 33d5536 -- index.html | head -80
```

**Narration:**
> "Here's the HTML that was generated. Notice it's not just boilerplate - it has:
> - Proper semantic structure with header, nav, main, footer
> - Meta tags for responsive design
> - ARIA labels for accessibility
> - Links to CSS and JS files
> - Even placeholder content structured correctly
>
> Claude Code generated production-ready code from the start."

---

## PHASE 2: FEATURE DETECTION SYSTEM (2 minutes)

### Screen: Show second commit

**Terminal Command:**
```bash
git show 32a42d0 --stat
```

**Narration:**
> "Next commit: 'feat: add feature detection and browser support system'
>
> This is where it gets interesting. I needed to check browser support for 5 different CSS features:
> - :has() selector
> - Container queries
> - scroll-snap
> - Popover API
> - @starting-style
>
> Normally I'd go to Can I Use, search each feature one by one, check the compatibility tables... that's 5 separate searches, maybe 15-20 minutes of manual work.
>
> Instead, I used **parallel WebSearch** - I asked Claude Code to search for all 5 features simultaneously."

**Pause for effect**

> "All 5 results came back in about 30 seconds.
>
> Claude then generated the feature detection JavaScript with @supports queries for each one."

### Screen: Show feature-detection.js

**Terminal Command:**
```bash
git show 32a42d0 -- js/feature-detection.js
```

**Narration:**
> "Here's the generated code. Look at the @supports queries - they're accurate for each CSS feature.
>
> Claude also added browser support badges that display 'Widely Supported', 'Good Support', or 'Emerging' based on the detection results.
>
> **Time spent: 30 minutes**. Manual approach would've been 60-90 minutes."

---

## PHASE 3: FIRST FEATURE - THE MAGIC HAPPENS (4 minutes)

### Screen: Show third commit

**Terminal Command:**
```bash
git show a0fb27c --stat
```

**Narration:**
> "Okay, here's where Claude Code really shines. Third commit: 'feat: add :has() selector demonstration'
>
> The :has() selector is one of the most powerful CSS features added in recent years. It lets you select parent elements based on their children - something that required JavaScript before.
>
> But I didn't know the best ways to use it. I needed creative examples that would resonate with the team.
>
> So I used Claude Code's **Explore Agent**."

### Screen: Show the CSS file

**Terminal Command:**
```bash
git show a0fb27c -- css/features/has-selector.css | head -100
```

**Narration:**
> "I gave it this prompt: 'Use Explore agent to research creative demos for CSS :has() selector that replace JavaScript. Find 3-5 real-world use cases.'
>
> The Explore Agent searched through documentation, articles, and examples, and came back with:
>
> 1. **Form validation states** - showing error messages when inputs are invalid
> 2. **Card hover effects** - highlighting entire cards when hovering any child
> 3. **Gallery selection** - selecting parent containers based on child state
>
> Look at the code here. It's not just working code - it has detailed comments explaining *why* each pattern works and how it replaces JavaScript.
>
> For example, this form validation pattern:"

**Scroll to form example**

> "Instead of writing JavaScript to add a class to the form when an input is invalid, we can use:
>
> ```css
> form:has(input:invalid) {
>   border-color: red;
> }
> ```
>
> The Explore Agent found examples I wouldn't have thought of on my own. It's like having a researcher who's already read all the best articles and MDN docs."

### Screen: Open browser showing the demo

**Terminal Command:**
```bash
# Open index.html in browser (you'll switch to browser)
open index.html
```

**Narration:**
> "Let me show you the live demo."

**[Switch to browser, show :has() selector tab]**

> "Here's the interactive demo. You can see the form validation, card hover effects, and gallery selection all working.
>
> No JavaScript - pure CSS.
>
> **This feature took 30 minutes to implement.** That includes:
> - Research (Explore Agent found examples)
> - Writing the CSS
> - Creating the HTML demos
> - Adding documentation
> - Testing in browsers
>
> Manually? I'd spend 30 minutes just reading articles trying to find good examples, then another 60-90 minutes implementing and documenting.
>
> That's 2 hours compressed to 30 minutes."

---

## PHASE 4: RAPID FEATURE DEVELOPMENT (2 minutes)

### Screen: Back to terminal, show commit range

**Terminal Command:**
```bash
git log --oneline c5d2506..2d156b7
```

**Narration:**
> "After the first feature, I was on a roll. Look at these commits:
>
> - Container queries demonstration
> - CSS carousel with scroll-snap
> - Popover API modal system
> - Display and height animation examples
>
> Four more features in the next 90 minutes.
>
> Same pattern for each:
> 1. Explore Agent researches creative demos
> 2. Claude generates code with explanations
> 3. I review and test
> 4. Commit using Bash with heredoc
>
> Let me show you one more example - the carousel."

### Screen: Show carousel commit

**Terminal Command:**
```bash
git show f9c8a21 -- css/features/carousel.css | head -60
```

**Narration:**
> "This is the CSS carousel using scroll-snap. Before scroll-snap, you'd need a JavaScript library like Swiper or Slick.
>
> Now it's about 30 lines of CSS:
> - `scroll-snap-type` on the container
> - `scroll-snap-align` on the items
> - Smooth scrolling
> - Optional scroll buttons with `scrollIntoView()`
>
> The Explore Agent found multiple implementation patterns - centered snap, edge snap, full-width cards.
>
> I picked the best ones and Claude implemented them with examples.
>
> **Each feature averaged 20-30 minutes.** Manually would be 2-3 hours per feature."

---

## PHASE 5: DOCUMENTATION - AI DOCUMENTS ITSELF (1 minute)

### Screen: Show documentation commit

**Terminal Command:**
```bash
git show adf2118 --stat
```

**Narration:**
> "Here's something really interesting. Look at this commit: 'docs: add comprehensive AI workflow documentation'
>
> This is where **Claude Code documented its own workflow**.
>
> I asked it to: 'Create AI_WORKFLOW.md explaining how you built this project. Include which tools you used, example prompts, and lessons learned.'
>
> Let's see how long this file is."

**Terminal Command:**
```bash
wc -l docs/AI_WORKFLOW.md
```

**Narration:**
> "**800+ lines of documentation.** Written in 45 minutes while I was reviewing the features.
>
> This isn't generated fluff - it's detailed explanations of:
> - When to use each Claude Code tool
> - Example prompts that worked well
> - Decision trees for choosing approaches
> - Browser support matrices
> - Best practices learned during development
>
> If I had to write this documentation manually, it would take 3-5 hours.
>
> Instead, Claude wrote it while understanding the context because it WAS the context - it built the project."

---

## SUMMARY & TIMELINE (1 minute)

### Screen: Show git log with dates

**Terminal Command:**
```bash
git log --pretty=format:"%h - %ar : %s" --graph --all
```

**Narration:**
> "Let's look at the timeline one more time.
>
> All of this happened on January 18th and 19th:
> - 7:01 PM: Started with foundation
> - 7:15 PM: Feature detection system
> - 7:30 PM: First CSS feature
> - 7:45-8:15 PM: Four more features
> - 8:30 PM: Documentation
> - Next day: Final corrections
>
> **Total active development time: 2 hours and 45 minutes.**
>
> The traditional approach - researching each feature manually, implementing demos, writing documentation, testing - would have taken 15-22 hours.
>
> **That's 87% time savings.**
>
> But here's what's important: this isn't about replacing developers. Claude Code didn't make architectural decisions. It didn't choose which features to demonstrate. It didn't decide the project structure.
>
> I did all of that.
>
> What Claude Code did was eliminate the tedious parts:
> - ✅ Hours of research and documentation reading
> - ✅ Boilerplate code generation
> - ✅ Browser support checking
> - ✅ Documentation writing
>
> It's a **research assistant**, a **documentation writer**, and a **code generator** rolled into one.
>
> And I'm going to show you how to use it in today's live demo."

---

## CLOSING (1 minute)

### Screen: Show README.md or project overview

**Terminal Command:**
```bash
cat README.md | head -50
```

**Narration:**
> "Everything I've shown you is documented in this repository:
>
> - AI_WORKFLOW.md has the complete workflow guide
> - FEATURES.md has technical documentation for each CSS feature
> - BROWSER_SUPPORT.md has compatibility matrices
> - The code itself is production-ready with progressive enhancement
>
> After today's presentation, you'll get:
> - The GitHub repository link
> - A cheat sheet with effective prompts
> - An offer to pair with me on your first Claude Code task
>
> My goal isn't just to show you what's possible - it's to help you achieve similar results on your own work.
>
> Now let me switch to the live demo where I'll implement a new feature from scratch, and you can see exactly how I interact with Claude Code."

**[End recording]**

---

## Post-Recording Checklist

- [ ] Review recording for audio quality
- [ ] Check that all terminal commands are visible
- [ ] Verify timing (should be ~12 minutes)
- [ ] Add intro title card if needed
- [ ] Export as MP4 (1080p recommended)
- [ ] Test playback on presentation computer
- [ ] Create backup copy
- [ ] Upload to team drive/platform

---

## Recording Tips

**Visual:**
- Terminal font: 16-18pt minimum
- Use high contrast theme (dark background, light text)
- Zoom in on important code sections
- Keep terminal clean (clear before starting)

**Audio:**
- Speak slowly and clearly
- Pause between sections
- Don't worry about "ums" - can edit later
- Stay hydrated (water breaks okay)
- Re-record sections if needed

**Technical:**
- Record in quiet space
- Use headphones to monitor audio
- Close notification apps
- Have git commands ready in script
- Practice once before final recording

---

## Alternative: Shorter 8-Minute Version

If 12 minutes is too long, here's a condensed structure:

**1. Intro** (30 sec) - Show metrics only
**2. Foundation** (1 min) - Show first commit briefly
**3. Parallel WebSearch** (1 min) - Emphasize speed
**4. Explore Agent Magic** (3 min) - Deep dive on :has() example
**5. Rapid Development** (1 min) - Show commit log
**6. Documentation** (1 min) - Show AI_WORKFLOW.md
**7. Closing** (30 sec) - Key takeaways

---

## Script Flexibility

**If something goes wrong during recording:**
- Pause, take a breath, re-start that section
- You can edit multiple takes together
- Terminal typos are okay - shows authenticity
- If git command fails, explain and move on

**Ad-lib opportunities:**
- Share personal reactions during development
- Mention specific "aha moments" you had
- Add humor if natural to you
- Connect to team's current pain points

---

*This script is a guide, not a strict teleprompter. Speak naturally and authentically.*
