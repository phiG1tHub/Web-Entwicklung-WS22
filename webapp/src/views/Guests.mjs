import AbstractView from './AbstractView.mjs';

export default class extends AbstractView {
  constructor (params) {
    super(params);
    this.setTitle('Gäste');
  }

  async getHtml () {
    return `
            <h1>Gästelisten</h1>
            <p>Sie sehen sich die Gästelisten an</p>
        `;
  }
}
