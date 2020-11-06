import { $, browser } from 'protractor';

describe('Counter (starter)', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('increments the count', () => {
    expect($('[data-testid="count"]').getText()).toBe('5');
    $('[data-testid="increment-button"]').click();
    expect($('[data-testid="count"]').getText()).toBe('6');
  });

  it('decrements the count', () => {
    $('[data-testid="decrement-button"]').click();
    expect($('[data-testid="count"]').getText()).toBe('4');
  });

  it('resets the count', () => {
    $('[data-testid="reset-input"]').sendKeys('123');
    $('[data-testid="reset-button"]').click();
    expect($('[data-testid="count"]').getText()).toBe('123');
  });
});
