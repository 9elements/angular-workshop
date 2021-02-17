import { browser } from 'protractor';

import { findEl } from '../e2e.spec-helper';

describe('Counter (with helpers and finder reuse)', () => {
  const count = findEl('count');
  const incrementButton = findEl('increment-button');
  const decrementButton = findEl('decrement-button');
  const resetInput = findEl('reset-input');
  const resetButton = findEl('reset-button');

  beforeEach(async () => {
    await browser.get('/');
  });

  it('increments the count', async () => {
    expect(await count.getText()).toBe('5');
    await incrementButton.click();
    expect(await count.getText()).toBe('6');
  });

  it('decrements the count', async () => {
    await decrementButton.click();
    expect(await count.getText()).toBe('4');
  });

  it('resets the count', async () => {
    await resetInput.sendKeys('123');
    await resetButton.click();
    expect(await count.getText()).toBe('123');
  });
});
