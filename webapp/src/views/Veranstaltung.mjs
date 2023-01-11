import AbstractView from './AbstractView.mjs';
import { select } from 'd3-selection';
import event from './event.json';
// import uikit from 'uikit/src/js/uikit.js';

export default class extends AbstractView {
  constructor (params) {
    super(params);
    this.setTitle('Veranstaltung');
  }

  async createSeatingPlan (seats, tables, opposite) {
    const width = 500;
    const height = 500;
    const tableWidth = 300;
    const yOffset = 50;

    const svg = select('body') // select function does weird things?
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    console.log('here');

    svg.append('rect')
      .attr('height', 100)
      .attr('width', 300)
      .attr('x', 50)
      .attr('y', yOffset)
      .attr('stroke', 'black');
    this.createChairs(tableWidth, seats, svg, yOffset, opposite);
  }

  createChairs (tableW, seats, svg, yOffset, opposite) {
    const n = tableW / seats;
    console.log('n: ' + n);
    const c1 = n;
    for (let i = 1; i <= seats; i++) {
      svg.append('rect')
        .attr('height', 20)
        .attr('width', 20)
        .attr('x', (c1 * i) - 10)
        .attr('y', yOffset + 110)
        .attr('stroke', 'black');
    }
    if (opposite === true) {
      for (let i = 1; i <= seats; i++) {
        svg.append('rect')
          .attr('height', 20)
          .attr('width', 20)
          .attr('x', (c1 * i) - 10)
          .attr('y', yOffset - 30)
          .attr('stroke', 'black');
      }
    }
  }

  async getHtml () {
    console.log(event.seatingPlan.length);

    await this.createSeatingPlan(3, event.seatingPlan.length, true);
    return '';
  }
}
