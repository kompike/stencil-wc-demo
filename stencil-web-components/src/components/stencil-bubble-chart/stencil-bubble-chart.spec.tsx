import {h} from "@stencil/core";
import {newSpecPage} from '@stencil/core/testing';
import {StencilBubbleChart} from './stencil-bubble-chart';
import {BubbleChartItem} from "./bubble-chart-item";

const DATA: Array<BubbleChartItem> = [
  {
    "x": 3.69,
    "y": 57.83,
    "size": 4,
    "label": "Saint Kitts and Nevis"
  },
  {
    "x": 9.59,
    "y": 69.7,
    "size": 4,
    "label": "China"
  },
  {
    "x": 12.67,
    "y": 15.8,
    "size": 7,
    "label": "Bhutan"
  },
  {
    "x": 77.39,
    "y": 85.34,
    "size": 3,
    "label": "Virgin Islands (British)"
  },
  {
    "x": 92.23,
    "y": 51.81,
    "size": 4,
    "label": "Barbados"
  },
  {
    "x": 31.73,
    "y": 43.91,
    "size": 4,
    "label": "Burundi"
  },
  {
    "x": 70.33,
    "y": 92.36,
    "size": 1,
    "label": "Comoros"
  },
  {
    "x": 65.08,
    "y": 59.81,
    "size": 1,
    "label": "Uruguay"
  },
  {
    "x": 38.35,
    "y": 66.98,
    "size": 4,
    "label": "French Guiana"
  },
  {
    "x": 17.67,
    "y": 63.6,
    "size": 6,
    "label": "Grenada"
  }
];


describe('stencil-bubble-chart', () => {
  it('renders', async () => {
    const {root} = await newSpecPage({
      components: [StencilBubbleChart],
      html: '<stencil-bubble-chart></stencil-bubble-chart>',
    });
    expect(root).toEqualHtml(`
      <stencil-bubble-chart>
        <mock:shadow-root>
          <div class="no-data-placeholder">
            No chart data provided
          </div>
        </mock:shadow-root>
      </stencil-bubble-chart>
    `);
  });

  it('renders with data', async () => {
    const {root} = await newSpecPage({
      components: [StencilBubbleChart],
      template: () => (<stencil-bubble-chart data={DATA}></stencil-bubble-chart>),
    });

    const bubbles = root.shadowRoot.querySelectorAll(".bubble");
    expect(bubbles.length).toEqual(DATA.length);

    expect(root.shadowRoot.querySelector(".x-axis")).not.toBeNull();
    expect(root.shadowRoot.querySelector(".y-axis")).not.toBeNull();
  });
});
