# 06_UI_UX_GUIDELINES.md

# Project Atlas

## UI / UX Design Guidelines

**Version:** 1.0.0

**Status:** Finalized

**Purpose:** Establish the visual language, interaction principles, accessibility standards, and user experience guidelines for Project Atlas.

---

# 1. Design Philosophy

Project Atlas should feel like **professional software documentation**, not a fitness website.

The design language should communicate:

- clarity
- precision
- trust
- professionalism
- longevity

The ideal first impression is:

> "This looks like the documentation for an engineering product."

---

# 2. Design Inspirations

Atlas should borrow design patterns from:

### Primary References

- Apple Developer Documentation
- Stripe Documentation
- Vercel Documentation
- Raycast Manual
- Linear
- shadcn/ui

### Secondary References

- Notion
- Obsidian
- Docusaurus
- GitBook

---

# 3. Design Goals

Every interface should optimize for:

1. Reading
2. Navigation
3. Learning
4. Reference
5. Maintainability

The interface is intentionally quiet.

Content is the hero.

---

# 4. Visual Identity

Atlas should communicate:

- calm
- technical
- modern
- premium
- minimal

Avoid anything that resembles:

- fitness influencers
- bodybuilding websites
- sports brand marketing
- flashy dashboards

---

# 5. Color Palette

## Background

```
#0B0B0B
```

---

## Secondary Background

```
#111111
```

---

## Card Surface

```
#161616
```

---

## Hover Surface

```
#1F1F1F
```

---

## Border

```
#2A2A2A
```

---

## Primary Accent

```
#4F8EF7
```

---

## Success

```
#2ECC71
```

---

## Warning

```
#F39C12
```

---

## Error

```
#E74C3C
```

---

## Primary Text

```
#F5F5F5
```

---

## Secondary Text

```
#B8B8B8
```

---

## Muted Text

```
#7A7A7A
```

---

# 6. Typography

## Primary Font

Inter

Purpose:

Body copy

---

## Monospace Font

JetBrains Mono

Purpose:

- code
- file names
- version numbers
- references

---

## Font Hierarchy

H1

48–56px

---

H2

36px

---

H3

28px

---

H4

22px

---

Body

16–18px

---

Small

14px

---

Line height

Approximately 1.6

---

Maximum content width

70–80 characters.

---

# 7. Layout Principles

Atlas should use generous whitespace.

Never compress content simply to fit more information.

The layout should breathe.

---

## Desktop Layout

```
Sidebar

↓

Main Content

↓

Table of Contents
```

Three-column layout.

---

## Tablet

Sidebar collapses.

TOC becomes drawer.

---

## Mobile

Sidebar becomes slide-out navigation.

TOC moves below title.

Content remains unchanged.

---

# 8. Navigation

Navigation should always answer:

"Where am I?"

Every page should clearly show:

- active section
- breadcrumbs
- page title

Users should never become lost.

---

# 9. Sidebar

Persistent.

Collapsible.

Contains:

- Logo
- Navigation
- Version
- Search

Width

Approximately 280px.

Sticky.

Scrollable independently.

---

# 10. Table of Contents

Every documentation page automatically generates a TOC.

Requirements:

- Sticky
- Scroll spy
- Anchor links
- Active heading indicator

Desktop only.

---

# 11. Reading Experience

Atlas is read more often than interacted with.

Therefore prioritize:

- typography
- spacing
- hierarchy

over:

- widgets
- cards
- animations

---

# 12. Cards

Cards should have:

Small radius

Subtle border

Minimal shadow

Comfortable padding

Avoid:

Glass effects

Heavy gradients

Excessive elevation

---

# 13. Icons

Primary icon set:

Lucide

Icons should support text rather than replace it.

Never rely on icons alone.

---

# 14. Motion

Motion should communicate state.

Not decoration.

Allowed:

Fade

Collapse

Expand

Slide

Hover

Forbidden:

Parallax

Confetti

Floating animations

Excessive scaling

---

Animation duration

150–250 ms.

---

# 15. Search Experience

Ctrl + K

↓

Command palette opens.

↓

Immediate search.

↓

Keyboard navigation.

↓

Enter to navigate.

No loading indicators.

Search should feel instantaneous.

---

# 16. Callouts

Atlas should use consistent callout styles.

Information

Blue

Success

Green

Warning

Amber

Danger

Red

Scientific Note

Purple

Coach Note

Cyan

---

# 17. Tables

Tables should be:

- horizontally scrollable
- readable
- zebra striped (subtle)
- responsive

Avoid excessive borders.

---

# 18. Lists

Prefer:

Bullets

Checklists

Decision trees

Numbered steps

Avoid long paragraphs whenever a structured format improves readability.

---

# 19. Images

Use images sparingly.

Priority:

1. Diagrams
2. Mobility illustrations
3. Exercise illustrations
4. Simple SVG graphics

Avoid:

- stock fitness models
- motivational imagery
- decorative photos

Every image must improve understanding.

---

# 20. Mobile Experience

Atlas should remain documentation-first.

Do NOT remove content.

Instead:

Collapse navigation.

Reduce spacing slightly.

Maintain typography hierarchy.

---

# 21. Accessibility

Requirements:

Keyboard navigable.

Visible focus states.

Semantic headings.

Alt text.

High contrast.

Touch targets ≥44px.

WCAG AA minimum.

---

# 22. Empty States

Every empty state should explain:

- why nothing is shown
- what the user should do

Never display empty white space without context.

---

# 23. Error States

Errors should be calm.

Avoid alarming language.

Example:

Good

> Unable to load this handbook page.

Bad

> Fatal Error!

---

# 24. Print Mode

Printing should produce a clean handbook.

Hide:

Sidebar

Search

Navigation

Buttons

Only content should remain.

---

# 25. Weekly Checklist UX

Requirements:

Simple checkboxes.

No progress bars.

No gamification.

No streaks.

No notifications.

Atlas promotes discipline rather than addiction.

---

# 26. Version History UX

Timeline layout.

Display:

Version

Date

Summary

Major changes

Breaking changes

Simple and readable.

---

# 27. Content Density

Atlas should feel spacious.

Avoid cramming multiple ideas into one screen.

Each section should have one primary purpose.

---

# 28. Tone of Voice

Writing should be:

Professional

Evidence-informed

Direct

Calm

Concise

Avoid:

Hype

Clickbait

Motivational clichés

Fitness jargon without explanation

---

# 29. Future-Proofing

Future UI additions should match existing patterns.

Do not redesign established components unless a significant usability improvement is demonstrated.

Consistency is more valuable than novelty.

---

# 30. Design Checklist

Before approving any UI change, verify:

✓ Is the page easy to read?

✓ Does it feel like documentation?

✓ Is navigation obvious?

✓ Is the hierarchy clear?

✓ Is the content the focus?

✓ Is it accessible?

✓ Is it responsive?

✓ Is the interaction necessary?

If any answer is "No", the design should be reconsidered.

---

# Relationship to Other Documents

This document defines **how Atlas should look and feel**.

The next document,

**07_COMPONENT_SPECIFICATION.md**,

defines every reusable component required to implement this interface.

---

**End of Document**