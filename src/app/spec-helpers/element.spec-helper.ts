/* istanbul ignore file */

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

// Finds an element with the given 'data-qa' attribute.
// Throws an error if no element was found.
export function findEl<T>(
  fixture: ComponentFixture<T>,
  qaAttribute: string
): DebugElement {
  return queryByCss<T>(fixture, `[data-qa="${qaAttribute}"]`);
}

// Finds all elements with the given 'data-qa' attribute.
export function findEls<T>(
  fixture: ComponentFixture<T>,
  qaAttribute: string
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(`[data-qa="${qaAttribute}"]`));
}

// Gets the text content of an element with the given 'data-qa' attribute.
export function getText<T>(
  fixture: ComponentFixture<T>,
  qaAttribute: string
): string {
  return findEl(fixture, qaAttribute).nativeElement.textContent;
}

// Expects that the element with the given 'data-qa' attribute has the given text content.
export function expectText<T>(
  fixture: ComponentFixture<T>,
  qaAttribute: string,
  text: string
): void {
  expect(getText(fixture, qaAttribute).trim()).toBe(text);
}

// Expects that the component has the given text content.
export function expectContent<T>(
  fixture: ComponentFixture<T>,
  text: string
): void {
  expect(fixture.nativeElement.textContent.trim()).toBe(text);
}

// Sets the value of a form field with the given 'data-qa' attribute.
export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  qaAttribute: string,
  value: string
): void {
  findEl(fixture, qaAttribute).nativeElement.value = value;
}

// Makes a fake click event that provides the most important properties.
export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true
  };
}

// Emulates a left click on the element with the given 'data-qa' attribute.
export function click<T>(
  fixture: ComponentFixture<T>,
  qaAttribute: string
): void {
  const el = findEl(fixture, qaAttribute);
  const event = makeClickEvent(el.nativeElement);
  el.triggerEventHandler('click', event);
}

// Finds a nested component by its selector, e.g. 'app-example'.
// Throws an error if no element was found.
// Use this only for shallow component testing.
// When finding other elements, use findEl(s) and data-qa attributes.
export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return queryByCss(fixture, selector);
}

// Finds all nested components by its selector, e.g. 'app-example'.
export function findComponents<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector));
}
