import { $, browser } from 'protractor';

describe('Counter (starter)', () => {
  beforeEach(async () => {
    await browser.get('/');
  });

  it('increments the count', async () => {
    expect(await $('[data-testid="count"]').getText()).toBe('5');
    await $('[data-testid="increment-button"]').click();
    expect(await $('[data-testid="count"]').getText()).toBe('6');
  });

  it('decrements the count', async () => {
    await $('[data-testid="decrement-button"]').click();
    expect(await $('[data-testid="count"]').getText()).toBe('4');
  });

  it('resets the count', async () => {
    await $('[data-testid="reset-input"]').sendKeys('123');
    await $('[data-testid="reset-button"]').click();
    expect(await $('[data-testid="count"]').getText()).toBe('123');
  });
});
