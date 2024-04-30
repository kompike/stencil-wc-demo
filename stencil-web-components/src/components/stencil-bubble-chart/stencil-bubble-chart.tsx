import {Component, Element, h, Host, Prop, Watch} from '@stencil/core';
import * as d3 from "d3";
import {BubbleChartItem} from "./bubble-chart-item";

@Component({
  tag: 'stencil-bubble-chart',
  styleUrl: 'stencil-bubble-chart.css',
  shadow: true,
})
export class StencilBubbleChart {
  /**
   * Bubble chart data
   */
  @Prop() public data: Array<BubbleChartItem>;

  @Element() private chartEl: HTMLElement

  @Watch("data")
  onPlotDataChange(data: Array<BubbleChartItem>): void {
    this.data = data;
    if (data && data.length > 0) {
      this.renderPlot(data);
    }
  }

  public componentDidLoad() {
    if (this.data && this.data.length > 0) {
      this.renderPlot(this.data);
    }
  }

  private renderPlot(data: Array<BubbleChartItem>) {
    const margin = {top: 10, right: 20, bottom: 30, left: 50};

    const width = 600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = this.chartEl.shadowRoot.querySelector(".chart")
    const selection = d3.select(svg)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis
    const xAxisDomain = data.map(({x}) => x).sort((a, b) => a - b);
    const x = d3.scaleLinear()
      .domain([xAxisDomain[0], xAxisDomain[xAxisDomain.length - 1]])
      .range([0, width]);
    selection.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const yAxisDomain = data.map(({y}) => y).sort((a, b) => a - b);
    const y = d3.scaleLinear()
      .domain([yAxisDomain[0], yAxisDomain[yAxisDomain.length - 1]])
      .range([height, 0]);
    selection.append("g")
      .call(d3.axisLeft(y));

    // Add a scale for bubble color
    const uniqueLabels = data.reduce((result, item) => result.add(item.label), new Set<string>());
    const labels = [...uniqueLabels].sort((a, b) => a.localeCompare(b));
    const myColor = d3.scaleOrdinal<string, string>()
      .domain(labels)
      .range(d3.schemeSet2);

    // -1- Create a tooltip div that is hidden by default:
    const tooltipEl = this.chartEl.shadowRoot.querySelector(".tooltip")
    const tooltipSelection = d3.select(tooltipEl)
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

    // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    const showTooltip = (event, d) => {
      tooltipSelection
        .transition()
        .duration(200)
      tooltipSelection
        .style("opacity", 1)
        .html(`${d.label}: ${d.size}`)
        .style("left", event.x + "px")
        .style("top", event.y + 10 + "px")
    }
    const moveTooltip = event => {
      tooltipSelection
        .style("left", event.x + "px")
        .style("top", event.y + 10 + "px")
    }
    const hideTooltip = () => {
      tooltipSelection
        .transition()
        .duration(200)
        .style("opacity", 0)
    }

    // Add dots
    selection.append('g')
      .selectAll(".bubble")
      .data(data)
      .join("circle")
      .attr("class", "bubble")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", d => d.size)
      .style("fill", d => myColor(d.label))
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip);
  }

  render() {
    return (
      <Host>
        <svg class="chart"/>
        <div class="tooltip"/>
      </Host>
    );
  }
}
