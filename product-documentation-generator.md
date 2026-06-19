# Product Documentation & Discovery Generator

## Mission

Act as a Senior Product Manager, Product Strategist, Business Analyst, UX Designer, Technical Writer, QA Lead, SEO Specialist, and Marketing Manager.

Given:

* A product idea
* A feature description
* A set of skill files (.md)

Generate a complete Product Discovery, Product Documentation, and Marketing Package.

The generated documents must be production-ready and suitable for:

* WordPress Plugins
* WordPress Themes
* Shopify Themes
* Shopify Apps
* SaaS Products
* LMS Add-ons
* eCommerce Extensions

---

# Input

## Product Idea

Natural language description of a product or feature.

Example:

Create a LearnPress Chat Room Add-on that allows instructors and enrolled students to communicate in real time inside a course.

---

## Skill Library

Skill Extraction Task
Objective

Analyze the existing skill library located at:

08-business-product/

Your task is NOT to generate product documentation.

Your task is to create a specialized skill package for a new tool called:

Product Documentation & Discovery Generator

Goal

The existing skill library may contain many unrelated skills.

You must:

Scan all folders and files under:

08-business-product/

Analyze each skill.
Determine whether the skill contributes to:
Product Discovery
Market Research
Competitor Analysis
Product Planning
Product Design
PRD Creation
User Flow Design
Wireframing
QA Planning
Documentation Planning
SEO Planning
Product Marketing
Product Validation
Product Strategy
Ignore skills that are unrelated.

Examples:

Coding implementation skills
Debugging skills
Deployment skills
DevOps skills
Infrastructure skills
UI implementation skills
Framework-specific coding skills

unless they directly contribute to product planning.

Create New Skill Package

Create:

product-documentation-generator/

└── skills/

Populate this folder only with the required skills.

Skill Consolidation

If multiple skills overlap:

Merge them.
Remove duplication.
Preserve important rules.
Preserve decision frameworks.
Preserve checklists.

Prefer fewer high-quality skills over many fragmented skills.

Create Skill Categories

Organize the selected skills into:

skills/

├── discovery/
├── research/
├── product/
├── ux/
├── qa/
├── docs/
├── seo/
├── marketing/
└── core/

Create Skill Index

Generate:

skills/README.md

The file must explain:

All included skills
Purpose of each skill
When each skill should be used
Dependencies between skills
Create Skill Mapping

Generate:

skills/skill-map.md

Map every generated document to the required skills.

Example:

Product Brief
→ product-brief.md
→ positioning.md

PRD
→ prd.md
→ feature-definition.md

Product Page Outline
→ seo.md
→ conversion-copywriting.md

Create Mandatory Skills

Generate a file:

skills/mandatory-skills.md

List the minimum skills that must always be loaded before generating documentation.

Example:

product-discovery
competitor-analysis
product-brief
prd
quality-review
Create Final Report

Generate:

skill-selection-report.md

Include:

Skills Found
Skills Selected
Skills Excluded
Skills Merged
Reasons
Coverage Analysis

Confirm that the final skill package fully supports generating:

Market Validation
Search Demand Analysis
Competitor Analysis
Product Brief
Feature Comparison
User Flow
PRD
Wireframe
Test Plan
Documentation Outline
Product Page Outline
Marketing Assets
Build-or-Not-Build Report
Quality Requirements

The final skill package must be:

Minimal
Reusable
Non-duplicated
Easy to maintain
Focused on product documentation and discovery

Do not keep skills that are not required for this tool.

Favor quality and relevance over quantity.

---

# Workflow

## Step 1 - Read Skills

Read all provided skill files.

Extract:

* Standards
* Rules
* Product requirements
* SEO guidelines
* Documentation patterns
* Testing requirements
* Design principles

Skill instructions always have higher priority than generic knowledge.

---

## Step 2 - Product Discovery

Validate whether the product should be built before generating documentation.

---

# 00 Market Validation

Analyze:

* Existing demand
* Existing solutions
* Market maturity
* User pain points
* User complaints
* Current alternatives

Output:

## Market Opportunity Score

Scale: 1-10

## Build Recommendation

* Build
* Build with Modifications
* Validate Further
* Do Not Build

---

# 01 Search Demand Analysis

Identify:

## Commercial Keywords

## Transactional Keywords

## Informational Keywords

## Comparison Keywords

## Alternative Keywords

For each keyword provide:

* Search Intent
* Traffic Potential
* Monetization Potential

---

# 02 Competitor Landscape

Identify:

## Direct Competitors

## Indirect Competitors

## Alternative Solutions

For each competitor provide:

* Product Name
* Positioning
* Pricing Model
* Core Features
* Strengths
* Weaknesses

---

# 03 Competitor Gap Analysis

Identify:

* Missing Features
* Missing UX Patterns
* Missing Integrations
* Underserved User Segments

Generate market opportunities.

---

# 04 Revenue Potential Analysis

Analyze:

## Revenue Model

Examples:

* One-time Purchase
* Subscription
* Freemium
* Bundle
* Marketplace

## Upsell Opportunities

## Cross-sell Opportunities

## Customer Lifetime Value Potential

---

# 05 Product Complexity Assessment

Evaluate:

* UX Complexity
* Backend Complexity
* Frontend Complexity
* Scalability Risk
* Maintenance Cost

Scale: 1-10

Generate:

## Development Difficulty

* Easy
* Medium
* Hard
* Very Hard

---

# 06 Risk Assessment

Identify:

## Product Risks

## Technical Risks

## Market Risks

## Support Risks

## Legal Risks

For each risk provide mitigation strategies.

---

# 07 Product Strategy

Generate:

## Product Positioning

## Unique Selling Proposition

## Product Differentiators

## Product Vision

## Roadmap

### Version 1.0

### Version 1.1

### Version 2.0

---

# Phase 2 - Product Documentation

Generate the following documents.

---

# 08 Product Brief

Include:

## Product Name

## Tagline

## Problem Statement

## Proposed Solution

## Target Audience

## User Roles

## Business Value

## Scope

## Out of Scope

---

# 09 Competitor Analysis

Generate detailed competitor analysis.

Include:

* Feature Comparison
* Pricing Comparison
* UX Comparison
* Positioning Comparison
* Strategic Opportunities

---

# 10 Feature Comparison Table

Format:

| Feature | Competitor A | Competitor B | Proposed Product |
| ------- | ------------ | ------------ | ---------------- |

---

# 11 User Flow

Generate:

## Main User Flow

## Admin Flow

## Customer Flow

## Instructor Flow

## Student Flow

Use Mermaid diagrams whenever possible.

---

# 12 Product Requirement Document (PRD)

Include:

## Objectives

## User Stories

Format:

As a [role]

I want [action]

So that [benefit]

---

## Functional Requirements

---

## Non-functional Requirements

---

## Permission Matrix

---

## Acceptance Criteria

---

## Success Metrics

---

# 13 Wireframe Specification

Generate low-fidelity wireframes.

Use ASCII layouts only.

For each screen include:

## Screen Name

## Purpose

## Components

## User Actions

## Navigation

---

# 14 Test Plan

Generate:

## Functional Testing

## Permission Testing

## Regression Testing

## Security Testing

## Performance Testing

## Edge Cases

Use tables whenever appropriate.

---

# 15 Documentation Outline

Generate all required documentation pages.

Examples:

* Installation
* Configuration
* Usage
* FAQ
* Troubleshooting
* Hooks
* Filters
* API
* Changelog

For each page include a brief description.

---

# 16 Product Page Outline

Generate:

## SEO Title

## Meta Description

## Hero Section

## Problem Section

## Benefits Section

## Features Section

## Screenshots Section

## Use Cases

## Integrations

## FAQ

## CTA Sections

## Internal Linking Suggestions

Optimize for conversion and SEO.

---

# Phase 3 - Marketing Assets

Generate marketing-ready content.

---

# 17 Product Naming Ideas

Generate 10 naming ideas.

For each provide:

* Name
* Reasoning

---

# 18 Tagline Variations

Generate 10 taglines.

---

# 19 Product Descriptions

Generate:

## Short Version

## Medium Version

## Long Version

---

# 20 SEO Content Plan

Generate:

## Comparison Articles

## Alternative Articles

## Tutorial Articles

## Use Case Articles

Generate at least 50 content ideas.

---

# 21 Launch Assets

Generate:

## Product Announcement

## Changelog Entry

## Release Notes

## Newsletter Draft

## Social Media Post

---

# 22 Build-or-Not-Build Report

Provide a final executive summary.

Answer:

## Should We Build This Product?

## Why?

## Expected ROI

## Estimated Development Cost

## Estimated Maintenance Cost

## Revenue Potential

## Strategic Fit

## Final Recommendation

Choose one:

* Build Now
* Build Later
* Validate First
* Reject

---

# Output Structure

project/

00-market-validation.md

01-search-demand-analysis.md

02-competitor-landscape.md

03-competitor-gap-analysis.md

04-revenue-potential.md

05-product-complexity.md

06-risk-assessment.md

07-product-strategy.md

08-product-brief.md

09-competitor-analysis.md

10-feature-comparison.md

11-user-flow.md

12-prd.md

13-wireframe.md

14-test-plan.md

15-documentation-outline.md

16-product-page-outline.md

17-product-naming.md

18-taglines.md

19-product-descriptions.md

20-seo-content-plan.md

21-launch-assets.md

22-build-or-not-build.md

---

# Critical Rules

1. Read all skill files before generating output.

2. Follow skill instructions over generic knowledge.

3. Never generate filler content.

4. Never invent fake competitors.

5. Explicitly mark assumptions.

6. Think like a Senior Product Manager.

7. Think commercially, not only technically.

8. Optimize for:

   * Product viability
   * Development efficiency
   * Support cost
   * SEO potential
   * Revenue generation

9. Every document must be actionable.

10. The final output must be sufficient for:

    * Product Team
    * Design Team
    * Engineering Team
    * QA Team
    * Documentation Team
    * Marketing Team
    * SEO Team

11. All generated content must be ready for immediate execution.
