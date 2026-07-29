# Product Documentation Generator Input

## Project Name

LearnPress Cookie Consent

---

## Product Idea

Build a lightweight, native Cookie Consent feature directly into LearnPress Core. The feature allows LearnPress websites to display a GDPR-friendly cookie consent banner, collect visitor preferences, and provide a simple consent management experience without requiring a third-party cookie plugin.

The goal is not to replace full Consent Management Platforms (CMPs) such as Complianz or Cookiebot, but to provide a clean, integrated solution that covers the most common cookie consent needs for LearnPress users.

---

## Product Type

LearnPress Core Feature

---

## Target Users

### Primary Users

* LearnPress Website Owners
* Course Creators
* Educational Institutions
* Online Academies
* Corporate Training Platforms

### Secondary Users

* Students
* Visitors
* Developers
* Agencies

---

## User Roles

* Administrator
* Instructor
* Student
* Guest
* Developer

---

## Core Problem

Most LearnPress websites need a cookie consent banner to comply with privacy regulations such as GDPR, but currently users must install additional cookie plugins.

This creates several problems:

* Additional plugin dependency
* Inconsistent user experience
* Duplicate settings
* Performance overhead
* Plugin conflicts
* More maintenance for site owners

---

## Proposed Solution

Integrate a lightweight Cookie Consent module directly into LearnPress Core.

The module should provide:

* Native cookie consent banner
* Cookie preference management
* Configurable consent categories
* Cookie settings popup
* Consent persistence
* Consent versioning
* Developer API for integrations
* Compatibility detection with existing cookie plugins

The module should be easy to configure while remaining extensible for future integrations such as Google Consent Mode.

---

## Must-Have Features

### Cookie Consent Banner

* Enable / Disable banner
* Multiple banner positions
* Multiple layout styles
* Light / Dark / Auto theme
* Custom title
* Custom description
* Privacy Policy link
* Cookie Policy link

---

### Cookie Categories

Support four predefined categories:

* Essential (always enabled)
* Analytics
* Marketing
* Preferences

Administrators can enable or disable optional categories but cannot remove Essential cookies.

---

### Consent Actions

Support the following actions:

* Accept All
* Reject All
* Customize
* Save Preferences

---

### Cookie Preferences Popup

Allow visitors to:

* View cookie categories
* Enable or disable optional categories
* Save preferences
* Reopen settings at any time

---

### Cookie Storage

Store visitor preferences using:

* Browser Cookies
* localStorage (fallback)

Store:

* Consent status
* Selected categories
* Consent version
* Timestamp

---

### Cookie Settings Link

Provide a reusable "Cookie Settings" link that can be placed in:

* Footer
* Privacy Page
* Custom menu
* Shortcode
* Block

Visitors can update their preferences at any time.

---

### Consent Versioning

Allow administrators to define a consent version.

When the version changes:

* Existing consent becomes outdated.
* Visitors are prompted to consent again.

---

### Display Rules

Allow administrators to configure:

* Display worldwide
* Display only in EU
* Display only in UK
* Custom countries (future)

---

### Plugin Compatibility

Detect common cookie plugins such as:

* Complianz
* CookieYes
* Cookiebot
* Cookie Notice
* iubenda

Warn administrators when another cookie banner is active to prevent duplicate consent banners.

---

### Developer API

Provide JavaScript and PHP APIs.

JavaScript:

* Get current consent
* Check category permission
* Open settings
* Accept all
* Reject all
* Save preferences

PHP Hooks:

* Modify categories
* Modify banner content
* Modify display conditions
* Execute actions after consent changes

---

### Legal Consents Module

Allow administrators to create and manage custom legal consents:

* Create multiple custom consents.
* Display Locations:
  * Registration
  * Login
  * Checkout
  * Instructor Registration
* Consent Types:
  * Mandatory checkbox (required for form submission)
  * Optional checkbox
  * Text only (informational notice)
* Rich text content composition for each consent.
* Enable / Disable individual consents.

---

### Consent Audit Log & CSV Export

Record and export user consent history for legal compliance:

* Automatically record each consent action:
  * Timestamp
  * IP Address
  * User Agent / Browser info
  * Selected consent IDs / categories
* Consent Audit Log table in Admin.
* One-click CSV Export for audit compliance.

---

## Nice-To-Have Features

### Google Consent Mode v2 Support

Allow developers to synchronize consent with Google services.

---

### Google Tag Manager Integration

Expose consent state for GTM triggers.

---

### Meta Pixel Support

Expose marketing consent for Meta Pixel.

---

### Microsoft Clarity Support

Respect analytics consent before loading Clarity.

---

### CSS Variables

Allow themes to customize banner appearance using CSS variables.

---

### Shortcodes & Blocks

Provide:

* Cookie Settings button
* Cookie Settings link
* Consent Status block

---

## Out Of Scope

* Cookie scanning
* Automatic cookie classification
* Full CMP functionality
* Legal compliance consulting
* Privacy policy generation
* Cookie database management
* Multi-site consent synchronization

---

## Competitors Or Alternatives

* Complianz
* CookieYes
* Cookiebot
* iubenda
* Cookie Notice
* Borlabs Cookie
* Real Cookie Banner

Current alternative:

Install a dedicated cookie consent plugin alongside LearnPress.

---

## Integrations

### WordPress

* Privacy Policy Page
* Settings API
* Shortcode API
* Block Editor
* Theme Customizer

### LearnPress

* LearnPress Settings
* Frontend Assets
* Template System

### Future Integrations

* Google Analytics 4
* Google Tag Manager
* Google Consent Mode v2
* Meta Pixel
* Microsoft Clarity

---

## Pricing Or Revenue Model

Included in LearnPress Core.

---

## SEO Keywords

* LearnPress Cookie Consent
* LearnPress GDPR
* Cookie Consent for LearnPress
* LearnPress Privacy
* GDPR Cookie Banner
* WordPress LMS Cookie Consent

---

## Business Goals

* Reduce dependency on third-party cookie plugins.
* Improve the first-time setup experience.
* Increase LearnPress value proposition.
* Provide a consistent user experience.
* Improve compliance readiness for global customers.
* Strengthen LearnPress Core as an all-in-one LMS solution.

---

## Success Metrics

* Percentage of LearnPress websites enabling Cookie Consent.
* Reduction in support requests related to cookie plugins.
* Reduction in plugin conflicts.
* User satisfaction with setup experience.
* Low performance impact.
* High compatibility with popular themes and plugins.

---

## Risks Or Constraints

### Technical

* Avoid conflicts with existing cookie plugins.
* Ensure compatibility with page caching.
* Ensure compatibility with multilingual plugins.
* Maintain accessibility (WCAG).
* Keep JavaScript lightweight.

### Legal

* This feature provides technical tools only.
* Compliance depends on local regulations and website configuration.

### UX

* Banner should be simple and non-intrusive.
* Settings should remain understandable for non-technical users.

### Future Scalability

Architecture should allow future support for:

* Google Consent Mode
* Additional consent categories
* Regional display rules
* Third-party integrations

---

## Notes

### Admin Location

LearnPress → Settings → Privacy & Cookies

### Default Cookie Categories

* Essential
* Analytics
* Marketing
* Preferences

### Default Banner Buttons

* Accept All
* Reject All
* Customize

### Frontend Flow

1. Visitor enters website.
2. Cookie banner is displayed.
3. Visitor chooses:

   * Accept All
   * Reject All
   * Customize
4. Preferences are stored.
5. Cookie Settings remains accessible from the website footer.

### Design Principles

* Native LearnPress UI
* Lightweight
* Accessible
* Mobile-friendly
* Developer-friendly
* Extensible
* No unnecessary complexity
