import { browser } from 'protractor';

import { findEl } from '../e2e.spec-helper';

describe('Counter (with helpers)', () => {
  beforeEach(async () => {
    await browser.get('/');
  });

  it('increments the count', async () => {
    expect(await findEl('count').getText()).toBe('5');
    await findEl('increment-button').click();
    expect(await findEl('count').getText()).toBe('6');
  });

  it('decrements the count', async () => {
    await findEl('decrement-button').click();
    expect(await findEl('count').getText()).toBe('4');
  });

  it('resets the count', async () => {
    await findEl('reset-input').sendKeys('123');
    await findEl('reset-button').click();
    expect(await findEl('count').getText()).toBe('123');
  });
});
