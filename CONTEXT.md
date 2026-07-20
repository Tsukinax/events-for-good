# Context — Events For Good

A small Vue single-page app that lists community **Events** people can attend, and (separately)
a roster of **Students**. This file is a glossary of the domain language only — no implementation
details.

## Glossary

- **Event** — a community activity that people can attend (e.g. "Cat Adoption Day"). Has a title,
  category, description, location, date, time, whether pets are allowed, and an organizer.
- **Category** — the kind of an Event (e.g. `animal welfare`, `food`, `sustainability`). One free-text
  label per Event.
- **Organizer** — the person responsible for running an Event. One person per Event.
- **Event card** — the primary summary of a single Event shown to the user (title + when it happens).
- **Event detail** — a secondary summary of a single Event showing only its Category and Organizer.
- **Student** — a person on the student roster, identified by a student id, with a given name,
  surname, and GPA. Sourced from an external backend, unrelated to Events.
- **Mock server** — a stand-in backend that serves the Event list over HTTP during development,
  until a real backend exists.
