import {newE2EPage} from '@stencil/core/testing';

describe('stencil-bubble-chart', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<stencil-bubble-chart></stencil-bubble-chart>');
    const element = await page.find('stencil-bubble-chart');
    expect(element).toHaveClass('hydrated');
  });
});
