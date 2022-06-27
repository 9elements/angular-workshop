/* istanbul ignore file */

import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Spec helpers for working with the DOM
 */

/**
 * Returns a selector for the `data-testid` attribute with the given attribute value.
 *
 * @param testId Test id set by `data-testid`
 *
 */
export function testIdSelector(testId: string): string {
  return `[data-testid="${testId}"]`;
}

/**
 * Finds a single element inside the Component by the given CSS selector.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 * @param selector CSS selector
 *
 */
export function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string,
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

/**
 * Finds an element inside the Component by the given `data-testid` attribute.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-testid`
 *
 */
export function findEl<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
  return queryByCss<T>(fixture, testIdSelector(testId));
}

/**
 * Finds all elements with the given `data-testid` attribute.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-testid`
 */
export function findEls<T>(fixture: ComponentFixture<T>, testId: string): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(testIdSelector(testId)));
}

/**
 * Gets the text content of an element with the given `data-testid` attribute.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-testid`
 */
export function getText<T>(fixture: ComponentFixture<T>, testId: string): string {
  return findEl(fixture, testId).nativeElement.textContent;
}

/**
 * Expects that the element with the given `data-testid` attribute
 * has the given text content.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-testid`
 * @param text Expected text
 */
export function expectText<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  text: string,
): void {
  expect(getText(fixture, testId)).toBe(text);
}

/**
 * Expects that the element with the given `data-testid` attribute
 * has the given text content.
 *
 * @param fixture Component fixture
 * @param text Expected text
 */
export function expectContainedText<T>(fixture: ComponentFixture<T>, text: string): void {
  expect(fixture.nativeElement.textContent).toContain(text);
}

/**
 * Expects that a component has the given text content.
 * Both the component text content and the expected text are trimmed for reliability.
 *
 * @param fixture Component fixture
 * @param text Expected text
 */
export function expectContent<T>(fixture: ComponentFixture<T>, text: string): void {
  expect(fixture.nativeElement.textContent).toBe(text);
}

/**
 * Dispatches a fake event (synthetic event) at the given element.
 *
 * @param element Element that is the target of the event
 * @param type Event name, e.g. `input`
 * @param bubbles Whether the event bubbles up in the DOM tree
 */
export function dispatchFakeEvent(
  element: EventTarget,
  type: string,
  bubbles: boolean = false,
): void {
  const event = document.createEvent('Event');
  event.initEvent(type, bubbles, false);
  element.dispatchEvent(event);
}

/**
 * Enters text into a form field (`input`, `textarea` or `select` element).
 * Triggers appropriate events so Angular takes notice of the change.
 * If you listen for the `change` event on `input` or `textarea`,
 * you need to trigger it separately.
 *
 * @param element Form field
 * @param value Form field value
 */
export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string,
): void {
  element.value = value;
  // Dispatch an `input` or `change` fake event
  // so Angular form bindings take notice of the change.
  const isSelect = element instanceof HTMLSelectElement;
  dispatchFakeEvent(element, isSelect ? 'change' : 'input', isSelect ? false : true);
}

/**
 * Sets the value of a form field with the given `data-testid` attribute.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-testid`
 * @param value Form field value
 */
export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  value: string,
): void {
  setFieldElementValue(findEl(fixture, testId).nativeElement, value);
}

/**
 * Checks or unchecks a checkbox or radio button.
 * Triggers appropriate events so Angular takes notice of the change.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-testid`
 * @param checked Whether the checkbox or radio should be checked
 */
export function checkField<T>(
  fixture: ComponentFixture<T>,
  testId: string,
  checked: boolean,
): void {
  const { nativeElement } = findEl(fixture, testId);
  nativeElement.checked = checked;
  // Dispatch a `change` fake event so Angular form bindings take notice of the change.
  dispatchFakeEvent(nativeElement, 'change');
}

/**
 * Makes a fake click event that provides the most important properties.
 * Sets the button to left.
 * The event can be passed to DebugElement#triggerEventHandler.
 *
 * @param target Element that is the target of the click event
 */
export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0,
  };
}

/**
 * Emulates a left click on the element with the given `data-testid` attribute.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-testid`
 */
export function click<T>(fixture: ComponentFixture<T>, testId: string): void {
  const element = findEl(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}

/**
 * Finds a nested Component by its selector, e.g. `app-example`.
 * Throws an error if no element was found.
 * Use this only for shallow component testing.
 * When finding other elements, use `findEl` / `findEls` and `data-testid` attributes.
 *
 * @param fixture Fixture of the parent Component
 * @param selector Element selector, e.g. `app-example`
 */
export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return queryByCss(fixture, selector);
}

/**
 * Finds all nested Components by its selector, e.g. `app-example`.
 */
export function findComponents<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector));
}
