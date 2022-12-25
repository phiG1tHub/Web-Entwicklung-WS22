import AbstractView from './AbstractView.mjs';
// import uikit from 'uikit/src/js/uikit.js';

export default class extends AbstractView {
  constructor (params) {
    super(params);
    this.setTitle('Veranstalltungen');
  }

  async getHtml () {
    // uikit.showModal();
    return `
<table class="uk-table">
    <caption>Veranstaltung</caption>
    <thead>
        <tr>
            <th>Name</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td></td>
        </tr>
    </tfoot>
</table>
`;
  }
}
