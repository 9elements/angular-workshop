import { browser } from 'protractor';

import { CounterPage } from './counter.po';

const initialState = [
  // Independent counters
  '5',
  '8',
  '10',
  // Service counters
  '0',
  '0',
  '0',
  // NgRx counters
  '0',
  '0',
  '0',
];

const newCount = '123';

describe('Counter (testing all counters on the page)', () => {
  let page: CounterPage;

  beforeEach(() => {
    page = new CounterPage();
  });

  it('renders start counts', async () => {
    await page.navigateTo();
    expect(await page.getCountTexts()).toEqual(initialState);
  });

  describe('independent counter', () => {
    const counterIndex = 0;

    beforeAll(async () => {
      await browser.refresh();
    });

    it('increments the count', async () => {
      await page.getIncrementButton(counterIndex).click();
      expect(await page.getCountTexts()).toEqual([
        // Independent counters
        '6',
        '8',
        '10',
        // Service counters
        '0',
        '0',
        '0',
        // NgRx counters
        '0',
        '0',
        '0',
      ]);
    });

    it('decrements the count', async () => {
      await page.getDecrementButton(counterIndex).click();
      expect(await page.getCountTexts()).toEqual(initialState);
    });

    it('resets the count', async () => {
      await page.getResetInput(counterIndex).sendKeys(newCount);
      await page.getResetButton(counterIndex).click();
      expect(await page.getCountTexts()).toEqual([
        // Independent counters
        newCount,
        '8',
        '10',
        // Service counters
        '0',
        '0',
        '0',
        // NgRx counters
        '0',
        '0',
        '0',
      ]);
    });
  });

  describe('counter connected to the service', () => {
    const counterIndex = 3;

    beforeAll(() => {
      browser.refresh();
    });

    it('increments the count', async () => {
      await page.getIncrementButton(counterIndex).click();
      expect(await page.getCountTexts()).toEqual([
        // Independent counters
        '5',
        '8',
        '10',
        // Service counters
        '1',
        '1',
        '1',
        // NgRx counters
        '0',
        '0',
        '0',
      ]);
    });

    it('decrements the count', async () => {
      await page.getDecrementButton(counterIndex).click();
      expect(await page.getCountTexts()).toEqual(initialState);
    });

    it('resets the count', async () => {
      await page.getResetInput(counterIndex).sendKeys(newCount);
      await page.getResetButton(counterIndex).click();
      expect(await page.getCountTexts()).toEqual([
        // Independent counters
        '5',
        '8',
        '10',
        // Service counters
        newCount,
        newCount,
        newCount,
        // NgRx counters
        '0',
        '0',
        '0',
      ]);
    });
  });

  describe('NgRx counter', () => {
    const counterIndex = 6;

    beforeAll(() => {
      browser.refresh();
    });

    it('increments the count', async () => {
      await page.getIncrementButton(counterIndex).click();
      expect(await page.getCountTexts()).toEqual([
        // Independent counters
        '5',
        '8',
        '10',
        // Service counters
        '0',
        '0',
        '0',
        // NgRx counters
        '1',
        '1',
        '1',
      ]);
    });

    it('decrements the count', async () => {
      await page.getDecrementButton(counterIndex).click();
      expect(await page.getCountTexts()).toEqual(initialState);
    });

    it('resets the count', async () => {
      await page.getResetInput(counterIndex).sendKeys(newCount);
      await page.getResetButton(counterIndex).click();
      expect(await page.getCountTexts()).toEqual([
        // Independent counters
        '5',
        '8',
        '10',
        // Service counters
        '0',
        '0',
        '0',
        // NgRx counters
        newCount,
        newCount,
        newCount,
      ]);
    });
  });
});
