import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Finds a single element with a CSS selector.
// Throws an error if no element was found.
function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  // The return type of DebugElement#query() is declared as DebugElement,
  // but the actual return type is DebugElement | null.
  // See https://github.com/angular/angular/issues/22449.
  const debugElement = fixture.debugElement.query(By.css(selector));
  // Fail on null so the return type is always DebugElement.
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}

// Finds an element with the given 'data-qa' attribute
export function findEl<T>(
  fixture: ComponentFixture<T>,
  qaAttribute: string
): DebugElement {
  return queryByCss<T>(fixture, `[data-qa="${qaAttribute}"]`);
}

// Finds all elements with the given 'data-qa' attribute
export function findEls<T>(
  fixture: ComponentFixture<T>,
  qaAttribute: string
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(`[data-qa="${qaAttribute}"]`));
}