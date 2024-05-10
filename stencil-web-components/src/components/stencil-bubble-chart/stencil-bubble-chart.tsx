import {Component, Element, h, Host, Prop, Watch} from "@stencil/core";
import {BubbleChartItem} from "./bubble-chart-item";
import {
  axisBottom,
  axisLeft,
  max,
  min,
  ScaleLinear,
  scaleLinear,
  ScaleOrdinal,
  scaleOrdinal,
  schemeCategory10,
  select,
  Selection
} from "d3";

interface Margins {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const PLOT_MARGINS: Margins = {top: 10, right: 20, bottom: 30, left: 50};

const TOOLTIP_TOP_PADDING_PX = 10;
const TRANSITION_DURATION_MS = 200;

const CSS_CLASSES: { [key: string]: string } = {
  CHART: "chart",
  CHART_WRAPPER: "chart-wrapper",
  TOOLTIP: "tooltip",
  PLOT_CONTAINER: "plot-container",
  AXIS: "axis",
  X_AXIS: "x-axis",
  Y_AXIS: "y-axis",
  BUBBLE: "bubble"
};

@Component({
  tag: "stencil-bubble-chart",
  styleUrl: "stencil-bubble-chart.css",
  shadow: true,
})
export class StencilBubbleChart {
  /**
   * Bubble chart data
   */
  @Prop() public data: Array<BubbleChartItem>;

  /**
   * Title (name) of the chart
   */
  @Prop() public chartTitle: string;

  /**
   * Current element
   */
  @Element() private chartEl: HTMLElement;

  private svg: HTMLElement;
  private tooltip: HTMLElement;

  private plotContainer: Selection<SVGGElement, unknown, null, undefined>;

  private xScale: ScaleLinear<number, number>;
  private yScale: ScaleLinear<number, number>;
  private colorScale: ScaleOrdinal<string, string>;

  private elementWidth: number;
  private elementHeight: number;

  private plotWidth: number;
  private plotHeight: number;

  @Watch("data")
  onPlotDataChange(data: Array<BubbleChartItem>): void {
    this.data = data;
    this.renderChart(data);
  }

  public componentDidLoad() {
    this.svg = this.chartEl.shadowRoot.querySelector(`.${CSS_CLASSES.CHART}`)
    this.tooltip = this.chartEl.shadowRoot.querySelector(`.${CSS_CLASSES.TOOLTIP}`)

    this.renderChart(this.data);
  }

  private renderChart(data: Array<BubbleChartItem>) {
    if (!data || data.length === 0) {
      this.cleanupChart();
      return;
    }

    this.setChartDimensions();
    this.createPlotContainer();

    this.plotWidth = this.elementWidth - PLOT_MARGINS.left - PLOT_MARGINS.right;
    this.plotHeight = this.elementHeight - PLOT_MARGINS.top - PLOT_MARGINS.bottom;

    this.createXAxis(data);
    this.createYAxis(data);
    this.createColorScale(data);

    this.renderBubbles(data);
  }

  private setChartDimensions(): void {
    const chartWrapper = this.chartEl.shadowRoot.querySelector(`.${CSS_CLASSES.CHART_WRAPPER}`);
    this.elementWidth = chartWrapper.clientWidth;
    this.elementHeight = chartWrapper.clientHeight;

    select(this.svg)
      .attr("width", this.elementWidth)
      .attr("height", this.elementHeight)
  }

  private createPlotContainer(): void {
    const selection = select(`.${CSS_CLASSES.PLOT_CONTAINER}`);
    if (selection.empty()) {
      this.plotContainer = select(this.svg)
        .append("g")
        .attr("class", CSS_CLASSES.PLOT_CONTAINER)
        .attr("transform", `translate(${PLOT_MARGINS.left},${PLOT_MARGINS.top})`);
    }
  }

  private createXAxis(data: Array<BubbleChartItem>): void {
    const selection = select(`.${CSS_CLASSES.X_AXIS}`);
    if (selection.empty()) {
      const xAxisDomain = data.map(({x}) => x);
      const minX = min(xAxisDomain);
      const maxX = max(xAxisDomain);
      const delta = Math.abs(maxX - minX);
      const minDomainX = minX - delta * 0.1;
      const maxDomainX = maxX + delta * 0.1;

      this.xScale = scaleLinear()
        .domain([minDomainX, maxDomainX])
        .range([0, this.plotWidth]);
      this.plotContainer
        .append("g")
        .attr("class", `${CSS_CLASSES.AXIS} ${CSS_CLASSES.X_AXIS}`)
        .attr("transform", `translate(0, ${this.plotHeight})`)
        .call(axisBottom(this.xScale));
    }
  }

  private createYAxis(data: Array<BubbleChartItem>): void {
    const selection = select(`.${CSS_CLASSES.Y_AXIS}`);
    if (selection.empty()) {
      const yAxisDomain = data.map(({y}) => y).sort((a, b) => a - b);
      const minY = min(yAxisDomain);
      const maxY = max(yAxisDomain);
      const delta = Math.abs(maxY - minY);
      const minDomainY = minY - delta * 0.1;
      const maxDomainY = maxY + delta * 0.1;

      this.yScale = scaleLinear()
        .domain([minDomainY, maxDomainY])
        .range([this.plotHeight, 0]);

      this.plotContainer
        .append("g")
        .attr("class", `${CSS_CLASSES.AXIS} ${CSS_CLASSES.Y_AXIS}`)
        .call(axisLeft(this.yScale));
    }
  }

  private createColorScale(data: Array<BubbleChartItem>): void {
    const uniqueLabels = data.reduce((result, item) => result.add(item.label), new Set<string>());
    const labels = [...uniqueLabels].sort((a, b) => a.localeCompare(b));

    this.colorScale = scaleOrdinal<string, string>()
      .domain(labels)
      .range(schemeCategory10);
  }

  private renderBubbles(data: Array<BubbleChartItem>): void {
    this.plotContainer
      .append("g")
      .selectAll(`.${CSS_CLASSES.BUBBLE}`)
      .data(data)
      .join("circle")
      .attr("class", CSS_CLASSES.BUBBLE)
      .attr("cx", d => this.xScale(d.x))
      .attr("cy", d => this.yScale(d.y))
      .attr("r", d => d.size)
      .style("fill", d => this.colorScale(d.label))
      .on("mouseover", this.onMouseOver.bind(this))
      .on("mousemove", this.onMouseMove.bind(this))
      .on("mouseleave", this.onMouseLeave.bind(this));
  }

  private onMouseOver(event: MouseEvent, d: BubbleChartItem): void {
    const selection = select(this.tooltip);

    selection
      .transition()
      .duration(TRANSITION_DURATION_MS)
    selection
      .style("opacity", 1)
      .html(`${d.label}: ${d.size}`)
      .style("left", `${event.offsetX}px`)
      .style("top", `${event.offsetY + TOOLTIP_TOP_PADDING_PX}px`);
  }

  private onMouseMove(event: MouseEvent): void {
    select(this.tooltip)
      .style("left", `${event.offsetX}px`)
      .style("top", `${event.offsetY + TOOLTIP_TOP_PADDING_PX}px`);
  }

  private onMouseLeave(): void {
    select(this.tooltip)
      .style("opacity", 0)
      .style("left", "0px")
      .style("top", "0px");
  }

  private cleanupChart(): void {
    if (this.svg) {
      select(this.svg).selectAll("*").remove();
    }
  }

  render() {
    if (this.data && this.data.length > 0) {
      return (
        <Host>
          {
            this.chartTitle
              ? <div class="chart-title">{this.chartTitle}</div>
              : ""
          }

          <div class={{
            "chart-wrapper": true,
            "full-page-chart": !Boolean(this.chartTitle)
          }}>
            <svg class="chart"/>
            <div class="tooltip"/>
          </div>
        </Host>
      );
    } else {
      return (
        <Host>
          <div class="no-data-placeholder">
            No chart data provided
          </div>
        </Host>
      );
    }
  }
}
