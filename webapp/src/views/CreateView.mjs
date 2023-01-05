import AbstractView from './AbstractView.mjs';
// import uikit from 'uikit/src/js/uikit.js';

export default class extends AbstractView {
  constructor (params) {
    super(params);
    this.setTitle('Erstellen Sie eine Veranstaltung');
  }

  async getHtml () {
    // uikit.showModal();
    return `
<form method="post">
    <fieldset class="uk-fieldset">

        <legend class="uk-legend">Legend</legend>

        <div class="uk-margin">
            <input class="uk-input" type="text" placeholder="Name" aria-label="Name">
        </div>

        <div class="uk-margin">
            <select class="uk-select" aria-label="Select">
                <option>Einseitig</option>
                <option>Beidseitig</option>
            </select>
        </div>

        <div class="uk-margin">
            <textarea class="uk-textarea" rows="5" placeholder="Textarea" aria-label="Textarea"></textarea>
        </div>

        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input class="uk-radio" type="radio" name="radio2" checked> A</label>
            <label><input class="uk-radio" type="radio" name="radio2"> B</label>
        </div>

        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label><input class="uk-checkbox" type="checkbox" checked> A</label>
            <label><input class="uk-checkbox" type="checkbox"> B</label>
        </div>

        <div class="uk-margin">
            <input class="uk-range" type="range" value="2" min="0" max="10" step="0.1" aria-label="Range">
        </div>

    </fieldset>
</form>`;
  }
}
