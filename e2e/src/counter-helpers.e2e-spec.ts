import { browser } from 'protractor';

import { findEl } from '../e2e.spec-helper';

describe('Counter (with helpers)', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('increments the count', () => {
    expect(findEl('count').getText()).toBe('5');
    findEl('increment-button').click();
    expect(findEl('count').getText()).toBe('6');
  });

  it('decrements the count', () => {
    findEl('decrement-button').click();
    expect(findEl('count').getText()).toBe('4');
  });

  it('resets the count', () => {
    findEl('reset-input').sendKeys('123');
    findEl('reset-button').click();
    expect(findEl('count').getText()).toBe('123');
  });
});
