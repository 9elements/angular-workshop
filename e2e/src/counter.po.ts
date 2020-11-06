import { browser, promise, ElementArrayFinder, ElementFinder } from 'protractor';

import { findEls } from '../e2e.spec-helper';

export class CounterPage {
  public navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  public getCounts(): ElementArrayFinder {
    return findEls('count');
  }

  public getCountTexts(): promise.Promise<unknown[]> {
    return this.getCounts().map(
      // tslint:disable-next-line: no-non-null-assertion
      (el) => el!.getText(),
    );
  }

  public getIncrementButtons(): ElementArrayFinder {
    return findEls('increment-button');
  }

  public getIncrementButton(index: number): ElementFinder {
    return this.getIncrementButtons().get(index);
  }

  public getDecrementButtons(): ElementArrayFinder {
    return findEls('decrement-button');
  }

  public getDecrementButton(index: number): ElementFinder {
    return this.getDecrementButtons().get(index);
  }

  public getResetInputs(): ElementArrayFinder {
    return findEls('reset-input');
  }

  public getResetInput(index: number): ElementFinder {
    return this.getResetInputs().get(index);
  }

  public getResetButtons(): ElementArrayFinder {
    return findEls('reset-button');
  }

  public getResetButton(index: number): ElementFinder {
    return this.getResetButtons().get(index);
  }
}
