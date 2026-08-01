# 07_COMPONENT_SPECIFICATION.md

# Project Atlas

## Component Specification

**Version:** 1.0.0

**Status:** Finalized

**Purpose:** Define every reusable UI component, its responsibilities, API, design constraints, and implementation standards.

---

# Philosophy

Every component in Atlas should satisfy three rules:

1. Solve exactly one problem.
2. Be reusable across multiple pages.
3. Be content-agnostic whenever possible.

Components should never contain handbook knowledge.

Content belongs in MDX.

Components display content.

---

# Component Hierarchy

```
Layout

├── Sidebar
├── Header
├── Footer
├── Breadcrumb
├── TableOfContents

Navigation

├── NavItem
├── NavGroup
├── SearchButton
├── CommandPalette

Documentation

├── PageHeader
├── SectionHeader
├── InfoBox
├── CoachNote
├── ScientificNote
├── WarningBox
├── TipBox
├── ReferenceCard

Exercise

├── ExerciseCard
├── MuscleGroupBadge
├── DifficultyBadge
├── TransferRating
├── ExerciseMetadata

Decision Engine

├── DecisionTree
├── DecisionNode
├── DecisionOutcome

Running

├── WorkoutCard
├── PaceTable
├── ProgressionTimeline

Strength

├── ExerciseGrid
├── WeeklyProgram
├── ProgressionBox

Utilities

├── WeeklyChecklist
├── VersionBadge
├── SearchResult
├── CopyButton
├── ThemeToggle (Future)

UI

├── Button
├── Card
├── Badge
├── Tabs
├── Accordion
├── Callout
├── Table
├── Tooltip
```

---

# Layout Components

---

## Sidebar

Purpose

Primary application navigation.

Responsibilities

- Display navigation tree
- Highlight active route
- Collapse sections
- Mobile drawer
- Version display

Should NEVER contain page logic.

Props

```
navigation
activePath
```

---

## Header

Purpose

Display current page metadata.

Contains

- Breadcrumb
- Page title
- Search button

---

## Footer

Purpose

Display project metadata.

Contains

- Version
- GitHub
- License
- Copyright

---

## Breadcrumb

Purpose

Display navigation hierarchy.

Example

```
Running

>

Threshold

>

Progression
```

Automatically generated.

---

## Table of Contents

Purpose

Display page headings.

Features

- Sticky
- Scroll Spy
- Anchor Links
- Auto-generated

---

# Navigation Components

---

## NavItem

Single navigation item.

States

- Default
- Hover
- Active
- Disabled

---

## NavGroup

Expandable navigation section.

Example

```
Running

▼

Zone 2

Threshold

Intervals
```

---

## SearchButton

Simple command launcher.

Shortcut hint

```
Ctrl + K
```

---

## CommandPalette

Responsibilities

- Search
- Keyboard navigation
- Open pages
- Instant filtering

Powered by Fuse.js.

---

# Documentation Components

---

## PageHeader

Displays

Title

Description

Tags

Estimated Reading Time

Last Updated

---

## SectionHeader

Used inside handbook pages.

Provides consistent spacing.

---

## InfoBox

Purpose

General informational callout.

Color

Blue.

---

## CoachNote

Purpose

Practical coaching insight.

Color

Cyan.

Icon

Whistle.

---

## ScientificNote

Purpose

Research summary.

Color

Purple.

Used extensively throughout Atlas.

---

## WarningBox

Purpose

Important safety notes.

Color

Amber.

---

## TipBox

Purpose

Quick implementation advice.

Color

Green.

---

## ReferenceCard

Displays

Authors

Journal

Year

DOI

Link

---

# Exercise Components

---

## ExerciseCard

Displays

Exercise Name

Category

Difficulty

Primary Muscles

Transfer Rating

Summary

Links

---

## ExerciseMetadata

Displays

Equipment

Movement Pattern

Primary Muscles

Secondary Muscles

Training Goal

---

## TransferRating

Displays

```
Running

★★★★★

Strength

★★★★☆

Athleticism

★★★★★
```

Five-point system.

---

## MuscleGroupBadge

Example

```
Quadriceps

Posterior Chain

Upper Back

Calves
```

Reusable badge.

---

## DifficultyBadge

Values

Beginner

Intermediate

Advanced

---

# Running Components

---

## WorkoutCard

Displays

Workout Name

Purpose

Duration

Intensity

Example

```
Zone 2

45 min

Easy

Aerobic Development
```

---

## PaceTable

Displays

Workout

Target Pace

RPE

Heart Rate

Purpose

---

## ProgressionTimeline

Visual roadmap.

Example

```
Week 1

↓

Week 4

↓

Week 8

↓

Race Week
```

---

# Strength Components

---

## WeeklyProgram

Displays

Monday

Tuesday

...

Sunday

Simple overview.

Not a workout logger.

---

## ExerciseGrid

Displays exercises grouped by movement pattern.

Example

Push

Pull

Squat

Hinge

Core

Calves

---

## ProgressionBox

Displays

Current Load

↓

Target Reps

↓

Increase Weight

Simple explanation.

---

# Decision Engine Components

---

## DecisionTree

Primary component.

Displays

Question

↓

Options

↓

Outcome

Recursive structure.

---

## DecisionNode

Displays

Single decision.

---

## DecisionOutcome

Displays

Recommendation

Reason

Coach Notes

Scientific Notes

---

# Utility Components

---

## WeeklyChecklist

Items

Gym

Run

Mobility

Sleep

Hydration

Protein

Recovery Review

Stored locally.

---

## VersionBadge

Displays

```
v1.2.0
```

Reusable.

---

## SearchResult

Displays

Page

Snippet

Highlight

Category

---

## CopyButton

Purpose

Copy code snippets.

Future-proof.

---

# UI Components

Atlas should primarily use shadcn/ui primitives.

Components include

Card

Button

Badge

Accordion

Separator

Tooltip

Tabs

ScrollArea

Popover

Command

Avoid introducing unnecessary custom implementations.

---

# Component Design Rules

Every component must:

✓ Have one responsibility.

✓ Accept typed props.

✓ Avoid business logic.

✓ Be reusable.

✓ Be documented.

---

# Component Naming

Correct

```
ExerciseCard.tsx

CoachNote.tsx

WorkoutCard.tsx

DecisionTree.tsx
```

Avoid

```
ExerciseThing.tsx

Card2.tsx

MyComponent.tsx
```

---

# Props Philosophy

Pass only required props.

Avoid

```
exercise

user

theme

page

navigation

state

config

settings
```

when only one field is needed.

Prefer

```
title

difficulty

muscles

rating
```

Explicit interfaces improve maintainability.

---

# Component Documentation

Every reusable component should include:

Purpose

Props

Example usage

Accessibility notes

Future improvements

---

# Accessibility

Every interactive component must support:

Keyboard navigation

Focus states

ARIA labels

Screen readers

---

# Testing Priorities

Highest priority

Sidebar

Search

Decision Tree

Checklist

Medium priority

Cards

Callouts

Tables

Low priority

Badges

Icons

Static presentation components

---

# Future Components

Potential future additions

Training Calendar

Equipment Comparison

Annual Review

Personal Records

Injury Timeline

These should follow the same architectural principles.

---

# Definition of Done

A component is complete when:

- It solves one problem.
- It is reusable.
- It has typed props.
- It has no duplicated logic.
- It follows Atlas design language.
- It is documented.
- It is accessible.
- It passes review.

---

# Relationship to Other Documents

This document defines **what components exist**.

The next document,

**08_IMPLEMENTATION_ROADMAP.md**,

defines the exact order in which the project should be built, including development phases, Git commit strategy, milestones, and acceptance criteria.

---

**End of Document**