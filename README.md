# Angular workshop

## Overview

This repository builds a simple counter with Angular in three ways:

* `IndependentCounterComponent`: Counter that manages its own state. Has an Input and an Output.
* `ServiceCounterComponent`: Counter that stores the state in shared service.
* `NgRxCounterComponent`: Counter that uses NgRx to manage the count and NgRx effects to persist them on the server.

## Development server

* Clone the repository, change into the `angular-workshop` directory
* `npm install`
* `npm install -g @angular/cli`
* `ng serve`
* Navigate to http://localhost:4200/

## Running unit tests

Run `ng test` to execute the unit tests.
