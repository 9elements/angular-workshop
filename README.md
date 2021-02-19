# Angular Counter Component

## Overview

This repository builds a simple counter with Angular in three ways:

- [CounterComponent](src/app/components/counter/): Counter that manages its own state. Has an Input and an Output.
- [ServiceCounterComponent](src/app/components/service-counter): Counter that stores the state in shared service.
- [NgRxCounterComponent](src/app/components/ngrx-counter): Counter that uses NgRx to manage the count and NgRx effects to persist them on the server.

## Related projects

- [Angular Flickr Search](https://github.com/9elements/angular-flickr-search) – a more complex example app
- [Angular testing workshop](https://9elements.github.io/angular-testing-workshop/)

## Development server

- Clone the repository, change into the `angular-workshop` directory
- `npm install`
- `npm install -g @angular/cli`
- `ng serve`
- Navigate to http://localhost:4200/

## Running unit & integration tests

Run `ng test` to execute the unit & integration tests with Karma and Jasmine.

## Running end-to-end tests

### Cypress

Run `ng run angular-workshop:cypress-run` to execute the Cypress end-to-end tests.

Run `ng run angular-workshop:cypress-open` to start the interactive Cypress test runner.

### Protractor

Run `ng e2e` to execute Cypress end-to-end tests. (This starts the development server automatically.)

## Deployment

Run `ng deploy --base-href=/angular-workshop/` to the deploy the code to [https://9elements.github.io/angular-workshop/].
