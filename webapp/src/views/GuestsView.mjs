import AbstractView from './AbstractView.mjs';

export default class extends AbstractView {
  constructor (params) {
    super(params);
    this.postId = params.id;
    this.setTitle('Gästeliste');
  }

  async getHtml () {
    return `
            <h1>Gästeliste</h1>
            <p>Sie sehen sich die Gästeliste #${this.postId}.</p>
        `;
  }
}
