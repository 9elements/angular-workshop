import {
  ElementArrayFinder,
  ElementFinder,
  Locator,
  by,
  element
} from 'protractor';

export function queryAttributeLocator(testId: string): Locator {
  return by.css(`[data-testid="${testId}"]`);
}

export function findEl(testId: string): ElementFinder {
  return element(queryAttributeLocator(testId));
}

export function findEls(testId: string): ElementArrayFinder {
  return element.all(queryAttributeLocator(testId));
}
