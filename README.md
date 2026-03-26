# Shri Sai Dwarkamai Vridhashram — Project Documentation

> **Project Type:** College Project — NGO Website for an Old Age Home
> **Technology Stack:** HTML5, CSS3, Vanilla JavaScript
> **Live URL:** `https://YOUR_USERNAME.github.io/shri-sai-dwarkamai-vridhashram/`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Architecture & File Structure](#3-architecture--file-structure)
4. [Page-wise Breakdown](#4-page-wise-breakdown)
5. [Design System](#5-design-system)
6. [Interactive Features (JavaScript)](#6-interactive-features-javascript)
7. [Responsive Design](#7-responsive-design)
8. [Form Handling & Email Integration](#8-form-handling--email-integration)
9. [External Dependencies](#9-external-dependencies)
10. [Data Flow Diagram](#10-data-flow-diagram)
11. [Deployment Guide (GitHub Pages)](#11-deployment-guide-github-pages)
12. [Future Enhancements](#12-future-enhancements)

---

## 1. Project Overview

### 1.1 About the Project

This is a **multi-page responsive website** built for **Shri Sai Dwarkamai Vridhashram**, a non-profit old age home inspired by Sai Baba's teachings. The website serves three primary goals:

1. **Inform** visitors about the ashram's mission, services, and residents
2. **Collect donations** through an online form with email notification
3. **Recruit volunteers** via a registration form

### 1.2 Key Features

| Feature | Description |
|---------|-------------|
| 7 Pages | Home, About, Services, Gallery, Donate, Volunteer, Contact |
| Responsive Design | Works on mobile, tablet, and desktop |
| Image Gallery | Filterable grid with fullscreen lightbox viewer |
| Testimonials Carousel | Auto-rotating cards with swipe support |
| Counter Animation | Animated statistics that count up on scroll |
| Form Validation | Client-side validation with error messages |
| Email Integration | Web3Forms API sends form data to email |
| Scroll Animations | Fade-in reveal effects on scroll |
| Mobile Navigation | Hamburger menu with slide-in sidebar |

### 1.3 Target Audience

- Potential donors and sponsors
- Volunteers looking to help
- Families seeking care for elderly members
- General public interested in the ashram

---

## 2. Technology Stack

### 2.1 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | 5 | Page structure and semantic markup |
| **CSS3** | 3 | Styling, layout (Flexbox & Grid), animations |
| **JavaScript** | ES6+ | Interactivity, form validation, API calls |

### 2.2 External Services

| Service | Purpose | Cost |
|---------|---------|------|
| **Google Fonts** | Typography (Poppins + Open Sans) | Free |
| **Web3Forms API** | Sends form submissions to email | Free (200 emails/month) |
| **Google Maps Embed** | Shows ashram location on Contact page | Free |
| **GitHub Pages** | Website hosting | Free |

### 2.3 No Build Tools Required

This project does **not** use any:
- Frameworks (React, Vue, Angular)
- CSS preprocessors (SASS, LESS)
- JavaScript bundlers (Webpack, Vite)
- Package managers (npm, yarn)
- Build tools or compilers

Open any `.html` file directly in a browser to preview.

---

## 3. Architecture & File Structure

### 3.1 Directory Structure

```
ngo/
├── index.html                  # Home page (entry point)
├── about.html                  # About Us page
├── services.html               # Our Services page
├── gallery.html                # Photo Gallery page
├── donate.html                 # Donation page
├── volunteer.html              # Volunteer Registration page
├── contact.html                # Contact Us page
│
├── css/
│   ├── style.css               # Global styles, variables, reset, typography, layout
│   ├── components.css           # Header, footer, cards, buttons, forms
│   ├── animations.css           # Scroll reveals, transitions, keyframes
│   └── responsive.css           # Media queries for all breakpoints
│
├── js/
│   ├── config.js                # Web3Forms API key configuration
│   ├── main.js                  # Navigation, sticky header, scroll animations
│   ├── carousel.js              # Testimonials carousel (Home page)
│   ├── counter.js               # Counter animation (Home page)
│   ├── gallery.js               # Gallery filters + lightbox (Gallery page)
│   └── forms.js                 # Form validation + Web3Forms submission
│
├── assets/
│   └── images/
│       ├── logo.png             # Website logo
│       ├── sliders/             # Hero banner images (slider1-4.jpg)
│       ├── stories/             # Resident story photos (4 images)
│       └── gallery/             # Gallery photos (13 images)
│
└── docs/
    ├── PROJECT_DOCUMENTATION.md  # This file
    └── superpowers/
        └── specs/
            └── 2026-03-26-ngo-website-design.md  # Design specification
```

### 3.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER                               │
│                                                              │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│   │ index    │  │ about    │  │ services │  │ gallery  │   │
│   │ .html    │  │ .html    │  │ .html    │  │ .html    │   │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│        │              │              │              │         │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│   │ donate   │  │ volunteer│  │ contact  │                  │
│   │ .html    │  │ .html    │  │ .html    │                  │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘                  │
│        │              │              │                        │
│   ─────┴──────────────┴──────────────┴────────               │
│                        │                                     │
│              ┌─────────┴─────────┐                           │
│              │   SHARED ASSETS   │                           │
│              │                   │                           │
│  ┌───────────┼───────────────────┼───────────┐               │
│  │           │                   │           │               │
│  ▼           ▼                   ▼           ▼               │
│ css/       js/              assets/images/  Google Fonts     │
│ style      main.js          logo.png        (CDN)           │
│ components carousel.js      sliders/                        │
│ animations counter.js       stories/                        │
│ responsive gallery.js       gallery/                        │
│            forms.js                                         │
│            config.js                                        │
│              │                                               │
│              ▼                                               │
│     ┌────────────────┐     ┌──────────────┐                  │
│     │  Web3Forms API │     │ Google Maps  │                  │
│     │  (Email Send)  │     │  (Embed)     │                  │
│     └────────────────┘     └──────────────┘                  │
│              │                                               │
│              ▼                                               │
│     ┌────────────────┐                                       │
│     │  Your Email    │                                       │
│     │  (Inbox)       │                                       │
│     └────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 CSS Architecture

```
style.css (Foundation Layer)
│   ├── CSS Variables (colors, fonts, spacing, shadows)
│   ├── Reset & Base Styles
│   ├── Typography (h1-h6, paragraphs, links)
│   ├── Layout Utilities (.container, .section, .grid-2/3/4)
│   └── Page-specific Styles (hero, counter, timeline, etc.)
│
components.css (Component Layer)
│   ├── Header & Navigation
│   ├── Footer
│   ├── Cards (service, team, impact, role)
│   ├── Buttons (primary, secondary, outline)
│   ├── Forms (inputs, labels, error states)
│   └── Modals
│
animations.css (Animation Layer)
│   ├── Scroll Reveal (.reveal, .reveal-delay-1 to .reveal-delay-4)
│   ├── Fade-in Keyframes
│   ├── Gallery Transitions
│   └── Lightbox Transitions
│
responsive.css (Responsive Layer)
    ├── Tablet (max-width: 1024px)
    ├── Mobile (max-width: 768px)
    └── Small Mobile (max-width: 480px)
```

### 3.4 JavaScript Architecture

```
config.js ──────────────────── Global CONFIG object (API key)
     │
     ▼
main.js ────────────────────── Loaded on ALL pages
│   ├── Mobile Navigation Toggle
│   ├── Sticky Header on Scroll
│   ├── Scroll Reveal Animations (IntersectionObserver)
│   └── Active Nav Link Highlighting
│
carousel.js ────────────────── Loaded on: index.html
│   ├── Slide Navigation (prev/next)
│   ├── Auto-play (5s interval)
│   ├── Dot Indicators
│   ├── Hover Pause
│   └── Touch Swipe Support
│
counter.js ─────────────────── Loaded on: index.html
│   ├── IntersectionObserver Trigger
│   ├── Eased Number Animation (2000ms)
│   └── Locale Number Formatting
│
gallery.js ─────────────────── Loaded on: gallery.html
│   ├── Category Filter Buttons
│   ├── Lightbox Open/Close
│   ├── Prev/Next Image Navigation
│   └── Keyboard Controls (Escape, Arrows)
│
forms.js ───────────────────── Loaded on: donate, volunteer, contact
    ├── Validation Helpers (email, phone regex)
    ├── Error Display/Clear Functions
    ├── Web3Forms API Submission (fetch POST)
    ├── Success/Error Modal Display
    ├── Contact Form Handler
    ├── Volunteer Form Handler
    └── Donation Form Handler
        ├── Amount Button Selection
        ├── Frequency Toggle
        └── Payment Method Selection
```

### 3.5 Which JS Files Load on Which Pages

| Page | main.js | carousel.js | counter.js | gallery.js | config.js | forms.js |
|------|---------|-------------|------------|------------|-----------|----------|
| index.html | Yes | Yes | Yes | - | - | - |
| about.html | Yes | - | - | - | - | - |
| services.html | Yes | - | - | - | - | - |
| gallery.html | Yes | - | - | Yes | - | - |
| donate.html | Yes | - | - | - | Yes | Yes |
| volunteer.html | Yes | - | - | - | Yes | Yes |
| contact.html | Yes | - | - | - | Yes | Yes |

---

## 4. Page-wise Breakdown

### 4.1 Home Page (`index.html`)

```
┌──────────────────────────────────────┐
│          HEADER (sticky)             │
│  Logo | Nav Links | Donate Now Btn   │
├──────────────────────────────────────┤
│                                      │
│           HERO SECTION               │
│    Background: slider1.jpg           │
│    "A Loving Home for Our Elders"    │
│    [Donate Now]  [Learn More]        │
│                                      │
├──────────────────────────────────────┤
│         MISSION STATEMENT            │
│    Short paragraph + Read More       │
├──────────────────────────────────────┤
│        COUNTER SECTION               │
│   500+     150+     15+    1000+     │
│  Elders  Volunteers Years  Meals     │
├──────────────────────────────────────┤
│      TESTIMONIALS CAROUSEL           │
│  ◄  [ Quote Card ]  ►               │
│       ● ● ○ ●                        │
├──────────────────────────────────────┤
│         CTA STRIP                    │
│  "Join us as a Volunteer" [Sign Up]  │
├──────────────────────────────────────┤
│            FOOTER                    │
│  About | Links | Contact | Social    │
└──────────────────────────────────────┘
```

**Sections:**
1. **Hero** — Full-width banner with dark gradient overlay, heading, tagline, 2 CTA buttons
2. **Mission** — Text block with "Read More" link to About page
3. **Counters** — 4 animated statistics (IntersectionObserver triggers count-up)
4. **Testimonials** — 4-slide carousel with auto-play, dots, swipe
5. **CTA Strip** — Volunteer recruitment banner

### 4.2 About Us (`about.html`)

**Sections:**
1. **Page Header** — Title + breadcrumb-style subtitle
2. **Our Story** — 2-column grid (text left, image right)
3. **Vision & Mission** — 2 side-by-side cards
4. **Core Values** — 4-card grid (Compassion, Dignity, Care, Community) with emoji icons
5. **Team & Trustees** — 4-card grid with photo, name, and role

### 4.3 Our Services (`services.html`)

**Sections:**
1. **Page Header** — Title + subtitle
2. **Services Grid** — 6 cards in a 3-column grid:
   - Medical Care & Health Checkups
   - Nutritious Meals (3 meals + snacks)
   - Recreation & Activities
   - Counseling & Emotional Support
   - 24/7 Security & Safety
   - Spiritual Activities & Prayer Hall
3. **Daily Routine Timeline** — Vertical timeline (9 items from 6:00 AM to 9:00 PM)
4. **CTA Strip** — "Have questions?" with Contact link

### 4.4 Gallery (`gallery.html`)

**Sections:**
1. **Page Header**
2. **Filter Buttons** — All | Festivals | Daily Life | Events | Facilities
3. **Image Grid** — 13 filterable images in a 3-column responsive grid
4. **Lightbox Modal** — Fullscreen image viewer with prev/next/close/keyboard controls

**Gallery Categories:**

| Category | Images |
|----------|--------|
| Festivals | prayer.png |
| Daily Life | food-service, growing-old-fun, how-you-are-old, morning-exercise |
| Events | help-people, helping-elderly, medical-care |
| Facilities | trust-view, dining-hall, theater, surroundings, facilities |

### 4.5 Donate (`donate.html`)

**Sections:**
1. **Page Header** — With slider2.jpg background
2. **Impact Section** — 2 images + 3 impact stat cards
3. **Donation Form** (2-column layout):
   - Left: Form with name, email, phone, amount buttons (500/1000/2500/5000 + custom), frequency toggle, payment method
   - Right: "Other Ways to Help" cards (food, clothing, medicines)
4. **Thank You Modal** — Appears on successful submission

### 4.6 Volunteer (`volunteer.html`)

**Sections:**
1. **Page Header** — With slider3.jpg background
2. **Why Volunteer** — Descriptive text + image
3. **Roles Available** — 5 role cards (Caretaker, Event Organizer, Medical, Teaching, Admin)
4. **Registration Form** (2-column layout):
   - Left: Form with name, email, phone, age, availability, role, message
   - Right: 3 volunteer testimonial cards with images
5. **Thank You Modal**

### 4.7 Contact Us (`contact.html`)

**Sections:**
1. **Page Header** — With slider4.jpg background
2. **Contact Grid** (2-column):
   - Left: Address, phone, email, working hours, social media icons
   - Right: Contact form (name, email, subject, message)
3. **Google Maps Embed** — Full-width iframe
4. **Thank You Modal**

---

## 5. Design System

### 5.1 Color Palette

```
Primary Colors:
┌─────────────┬───────────┬───────────────────────────────┐
│ Color       │ Hex       │ Usage                         │
├─────────────┼───────────┼───────────────────────────────┤
│ Soft Orange │ #E8854A   │ Primary buttons, CTAs, links  │
│ Dark Orange │ #D0743E   │ Hover states                  │
│ Gentle Green│ #7BAF5E   │ Secondary buttons, accents    │
│ Dark Green  │ #6A9A50   │ Hover states                  │
└─────────────┴───────────┴───────────────────────────────┘

Neutral Colors:
┌─────────────┬───────────┬───────────────────────────────┐
│ Dark Brown  │ #3E2C1C   │ Main text, headings           │
│ Warm Gray   │ #8B7D6B   │ Muted text, subtitles         │
│ Warm Beige  │ #F5F0E8   │ Page background               │
│ Off White   │ #FFF9F2   │ Card backgrounds              │
│ Pure White  │ #FFFFFF   │ Header, form backgrounds      │
└─────────────┴───────────┴───────────────────────────────┘
```

### 5.2 Typography

| Element | Font Family | Weight | Size |
|---------|-------------|--------|------|
| H1 | Poppins | 700 (Bold) | 2.8rem |
| H2 | Poppins | 600 (Semi-bold) | 2.2rem |
| H3 | Poppins | 600 | 1.5rem |
| H4 | Poppins | 600 | 1.2rem |
| Body | Open Sans | 400 (Regular) | 1rem (16px) |
| Body Bold | Open Sans | 600 | 1rem |

### 5.3 Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| Container Width | 90%, max 1200px | Content wrapper |
| Section Padding | 80px 0 (desktop), 40px 0 (mobile) | Vertical section spacing |
| Grid Gap | 2rem | Between grid items |
| Border Radius | 8px | Cards, buttons, inputs |
| Border Radius Round | 50% | Avatars, circular elements |
| Box Shadow | 0 2px 12px rgba(62,44,28,0.08) | Default card shadow |
| Box Shadow Hover | 0 4px 20px rgba(62,44,28,0.15) | Hover lift effect |

---

## 6. Interactive Features (JavaScript)

### 6.1 Counter Animation (`counter.js`)

**How it works:**
1. `IntersectionObserver` watches the `.counter-section`
2. When section enters viewport (15% visible), animation triggers
3. Each counter animates from 0 to its `data-target` value
4. Animation duration: 2000ms with cubic-out easing
5. Numbers are formatted with locale separators (e.g., 1,000)
6. Triggers only once (observer disconnects after animation)

```
User scrolls ──► Section enters viewport ──► Observer fires
                                               │
                                               ▼
                                     Start animation loop
                                     0 → data-target (2s)
                                               │
                                               ▼
                                     Display formatted number
                                     Disconnect observer
```

### 6.2 Testimonials Carousel (`carousel.js`)

**How it works:**
1. Carousel track contains 4 testimonial cards
2. `translateX()` moves the track to show active slide
3. Auto-advances every 5 seconds via `setInterval`
4. Dot indicators are dynamically generated
5. Touch events track swipe gestures (50px threshold)

```
┌──────────────────────────────────────────┐
│            Visible Viewport              │
│  ┌─────────┐                             │
│  │ Slide 1 │  Slide 2  Slide 3  Slide 4 │
│  │(active) │                             │
│  └─────────┘                             │
│  ◄──────── translateX(0%) ──────────►    │
│       ●  ○  ○  ○                         │
└──────────────────────────────────────────┘

User clicks Next:
  translateX(-100%) → shows Slide 2
  ○  ●  ○  ○
```

**Controls:**
- Previous/Next buttons
- Dot indicators (click to jump)
- Auto-play (pauses on hover)
- Touch swipe (mobile)

### 6.3 Gallery Lightbox (`gallery.js`)

**How it works:**
1. Filter buttons show/hide gallery items by `data-category`
2. Clicking an image opens fullscreen lightbox overlay
3. Lightbox tracks currently visible (filtered) images
4. Arrow keys and buttons navigate between images

```
Gallery Grid                          Lightbox Overlay
┌───┬───┬───┐                    ┌──────────────────────┐
│ 1 │ 2 │ 3 │  ── Click ──►     │    ┌──────────────┐  │
├───┼───┼───┤                    │ ◄  │   Full Image  │► │
│ 4 │ 5 │ 6 │                    │    └──────────────┘  │
├───┼───┼───┤                    │         [X Close]    │
│ 7 │ 8 │ 9 │                    └──────────────────────┘
└───┴───┴───┘

Keyboard: ← → (navigate), Escape (close)
```

### 6.4 Form Validation & Submission (`forms.js`)

**Validation Flow:**
```
User clicks Submit
       │
       ▼
  Prevent default
  Clear all errors
       │
       ▼
  Validate each field
  ┌─────────────────────────────┐
  │ Name: required              │
  │ Email: required + regex     │
  │ Phone: 10-digit Indian fmt  │
  │ Age: 16-80 range            │
  │ Others: required            │
  └─────────────────────────────┘
       │
       ├── Invalid? ──► Show inline error messages
       │
       ├── Valid? ──► Build FormData
       │                  │
       │                  ▼
       │             Check config.js
       │             API key set?
       │                  │
       │          ┌───────┴───────┐
       │          │ Yes           │ No
       │          ▼               ▼
       │     POST to          Show modal
       │     Web3Forms        (offline mode)
       │          │
       │          ▼
       │     Success? ──► Show thank you modal + reset form
       │     Error?   ──► Show error modal
       │
       ▼
     END
```

**Validation Rules:**

| Field | Rule | Regex/Logic |
|-------|------|-------------|
| Name | Required | Non-empty string |
| Email | Required + Format | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Phone | Required + Format | `/^[6-9]\d{9}$/` (Indian 10-digit) |
| Age | Range | 16 to 80 |
| Subject | Required | Non-empty string |
| Message | Required | Non-empty string |
| Amount | Required | Preset button or custom value |

### 6.5 Scroll Reveal Animations (`main.js`)

**How it works:**
1. All elements with `.reveal` class start invisible (`opacity: 0, translateY: 30px`)
2. `IntersectionObserver` watches all `.reveal` elements
3. When 15% of element is visible, `.active` class is added
4. CSS transitions handle the animation (`opacity: 1, translateY: 0`)
5. Staggered delays via `.reveal-delay-1` to `.reveal-delay-4`

```css
.reveal          → opacity: 0; transform: translateY(30px);
.reveal.active   → opacity: 1; transform: translateY(0);
.reveal-delay-1  → transition-delay: 0.1s;
.reveal-delay-2  → transition-delay: 0.2s;
.reveal-delay-3  → transition-delay: 0.3s;
.reveal-delay-4  → transition-delay: 0.4s;
```

### 6.6 Mobile Navigation (`main.js`)

```
Desktop (>768px):              Mobile (<=768px):
┌────────────────────┐         ┌────────────────────┐
│ Logo  Nav Links Btn│         │ Logo          ☰    │
└────────────────────┘         └──────────────┬─────┘
                                              │ Click
                                              ▼
                               ┌─────────┬──────────┐
                               │ Overlay │  Sidebar  │
                               │ (dark)  │  280px    │
                               │         │  Nav Links│
                               │         │  Close X  │
                               └─────────┴──────────┘
```

---

## 7. Responsive Design

### 7.1 Breakpoints

| Breakpoint | Target Device | Key Changes |
|------------|---------------|-------------|
| > 1024px | Desktop | Full layout, 4-column grids, side-by-side forms |
| 769px — 1024px | Tablet | 2-column grids, adjusted spacing |
| 481px — 768px | Mobile | Hamburger menu, single column, stacked layouts |
| < 480px | Small Mobile | Further size reductions, 2x2 counter grid |

### 7.2 Layout Changes by Breakpoint

```
DESKTOP (>1024px)         TABLET (769-1024px)      MOBILE (<768px)
┌──┬──┬──┬──┐             ┌──┬──┐                  ┌──┐
│  │  │  │  │  4-col      │  │  │  2-col           │  │  1-col
└──┴──┴──┴──┘             ├──┼──┤                  ├──┤
                          │  │  │                  │  │
Services Grid             └──┴──┘                  ├──┤
                                                   │  │
                          Gallery: 2-col           └──┘
Gallery: 3-col
                          Nav: horizontal          Nav: hamburger
Nav: horizontal                                    + sidebar
```

### 7.3 Responsive Components

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Header | Horizontal nav + CTA | Horizontal nav | Hamburger menu |
| Hero | 85vh | 85vh | 70vh → 60vh |
| Grids | 4/3/2 columns | 2 columns | 1 column |
| Counter | 4 columns | 2x2 grid | 2x2 grid |
| Footer | 4 columns | 2x2 grid | 1 column |
| Gallery | 3 columns | 2 columns | 1 column |
| Timeline | Alternating sides | Alternating | Left-aligned |
| Forms | 2-column layout | 2-column | Stacked |
| Carousel | Prev/Next visible | Prev/Next visible | Dots only |

---

## 8. Form Handling & Email Integration

### 8.1 Web3Forms Integration

**What is Web3Forms?**
A free API service that lets static websites send form data to email without a backend server.

**How it works:**
```
User fills form ──► JavaScript validates ──► FormData object built
                                                    │
                                                    ▼
                                           fetch() POST request
                                           to api.web3forms.com
                                                    │
                                                    ▼
                                           Web3Forms sends email
                                           to configured address
                                                    │
                                                    ▼
                                           You receive email with
                                           all form field data
```

### 8.2 Configuration

**File:** `js/config.js`

```javascript
const CONFIG = {
    WEB3FORMS_ACCESS_KEY: "YOUR_ACCESS_KEY_HERE"  // Replace with your key
};
```

**How to get the key:**
1. Visit https://web3forms.com
2. Enter your email address
3. Click "Create Access Key"
4. Check your email for the access key
5. Paste it in `config.js`

### 8.3 Form Data Sent to Email

**Contact Form:**
| Field | Description |
|-------|-------------|
| Name | Visitor's full name |
| Email | Visitor's email address |
| Subject | Message subject line |
| Message | Full message text |

**Volunteer Registration Form:**
| Field | Description |
|-------|-------------|
| Name | Volunteer's full name |
| Email | Volunteer's email |
| Phone | 10-digit phone number |
| Age | Volunteer's age (16-80) |
| Availability | Weekdays / Weekends / Both |
| Preferred Role | Selected volunteer role |
| Message | Motivation / additional info |

**Donation Form:**
| Field | Description |
|-------|-------------|
| Name | Donor's full name |
| Email | Donor's email |
| Phone | 10-digit phone number |
| Donation Amount | Selected or custom amount |
| Frequency | One-time or Monthly |
| Payment Method | UPI / Card / Bank Transfer |

> **Note:** The donation form is **UI only** — no real payment processing occurs. It only sends the details to your email for manual follow-up.

---

## 9. External Dependencies

### 9.1 Google Fonts

**URL loaded in all HTML files:**
```
https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap
```

| Font | Used For | Weights |
|------|----------|---------|
| Poppins | Headings (h1-h6), buttons | 400, 600, 700 |
| Open Sans | Body text, paragraphs, forms | 400, 600, 700 |

### 9.2 Web3Forms API

- **Endpoint:** `https://api.web3forms.com/submit`
- **Method:** POST
- **Content Type:** FormData (multipart)
- **Rate Limit:** 200 emails/month (free tier)
- **Required Field:** `access_key` (from config.js)

### 9.3 Google Maps Embed

- **Used on:** contact.html
- **Type:** iframe embed
- **Location:** Configurable via iframe URL coordinates

---

## 10. Data Flow Diagram

### 10.1 Page Navigation Flow

```
                    ┌─────────────┐
                    │  index.html │
                    │   (Home)    │
                    └──────┬──────┘
                           │
         ┌─────────┬───────┼───────┬──────────┐
         ▼         ▼       ▼       ▼          ▼
    ┌─────────┐ ┌──────┐ ┌──────┐ ┌────────┐ ┌─────────┐
    │ about   │ │serv- │ │gall- │ │donate  │ │volunteer│
    │ .html   │ │ices  │ │ery   │ │.html   │ │.html    │
    └─────────┘ └──┬───┘ └──────┘ └────────┘ └─────────┘
                   │                    │          │
                   ▼                    │          │
              ┌─────────┐              │          │
              │contact  │◄─────────────┘          │
              │.html    │◄────────────────────────┘
              └─────────┘

All pages link to all other pages via the shared header & footer navigation.
```

### 10.2 User Interaction Flow

```
New Visitor Arrives
       │
       ▼
   Home Page ──── Reads mission & stats
       │
       ├──► About Page ──── Learns about the ashram
       │
       ├──► Services Page ──── Sees facilities & daily routine
       │
       ├──► Gallery Page ──── Views photos (filter + lightbox)
       │
       ├──► Donate Page ──── Fills donation form
       │         │                    │
       │         ▼                    ▼
       │    Form validates ──► Web3Forms API ──► Email to admin
       │
       ├──► Volunteer Page ──── Fills registration form
       │         │                    │
       │         ▼                    ▼
       │    Form validates ──► Web3Forms API ──► Email to admin
       │
       └──► Contact Page ──── Sends message
                 │                    │
                 ▼                    ▼
            Form validates ──► Web3Forms API ──► Email to admin
```

---

## 11. Deployment Guide (GitHub Pages)

### Step 1: Create GitHub Account
- Go to https://github.com and sign up (if not already done)

### Step 2: Install Git
```bash
sudo apt install git          # Ubuntu/Linux
```

### Step 3: Configure Git (one-time)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 4: Create Repository on GitHub
1. Click "+" icon → "New repository"
2. Repository name: `shri-sai-dwarkamai-vridhashram`
3. Visibility: **Public** (required for free GitHub Pages)
4. Do NOT initialize with README
5. Click "Create repository"

### Step 5: Push Code to GitHub
```bash
cd /home/lnv-20/Documents/Test1/ngo

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Shri Sai Dwarkamai Vridhashram NGO website"

# Set main branch
git branch -M main

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/shri-sai-dwarkamai-vridhashram.git

# Push to GitHub
git push -u origin main
```

### Step 6: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

### Step 7: Access Your Live Website
After 1-2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/shri-sai-dwarkamai-vridhashram/
```

### Important Reminders Before Deploying
- Add your **Web3Forms access key** in `js/config.js` before pushing
- Update the **Google Maps iframe** in `contact.html` with the actual ashram coordinates
- Replace any placeholder text with real content

---

## 12. Future Enhancements

| Enhancement | Difficulty | Description |
|-------------|------------|-------------|
| Real Payment Gateway | Medium | Integrate Razorpay or PayU for actual donations |
| Multi-language Support | Medium | Add Hindi/Marathi translations |
| Blog/News Section | Easy | Add a blog page for updates and news |
| Donation Receipt PDF | Medium | Generate downloadable donation receipts |
| WhatsApp Chat Button | Easy | Floating WhatsApp button for quick contact |
| Dark Mode | Easy | Toggle between light and dark themes |
| Image Optimization | Easy | Compress images for faster loading |
| SEO Optimization | Easy | Add meta tags, Open Graph, structured data |
| Cookie Consent Banner | Easy | GDPR/privacy compliance |
| Admin Dashboard | Hard | Backend panel to manage content |

---

> **Document Version:** 1.0
> **Last Updated:** March 26, 2026
> **Author:** College Project — Built with HTML, CSS & JavaScript
