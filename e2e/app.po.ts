import { browser } from 'protractor';

import { findEls } from './e2e.spec-helper';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getCounts() {
    return findEls('count');
  }

  getCountTexts() {
    return this.getCounts().map((el) =>
      el ? el.getText() : ''
    );
  }

  getIncrementButtons() {
    return findEls('increment-button');
  }

  getIncrementButton(index: number) {
    return this.getIncrementButtons().get(index);
  }

  getDecrementButtons() {
    return findEls('decrement-button');
  }

  getDecrementButton(index: number) {
    return this.getDecrementButtons().get(index);
  }

  getResetInputs() {
    return findEls('reset-input');
  }

  getResetInput(index: number) {
    return this.getResetInputs().get(index);
  }

  getResetButtons() {
    return findEls('reset-button');
  }

  getResetButton(index: number) {
    return this.getResetButtons().get(index);
  }

}
