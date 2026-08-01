# 01_PRODUCT_SPECIFICATION.md

# Project Atlas

## Product Specification

**Version:** 1.0.0

**Status:** Approved

**Purpose:** Define the functional and non-functional requirements for Project Atlas.

---

# 1. Product Definition

Project Atlas is a documentation-first web application that serves as the owner's long-term operating manual for hybrid athletic development.

Atlas is not intended to replace fitness trackers, workout loggers or wearable devices.

Instead, Atlas documents:

- Training philosophy
- Decision frameworks
- Exercise rationale
- Running methodology
- Nutrition principles
- Recovery systems
- Scientific evidence

Its objective is to minimise decision fatigue by consolidating all long-term knowledge into a single reference platform.

---

# 2. Product Objectives

The product should enable the user to:

- Understand exactly why every part of the training system exists.
- Navigate quickly between topics.
- Reference information during training planning.
- Update the handbook over multiple years.
- Maintain a version-controlled knowledge base.

Success is measured by improved usability rather than engagement.

Atlas should encourage **less time inside the application**, not more.

---

# 3. Product Principles

Every feature must satisfy the following principles.

## Principle 1 — Documentation First

Content takes priority over UI.

Every interface decision exists to improve reading, navigation or understanding.

---

## Principle 2 — Simplicity

Atlas should feel calm.

Avoid unnecessary animations.

Avoid feature overload.

Avoid dashboards filled with widgets.

---

## Principle 3 — Permanence

Documentation should remain readable years from now.

Avoid dependencies that may become difficult to maintain.

---

## Principle 4 — Scalability

Adding new handbook chapters should require minimal engineering effort.

New content should primarily involve adding MDX files.

---

## Principle 5 — Maintainability

The codebase should remain understandable to a new developer within one afternoon.

---

# 4. Target Platform

Primary

Desktop browsers

---

Secondary

Tablet browsers

---

Supported

Mobile browsers

---

The application should remain fully functional across all screen sizes.

Mobile should not remove features.

Only layout should change.

---

# 5. Information Architecture

The navigation hierarchy is fixed.

```
Home

Blueprint

Running

Strength

Mobility

Nutrition

Decision Engine

Exercise Library

Scientific Appendix

References

Version History
```

Every section must be reachable from the sidebar.

Maximum navigation depth:

Three levels.

---

# 6. Homepage Requirements

The homepage serves as the project's front door.

It should contain:

## Hero

Project title

Mission statement

Current version

Primary navigation button

---

## Philosophy

Short introduction explaining Atlas.

---

## Quick Links

Cards linking to major handbook sections.

---

## Weekly Checklist

Simple checklist.

Stored in browser local storage.

Reset manually by user.

No analytics.

---

## Current Goals

Display current training objectives.

Examples:

- IPPT Goal
- Zone 2 Goal
- Long-Term Vision

---

## Footer

Repository

Version

License

---

# 7. Sidebar Navigation

Persistent.

Collapsible.

Documentation style.

Requirements:

- Nested navigation
- Active page highlighting
- Keyboard accessible
- Responsive
- Smooth transitions
- Sticky position

---

# 8. Search

Atlas requires a global search.

Requirements:

- Ctrl + K shortcut
- Instant results
- Fuzzy matching
- Keyboard navigation
- Search titles
- Search keywords
- Search handbook content

No external search services.

Entirely local.

---

# 9. Running Handbook

The Running section contains:

- Running Philosophy
- Zone 2
- Threshold
- Intervals
- Norwegian 4×4
- Strides
- Long Runs
- Warm-Up
- Race Week
- FAQ

Each page must use a consistent template.

Template:

Purpose

Overview

Benefits

Execution

Progression

Common Mistakes

Scientific Rationale

Coach Notes

---

# 10. Strength Handbook

Contains:

Training Philosophy

Concurrent Training

Weekly Program

Progression Model

Exercise Selection

Deload Strategy

Frequently Asked Questions

The handbook explains why the program is structured the way it is.

It is not merely a list of exercises.

---

# 11. Mobility Handbook

Organised by body region.

Sections include:

Thoracic Spine

Calves

Ankles

Warm-up

Cooldown

Recovery

Each mobility page contains:

Purpose

Prescription

Execution

Illustration

Common Mistakes

Scientific Notes

---

# 12. Nutrition Handbook

Sections:

Protein

Calories

Hydration

Carbohydrates

Supplements

Meal Timing

Recovery

Travel Nutrition

Simple recommendations.

No macro calculator.

No meal planner.

---

# 13. Decision Engine

The Decision Engine provides practical guidance.

Examples:

Poor Sleep

↓

Recommendation

Missed Workout

↓

Recommendation

Travel

↓

Recommendation

Minor Injury

↓

Recommendation

The interface should use expandable decision trees.

---

# 14. Exercise Library

Every exercise receives an individual page.

Required sections:

Purpose

Muscles

Execution

Benefits

Running Transfer

Strength Transfer

Athletic Transfer

Common Mistakes

Alternatives

Scientific Notes

Coach Notes

Future Review

The structure should remain identical across all exercises.

---

# 15. Scientific Appendix

Contains evidence summaries rather than full literature reviews.

Sections include:

Concurrent Training

Running Economy

Hypertrophy

Recovery

Protein

Mobility

Programming Decisions

Every statement should reference supporting literature where appropriate.

---

# 16. References

Dedicated bibliography.

Every citation should include:

Authors

Year

Title

Journal

DOI (when available)

References should remain separate from handbook content.

---

# 17. Version History

Dedicated page.

Displays:

Current Version

Release Date

Changes

Reason

Impact

Atlas follows Semantic Versioning.

---

# 18. Weekly Checklist

Checklist Items:

- Gym ×3
- Run ×3
- Friday Quality Session
- Long Run
- Mobility
- Protein
- Sleep
- Hydration
- Recovery Review

Requirements:

Stored locally.

Editable.

No user accounts.

No cloud synchronisation.

---

# 19. Print Support

Atlas should support printing.

Requirements:

A4 layout

Hide navigation

Hide search

Maintain typography

Page breaks at headings

Professional appearance

---

# 20. Accessibility

Target WCAG AA.

Requirements:

Keyboard navigation

Proper heading hierarchy

Visible focus states

Semantic HTML

Accessible colour contrast

Alt text for images

---

# 21. Performance Targets

Target Lighthouse scores:

Performance

95+

Accessibility

100

SEO

100

Best Practices

100

Largest Contentful Paint

<2.5 seconds

No unnecessary JavaScript.

---

# 22. Content Management

All handbook content should reside in MDX files.

UI components should never contain large blocks of handbook text.

Benefits:

Easy editing

Future localisation

Version control

Cleaner components

---

# 23. Non-Functional Requirements

The application must be:

Fast

Readable

Offline-capable after caching

Responsive

Maintainable

Modular

Static

Secure

Simple

---

# 24. Explicit Non-Goals

Atlas will not include:

- Workout logging
- User authentication
- Accounts
- Cloud storage
- Social features
- AI chatbot
- Notifications
- Wearable integrations
- Calendars with automatic scheduling
- Macro tracking
- Progress analytics

These responsibilities belong to specialised external tools.

---

# 25. Definition of Done

Project Atlas Version 1.0 is complete when:

- Every handbook section is implemented.
- Navigation is complete.
- Search functions correctly.
- Print mode works.
- Weekly checklist functions locally.
- Version history exists.
- Documentation is responsive.
- Lighthouse targets are achieved.
- The application deploys successfully to Vercel.
- The codebase passes engineering review.

---

# Relationship to Other Documents

This document defines **what Atlas must do**.

It does not explain:

- Why Atlas exists (00_PROJECT_OVERVIEW.md)
- Who Atlas is for (02_USER_PROFILE.md)
- The training methodology (04_TRAINING_SYSTEM.md)
- Technical implementation (05_TECHNICAL_ARCHITECTURE.md)

Those topics are specified in their respective documents.

---

**End of Document**