# DoneYet ng

This Angular project is a refactor of the original React DoneYet project, but
with extra functionality. The reason for the projects creation is souly to
increase my understanding of Angular and the best practices.

The project is a simple todo list web app (big woop).

## Technologies used

- Angular
- HTML
- CSS
- Typescript
- NPM
- Git

## Features

**Connection to DummyAPI** The project fetches data from the DummyJSON API nd
displays it in the web app.

## Components, Services and Functions

### todo-list.service

Handles the business logic for the todo-list.component. With API calls and logic
for the todos.

### toast.service

Handles the business logic for toasting in the app.

## Testing:

- No testing has been done yet (pun intended).

## Known bugs and fixes

- None currently (coming)

## Future features

- [x] Connect to the DummyJSON API
- [x] Post data to the DummyJSON API
- [x] Update data in the DummyJSON API
- [x] Add a http interceptor for headers to requests going to the DummyJSON API
- [ ] Add support for Firebase DB with login and auth
- [ ] Implement some form of gamification
