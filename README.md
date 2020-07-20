# Angular workshop

## Overview

This repository builds a simple counter with Angular in three ways:

- [CounterComponent](https://github.com/9elements/angular-workshop/tree/master/src/app/components/counter/): Counter that manages its own state. Has an Input and an Output.
- [ServiceCounterComponent](https://github.com/9elements/angular-workshop/tree/master/src/app/components/service-counter): Counter that stores the state in shared service.
- [NgRxCounterComponent](https://github.com/9elements/angular-workshop/tree/master/src/app/components/ngrx-counter): Counter that uses NgRx to manage the count and NgRx effects to persist them on the server.

## Related

- [Angular Flickr Search](https://github.com/9elements/angular-flickr-search) – a more complex example app
- [Angular testing workshop](https://9elements.github.io/angular-testing-workshop/)

## Development server

- Clone the repository, change into the `angular-workshop` directory
- `npm install`
- `npm install -g @angular/cli`
- `ng serve`
- Navigate to http://localhost:4200/

## Running unit tests

Run `ng test` to execute the unit tests.

## Deployment

Run `ng deploy --base-href=/angular-workshop/` to the deploy the code to [https://9elements.github.io/angular-workshop/].
