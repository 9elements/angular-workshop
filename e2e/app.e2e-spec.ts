import { browser } from 'protractor';

import { AppPage } from './app.po';

const initialState = [
  '5', '8', '10',
  '0', '0', '0',
  '0', '0', '0',
];

const newCount = '123';

describe('angular-workshop App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('renders start counts', () => {
    page.navigateTo();
    expect(page.getCountTexts()).toEqual(initialState);
  });

  describe('independent counter', () => {

    const counterIndex = 0;

    beforeAll(() => {
      browser.refresh();
    });

    it('increments the count', () => {
      page.getIncrementButton(counterIndex).click();
      expect(page.getCountTexts()).toEqual([
        '6', '8', '10',
        '0', '0', '0',
        '0', '0', '0',
      ]);
    });

    it('decrements the count', () => {
      page.getDecrementButton(counterIndex).click();
      expect(page.getCountTexts()).toEqual(initialState);
    });

    it('resets the count', () => {
      page.getResetInput(counterIndex).sendKeys(newCount);
      page.getResetButton(counterIndex).click();
      expect(page.getCountTexts()).toEqual([
        newCount, '8', '10',
        '0', '0', '0',
        '0', '0', '0',
      ]);
    });

  });

  describe('counter connected to the service', () => {

    const counterIndex = 3;

    beforeAll(() => {
      browser.refresh();
    });

    it('increments the count', () => {
      page.getIncrementButton(counterIndex).click();
      expect(page.getCountTexts()).toEqual([
        '5', '8', '10',
        '1', '1', '1',
        '0', '0', '0',
      ]);
    });

    it('decrements the count', () => {
      page.getDecrementButton(counterIndex).click();
      expect(page.getCountTexts()).toEqual(initialState);
    });

    it('resets the count', () => {
      page.getResetInput(counterIndex).sendKeys(newCount);
      page.getResetButton(counterIndex).click();
      expect(page.getCountTexts()).toEqual([
        '5', '8', '10',
        newCount, newCount, newCount,
        '0', '0', '0',
      ]);
    });

  });

  describe('NgRx counter', () => {

    const counterIndex = 6;

    beforeAll(() => {
      browser.refresh();
    });

    it('increments the count', () => {
      page.getIncrementButton(counterIndex).click();
      expect(page.getCountTexts()).toEqual([
        '5', '8', '10',
        '0', '0', '0',
        '1', '1', '1',
      ]);
    });

    it('decrements the count', () => {
      page.getDecrementButton(counterIndex).click();
      expect(page.getCountTexts()).toEqual(initialState);
    });

    it('resets the count', () => {
      page.getResetInput(counterIndex).sendKeys(newCount);
      page.getResetButton(counterIndex).click();
      expect(page.getCountTexts()).toEqual([
        '5', '8', '10',
        '0', '0', '0',
        newCount, newCount, newCount,
      ]);
    });

  });

});
