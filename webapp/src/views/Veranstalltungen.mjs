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
<table class="uk-table uk-dark">
    <caption>Veranstaltung</caption>
    <thead>
        <tr>
            <th>Name</th>
            <th>Datum</th>
            <th>Aktionen</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Web-Entwicklung</td>
            <td>21.12.22</td>
            <td><button>Delete</button></td>
        </tr>
                <tr>
            <td>Analysis 1</td>
            <td>21.12.22</td>
            <td><button>Delete</button></td>
        </tr>
                <tr>
            <td>Programmierparadigmen</td>
            <td>21.12.22</td>
            <td><button>Delete</button></td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td></td>
        </tr>
    </tfoot>
</table>
<a  href="/create" data-link>button</a>
`;
  }
}
