# Product Requirements Document

## Purpose
Personal portfolio site for Roshan Khatru to showcase backend and LLM/AI engineering work.

## Audience
1. Recruiters and hiring managers (scan in under 60 seconds)
2. Startup founders and clients looking for AI/backend help
3. Fellow engineers (open-source and collaboration)

## Goals
- Communicate the positioning "Backend + LLM engineer" within 5 seconds
- Showcase 4-6 strong projects with tech tags and links
- Drive contact (email, LinkedIn, GitHub)
- Feel modern and technical without hurting performance

## Functional requirements
| ID | Requirement | Priority |
|---|---|---|
| F1 | Hero with name, rotating role titles, CTA buttons | Must |
| F2 | About text plus animated stats | Must |
| F3 | Skills grouped by category | Must |
| F4 | Projects grid (title, description, tags, repo and live links) | Must |
| F5 | Experience timeline | Must |
| F6 | Contact section with email | Must |
| F7 | Smooth-scroll navigation | Must |
| F8 | Mobile responsive layout | Must |
| F9 | Resume download | Should |
| F10 | AI chat assistant | Could |
| F11 | Blog and case studies | Could |

## Non-functional requirements
- Performance: LCP < 2.5s, 3D canvas must not block first paint
- Accessibility: semantic HTML, alt/aria labels, contrast AA, reduced-motion support
- SEO: title, meta description, Open Graph tags
- Content editable from one file without touching components

## Success metrics
- Lighthouse >= 90
- Visitors clicking a CTA or contact link
- Time on page > 1 min

## Out of scope (MVP)
CMS, authentication, comments, i18n.
