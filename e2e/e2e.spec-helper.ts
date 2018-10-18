import { ElementArrayFinder, ElementFinder, Locator, by, element } from 'protractor';

export function queryAttributeLocator(qaAttribute: string): Locator {
  return by.css(`[data-qa="${qaAttribute}"]`);
}

export function findEl(qaAttribute: string): ElementFinder {
  return element(queryAttributeLocator(qaAttribute));
}

export function findEls(qaAttribute: string): ElementArrayFinder {
  return element.all(queryAttributeLocator(qaAttribute));
}
