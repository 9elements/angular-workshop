import { browser } from 'protractor';

import { findEl } from '../e2e.spec-helper';

describe('Counter (with helpers and finder reuse)', () => {
  const count = findEl('count');
  const incrementButton = findEl('increment-button');
  const decrementButton = findEl('decrement-button');
  const resetInput = findEl('reset-input');
  const resetButton = findEl('reset-button');

  beforeEach(() => {
    browser.get('/');
  });

  it('increments the count', () => {
    expect(count.getText()).toBe('5');
    incrementButton.click();
    expect(count.getText()).toBe('6');
  });

  it('decrements the count', () => {
    decrementButton.click();
    expect(count.getText()).toBe('4');
  });

  it('resets the count', () => {
    resetInput.sendKeys('123');
    resetButton.click();
    expect(count.getText()).toBe('123');
  });
});
