import { newSpecPage } from '@stencil/core/testing';
import { StencilBubbleChart } from './stencil-bubble-chart';

describe('stencil-bubble-chart', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [StencilBubbleChart],
      html: '<stencil-bubble-chart></stencil-bubble-chart>',
    });
    expect(root).toEqualHtml(`
      <stencil-bubble-chart>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </stencil-bubble-chart>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [StencilBubbleChart],
      html: `<stencil-bubble-chart first="Stencil" last="'Don't call me a framework' JS"></stencil-bubble-chart>`,
    });
    expect(root).toEqualHtml(`
      <stencil-bubble-chart first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </stencil-bubble-chart>
    `);
  });
});
